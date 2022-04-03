const mongoose = require('mongoose')

const medsSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    price: Number,
    unit: String,
    mfgDate: { type: Date, default: null },
    expDate: { type: Date, default: null },
    disease: [String],
    quantityAvailabe: Number,
    quantityImported: Number,
    quantityThreshhold: { type: Number, required: true, default: 20 },
    dateThreshhold: {
      type: Number,
      default: 20
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  { collection: 'medicines' }
)

module.exports = mongoose.model('Medicines', medsSchema)
