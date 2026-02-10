
const User = require("../models/user.model");


async function register_user({phone}, socket) {

    const isExist = User.findOne({ phone: phone });

    if (!isExist) {
        await User.Create({
            phone: phone,
            socketId: socket.id,  //connection gets the socket it 
        });

        socket.send(JSON.stringify({
            type: "registered",
            message: "User Register Succesfully!"
        }));

        console.log("Registered:", users.get(phone));
    } 
    // else {

    //     await User.updateOne(
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

    user = User.findOne({ phone: to});

    targetSocket = user.socketId

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "offer",
            from: from,
            offer: offer,
        }));
    }
}

function forwardAnswer({ from, to, answer}) {

    user = User.findOne({ phone: to});

    targetSocket = user.socketId

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "answer",
            from: from,
            answer: answer,
        }));
    }
}

function forwardICE({ from, to, ice_candidate}) {

    user = User.findOne({ phone: to});

    targetSocket = user.socketId

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "ICE",
            from: from,
            ice: ice_candidate,
        }));
    }
}

function deleteUser(socketId){
   User.deleteOne({socketId: socketId});
}

async function userOnline(phone) {
    User.updateOne({ phone }, { isOnline: true });
}

module.exports = { register_user, userOnline, forwardOffer, forwardAnswer, forwardICE, deleteUser };