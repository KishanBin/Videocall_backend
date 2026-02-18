
const { Users, Sockets } = require("../../config/tempStorage");

 function register_user({ phone }, socket) {

    const isExist =  Users.get(phone);


    if (!isExist) {

        Sockets.set(socket.id, { socket: socket, phone: phone });

         Users.set(phone, {
            phone: phone,
            socketId: socket.id,  //connection gets the socket it 
        });

        socket.send(JSON.stringify({
            type: "registered",
            message: "User Register Succesfully!"
        }));

        console.log("Registered:", Users.get(phone));
    }
    // else {

    //      Users.updateOne(
    //         { isOnline: true},          // find condition
    //         { socketId: socket.id }   // fields to update
    //     );

    //     socket.send(JSON.stringify({
    //         type: "registered",
    //         message: "socket id updated"
    //     }));
    // }
    return;
}

 function forwardOffer({ from, to, offer }) {

    const user =  Users.get(to);

    const targetSocket = Sockets.get(user.socketId).socket;

    if (targetSocket) {

        targetSocket.send(JSON.stringify({
            type: "offer",
            from: from,
            offer: offer,
        }));

        console.log(`offer sent ${from} to ${to}`);
    }
}

 function forwardAnswer({ from, to, answer }) {

    const user =  Users.get(to);


    const targetSocket = Sockets.get(user.socketId).socket;

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "answer",
            from: from,
            answer: answer,
        }));

        console.log(`answer sent ${from} to ${to}`);
    }
}

 function forwardICE({ from, to, ice_candidate }) {

    const user =  Users.get(to);

    const targetSocket = Sockets.get(user.socketId).socket;

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "candidate",
            from: from,
            ice: ice_candidate,
        }));

        console.log(`ice_candidate send ${from} to ${to}`);
    }
}

 function deleteUser(socketId) {
    
    const socketData =  Sockets.get(socketId);

    if(!socketData) return;

    const { phone } = socketData;
     
     Users.delete(phone);
    Sockets.delete(socketId);

    
}

//  function userOnline(phone) {
//     Users.updateOne({ phone }, { isOnline: true });
// }

module.exports = { register_user, forwardOffer, forwardAnswer, forwardICE, deleteUser };