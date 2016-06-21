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
		if (req.isAuthenticated()) {
			if(req.user.admin) {
				return next()
			} else {
					return res.redirect('/')
				}
		} else {
			var url = (req.socket.encrypted ? 'https://' : 'http://') + req.headers.host + '/';
			console.log(url);
			res.redirect('/');
		}
	}
}
