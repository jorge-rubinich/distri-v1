const messageLogs = [];

function chatManager(io, socket) {
  function newUser(data) {
    // received by new user
    socket.emit("chat-started", messageLogs);
    // receiver by all except new user
    socket.broadcast.emit("user-logged-in", data);
  }

  function newMessage(data) {
    messageLogs.push(data);
    /** This event will be received by every socket */
    io.emit("message-received", data);
  }

  socket.on("new-user", newUser);
  socket.on("new-message", newMessage);
}

module.exports = chatManager