const express = require('express') // Express framework for node js
const mosca = require('mosca'); // Mosca mqtt server
const ascoltatori = require('ascoltatori'); //----
const path = require('path'); // Path module for paths
const app = express() // Init App



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/', function(req, res) {
  res.render('index', {
    username: 'Default'
  });
});

app.get('/user1', function(req, res) {
  res.render('index', {
    username: 'User One'
  });
});

app.get('/user2', function(req, res) {
  res.render('index', {
    username: 'User Two'
  });
});

app.get('/user3', function(req, res) {
  res.render('index', {
    username: 'User Three'
  });
});

//  Start Server
app.listen(3000, function() {
  console.log('Chat app listening on port 3000!')
})

// Settings for Mqtt -------------------------------------------------------------------
settings = {
  type: 'mqtt',
  json: false,
  mqtt: require('mqtt'),
  host: '127.0.0.1',
  port: 1883
};
ascoltatori.build(settings, function(ascoltatore) {});

// Declare and Start Mqtt Server  -------------------------------------------------------------------
var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}
