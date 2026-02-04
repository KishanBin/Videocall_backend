const WebSocket = require("ws");
const services = require("../services/signaling.service");


function setupWebsocket(server) {

  const wss = new WebSocket.Server({ server });

  wss.on('connection', (socket) => {

    console.log("Client connected via WebSocket");

    //send response to the client
    socket.send(JSON.stringify({
      type: "connected",
      message: "Websocket Connected Successfully!"
    }));

    socket.on('message', (data) => {

      const userData = JSON.parse(data.toString());

      console.log(userData['type']);
      console.log(userData);

      //Update inOnline when user comes online
      services.userOnline(userData.phone);

      //  register the user 
      if (data.type === "register") {

        services.register_user({ username: userData.username, phone: userData.phone }, socket);

      } else if (data.type === "offer") {

        services.forwardOffer({from: userData.from , to: userData.to, offer: userData.offer},socket);
        
      }

    });

    socket.on('close', () => {
      console.log('Client disconnected');
      activeSocket = null;
    });

  });


}

module.exports = setupWebsocket;