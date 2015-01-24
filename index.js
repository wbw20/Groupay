var ejs = require('ejs');

var express = require('express');
var elasticsearch = require('elasticsearch');
var app = express();

var client = elasticsearch.Client({
  host: 'http://a6a6e4a90ec4dd4b000.qbox.io',
  sniffOnStart: true,
  sniffInterval: 300000
});

function createUser(doc, cb) {
  client.index({
    index: 'groupay',
    type: 'user',
    body: doc
  }, cb);
}

function createRoom(doc, cb) {
  client.index({
    index: 'groupay',
    type: 'room',
    body: doc
  }, cb);
}

function getAll(cb) {
  client.search({
    index: 'groupay',
    body: {
      'filter': {
        'match_all': { }
      }
    }
  }).then(cb);
}

app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/room', function(request, response) {
  response.render('room', { title: 'The room page!' });
});

app.post('/room', function(request, response) {
  createRoom({
    name: 'Will'
  }, function(res) {
    response.send(res);
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
