const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String
  },
  pharmacistId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'pharmacists'
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'stores'
  },
  customerPhone: {
    type: String
  },
  medicines: {
    type: [
      {
        medicineId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number,
        description: String
      }
    ],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number
  }
})

module.exports = mongoose.model('Transactions', transactionSchema)
