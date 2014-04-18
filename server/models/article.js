'use strict';

var mysql = require('mysql');
var SQLconnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'XXX'
});

SQLconnection.connect(function(err) {
  console.log(err, "SQL Error");
});

var databaseMethods = {
    createTable: function(tableName){
        SQLconnection.query('CREATE DATABASE '+ tableName, function(err, res){
            console.log(err);
        });
    },
    
};
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);
