var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');

var userController = {};

// Restrict access to root page
userController.home = function(req,res){
    res.render('index', {user: req.user});
};

// Go to Registration Page
userController.register = function(req,res){
    res.render('register');
}

userController.doRegister = function(req,res){
    User.register(new User({ username: req.body.username, name:req.body.name }), req.body.password, function(err, user){
        if (err){
            return res.render('register', {user: user});
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/');
        });
    });
}

// Go to Login Page

userController.login = function(req, res){
    res.render('login');
}

// Post Login

userController.doLogin = function(req,res){
    passport.authenticate('local')(req,res,function(){
        res.redirect('/');
    })
}

// Logout

userController.logout = function(req, res){
    req.logout();
    res.redirect('/');
}

module.exports = userController;