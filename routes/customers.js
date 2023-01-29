const express = require('express')
const cutsomerRoutes = express.Router()
const auth = require('../middlewares/auth')
const { getCustomers } = require('../controllers/cutsomers')

// GET customers
cutsomerRoutes.get('/', auth, getCustomers)

module.exports = cutsomerRoutes
