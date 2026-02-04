
const User = require("../models/user.model");


async function register_user({ username, phone }, socket) {

    const isExist = User.findOne({ phone: phone });

    if (!isExist) {
        await User.Create({
            username: username,
            phone: phone,
            socketId: socket.id,  //connection gets the socket it 
            isOnline: true,
        });

        socket.send(JSON.stringify({
            type: "registered",
            message: "User Register Succesfully!"
        }));

        // console.log("Registered:", users.get(phone));
    } else {

        await User.updateOne(
            { phone: phone},          // find condition
            { socketId: socket.id }   // fields to update
        );

        socket.send(JSON.stringify({
            type: "registered",
            message: "socket id updated"
        }));
    }
    return;
}

function forwardOffer({ from, to, offer }) {

    user = User.findOne({ phone: to });

    targetSocket = user.socketId

    if (targetSocket) {
        targetSocket.send(JSON.stringify({
            type: "offer",
            from: from,
            offer: offer,
        }));
    }
}

async function userOnline(phone) {
    User.updateOne({ phone }, { isOnline: true });
}

module.exports = { register_user, userOnline, forwardOffer };