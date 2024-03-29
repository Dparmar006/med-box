const jwt = require('jsonwebtoken')
const {
  TOKEN_NOT_FOUND,
  UNAUTHORIZED_ACCESS
} = require('../constants/messages')
const { getPharmacistsStore } = require('../services/store.service')
const { getPharmacist } = require('../services/pharmacists.service')
const { errorLog } = require('../util/logs')

const verifyToken = async (req, res, next) => {
  let token = null
  token = req.body.token || req.headers['x-access-token']

  if (!token) {
    if (!req.headers['authorization']) {
      return res.status(401).json(TOKEN_NOT_FOUND)
    }
    token = req.headers['authorization'].substring(
      req.headers['authorization'].indexOf(' ') + 1
    )
  }

  if (!token) {
    return res.status(403).json(UNAUTHORIZED_ACCESS)
  }

  try {
    const decoded =  jwt.verify(token, process.env.TOKEN_KEY)
    const pharmacist = await getPharmacist({ _id: decoded.pharmacistId })
    req.pharmacist = pharmacist
    const store = await getPharmacistsStore({
      ownerId: decoded.pharmacistId
    })
    req.store = store 
  } catch (err) {
    console.log(err)
    errorLog("Authentication error: " , err)
    return res.status(401).json(UNAUTHORIZED_ACCESS)
  }

  return next()
}

module.exports = verifyToken
