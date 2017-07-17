const express = require('express') // Express framework for node js
const mosca = require('mosca'); // Mosca mqtt server
const ascoltatori = require('ascoltatori'); //----
const bodyParser = require('body-parser');
const path = require('path'); // Path module for paths
const app = express() // Init App

var mymqtt = require('mqtt');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// DEFAULT USER ------------------------------------------------------------------------
app.get('/', function(req, res) {
  res.render('index', {
    username: 'Default_'+ parseInt(Math.random() * 100, 10),
    myMqttfunction : mymqtt
  });
});

// Update User List  ----------------------------------------------------------------------------
app.get('/getUsers', function(req, res) {
  res.json('This is my answer');
});

// Create User   ----------------------------------------------------------------------------
app.get('/CreateUser', function(req, res) {
  var client  = mymqtt.connect('mqtt://localhost');
  res.set('Content-Type', 'application/javascript');
});

//  Start Server ----------------------------------------------------------------------------
app.listen(3000, function() {})

// Settings for Mqtt -------------------------------------------------------------------
settings = {
  type: 'mqtt',
  //json: false,
  mqtt: require('mqtt'),
  host: '127.0.0.1',
  port: 1883,
  http: {
    port: 80,
    bundle: true,
    static: './'
  }
};
ascoltatori.build(settings, function(ascoltatore) {});

// Declare and Start Mqtt Server  -------------------------------------------------------------------
var server = new mosca.Server(settings);

// fired when a message is published
server.on('published', function(packet, client) {
  console.log('Published', packet.payload.toString());
});
// fired when a client connects
server.on('clientConnected', function(client) {
  console.log('Client Connected:', client.id);

});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
//  console.log('Client Disconnected:', client.id);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {}
