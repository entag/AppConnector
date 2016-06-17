var router = require('express').Router();
module.exports = router;

var routeAuth = require('../controllers/routeAuth');

router.get('/register',
	function(req, res) {
		res.render('register')
	}
)
