const Transactions = require('../models/transactions')
const Medicines = require('../models/meds')
const mongoose = require('mongoose')
const { infoLog, errorLog } = require('../util/logs')
const {
  DATA_RETRIVED_SUCCESSFULLY,
  SERVER_ERROR,
  RESOURCE_NOT_FOUND,
  RECORD_CREATED,
  RECORD_UPDATED,
  RECORD_DELETED,
  BAD_REQUEST
} = require('../constants/messages')

// POST meds
const getTransactions = async (req, res) => {
  try {
    const { storeId } = req.body
    if (storeId) {
      if (!mongoose.isValidObjectId(storeId)) {
        return res.status(400).json({
          success: false,
          msg:
            'Please pass the valid storeId or remove body to retrive all stores.'
        })
      }
      const transactions = await Transactions.find({
        storeId: mongoose.Types.ObjectId(storeId)
      }).sort({ createdAt: -1 })
      infoLog('Transactions for store retrived.')
      return res.status(200).json({
        totalTransactions: transactions.length,
        transactions,
        ...DATA_RETRIVED_SUCCESSFULLY
      })
    }

    const transactions = await Transactions.find().sort({ createdAt: -1 })
    infoLog('All transactions retrived.')
    res.status(200).json({
      totalTransactions: transactions.length,
      transactions,
      ...DATA_RETRIVED_SUCCESSFULLY
    })
  } catch (error) {
    res.status(500).json({ error: error, ...SERVER_ERROR })
  }
}
// GET med
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.findById(req.params.id)
    if (!transaction) {
      errorLog('Transaction not found.')
      return res.status(404).json(RESOURCE_NOT_FOUND)
    }
    infoLog('Transaction found.')
    return res.status(200).json({ ...DATA_RETRIVED_SUCCESSFULLY, transaction })
  } catch (error) {
    errorLog('Server error while retriving transaction.')
    return res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// POST med
const addTransaction = async (req, res) => {
  try {
    let medicines = req.body.medicines
    let total = 0
    if (medicines && medicines.length > 0) {
      medicines.map(med => {
        total = med.price * med.quantity + total
        Medicines.findByIdAndUpdate(med.medicineId, {
          $inc: { quantityAvailabe: med.quantity * -1 }
        }).exec()
      })
    } else {
      return res.status(400).json({ ...BAD_REQUEST })
    }

    const transaction = new Transactions({
      customerName: req.body.name,
      customerEmail: req.body.email,
      pharmacistId: req.pharmacist.pharmacistId,
      storeId: req.body.storeId,
      customerPhone: req.body.phone,
      total: total,
      medicines
    })

    const transactions = await transaction.save()
    // const newMed = await transaction.save()
    infoLog('Transaction added.')
    res.status(201).json({
      transactions,
      ...RECORD_CREATED,
      msg: `${transactions?.length} Transactions added.`
    })
  } catch (error) {
    errorLog('Error occured while creating transaction.')
    res.status(400).json({ error, ...SERVER_ERROR })
  }
}
// PUT med
const updateMedicine = async (req, res) => {
  try {
    const updatedMed = await Transactions.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    infoLog('Transaction updated.')
    res.json({
      transaction: updatedMed,
      ...RECORD_UPDATED,
      msg: 'Transaction updated successfully.'
    })
  } catch (error) {
    errorLog('Error occured while updating transaction.')
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// DELETE med
const deleteTransaction = async (req, res) => {
  try {
    await Transactions.findByIdAndDelete(req.params.id)
    infoLog('Transaction deleted.')
    res.status(202).json(RECORD_DELETED)
  } catch (error) {
    errorLog('Error occured while deleting transaction.')
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}

module.exports = {
  getTransaction,
  getTransactions,
  addTransaction,
  updateMedicine,
  deleteTransaction
}
