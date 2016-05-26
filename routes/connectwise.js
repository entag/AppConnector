var router = require('express').Router();
var connectwise = require('../controllers/connectwise');

router.post('/getTicket', function(req, res, next) {
	var id = req.body.ticketID;
	console.log(id);
	console.log(JSON.stringify(controller.header));
	
	controller.getTicket(id, function(code, body){
		return res.send(code, body);
	})
})

router.get('/getCompanies', function(req, res, next) {
	res.end(connectwise.api({
		api: 'company',
		path: 'companies',
		method: 'GET'
	}, null,
	function(statusCode, body) {
		console.log(body)
	}))
})

router.post('/createCompany', function(req, res, next) {
	api({
		api: 'company',
		path: 'companies',
		method: 'POST'
		}, req.body,
		function(statusCode, body) {
			console.log(statusCode + ' ' + body)
	})
})

router.post('/createContact', function(req, res, next) {
	controller.createContact({
		firstName: req.body.firstName,
		lastName: req.body.lastName
	}, function(code, body) {
		return res.send(code, body)
	})
});
module.exports = router
