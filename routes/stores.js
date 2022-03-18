const express = require('express')
const storeRoutes = express.Router()
const auth = require('../middlewares/auth')
const {
  getStores,
  getStore,
  addStore,
  updateStore,
  deleteStore
} = require('../controllers/stores')

// GET stores OR get pharmacist's store
storeRoutes.get('/', auth, getStores)

// GET store/:id
storeRoutes.get('/:id', auth, getStore)

// POST store
storeRoutes.post('/', auth, addStore)

// PUT store
storeRoutes.put('/:id', auth, updateStore)

// DEL store
storeRoutes.delete('/:id', auth, deleteStore)

module.exports = storeRoutes
