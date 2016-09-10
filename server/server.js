// server/server.js
/*------------------------------------------------------------------

------------------------------------------------------------------*/
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var pg = require('pg');
var initializeDB = require('./db/connection').initializeDB;
var connectionString = require('./db/connection').connectionString;

/*------------------------------------------------------------------
                          ROUTER FILES
------------------------------------------------------------------*/
var index = require('./routes/index');
var app = express();

/*------------------------------------------------------------------
                          APP SET UP
------------------------------------------------------------------*/
app.set('views', __dirname + '/public/views/');
app.set('view engine', 'pug');

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
/*------------------------------------------------------------------
                  DB INITIALIZATION/LISTENER
------------------------------------------------------------------*/
initializeDB();

var server = app.listen(port, function() {
  var port = server.address().port;
  console.log('Listening on port', port, '--Ctrl-C to exit.');
})
