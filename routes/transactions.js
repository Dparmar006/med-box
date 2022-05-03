const express = require('express')
const transactionRoutes = express.Router()
const auth = require('../middlewares/auth')
const {
  getTransactions,
  getTransaction,
  addTransaction,
  updateMedicine,
  deleteTransaction
} = require('../controllers/transactions')

// GET meds
transactionRoutes.get('/', auth, getTransactions)

// GET med/:id
transactionRoutes.route('/:id').get(auth, getTransaction)

// POST med
transactionRoutes.route('/').post(auth, addTransaction)

// PUT med
transactionRoutes.route('/:id').put(auth, updateMedicine)

// DEL med
transactionRoutes.route('/:id').delete(auth, deleteTransaction)

module.exports = transactionRoutes
