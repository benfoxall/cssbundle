
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


//hacked in stuff
var fs = require('fs'),
	_u = require('underscore')._,
	css_parse = require('./lib/css_parse.js');

var styles;
fs.readFile('public/stylesheets/style.css', 'utf8', function (err, data) {
	if (err) throw err;
	styles = css_parse.parse(data);
});

var active = {};

app.get('/styles.css', function(req, res){
	res.header('Content-type', 'text/css');
	
	var key = _u(req.query).keys()[0];
	
	var css = _u(styles).map(function(s){
		if(!key || _u.contains(active[key], s.selector)){
			return s.selector + ' {'+s.properties+'}\n';
		} else {
			return '';
		}
		
	})
	res.send(css.join(""));
});

app.post('/styles.css', function(req, res){
	var key = _u(req.query).keys()[0];
	active[key] || (active[key] = []);
	
	res.send("Selectors:" + active[key].join(","));
	
})



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
