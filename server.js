// app config
const express = require('express')
const { urlencoded } = require('body-parser')
const app = express()
require('dotenv').config()
const cors = require('cors')
const ejs = require('ejs')

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
const { infoLog, errorLog } = require('./util/logs')
const transactionRoutes = require('./routes/transactions')
const sendInvoiceToCustomer = require('./email/invoice')
const path = require('path')
app.use('/medicines', medRoutes)
app.use('/pharmacists', pharmacistsRoutes)
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

const templateData = {
  customer: {
    name: 'Archie'
  },
  store: {
    address: 'Xyz street'
  },
  order: {
    number: 12
  }
}

app.get('/send-mail', (req, res) => {
  sendInvoiceToCustomer()
  res.send('Done')
})
// SERVER
app.listen(process.env.PORT, () =>
  infoLog(`App listening on port ${process.env.PORT}!`)
)
