const mongoose = require('mongoose')
const Stores = require('../models/stores')
const {
  BAD_REQUEST,
  DATA_RETRIVED_SUCCESSFULLY,
  SERVER_ERROR,
  RECORD_CREATED,
  RECORD_DELETED
} = require('../constants/messages')
const { infoLog, errorLog } = require('../util/logs')

const getStores = async (req, res) => {
  const { pharmacistId } = req.body
  try {
    if (pharmacistId) {
      if (!mongoose.isValidObjectId(pharmacistId)) {
        return res.status(400).json(BAD_REQUEST)
      }
      const stores = await Stores.find({
        ownerId: mongoose.Types.ObjectId(pharmacistId)
      })
      infoLog('Stores retrived.')
      return res.status(200).json({
        totalStores: stores.length,
        ...DATA_RETRIVED_SUCCESSFULLY,
        stores
      })
    }
    const stores = await Stores.find()
    infoLog('Stores retrived.')
    res.status(200).json({
      totalStores: stores.length,
      ...DATA_RETRIVED_SUCCESSFULLY,
      stores: stores
    })
  } catch (error) {
    errorLog(error.message)
    res.status(500).json({ error: error.message, ...SERVER_ERROR })
  }
}

const getStore = async (req, res) => {
  try {
    const store = await Stores.findById(req.params.id)
    if (!store) {
      errorLog('Store not found.')
      return res.status(404).json(RESOURCE_NOT_FOUND)
    }
    infoLog('Store found.')
    return res.status(200).json({ ...DATA_RETRIVED_SUCCESSFULLY, store })
  } catch (error) {
    errorLog(error.message)
    return res.status(500).json({ error, ...SERVER_ERROR })
  }
}

const addStore = async (req, res) => {
  let address = {
    city: req.body.city,
    landmark: req.body.landmark,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2
  }
  const store = new Stores({
    name: req.body.name,
    address: address,
    phoneNumber: req.body.phoneNumber,
    ownerId: req.pharmacist.pharmacistId
  })

  try {
    const newStore = await store.save()
    infoLog(`'${store.name}' store added.`)
    res.status(201).json({ ...RECORD_CREATED, store: newStore })
  } catch (error) {
    errorLog('Error occured while adding store.')
    res.status(400).json({ error, ...BAD_REQUEST })
  }
}

const updateStore = async (req, res) => {
  try {
    let updateReq = {
      name: req.body.name,
      ownerId: req.body.ownerId,
      address: {
        city: req.body.city,
        landmark: req.body.landmark,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2
      }
    }

    const updatedStore = await Stores.findByIdAndUpdate(
      req.params.id,
      updateReq
    )
    infoLog(`store updated.`)
    res.json(RECORD_CREATED)
  } catch (error) {
    errorLog('Error occured while updating store.')
    res.status(400).json({ error, ...BAD_REQUEST })
  }
}

const deleteStore = async (req, res) => {
  try {
    await Stores.findByIdAndDelete(req.params.id)
    res.json(RECORD_DELETED)
  } catch (error) {
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}

module.exports = {
  getStore,
  getStores,
  addStore,
  updateStore,
  deleteStore
}
