const WebSocket = require("ws");
const services = require("../services/signaling.service");
const { randomUUID } = require("crypto");

function setupWebsocket(server) {

  const wss = new WebSocket.Server({ server });

  wss.on('connection', (socket) => {

    console.log("Client connected via WebSocket");
    socket.id = randomUUID();

    //send response to the client
    socket.send(JSON.stringify({
      type: "connected",
      message: "Websocket Connected Successfully!"
    }));

    socket.on('message', (data) => {

      const userData = JSON.parse(data.toString());

      // console.log(userData['type']);
      // console.log(socket);

      //Update inOnline when user comes online
      // services.userOnline(userData.phone);

      //  register the user 
      if (userData['type'] === "register") {

        services.register_user({phone: userData.phone }, socket);

      } else if (userData['type'] === "offer") {

        services.forwardOffer({from: userData.from , to: userData.to, offer: userData.offer});
        
      } else if (userData['type'] === "answer"){

        services.forwardAnswer({from: userData.from , to: userData.to, answer: userData.answer});

      }else if (userData['type'] === "ice"){

        services.forwardICE({from: userData.from , to: userData.to, ice_candidate: userData.ice_candidate});

      }

    });

    socket.on('close', () => {
      console.log('Client disconnected');
      console.log('Disconnected socket id:', socket.id);
      services.deleteUser(socket.id);
      activeSocket = null;
     
    });

  });


}

module.exports = setupWebsocket;