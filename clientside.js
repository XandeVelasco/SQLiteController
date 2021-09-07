const { Server } = require("socket.io");

const
    io = require("socket.io-client"),
    socket = io.connect("http://localhost:3000");

//ioClient.on("seq-num", (msg) => console.info(msg));
var AccountUser = {
    address: 'xande2@xande5',
    password: '123465653'
  }


  socket.emit('Login', AccountUser);
  console.log('enviando');
  
  socket.on('LoginStats', (data) => {
    console.log(data);
  });
