'use strict';

module.exports = function(app) {

    // Home route
    var index = require('../controllers/index');
    var getData = require('../controllers/getData');
    app.get('/', index.render);
};
