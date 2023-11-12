const express = require('express')
const AddressController = require('../controllers/AddressController')

const controller = new AddressController()
const router = express.Router()

router.post('/api/address', controller.postAddress)
router.get('/api/address/:cep', controller.getAddress)
router.get('/api/address', controller.getAllAddress)

module.exports = router