const Server  =require("socket.io")
const chatManager  = require("./chatManager.js")

class SocketServer {
  static instance = null

  static getInstance() {
    if (!SocketServer.instance) {
      throw new Error("Ërror instanciando el socket Server")
    }

    return SocketServer.instance;
  }

  static createSocketServer(expressApplication) {
    SocketServer.instance = new Server(expressApplication)

    SocketServer.instance.on("connection", async (socket) => {
      console.log(`Socket Connected: ${socket.id}`)

      socket.on("disconnect", (reason) => {
        console.log(`Socket Disonnected: ${socket.id}; ${reason}`)
      });

      chatManager(SocketServer.instance, socket)
    });

    return SocketServer.instance;
  }
}

module.exports = SocketServer