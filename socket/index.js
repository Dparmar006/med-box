const chats = require('./chats')

module.exports = io => {
  io.on('connection', socket => {
    chats(io, socket)
    console.log('SOCKET CONNECTED', socket.id)
  })
}
