const Medicines = require('../models/meds')
const mongoose = require('mongoose')
const { infoLog, errorLog } = require('../util/logs')
const {
  DATA_RETRIVED_SUCCESSFULLY,
  SERVER_ERROR,
  RESOURCE_NOT_FOUND,
  RECORD_CREATED,
  RECORD_UPDATED,
  RECORD_DELETED
} = require('../constants/messages')
const { USER_TYPES } = require('../constants/userTypes')

// GET meds
const getMedicines = async (req, res) => {
  try {

    if(req.pharmacist.role == USER_TYPES.PHARMACIST){
      if (!mongoose.isValidObjectId(req.store._id)) {
        return res.status(400).json({
          success: false,
          msg:
            'Please pass the valid storeId or remove body to retrive all stores.'
        })
      }
      const medicines = await Medicines.find({
        storeId: req.store._id
      })
      infoLog('Medicines for pharmacist retrived.')
      return res.status(200).json({
        totalMedicines: medicines.length,
        ...DATA_RETRIVED_SUCCESSFULLY,
        medicines
      })
    }
 

    const medicines = await Medicines.find()
    infoLog('All medicines retrived.')
    res.status(200).json({
      totalMedicines: medicines.length,
      ...DATA_RETRIVED_SUCCESSFULLY,
      medicines
    })
  } catch (error) {
    res.status(500).json({ error: error, ...SERVER_ERROR })
  }
}
// GET med
const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicines.findById(req.params.id)
    if (!medicine) {
      errorLog('Medicine not found.')
      return res.status(404).json(RESOURCE_NOT_FOUND)
    }
    infoLog('Medicine found.')
    return res.status(200).json({ ...DATA_RETRIVED_SUCCESSFULLY, medicine })
  } catch (error) {
    errorLog('Server error while retriving medicine.')
    return res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// POST med
const addMedicine = async (req, res) => {
  const medicine = new Medicines({
    brandName: req.body.brandName,
    name: req.body.name,
    unit: req.body.unit,
    price: req.body.price,
    expDate: req.body.expDate,
    mfgDate: req.body.mfgDate,
    disease: req.body.disease,
    quantityAvailabe: req.body.quantityAvailabe,
    quantityImported: req.body.quantityImported,
    storeId: req.body.storeId
  })
  try {
    let cookingMeds = []
    req.body.map(med => {
      cookingMeds.push(
        new Medicines({
          brandName: med.brandName,
          name: med.name,
          unit: med.unit,
          price: med.price,
          expDate: med.expDate,
          mfgDate: med.mfgDate,
          disease: med.disease,
          quantityAvailable: med.quantityAvailable,
          quantityImported: med.quantityImported,
          storeId: med.storeId
        })
      )
    })
    const response = await Medicines.insertMany(cookingMeds, {
      ordered: true
    })
    // const newMed = await medicine.save()
    infoLog('Medicine added.')
    res.status(201).json({
      medicines: response,
      ...RECORD_CREATED,
      msg: `${response.length || 0} Medicines added.`
    })
  } catch (error) {
    errorLog('Error occured while creating medicine.' + error)
    res.status(400).json({ error, ...SERVER_ERROR })
  }
}
// PUT med
const updateMedicine = async (req, res) => {
  try {
    const updatedMed = await Medicines.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    infoLog('Medicine updated.')
    res.json({
      medicine: updatedMed,
      ...RECORD_UPDATED,
      msg: 'Medicine updated successfully.'
    })
  } catch (error) {
    errorLog('Error occured while updating medicine.')
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// DELETE med
const deleteMedicine = async (req, res) => {
  try {
    await Medicines.findByIdAndDelete(req.params.id)
    infoLog('Medicine deleted.')
    res.status(202).json(RECORD_DELETED)
  } catch (error) {
    errorLog('Error occured while deleting medicine.')
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}

module.exports = {
  getMedicine,
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine
}
