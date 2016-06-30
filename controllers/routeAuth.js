var auth = require('./auth');

module.exports = {
	forceAuthentication : function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			return res.redirect('/')
		}
	},

	forceAdmin: function(req, res, next) {
		console.log(req.user);
		auth.isAdmin(req.user.userId, function(response){
			if(response) {next()
			} else {return res.redirect('/')}
		})
		}
	}
