// routes/default.js

var router = require('express').Router();

// home page
router.get('/', function (req, res) {
	if(req.isAuthenticated()) {
		if(req.user.userId === 'admin') {
			res.render('login', {
				"user": req.user
			})
		} else {
			res.render('form', {
				'user': req.user
			})
		}
	}
	else {
		res.render('home', {
			"user": undefined
		})
	}
})

router.get('/register', function(req, res) {
	res.render('register');
})

module.exports = router;
