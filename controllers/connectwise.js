var request = require('request')
var auth = require('../config/connectwise');
var base64 = require('base64-js');
var utf8 = require('utf8');

var publicKey = auth.publicKey;
var privateKey = auth.privateKey;
var organisation = auth.organisation;
var authString = utf8.encode(organisation + '+' + publicKey + ':' + privateKey);
var encodedAuth = base64.fromByteArray(map(authString, function(char){return char.charCodeAt(0)}));

//helper functions
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
	baseUrl: 'https://api-au.myconnectwise.net/v4_6_release/apis/3.0/',
	header: {
		'Authorization': 'Basic ' + encodedAuth
		}
};

/**
*	create an aysnchronus request against the connectwise api
*	@param {object} options - request options
*	@param {string} options.api - the api to call against
*	@param {string} options.path - the path to call against from the selected api
*	@param {string} options.method - the request method
*	@param {object} data - the javascript object to be sent
*	@param {function} [callback] - function to be called if the request is successful
*	@returns {object}
**/
connectwise.api = function (options, data, callback) {
	var url = this.baseUrl + options.api + '/' + options.path;
	console.log('url:' + url);
	console.log('header: ' + JSON.stringify(this.header));
	console.log('data:' + JSON.stringify(data));
	console.log('method: ' + options.method);
	if(callback) {
		console.log('callback: true')
	} else console.log('callback: false');
	switch (options.method) {
		case 'POST':
			console.log('posting');
			request({
				url: url,
				header: this.header,
				json: data,
				method: options.method
				}, checkResponse())
		case 'GET':
			console.log('getting');
			request({
				url: url,
				header: this.header,
				method: options.method
				}, function(error, response, body) {
					console.log(body)
				})
	}
	
	function checkResponse(error, response, body, callback) {
		console.log(body);
		if (error) {
			console.log(error)
		} else {
			if (callback) {
				callback(response.statusCode, body)
			} else return body
		}
	}
}

module.exports = connectwise;

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

connectwise.newContact = function(contact, callback) {
	request({
		url: this.url + 'company/contacts/',
		headers: this.header,
		method: 'POST',
		data: JSON.strigify(contact)
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


