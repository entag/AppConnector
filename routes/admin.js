//routes/admin.js

var router = require('express').Router();
var auth = require('../controllers/auth');
var routeAuth = require('../controllers/routeAuth');

//admin page

router.get('/', routeAuth.forceAdmin, function (req, res) {
		return res.render('admin', {
			user: req.user
			})
	})

router.post('/register', routeAuth.forceAdmin, function(req, res) {
	var user = req.body;
	auth.register(user, function(e, user) {
		console.log('register callback');
		if(e) {console.log('sww'); return res.send(400, 'sww')}
		return res.send(200, 'success');
	})
})

router.post('/delete', routeAuth.forceAdmin, function(req, res) {
	console.log(req.body.user);
	var user = new String(req.body.user);
	auth.removeAccount(user, function(e, user) {
		if(e) {console.log('sww'); return res.send(400, 'sww')}
		return res.send(200);
	})
})

router.post('/reset', routeAuth.forceAdmin, function(req, res) {
	var user = req.body;
	auth.resetPassword(user, function(e, user) {
		if(e) {console.log(e); return res.send(400)}
		return res.send(200);
	})
})

module.exports = router;
