const mongoose = require('mongoose')

const storesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'pharmacists'
  },
  address: {
    city: {
      type: String
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    landmark: {
      type: String
    }
  },
  phoneNumber: {
    type: String
  }
})

module.exports = mongoose.model('Stores', storesSchema)
