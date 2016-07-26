var request = require('request')
var auth = require('../config/connectwise');
var base64 = require('base64-js');
var utf8 = require('utf8');
var Q = require('q');

var publicKey = auth.publicKey;
var privateKey = auth.privateKey;
var organisation = auth.organisation;
var authString = utf8.encode(organisation + '+' + publicKey + ':' + privateKey);
var encodedAuth = base64.fromByteArray(map(authString, function(char){return char.charCodeAt(0)}));

//helpers
function map (arr, callback) {
  var res = []
  var kValue, mappedValue

  for (var k = 0, len = arr.length; k < len; k++) {
    if ((typeof arr === 'string' && !!arr.charAt(k))) {
      kValue = arr.charAt(k)
      mappedValue = callback(kValue, k, arr)
      res[k] = mappedValue
    } else if (typeof arr !== 'string' && k in arr) {
      kValue = arr[k]
      mappedValue = callback(kValue, k, arr)
      res[k] = mappedValue
    }
  }
  return res
}

var connectwise = {
	header: {
		'Authorization': 'Basic ' + encodedAuth
	},
	url: 'https://api-au.myconnectwise.net/v4_6_release/apis/3.0/',
};
module.exports = connectwise;

connectwise.asyncRequest = function(options) {
	console.log('async request');
	var deferred = Q.defer();
	options.headers = this.header;
	request(options, function(error, response, body) {
		if(error) {console.log(error);deferred.reject(error)}
		else {
			deferred.resolve(body)
		}
	})
	return deferred.promise;
}

connectwise.getTicket = function(id, callback) {
	console.log('fetching ticket from ' + this.url + 'service/tickets/' + id);
	console.log(authString);
	request({
		url: this.url + 'service/tickets/' + id,
		header: {
			'Accept': 'application/json',
			'Cache-Control': 'no-cache',
			'Authorization': 'Basic ' + encodedAuth 
			}
		}, function (error, response, body){
			if(error) {
				console.log(error)
			} else callback(response.statusCode, body)
		});
}

connectwise.getAllTickets = function(callback) {
	request({
		url: this.url + 'service/tickets/',
		headers: this.header,
		method: 'GET'
		}, function(error, response, body) {
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
	})
}

connectwise.updateTicket = function(id, operations, callback) {
	request({
		url: this.url + 'service/tickets/',
		headers: this.header,
		method: 'PATCH',
		data: JSON.stringify(operations)
		}, function(error, request, body) {
			if(error) {
				console.log(error)
			} else {
				callback(request.statusCode, body)
			}
	})
}

connectwise.replaceTicket = function(id, ticket, callback) {
	request({
		url: this.url + 'service/tickets/' + id,
		headers: this.header,
		method: 'PUT',
		data: JSON.stringify(ticket)
		}, function(error, request, body) {
			if(error) {
				console.log(error)
			} else {
				callback(request.statusCode, body)
			}
	})
}

connectwise.createTicket = function(ticket, callback) {
	request({
		url: 'https://api-au.myconnectwise.net/v4_6_release/apis/3.0/service/tickets',
		headers: this.header,
		method: 'POST',
		json: ticket
	},
	function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			callback(response.statusCode, body)
		}
	})
}

connectwise.getContact = function(id, callback) {
	request({
		url: this.url + 'company/contacts/' + id,
		headers: this.header,
		method: 'GET'
		},
		function(error, response, body){
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
		})
	}

connectwise.createContact = function(contact, callback) {
	request({
		url: this.url + 'company/contacts/',
		headers: this.header,
		method: 'POST',
		data: contact
		},
		function(error, response, body) {
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
		})
}

connectwise.getCompanies = function(callback){
	request({
		url: this.url + 'company/companies',
		headers: this.header,
		method: 'GET'
		}, function(error, response, body) {
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
		})
}

connectwise.createCompany = function(company, callback){
	request({
		url: this.url + 'company/companies',
		method: 'POST',
		headers: this.header,
		json: company 
		}, function(error, response, body) {
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
		})
}
	
connectwise.createContact = function(contact, callback) {
	var json = JSON.stringify(contact, null, '\t');
	console.log(contact);

	request({
		url: this.url + 'company/contacts',
		method: 'POST',
		headers: this.header,
		json: contact
		}, function(error, response, body) {
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
		})
}

connectwise.getBoards = function(callback) {
	request({
		url: this.url + 'project/projects',
		method: 'GET',
		headers: this.header,
		}, function(error, response, body) {
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
		})
}

connectwise.createProject = function(project, callback) {
	request({
		url: this.url + 'project/projects',
		method: 'POST',
		headers: this.header,
		json: project
		}, function(error, response, body) {
			if(error) {
				console.log(error)
			} else {
				callback(response.statusCode, body)
			}
		})
}

