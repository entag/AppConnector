'use strict';

var async = require('async');
var crypto = require('crypto');

var LocalStrategy = require('passport-local').Strategy;

module.exports = {

    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function (password, salt) {
        if (!password || !salt) return '';
        var salt = new Buffer(salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },

    getAccount: function (userId, callback) {
        var self = this;

        docDB.getItem('select * from root r where r.userId = "' + userId.toLowerCase() + '"', function(e, user) {
            if(!user) {
                return callback(e);
            }

            return callback(e, user.profile);
        });
    },

    getFullAccount: function (userId, callback) {
        var self = this;

        docDB.getItem('select * from root r where r.userId = "' + userId.toLowerCase() + '"', function(e, user) {
            if(!user) {
                return callback(e);
            }

            return callback(e, user);
        });
    },


    authenticate: function(userId, password, callback) {
        var self = this;

        docDB.getItem('select * from root r where r.userId = "' + userId.toLowerCase() + '"', function(e, user) {         
            if (e || !user) {
                if(!user) {
                    return callback('Invalid User');
                }
                return callback(e);
            }

            if (self.encryptPassword(password, user.salt) === user.password) {
                return callback(null, user.profile);
            }
            else {
                return callback('Invalid password');
            }                  
        });    
    },

    isAdmin: function (id, callback) {
        var self = this;

        docDB.getItem('select * from root r where r.userId = "' + id + '"', function(e, user) {
		console.log(user.admin);
            if(user.admin === 'true') {
		console.log('admin check passed');
                return callback(true);
            }
		console.log('admin check failed');
            return callback(false);
        });
    },

    providerLogin: function (userinfo, callback) {
        var self = this;

        docDB.getItem('select * from root r where r.providers.' + userinfo.provider + ' = "' + userinfo.providerId + '"', function(e, user) {
            if(user) {
                return callback(e, user);
            }

            //create a new user                
            self.createUser(userinfo, function (e, user) {
                return callback(e, user);
            });
        });

    },

    register: function (data, callback) {
        var self = this;
	console.log(data);

        self.getAccount(data.email, function (e, user) {
            if (user) {
                return callback('A user with this email already exists');
            }

            data.provider = 'local';
            data.providerId = data.email;

            //assign admin rights to admin when first created
            if(data.email === 'admin') {
                data.admin = true; 
            }

            //create a new user                
            self.createUser(data, function (e, user) {
                callback(e, user);
            });
        });

    },

    createUser: function(data, callback) {
        var self = this;
        
        var user = {
            userId: data.email,
            providers: {},
            profile: { userId: data.email, name: data.name, email: data.email }
        }

        user.providers[data.provider] = data.providerId;

        if(data.password) {
            user.salt = self.makeSalt();
            user.password = self.encryptPassword(data.password, user.salt);
        }

        docDB.addItem(user, function(e, user) {
            return callback(e, user);
        });
    },

    updateUser: function(data, callback) {
        var self = this;
        
        self.getAccount(data.userId, function (e, user) {
            if (e || !user) {
                return callback('error updating user');
            }

            //check for changed password
            if(data.newPassword && data.password && encryptPassword(data.password, user.salt) === user.password) {
                user.providers.salt = self.makeSalt();  
                user.providers.local = self.encryptPassword(data.newPassword, user.providers.salt);
            }

            user.profile = data.profile;
            user.profile.userId = user.userId;

            //update a new user                
            docDB.updateItem(user, function(e) {
                callback(e,user);
            });
        });
    },

	resetPassword: function(data, callback) {
		var self = this;
		
		self.getFullAccount(data.userId, function (e, user) {
		    if (e || !user) {
			return callback('error updating user');
		    }

		    //check for changed password
			console.log(user);
			user.salt = self.makeSalt();  
			user.password = self.encryptPassword(data.newPassword, user.salt);


		    //update a new user                
		    docDB.updateItem(user, function(e) {
			callback(e,user);
		    });
		});
	}, 

    removeAccount: function(userId, callback) {
        var self = this;

        if(userId === 'admin') {
            callback('Error: You cannot delete the admin account');
        }

        docDB.getItem('select * from root r where r.userId = "' + userId.toLowerCase() + '"', function (e, user) {
            if(e || !user) {
                return callback(e);
            }

            docDB.removeItem(user, function(e) {
                return callback(e);
            });
        });   
    }
}
