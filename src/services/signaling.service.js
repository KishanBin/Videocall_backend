
const { Users, Sockets } = require("../../config/tempStorage");

async function register_user({phone}, socket) {

    const isExist = await Users.findOne({ phone: to });


    if (!isExist) {

        Sockets.set(socket.id, socket);

        await Users.Create({
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

    //     await Users.updateOne(
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

async function forwardOffer({ from, to, offer }) {

    const user = await Users.findOne({ phone: to });

    const targetSocket = Sockets.get(user.socketId);

    if (targetSocket) {

        targetSocket.send(JSON.stringify({
            type: "offer",
            from: from,
            offer: offer,
        }));

        console.log(`offer send ${from} to ${to}`);
    }
}

async function forwardAnswer({ from, to, answer}) {

    const user = await Users.findOne({ phone: to });


    const targetSocket = Sockets.get(user.socketId);

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "answer",
            from: from,
            answer: answer,
        }));

        console.log(`answer send ${from} to ${to}`);
    }
}

async function forwardICE({ from, to, ice_candidate}) {

    const user = await Users.findOne({ phone: to });

    const targetSocket = Sockets.get(user.socketId);

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "candidate",
            from: from,
            ice: ice_candidate,
        }));

        console.log(`ice_candidate send ${from} to ${to}`);
    }
}

function deleteUser(socketId){
   Users.deleteOne({socketId: socketId});
   Sockets.deleteOne({socketId: socketId});
}

// async function userOnline(phone) {
//     Users.updateOne({ phone }, { isOnline: true });
// }

module.exports = { register_user, forwardOffer, forwardAnswer, forwardICE, deleteUser };