
const pharmacists = require('../models/pharmacists')
const { errorLog } = require('../util/logs')

module.exports.getPharmacist = async (
  condition,
  projection = { __v: 0, numberOfMedicalStores: 0 }
) => {
  try {
    return await pharmacists.findOne(condition, projection)
  } catch (error) {
    errorLog('Error occured while retriving user.' + error)
  }
}
