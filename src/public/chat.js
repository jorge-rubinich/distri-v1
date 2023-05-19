// chat.js
//  in front-End

console.log('Socket')
const socket = io()
let user
let chatbox = document.querySelector('#chatbox')
let messageLog = document.querySelector('#messageLog')

// get the session.user to use the username in the chat
fetch('/api/session/datos-sesion')
  .then(response => response.json())
  .then(data => {
    // Access data session in the client and 
    // use email as the username
    user = data.userSession.email 
    socket.emit('new-user', user)
  })
  .catch(error => {
    console.log('Error:', error);
  });

chatbox.addEventListener('keyup', evt => {
    if (evt.key==='Enter') {
        if (chatbox.value.trim().length>0) {
            socket.emit('new-message', {
                user, message: chatbox.value
            })
            chatbox.value=''
        }
    }
})

socket.on("chat-started", (msgHistory) => {
    msgLog= ""
    console.log(msgHistory)
    msgHistory.forEach(message => { 
        msgLog += `
        <li>
          ${(message.user===user)? ".........":""}
          <strong>${message.user} dice</strong>: ${message.message}
        </li>
        `
    });

    messageLog.innerHTML = msgLog
  })

socket.on("message-received", (data) => {
    const { user, message } = data
    messageLog.innerHTML += `
    <li>
      <strong>${user} dice</strong>: ${message}
    </li>
    `
  })

  socket.on("user-logged-in", (data) => {
    Swal.fire({
      text: `${data.user} se ha unido al chat!`,
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      position: "bottom-left",
    })
  })
