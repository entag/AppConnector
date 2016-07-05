var router = require('express').Router();

var controller = require('../controllers/auth');

//setup passport
module.exports = function(passport) {
    
    //helpers
    var authCallback = function(req, res) {
        res.redirect('/');
    };

    var session = function(req, res) {
        res.redirect('/');
    };
    
    var signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info){
		req.login(user, function(err) {
			if(err){
				return res.send(401);
			}
			return res.send(200);
		})
	})(req, res, next)
    };

    // routes
    router.post('/register', function(req, res, next) { 
        var data = req.body || {};
	console.log(JSON.stringify(data));

        controller.register(data, function(e, user) {
            if (e || !user) {
                return res.send(500, e);
            }

            req.login(user, function(err) {
                if (err) { 
                    return next(err); 
                }

                return res.json(200, user);
            });
        });
    });

    router.get('/remove', function(req, res, next) {
        if(req.user.UserId != req.body.id) {
            return res.send(JSON.stringify({status: 'error', message: e}));
        }

        controller.remove(req.body.id, function(e) {
            if(!e) {
                return res.send('success');
            }

            next(e);
        });
    });

    router.get('/signout', function(req, res, next){
        //req.logOut();
	req.logout();
	//req.session.destroy();
	res.redirect('/');
    });

    router.post('/signin',signin);

    return router;
}
