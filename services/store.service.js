const { USER_TYPES } = require('../constants/userTypes')
const pharmacists = require('../models/pharmacists')
const stores = require('../models/stores')
const { errorLog } = require('../util/logs')

module.exports.getPharmacistsStore = async (
  condition,
  projection = { ownerId: false, __v: false }
) => {
  try {
    return await stores.findOne(
        condition,
        projection
      )
  } catch (error) {
    errorLog('Error occured while retriving store of a user.' + error)
  }
}

module.exports.getAllStores = async (condition,
  projection = { ownerId: false, __v: false }
) => {
  try {
    return await stores.find(
        condition,
        projection
      )
  } catch (error) {
    errorLog('Error occured while retriving all store.' + error)
  }
}
