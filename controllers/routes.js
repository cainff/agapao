var mysql = require('mysql');   
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var multer = require('multer');


module.exports = function(app){
    var server = app.drivers.express.server;

    // ROUTE VIEWS

    server.get('/login', function (req, res) {
        res.sendFile(path.resolve('views/html/login.html'));
    });




    // LOGIN

    //Login influencer
    
    server.post('/api/login', function(req, res){
        
        
            
		app.controllers.security.authenticate('members', req.body.email, req.body.password, function(check, user){
			if(!check) return res.status(403).send({ error : 'bad password'})

			res.status(200).send(user)
		})
    }) 
    
    //GET MEMBERS

    server.get('/', function(req, res){
        res.send('Hello');
    });

    server.use(bodyParser.json()); // to support JSON-encoded bodies
    server.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));
    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })

    server.get('/api/members', function(req, res){
        
        var members = new app.models.members(app, {
            id : req.query.id
        });
        
        members.get(function(rows){
            res.send(rows);
        })
    })

    //REGISTER MEMBERS

    server.post('/api/members', function(req, res){

        var members = new app.models.members(app, {
            nom : req.body.nom,
            prenom : req.body.prenom,
            pseudo : req.body.pseudo,
            password : req.body.password,
            email : req.body.email,
            photo : req.body.photo
        });
        
        members.register(function(rows){
            res.send(rows);
        }); 
        
        //res.send("Cela fonctionne");
    });

    // GET POST 
    
    server.get('/api/post', function(req, res){
        
        var post = new app.models.post(app, {
            id : req.query.id
        });
        
        post.get(function(rows){
            res.send(rows);
        })
    })

    // SEND POST

    server.post('/api/post', function(req, res){
        
                var post = new app.models.post(app, {
                    message : req.body.message,
                    now : req.body.now
                });
                
                post.register(function(rows){
                    res.send(rows);
                }); 
                
                //res.send("Cela fonctionne");
            });




}