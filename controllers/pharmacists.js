const express = require('express')
const Pharmacists = require('../models/pharmacists')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { infoLog, errorLog } = require('../util/logs')
const {
  WRONG_CREDENTIALS,
  SERVER_ERROR,
  DATA_RETRIVED_SUCCESSFULLY: DATA_RETRIVED,
  BAD_REQUEST,
  EMAIL_ALREADY_USED,
  RECORD_CREATED,
  RESOURCE_NOT_FOUND,
  RECORD_UPDATED
} = require('../constants/messages')

// POST /login

const login = async (req, res) => {
  try {
    if (!(req.body.email && req.body.password)) {
      return res
        .status(400)
        .json({ success: false, msg: 'Password and Email are required.' })
    }

    const pharmacist = await Pharmacists.findOne({ email: req.body.email })

    if (
      pharmacist &&
      (await bcrypt.compare(req.body.password, pharmacist.password))
    ) {
      const token = jwt.sign(
        {
          pharmacistId: pharmacist._id,
          email: pharmacist.email
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '7d'
        }
      )

      pharmacist.token = token
      infoLog(`${pharmacist.email} just logged in.`)
      return res.status(200).json({ success: true, pharmacist: pharmacist })
    } else {
      res.status(400).json(WRONG_CREDENTIALS)
    }
  } catch (error) {
    errorLog('Error occured while logging in.')
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// GET /pharmacist
const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacists.find()
    infoLog('Pharmacists retrived.')
    res.status(200).json({
      numberOfPharmacists: pharmacists.length,
      pharmacists,
      ...DATA_RETRIVED
    })
  } catch (error) {
    errorLog('Error occured while retriving pharmacists.')
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// POST /pharmacist
const addPharmacist = async (req, res) => {
  try {
    if (
      !(
        req.body.email &&
        req.body.password &&
        req.body.lastName &&
        req.body.firstName
      )
    ) {
      res.status(400).json(BAD_REQUEST)
    }

    const oldPharmacist = await Pharmacists.findOne({ email: req.body.email })

    if (oldPharmacist) {
      return res.status(409).json(EMAIL_ALREADY_USED)
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10)

    const pharmacist = new Pharmacists({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      password: encryptedPassword,
      phoneNumber: req.body.phoneNumber,
      numberOfMedicalStores: req.body.numberOfMedicalStores
    })

    const token = jwt.sign(
      {
        pharmacistId: pharmacist._id,
        email: req.body.email.toLowerCase()
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '7d'
      }
    )

    pharmacist.token = token

    const newPharmacist = await pharmacist.save()
    infoLog(`${pharmacist.email} registered.`)
    res.status(201).json({
      pharmacist: newPharmacist,
      ...RECORD_CREATED
    })
  } catch (error) {
    errorLog('Error occured while adding / registering pharmacist.')
    res.status(400).json({ error, ...SERVER_ERROR })
  }
}
// GET pharmacist/:id
const getPharmacist = async (req, res) => {
  try {
    const pharmacist = await Pharmacists.findById(req.params.id)
    if (pharmacist === null) {
      return res.status(404).json(RESOURCE_NOT_FOUND)
    }
    infoLog('Pharmacist retrived.')
    return res.status(200).json({ pharmacist, ...DATA_RETRIVED })
  } catch (error) {
    errorLog('Error occured while retriving pharmacist.')
    return res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// PUT pharmacist/:id
const updatePharmacist = async (req, res) => {
  try {
    await Pharmacists.findByIdAndUpdate(req.params.id, req.body)
    infoLog('Pharmacist updated.')
    return res.status(200).json(RECORD_UPDATED)
  } catch (error) {
    errorLog('Error occured while updating pharmacist.')
    return res.status(500).json({ error, ...SERVER_ERROR })
  }
}
// DELETE pharmacist/:id
const deletePharmacist = async (req, res) => {
  try {
    await Pharmacists.findByIdAndDelete(req.params.id)
    infoLog('Pharmacist deleted.')
    res.json(RECORD_DELETED)
  } catch (error) {
    errorLog('Error occured while deleting pharmacist.')
    res.status(500).json({ error, ...SERVER_ERROR })
  }
}

module.exports = {
  login,
  addPharmacist,
  getPharmacist,
  getPharmacists,
  updatePharmacist,
  deletePharmacist
}
