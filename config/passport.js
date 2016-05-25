'use strict'
var controller = require('../controllers/auth');

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, callback) {
        callback(null, user.userId);
    });

    // Deserialize the login / user object based on a pre-serialized token
    // which is the user id / email
    passport.deserializeUser(function(id, callback) {
        controller.getAccount(id, function(e, user) {
            callback(null, user);
        });

    });

    // Use local strategy
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
        }, function(username, password, callback) {
            controller.authenticate(username, password, function(e, user) {
                if (e) {
                    return callback(null, false, e);
                }    
                
                return callback(e, user);            
            }); 
        })
    );


}
