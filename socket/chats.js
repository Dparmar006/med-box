const { SEND_MESSAGE, RECIEVE_MESSAGE } = require('../constants')

module.exports = function (io, socket) {
  socket.on(SEND_MESSAGE, function (message) {
    socket.broadcast.emit(RECIEVE_MESSAGE, message)
  })
}
