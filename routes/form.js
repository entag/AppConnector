var router = require('express').Router();
module.exports = router;

router.get('/', function(req, res) {
	if(!req.isAuthenticated()) {
		res.redirect('/')
	}

	res.render('form')
});

router.post('/submit', function(req, res) {
	if(!req.isAuthenticated()) {
		res.redirect('/')
	}
	
	var data = req.body;
	console.log(data);
	res.status(200);
})
