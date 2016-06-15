var router = require('express').Router();
var controller = require('../controllers/connectwise');
var Q = require('q');
module.exports = router;

function checkExists(collection, item, parameter, callback) {
	for(var i=0; i<collection.length; i++) {
		if(collection[i][paramter] == item[parameter]) {
			callback(collection[i]);	
		}
	}
	return false
}

router.get('/', function(req, res) {
	if(!req.isAuthenticated()) {
		res.redirect('/')
	}

	res.render('form')
});

router.get('/test', function(req, res) {
});

router.post('/submit', function(req, res) {
	if(!req.isAuthenticated()) {
		res.redirect('/')
	}
	
	var allData = Q.all([
		controller.asyncRequest({		//get all companies
			url: 'https://api-au.myconnectwise.net/v4_6_release/apis/3.0/company/companies',
			method: 'GET'
		}),
		controller.asyncRequest({		//get all contacts
			url: 'https://api-au.myconnectwise.net/v4_6_release/apis/3.0/company/contacts',
			method: 'GET'
		}),
		controller.asyncRequest({		//get all projects
			url: 'https://api-au.myconnectwise.net/v4_6_release/apis/3.0/project/projects',
			method: 'GET'
		})
	])

	allData.then(function(allData) {
		var companies = allData[0],
		contacts = allData[1],
		projects = allData[2];

		var company = {			//create company
			name: data.companyName,
			identifier: data.companyName,
			addressLine1: data.companyAddress,
			status: {
				name: 'Active'
			},
			type: {
				name: 'Client'
			},
			metadata: {
				abn: data.companyAbn,
				citySuburb: data.companySuburb,
				state: data.companyState,
				postcode: data.companyPostcode,
				billingACN: data.companyAccount
			},
		};
		
		var contact = {
			firstName: data.contactFirst,
			lastName: data.contactLast,
			email: data.contactEmail,
			phone: data.contactPhone
		};

		checkExists(companies, company, 'name', 
			function(item) { // duplicate exits
				Object.assign(true, item, company);
				company = item;
			},
			function(item) {	// no duplicate
				
			});

		checkExists(contact, contact, 'email', function(item) {
			Object.assign(true, item, contact)
			contact = item;
			// save modified contact to db
		});
	})

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
