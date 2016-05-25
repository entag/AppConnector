// routes/default.js

var router = require('express').Router();

// home page
router.get('/', function (req, res) {
	if(req.isAuthenticated()) {
		console.log('authenticated');
		console.log(JSON.stringify(req.user));
		res.render('home', {
			"user": req.user
		})
	}
	else {
		console.log('not authenticated');
		res.render('home', {
			"user": undefined
		})
	}
})

router.get('/register', function(req, res) {
	res.render('register');
})

router.get('/form', function(req, res) {
	res.render('form');
})
module.exports = router;
