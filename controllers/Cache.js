var Q = require('q');
var DocDB = require('../models/DocDB');
var config = require('../config/database');

config.databaseId = 'cache';

//helper functions
function Cfg(collectionId) {
	var out = {
		host: config.host,
		authKey: config.authKey,
		secret: config.secret,
		databaseId: 'cache',
		collectionId: collectionId
	}
	return out
}



function out() {};
// compare item with all items in a collection based on parameters
// if match is found returns merged items 
// if no match returns null
out.prototype.matchAndMerge = function(item, collection, parameters) {
	console.log('match and merge hit');
	for(var i=0; i<collection.length; i++) {
		curItem = collection[i]
		for(var x=0; x<parameters.length; x++) {
			curParam = parameters[x]
			if(item[curParam] == curItem[curParam]) { //match
				if(x = parameters.length -1) {
					Object.assign(true, curItem, item)
					return curItem	
				}
			} else { //no match
				break;
			}
		}
		return null
	}
}


out.prototype.resolveConflicts = function(collectionId, item, parameters) {
	console.log('resolve conflicts hit');
	var cfg = new Cfg(collectionId) 

	this.query(cfg, 'select * from root r')
	.then(function(collection) {
		return matchAndMerge(item, collection)
	})
}

function getItem(docOptions ,query, callback) {
	var cache = new DocDB(docOptions)
	cache.getItem(
		query,
		callback
	)
}

out.prototype.query = function(docOptions, query) {
	var cfg = Cfg(docOptions);
	var deferred = Q.defer()
	var cache = new DocDB(cfg, function() {
	
	cache.queryItems(
		query,
		function(err, result) {
			if(err) {
				deferred.reject(err)
			} else {
				deferred.resolve(result)
			}
		}
	)
	});
	return deferred.promise
}

function addItem(docOptions, item) {
	var cfg = new Cfg(docOptions);
	var deferred = Q.defer
	var cache = new DocDB(cfg, function(){
		cache.addItem(item,function(err, res) {
			if(err) {deferred.reject(err)
			} else {deferred.resolve(res)}
		})
	})
	return deferred.promise
}

function updateItem(docOptions, item) {
	console.log('updateItem hit');
	var cfg = new Cfg(docOptions);
	var deferred = Q.defer()
	var cache = new DocDB(cfg, function(){
		cache.updateItem(item, function(err, doc) {
			if(err) {deferred.reject(err)
			} else {deferred.resolve(doc)}
		})
	})
	return deferred.promise()
}

out.prototype.addOrUpdate = function(docOptions, item, searchParams) {
	console.log('addOrUpdate hit');
	var cfg = new Cfg(docOptions);
	var deferred = Q.defer();
	
	var current = this.resolveConflicts('docOptions', item, searchParams) 
	if(current) { //object already exists
		console.log('updating')
		updateItem(docOptions, current)
		.then(function() { deferred.resolve(),
			deferred.reject()}) 
	} else { //item doesn't exist
		console.log('adding')
		addItem(docOptions, item)
		.then(function() { deferred.resolve(),
			deferred.reject()}) 
	}	
	return deferred.promise
}
	

module.exports = out;
