var router = require('express').Router();
module.exports = router;

var routeAuth = require('../controllers/routeAuth');

router.get('/register',
	routeAuth.forceAdmin,
	function(req, res) {
		res.render('register', {
			user: req.user.userId
		})
	}
)
