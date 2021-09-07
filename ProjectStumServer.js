const express = require('express');
var http = require('http').Server(express);
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
var dbfunctions = require('./src/controllers/connection.js');
//config log4js
const log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
const logger = log4js.getLogger("cheese");
logger.level = "debug";
const server = express()
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  // .use(require('./src/router/usersdb.routes'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

//Global variables
var posdefault = ["0", "0", "0"];
var users = [];//id
//Sockets

io.on('connection', function (socket) {
  users.push(socket.id);

  for (var b = 0; b < users.length; b++) {
    var IdPLayer = {
      id: users[b]
    };
  };

  var CurrentPlayer = {
    nameID: IdPLayer.id,
    position: posdefault
  };


  socket.broadcast.emit('SpawnPlayers', CurrentPlayer);

  socket.on('Join', (data) => {
    for (var i = 0; i < users.length; i++) {
      var PlayersConnecteds = {
        name: users[i].name,
        position: users[i].position,
      };
      socket.emit('other player connected', PlayersConnecteds);
      console.log(CurrentPlayer.name + ' emit: other player connected: ' + JSON.stringify(playerConnected));
    };
  });



  socket.on('MovePos', function (data) {

    var PlayerPosition = {
      ID: CurrentPlayer.nameID,
      POSITION: data.position
    }
    socket.broadcast.emit('Moveposition', PlayerPosition);

    console.log(PlayerPosition);
  });


  //Account
  socket.on('Register', (data) => {
    var AccountUser = {
      address: data.address,
      password: data.password
    }
      dbfunctions.Register(AccountUser.address, AccountUser.password, function(err, row){ 
        if (err) {
          console.log(err);
        } else {
          console.log("Fail");
        }
      }); 
  });

  socket.on('Login', (data) => {
    var AccountUser = {
      address: data.address,
      password: data.password
    }
    function returnLoginStats() {
      dbfunctions.getUser(AccountUser.address, AccountUser.password, 
        (call) => {
        console.log(call);
        socket.emit('LoginStats',call);
      });
    };
    returnLoginStats();
  });

});




