// server.js
// set up ===================================================================================================
var express 	= require('express');
var app 	= express();			// server
var https	= require('https');
var http	= require('http');
var stylus 	= require('stylus');		// css compiler
var nib 	= require('nib');		// stylus addon
var port 	= process.env.PORT || 443;
var fs		= require('fs');

var morgan 		= require('morgan');	// logging
var cookieParser	= require('cookie-parser');	
var bodyParser		= require('body-parser');
var session		= require('express-session');

var docDbSessionStore	= require('express-session-documentdb');
var DocDB		= require('./models/DocDB');
var config		= require('./config/database');

var connectwise		= require('./controllers/connectwise');

//globals
docDB = new DocDB(config);
passport = require('passport');

// configuration =============================================================================================
function compile(str, path) {			// stylus compile function
	return stylus(str)
	.set('filename', path)
	.use(nib())
}

// configure passport
require('./config/passport')(passport);
app.use(session({
	secret:	config.secret,
	saveUninitialized:	true,
	resave:			true,
	store:			new docDbSessionStore(config)
}));
app.use(passport.initialize());
app.use(passport.session());

// configure middleware
app.use(morgan('dev'));				// log requests
app.use(cookieParser());			// read cookies
app.use(bodyParser());				// get info from html forms

// configure express application
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')			// set view engine
app.use(stylus.middleware(			//configure stylus
	{ src: __dirname + '/public/css',
	debug: true,
	force: true,
	compile: compile
	}
))
app.use(express.static(__dirname + '/public'))	// set static path

// routes ===================================================================================================
app.use('/', require('./routes/default'));
app.use('/auth', require('./routes/auth')(passport));
app.use('/connectwise', require('./routes/connectwise'));
app.use('/form', require('./routes/form'));

// launch ===================================================================================================
var httpServer = http.createServer(app);
httpServer.listen(PORT, function() {
	console.log('server listening: ' + PORT);
})
//var server = https.createServer({
//	key: fs.readFileSync('./ssl/server.key'),
//	cert: fs.readFileSync('./ssl/server.crt'),
//	ca: fs.readFileSync('./ssl/ca.crt'),
//	requestCert: true,
//	rejectUnauthorized: false,
//}, app).listen(port, function() {
//	console.log('server listening on: ' + port)
//});
