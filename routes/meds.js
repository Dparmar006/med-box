const express = require('express')
const medRoutes = express.Router()
const Medicines = require('../models/meds')
const auth = require('../middlewares/auth')
// GET meds
medRoutes.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicines.find()
    res.status(200).json({ totalMedicines: medicines.length, medicines })
  } catch (error) {
    res.status(500).json({ success: false, msg: error })
  }
})

// GET med/:id
medRoutes.get('/:id', [auth, getMedicine], async (req, res) => {
  res.json({ success: true, medicine: res.medicine })
})

// POST med
medRoutes.post('/', auth, async (req, res) => {
  const medicine = new Medicines({
    brandName: req.body.brandName,
    name: req.body.name,
    unit: req.body.unit,
    price: req.body.price,
    expDate: req.body.expDate,
    mfgDate: req.body.mfgDate,
    disease: req.body.disease,
    quantityAvailabe: req.body.quantityAvailabe,
    quantityImported: req.body.quantityImported
  })

  try {
    const newMed = await medicine.save()
    res
      .status(201)
      .json({ success: true, medicine: newMed, msg: 'Medicine added.' })
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message })
  }
})

// PUT med
medRoutes.put('/:id', [auth, getMedicine], async (req, res) => {
  if (req.body.brandName != null) {
    res.medicine.brandName = req.body.brandName
  }
  if (req.body.name != null) {
    res.medicine.name = req.body.name
  }
  if (req.body.unit != null) {
    res.medicine.unit = req.body.unit
  }
  if (req.body.price != null) {
    res.medicine.price = req.body.price
  }
  if (req.body.mfgDate != null) {
    res.medicine.mfgDate = req.body.mfgDate
  }
  if (req.body.expDate != null) {
    res.medicine.expDate = req.body.expDate
  }
  if (req.body.disease != null) {
    res.medicine.disease = req.body.disease
  }
  if (req.body.quantityAvailabe != null) {
    res.medicine.quantityAvailabe = req.body.quantityAvailabe
  }
  if (req.body.quantityImported != null) {
    res.medicine.quantityImported = req.body.quantityImported
  }

  try {
    const updatedMed = await res.medicine.save()
    res.json({
      success: true,
      medicine: updatedMed,
      msg: 'Medicine updated successfully.'
    })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
})

// DEL med
medRoutes.delete('/:id', [auth, getMedicine], async (req, res) => {
  try {
    await res.medicine.remove()
    res.json({ success: true, msg: 'Medicine deleted' })
  } catch (error) {
    res.status(500).json({ success: false, msg: error })
  }
})

// middlewere
async function getMedicine (req, res, next) {
  let medicine
  try {
    medicine = await Medicines.findById(req.params.id)
    if (medicine == null) {
      return res
        .status(404)
        .json({ success: false, msg: 'Cannot find this medicine' })
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error })
  }
  res.medicine = medicine
  next()
}

module.exports = medRoutes
