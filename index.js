var ejs = require('ejs');

var express = require('express');
var randomstring = require("randomstring");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var rooms = [];

function generateId() {
  return randomstring.generate(7);
}

function createRoom(name, cb) {
  var room = {
    id: generateId(),
    name: name,
    items: []
  };

  rooms.push(room);
  cb(room);
}

function getRoom(id, cb) {
  rooms.forEach(function(room) {
    if (room.id === id) {
      cb(room);
    }
  });
}

app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/room/:id', function(request, response) {
  getRoom(request.params.id, function(results) {
    response.send(results);
  });
});

app.post('/room', function(request, response) {
  createRoom(request.body.name, function(res) {
    response.send(res);
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
