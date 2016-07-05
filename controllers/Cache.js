var Q = require('q');
var DocDB = require('../models/DocDB');
var config = require('../config/database');

//function stdCallback(err, result) {
//	if(err) {deferred.reject(err)
//	} else {deferred.resolve(result)}
//}

module.exports = {
	/* 	query
	*	required params
	*		databaseId
	*		collectionId
	*		query
	*/		
	query: function(options) {
		config.databaseId = options.databaseId;
		config.collectionId = options.collectionId;

		var deferred = Q.defer();
		var doc = new DocDB(config, function() {
			doc.queryItems(options.query, function(err, result) {
				if(err) {deferred.reject(err)
				} else {deferred.resolve(result)}
			})
		})
		return deferred.promise
	},

	add: function(options) {
		config.databaseId = options.databaseId;
		config.collectionId = options.collectionId;

		var deferred = Q.defer();
		var doc = new DocDB(config, function() {
			doc.addItem(options.item, function(err, result){
				if(err) {deferred.reject(err)
				} else {deferred.resolve(result)}
			})
		})
		return deferred.promise
	},

	remove: function(options) {
		config.databaseId = options.databaseId;
		config.collectionId = options.collectionId;

		var deferred = Q.defer();
		var doc = new DocDb(config, function() {
			doc.removeItem(options.item, stdCallback)
		})
		return deferred.promise
	}
			
	}
