var express = require('express'),
    methodOverride = require('method-override'),
    morgan = require('morgan'), // HTTP request logger middleware
    http = require('http'),
    path = require('path'),
    yaml = require('js-yaml'),
    bodyParser = require('body-parser'),
    fs = require('fs');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  // Add development specific logic here.
}
else if (env === 'production') {
  // Add production specific logic here.
}

// NOTE: Exit by calling: 'process.exit()'

// serve index and view partials
app.get('/', function(request, response) {
  response.render('index');
});

// JSON API
// app.get('/api/req', function(request, response) {
//   response.json({message: "Hi the Express server!"});
// });

app.get('*', function(request, response) {
  response.render('index');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
