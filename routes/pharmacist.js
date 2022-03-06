const express = require('express')
const Pharmacists = require('../models/pharmacists')
const pharmacistsRoutes = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')
const Stores = require('../models/stores')
const { infoLog } = require('../util/logs')
// const mongoose = require('mongoose')

// POST /login
pharmacistsRoutes.post('/login', async (req, res) => {
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
      res
        .status(400)
        .json({ success: false, msg: 'Email or Password is wrong.' })
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message })
  }
})

// GET /pharmacist
pharmacistsRoutes.get('/', auth, async (req, res) => {
  try {
    const pharmacists = await Pharmacists.find()
    res.status(200).json({
      success: true,
      numberOfPharmacists: pharmacists.length,
      pharmacists,
      msg: 'Pharmacist retrived successfully.'
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// POST /pharmacist
pharmacistsRoutes.post('/', async (req, res) => {
  try {
    if (
      !(
        req.body.email &&
        req.body.password &&
        req.body.lastName &&
        req.body.firstName
      )
    ) {
      res.status(400).json({
        success: false,
        msg:
          'Required fields ( email, password, first name or last name ) is missing'
      })
    }

    const oldPharmacist = await Pharmacists.findOne({ email: req.body.email })

    if (oldPharmacist) {
      return res.status(409).json({
        success: false,
        msg: 'An account already exist with this email, Please login.'
      })
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
    res.status(201).json({
      success: true,
      pharmacist: newPharmacist,
      msg: 'Pharmacist added.'
    })
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message })
  }
})

// GET pharmacist/:id
pharmacistsRoutes.get('/:id', [auth, getPharmacist], async (req, res) => {
  res.json({ success: true, pharmacist: req.pharmacist })
})

// DELETE pharmacist/:id
pharmacistsRoutes.delete('/:id', [auth, getPharmacist], async (req, res) => {
  try {
    await req.pharmacist.remove()
    res
      .status(200)
      .json({ success: true, msg: 'Pharmacist deleted successfully.' })
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message })
  }
})

pharmacistsRoutes.put('/:id', [auth, getPharmacist], async (req, res) => {
  if (req.body.firstName != null) {
    req.pharmacist.firstName = req.body.firstName
  }
  if (req.body.lastName != null) {
    req.pharmacist.lastName = req.body.lastName
  }
  if (req.body.phoneNumber != null) {
    req.pharmacist.phoneNumber = req.body.phoneNumber
  }
  if (req.body.numberOfMedicalStores != null) {
    req.pharmacist.numberOfMedicalStores = req.body.numberOfMedicalStores
  }

  try {
    const updatedPharmacist = await req.pharmacist.save()
    res.json({
      success: true,
      medicine: updatedPharmacist,
      msg: 'Pharmacist updated successfully.'
    })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
})

// middleware
async function getPharmacist (req, res, next) {
  let pharmacist
  try {
    pharmacist = await Pharmacists.findById(req.params.id)
    if (pharmacist === null) {
      return res
        .status(404)
        .json({ success: false, msg: "Can't find this pharmacists" })
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message })
  }
  req.pharmacist = pharmacist
  next()
}

module.exports = pharmacistsRoutes
