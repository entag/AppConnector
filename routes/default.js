// routes/default.js

var router = require('express').Router();

// home page
router.get('/', function (req, res) {
	if(!req.isAuthenticated()) {
		return res.render('login')
	}

	return res.render('form', {
		user: req.user
	})
})

module.exports = router;
