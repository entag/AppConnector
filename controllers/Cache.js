var Q = require('q');
var DocDB = require('../models/DocDB');
var config = require('../config/database');
config.databaseId = 'cache';

var projectsCache = {}
projectsCache.prototype = config.prototype;
projectsCache.databaseId = 'cache';
projectsCache.collectionId = 'projects';

var contactsCache = {}
contactsCache.prototype = config.prototype;
contactsCache.databaseId = 'cache';
contactsCache.collectionId = 'contacts';

var companiesCache = {}
companiesCache.prototype = config.prototype;
companiesCache.databaseId = 'cache';
companiesCache.collectionId = 'companies';

//helper functions
function authCheck(req, res, next) {
	if(!req.isAuthenticated()) {
		res.send(401)
	}
	next(req, res)
}

function Cfg(collectionId) {
	this.prototype = config.prototype
	this.collectionId = collectionId
	return this
}

function matchAndMerge(item, collection) {
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


function exists(collectionId, item, parameters) {
	var curItem = {}
	var curParam = ''
	var cfg = new Cfg(collectionId) 

	query(cfg, 'select *')
	.then(function(collection) {
		var current = matchAndMerge(item, collection)
		if(current) {
			
)
}

function getItem(docOptions ,query, callback) {
	var cache = new DocDB(docOptions)
	cache.getItem(
		query,
		callback
	)
}

function query(docOptions, query) {
	var cache = new DocDB(docOptions)
	var deferred = Q.defer()
	cache.queryItems(
		query,
		function(err, result) {
			if(err) {
				deferred.reject(error)
			} else {
				deferred.resolve(result)
			}
		}
	)
	return deferred.promise
}

function addItem(docOptions, item, callback) {
	var cache = new DocDB(docOptions)
	cache.addItem(
		item,
		callback
	)
}

function updateItem(docOptions, item, callback) {
	var cache = new DocDB(docOptions)
	cache.updateItem(
		item,
		callback
	)
}

function addOrUpdate(docOptions, item, searchParams, callback) {
	queryItem(
		docOptions,
		'select *',
		function(err, result) {
			if(err) {//sww
				callback(err)	
			} else {
				var current = exists(
					item,
					result,
					searchParams)
				if(current) { //object already exists
					Object.assign(
						true,
						current,
						item
					)
					updateItem(
						docOptions,
						current,
						function(err, result) {
							if(err) {
								callback(err) //sww
							} else {
								callback(null, result)
							}
						})
				} else { //item doesn't exist
					addItem(
						docOptions,
						item,
						function(err, result) {
							if(err) {
								callback(err) //sww
							} else {
								callback(null, result)
							}
						}
					}	
			}
		})
	

//routes
router.get('/project',
	authCheck(req, res, next),
	queryItem(
		projectsCache,
		'select *',
		function(err, result) {
			if(err) {
				res.send(404)
			} else {
				res.send(200, result)
			}
		}
	)
)

router.get('/project:id', 
	authCheck(req, res, next),
	queryItem(
		projectsCache,
		'select * where id = ' + req.params.id,
		function(err, result) {
			if(err) { //no item found || error
				res.send(404)
			} else {
				res.send(200, result)
			}
		})
)
			
router.post('/project', 
	authCheck(req, res, next),
	function(req, res) {
		addOrUpdate(
			projectCache,
			req.body,
			function(err, result) {
				if(err) {
					res.send(500) //sww
				} else {
					res.send(200, result)
				}
			}
		)
	}
)

router.get('/contact',
	authCheck(req, res, next),
	function(req, res) {
		queryItem(
			contactCache,
			'select *',
			function(err, result) {
				if(err) {
					res.send(500) //sww
				} else {
					res.send(200, result)
				}
			})
		}
)

router.get('/contact:id',
	authCheck(req, res, next),
	function(req, res) {
		getItem(
			contactCache,
			'select * where id = ' + req.params.id,
			function(err, result) {
				if(err) {
					res.send(404) //not found
				} else {
					res.send(200, result)
				}
			})
		}
)

router.post('/contact',
	authCheck(req, res, next),
	function(req, res) {
		addOrUpdate(
			contactCache,
			req.body,
			function(err, result) {
				if(err) {
					res.send(500) //sww
				} else {
					res.send(200, result)
				}
			})
		}
)

router.get('/companies',
	authCheck(req, res, next),
	function(req, res) {
		queryItem(
			companiesCache,
			'select *',
			function(err, result) {
				if(err) {
					res.send(500) //sww
				} else {
					res.send(200, result)
				}
			})
		}
)
		
router.get('/companies:id',
	authCheck(req, res, next),
	function(req, res) {
		getItem(
			companiesCache,
			'select * where id = ' + req.params.id,
			function(err, result) {
				if(err) {
					res.send(404) //not found
				} else {
					res.send(200, result)
				}
			})
		}
)

router.post('/companies',
	authCheck(req, res, next),
	function(req, res) {
		addOrUpdate(
			companiesCache,
			req.body,
			function(err, result) {
				if(err) {
					res.send(500)
				} else {
					res.send(200)
				}
			})
	}
)

module.exports = router
