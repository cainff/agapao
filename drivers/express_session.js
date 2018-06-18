var session = require('express-session')
var express = require('express');
var mysql = require('./mysql');



module.exports = { 

    session : function() {

        var app = express();

        app.set('trust proxy', 1) // trust first proxy
        app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
        }))

    }

}
