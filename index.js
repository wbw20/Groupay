var ejs = require('ejs');

var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index', { title: 'The index page!' })
});

app.get('/room', function(request, response) {
  response.render('room', { title: 'The room page!' })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
