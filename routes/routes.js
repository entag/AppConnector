var router = require('express').Router();
module.exports = router;

router.post('/form/submit', function(req, res) {
	if(!req.isAuthenticated()){
		res.redirect('/')
	}

	var data = req.body;
	console.log(data);
	res.status(200);
})
