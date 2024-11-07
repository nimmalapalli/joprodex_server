const express = require('express');
const router = express.Router();
const { getAllPartners, updateServiceCharges, deletePartner } = require('../controller/adminController');
const{calculateRatesForAllPartners }= require('../controller/rateController');


router.get('/getallpartners', getAllPartners); // GET all partners

router.put('/partners/:partnerId/service-charges', updateServiceCharges); // Update service charges for a partner
router.delete('/partners/:partnerId', deletePartner); // Delete a partner
router.post('/calculate',calculateRatesForAllPartners)

module.exports = router;