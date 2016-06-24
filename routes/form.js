var router = require('express').Router();
var controller = require('../controllers/connectwise');
var Cache = require('../controllers/Cache');
var Q = require('q');
module.exports = router;

var cache = new Cache();

router.get('/', function(req, res) {
	if(!req.isAuthenticated()) {
		res.redirect('/')
	}

	res.render('form')
});

router.get('/success', function(req, res) {
	res.render('form_success', {
		user: req.user
	});
});

router.get('/test', function(req, res) {
});

router.post('/submit', function(req, res) {
	var data = req.body;
	console.log(data);
	Q.all([
		cache.query('companies', 'select * from root r'),
		cache.query('contacts', 'select * from root r'),
		cache.query('projects', 'select * from root r')	
	])
	.then(function(allData) {
		console.log('alldata loaded');
		var companies = allData[0],
		contacts = allData[1],
		projects = allData[2];

		data.companyName = data.companyName.replace(/[^a-zA-Z0-9]/gi, '');
		console.log(data.companyName);

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
			defaultContact: {
				name: data.contactFirst
			},
			city: data.companySuburb,
			zip: data.companyPostcode,
			customFields: [
				{
					id: 4,
					value: data.companyABN
				},
				{
					id: 5,
					value: data.telstraAccountNumber,
				}
				],
		};
		console.log(company);
		
		var primary = {
			firstName: data.contactFirst,
			lastName: data.contactLast,
			email: data.contactEmail,
			phone: data.contactPhone,
			company: {
				name: data.companyName
			},
		};
		console.log(primary);

		var technical = {
			firstName: data.technicalFirst,
			lastName: data.technicalLast,
			email: data.technicalEmail,
			phone: data.technicalPhone,
			company: {
				name: data.companyName
			},
		};
		console.log(technical);

		var tbc = {
			firstName: data.tbcFirst,
			lastName: data.tbcLast,
			email: data.tbcEmail
		};
		console.log(tbc);

		var project = {
			name: company.name + ' ' + data.solutionsSoftware,
			company: {},
			contact: {
				name: data.technicalFirst
			},
			board: {
				name: 'Application'
			},
			type: {
				name: 'Application Rollout'
			},
			billingMethod: 'FixedFee',
			description: data.solutionsSoftware + " " + data.solutionsLicence + ' ' + data.solutionsQty + "\r\n" + data.supportPackage + "\r\nSales Person" + data.tbcFirst + ' ' + data.tbcLast + "\r\n" + data.tbcEmail + "\r\nVoice Signature ID: " + data.voiceSig,
			estimatedStart: '2016-06-17T04:21:07Z', 
			estimatedEnd: '2016-06-17T04:21:07Z',
		};
		console.log(project);

		console.log('created objects');
		company = cache.matchAndMerge(company, companies, ['identifier']) || company; 
		primary = cache.matchAndMerge(primary, contacts, ['firstName', 'lastName', 'email']) || primary;
		technical = cache.matchAndMerge(technical, contacts, ['firstName', 'lastName', 'email']) || technical;
		project = cache.matchAndMerge(project, projects, ['name', 'company']) || project;

		var main = Q.resolve()
		main.then(function() {
		var deferred = Q.defer()
		if(company.id) { //update company
			controller.asyncRequest({
				url: controller.url + 'company/companies/' + '{' + company.id + '}',
				method: 'PUT',
				json: company
			})
				.then(function(res){console.log(res);deferred.resolve(res)})
		} else { //post company
			controller.asyncRequest({
				url: controller.url + 'company/companies',
				method: 'POST',
				json: company
			})
				.then(function(res){console.log(res);deferred.resolve(res)})
		}
		return deferred.promise
		})

		.then(function(res) {
			var deferred = Q.defer()
			company = res;
			if(primary.id) { // update contact
				contactOperation = controller.asyncRequest({
				method: 'PUT',
				url: controller.url + 'company/contacts/' + '{' + contact.id + '}',
				json: primary
				})
				.then(function(res){deferred.resolve(res)})
			} else { // post contact
				contactOperation = controller.asyncRequest({
				url: controller.url + 'company/contacts',
				json: primary,
				method: 'POST'
				})
				.then(function(res){deferred.resolve(res)})
			}
			return deferred.promise
		})

		.then(function(res) {
			var deferred = Q.defer()
			primary = res;
			project.contact = primary;
			if(technical.id) { // update contact
				contactOperation = controller.asyncRequest({
				method: 'PUT',
				url: controller.url + 'company/contacts/' + '{' + contact.id + '}',
				json: technical
				})
				.then(function(res){deferred.resolve(res)})
			} else { // post contact
				contactOperation = controller.asyncRequest({
				url: controller.url + 'company/contacts',
				json: technical,
				method: 'POST'
				})
				.then(function(res){deferred.resolve(res)})
			}
			return deferred.promise
		})			

		.then(function(res) {
			var deferred = Q.defer()
			technical = res;
			if(tbc.id) { // update contact
				contactOperation = controller.asyncRequest({
				method: 'PUT',
				url: controller.url + 'company/contacts/' + '{' + contact.id + '}',
				json: tbc
				})
				.then(function(res){deferred.resolve(res)})
			} else { // post contact
				contactOperation = controller.asyncRequest({
				url: controller.url + 'company/contacts',
				json: tbc,
				method: 'POST'
				})
				.then(function(res){deferred.resolve(res)})
			}
			return deferred.promise
		})			

		.then(function(res) {
			var deferred = Q.defer()
			tbc = res;
			project.company.id = company.id;
			if(project.id) { //update project
				controller.asyncRequest({
					url: controller.url + 'project/projects/' + '{' + project.id + '}',
					method: 'PUT',
					json: project
				})			
				.then(function(res){deferred.resolve(res)})
			} else {//post project
				projectOperation = controller.asyncRequest({
					url: controller.url + 'project/projects',
					method: 'POST',
					json: project
				})
				.then(function(res){deferred.resolve(res)})
			}
			return deferred.promise
		})

		.then(function(result) {
			console.log('last promise hit');
			project = result;
			res.send(200, '/form/success');
		})
})
})
