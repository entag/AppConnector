var router = require('express').Router();
var controller = require('../controllers/connectwise');
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

	var company = {};
	company.name = data.companyName;
	company.identifier = data.companyName;
	company.addressLine1 = data.companyAddress;
	company.status = {
		name: 'Active'
	}
	company.type = {
		name: 'Client'
	}
	company.metadata = {
		abn: data.companyAbn,
		citySuburb: data.companySuburb,
		state: data.companyState,
		postcode: data.companyPostcode,
		billingACN: data.companyAccount
	};

	var contact = {};
	contact.id = 0;
	contact.firstName = data.contactFirst;
	contact.lastName = data.contactLast;
	contact.metadata = {
		email: data.contactEmail,
		phone: data.contactPhone
	}

	var project = {}
	project.name = company.name;
	project.company = company.id;
	project.board = {
		name: 'Application'
	};
	project.billingMethod = 'FixedFee';
	project.estimatedStart = '2016-06-01T03:57:39Z';
	project.estimatedEnd = '2016-06-01T03:57:39Z';

	controller.createCompany(company, function(code, body){
		console.log('createCompany: ' + code);
		console.log(body);
		project.company = body;
		contact.company = body;
		controller.createContact(contact, function(code, body) {
			console.log('createContact: ' + code);
			console.log(body);
			project.contact = body;
			controller.createProject(project, function(code, body){
				console.log('createProject: ' + code);
				console.log(body);
				res.send(body)
			})
		})
	})
})
