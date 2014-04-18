'use strict';
/**
 *  Mean container for dependency injection
 */
var mean = require('meanio');
mean.app('Mean Demo App',{});

/**
 * Module dependencies.
 */
var mysql = require('mysql');
var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);

var SQLconnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Happy2me'
});

SQLconnection.connect(function(err) {
  console.log(err, "SQL Error");
});
SQLconnection.query('CREATE DATABASE scott', function(err, res){
    console.log(err);
});
// Start the app by listening on <port>
app.listen(config.port);
console.log('Express app started on port ' + config.port);

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
module.exports = {'app':app, 'SQLconnection': SQLconnection};