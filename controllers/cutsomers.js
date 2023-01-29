const Medicines = require('../models/meds')
const mongoose = require('mongoose')
const { infoLog, errorLog } = require('../util/logs')
const {
  DATA_RETRIVED_SUCCESSFULLY,
  SERVER_ERROR
} = require('../constants/messages')
const pharmacists = require('../models/pharmacists')
const { USER_TYPES } = require('../constants/userTypes')

// GET customers
const getCustomers = async (req, res) => {
  try {
    const customers = await pharmacists.find(
      { role: USER_TYPES.CUSTOMER },
      { __v: 0, numberOfMedicalStores: 0 }
    )

    infoLog('All customers retrived.')
    res.status(200).json({
      ...DATA_RETRIVED_SUCCESSFULLY,
      totalCustomers: customers.length,
      customers
    })
  } catch (error) {
    res.status(500).json({ error: error, ...SERVER_ERROR })
  }
}

module.exports = {
  getCustomers
}
