// app config
require('dotenv').config()
const express = require('express')
const { urlencoded } = require('body-parser')
const app = express()
const cors = require('cors')
const path = require('path')
const http = require('http')

const server = http.createServer(app)

// db config
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.once('open', () => infoLog('SUCCESS: CONNECTED TO DB'))
db.on('error', () => errorLog("ERROR: Can't connect to DB"))
app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(express.json())

// routes
const medRoutes = require('./routes/meds')
const pharmacistsRoutes = require('./routes/pharmacist')
const storeRoutes = require('./routes/stores')
const cutsomerRoutes = require('./routes/customers')
const transactionRoutes = require('./routes/transactions')
const { infoLog, errorLog } = require('./util/logs')
app.use('/medicines', medRoutes)
app.use('/pharmacists', pharmacistsRoutes)
app.use('/customers', cutsomerRoutes)
app.use('/stores', storeRoutes)
app.use('/transactions', transactionRoutes)

// Set EJS as the View Engine
app.use(express.static(path.join(__dirname, 'email')))

// Set 'views' directory for any views
// being rendered res.render()
app.set('views', path.join(__dirname, 'email'))

// Set view engine as EJS
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

const { Server } = require('socket.io')
const socket = require('./socket')
const { notificationJob } = require('./services/medicines.service')
const io = new Server(server, {
  cors: { origin: '*' }
})

notificationJob.start()
// io.on('connection', function (socket) {
//   console.log('A user connected')

//   //Whenever someone disconnects this piece of code executed
//   socket.on('message', function (message) {
//     console.log('He said: ' + message)
//   })
//   socket.on('disconnect', function () {
//     console.log('A user disconnected')
//   })
// })
socket(io)
// SERVER
server.listen(process.env.PORT, () =>
  infoLog(`App listening on port ${process.env.PORT}!`)
)
// app.listen(process.env.PORT, () =>
//   infoLog(`App listening on port ${process.env.PORT}!`)
// )
