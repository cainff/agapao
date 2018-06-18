var express = require('express');
var session = require('express-session')
var mysql = require('./mysql');


module.exports = {
    
    server : null,
    
    init : function() {
        
    var app = express();
    
    app.listen(3030, function(){
        console.log('listening on *:3030');
        });
        
        this.server = app; // ==> app.drivers.express.server
    }



}