var router = require('express').Router();
var controller = require('../controllers/connectwise');

router.post('/getTicket', function(req, res, next) {
	var id = req.body.ticketID;
	console.log(id);
	console.log(JSON.stringify(controller.header));
	
	controller.getTicket(id, function(code, body){
		return res.send(code, body);
	})
})

router.get('/getCompanies', function(req, res, next) {
	console.log('getting companies')
	controller.getCompanies(function(code, body) {
		return res.send(code, body)
	})
})

router.post('/createCompany', function(req, res, next) {
	controller.createCompany({
		identifier: req.body.identifier,
		name: req.body.name,
		address: req.body.address,
	}, function(code, body) {
		return res.send(code, body)
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
