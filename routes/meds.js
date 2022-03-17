const express = require('express')
const medRoutes = express.Router()
const auth = require('../middlewares/auth')
const {
  getMedicines,
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine
} = require('../controllers/meds')

// GET meds
medRoutes.get('/', auth, getMedicines)

// GET med/:id
medRoutes.route('/:id').get(auth, getMedicine)

// POST med
medRoutes.route('/').post(auth, addMedicine)

// PUT med
medRoutes.route('/:id').put(auth, updateMedicine)

// DEL med
medRoutes.route('/:id').delete(auth, deleteMedicine)

module.exports = medRoutes
