const mongoose = require('mongoose')
const { USER_TYPES } = require('../constants/userTypes')

const pharmacistsSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    numberOfMedicalStores: {
      type: Number,
      default: 1
    },
    createdAt: { type: Date, default: Date.now },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      unique: true
    },
    token: {
      type: String
    },
    role: {
      type: Number,
      default: USER_TYPES.PHARMACIST,
      required: true
    }
  },
  { collection: 'pharmacists' }
)

module.exports = mongoose.model('Pharmacists', pharmacistsSchema)
