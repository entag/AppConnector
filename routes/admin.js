//routes/admin.js

var router = require('express').Router();
var routeAuth = require('../controllers/routeAuth');

//admin page

router.get('/', routeAuth.forceAdmin(), function (req, res) {
		return res.render('admin', {
			user: req.user
			})
	})

module.exports = router;
