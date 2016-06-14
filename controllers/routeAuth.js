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
		if (req.isAuthenticated()) {
			auth.isAdmin(req.user.userId,
			function(response) {
				if(response) {
					return next()
				} else {
					return res.redirect('/')
				}
			})
		} else {
			var url = (req.socket.encrypted ? 'https://' : 'http://') + req.headers.host + '/';
			console.log(url);
			res.redirect('/');
		}
	}
}
