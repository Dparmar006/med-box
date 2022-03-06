const express = require('express')
const storeRoutes = express.Router()
const auth = require('../middlewares/auth')
const { getStores, getStore, addStore } = require('../controllers/stores')
// GET stores OR get pharmacist's store
storeRoutes.get('/', auth, getStores)

// GET store/:id
storeRoutes.get('/:id', auth, getStore)

// POST store
storeRoutes.post('/', auth, addStore)

// PUT store
// storeRoutes.put('/:id', [auth, getStore], async (req, res) => {
//   if (req.body.name != null) {
//     res.store.name = req.body.name
//   }
//   if (req.body.ownerId != null) {
//     res.store.ownerId = req.body.ownerId
//   }
//   if (req.body.city != null) {
//     res.store.address.city = req.body.city
//   }
//   if (req.body.landmark != null) {
//     res.store.address.landmark = req.body.landmark
//   }
//   if (req.body.addressLine1 != null) {
//     res.store.address.addressLine1 = req.body.addressLine1
//   }
//   if (req.body.addressLine2 != null) {
//     res.store.address.addressLine2 = req.body.addressLine2
//   }

//   try {
//     const updatedStore = await res.store.save()
//     res.json({
//       success: true,
//       store: updatedStore,
//       msg: 'Store updated successfully.'
//     })
//   } catch (error) {
//     res.status(400).json({ success: false, msg: error.message })
//   }
// })

// DEL store
// storeRoutes.delete('/:id', [auth, getStore], async (req, res) => {
//   try {
//     await res.store.remove()
//     res.json({ success: true, msg: 'Store deleted' })
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message })
//   }
// })

// middlewere
// async function getStore (req, res, next) {
//   let store
//   try {
//     store = await Stores.findById(req.params.id)
//     if (store == null) {
//       return res
//         .status(404)
//         .json({ success: false, msg: 'Cannot find this store' })
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, msg: error.message })
//   }
//   res.store = store
//   next()
// }

module.exports = storeRoutes
