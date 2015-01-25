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

function createItem(roomId, item, cb) {
  var room = getRoom(roomId);

  room.items.push(item);
  cb(room);
}

function makePayment(id, status, cb) {
  rooms.forEach(function(room) {
    room.items.forEach(function(item) {
      if (item.id === id) {
        item.status = status;
        cb(room);
      }
    });
  });

  cb();
}

function getRoom(id, cb) {
  rooms.forEach(function(room) {
    if (room.id === id) {
      cb(room);
    }
  });

  cb();
}

app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/room/:id', function(request, response) {
  getRoom(request.params.id, function(result) {
    console.log(result);
    response.render('room', result);
  });
});

app.post('/room', function(request, response) {
  createRoom(request.body.name, function(res) {
    response.send(res);
  });
});

app.post('/room/:id/item', function(request, response) {
  createItem(request.params.id, request.body, function(res) {
    response.send(res);
  });
});

app.post('/item/:id', function(request, response) {
  makePayment(request.params.id, request.body.status, function(res) {
    response.send(res);
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
