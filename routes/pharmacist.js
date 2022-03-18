const express = require('express')
const Pharmacists = require('../models/pharmacists')
const pharmacistsRoutes = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')
const Stores = require('../models/stores')
const { infoLog } = require('../util/logs')
const {
  loginController,
  getPharmacists,
  addPharmacist,
  getPharmacist,
  deletePharmacist,
  updatePharmacist
} = require('../controllers/pharmacists')
// const mongoose = require('mongoose')

// POST /login
pharmacistsRoutes.post('/login', loginController)

// GET /pharmacists
pharmacistsRoutes.get('/', auth, getPharmacists)

// POST /pharmacist
pharmacistsRoutes.post('/', addPharmacist)

// GET pharmacist/:id
pharmacistsRoutes.get('/:id', auth, getPharmacist)

// DELETE pharmacist/:id
pharmacistsRoutes.delete('/:id', auth, deletePharmacist)

// PUT pharmacist/:id
pharmacistsRoutes.put('/:id', updatePharmacist)

module.exports = pharmacistsRoutes
