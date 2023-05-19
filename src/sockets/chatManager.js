// Chat MAnager  
//  in Back-End

const { chatModel } = require("../dao/db/model/chat.model");

const chatLimit= 10  //Quantity of recovered messages from the chatDB

let messageLogs = [];

function chatManager(io, socket) {
  async function newUser(data) {
    // received by new user
    messageLogs= await chatModel.find().sort({'createdAt': -1}).limit(chatLimit)
    messageLogs.reverse()
    socket.emit("chat-started", messageLogs);
    // receiver by all except new user
    socket.broadcast.emit("user-logged-in", data);
  }

  async function newMessage(data) {
    messageLogs.push(data);
    await chatModel.create(data)

    /** This event will be received by every socket */
    io.emit("message-received", data);
  }

  socket.on("new-user", newUser);
  socket.on("new-message", newMessage);
}

module.exports = chatManager