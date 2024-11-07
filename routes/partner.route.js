const express = require('express');
const { addPartner, getPartners ,updatePartner, deletePartner} = require('../controller/partnerController');

const router = express.Router();

// Route to add a new partner
router.post('/add', addPartner);

// Route to get all partners
router.get('/get/partners', getPartners);
router.put('/updatePartner/:id', updatePartner); // Update a partner
router.delete('delete/:id', deletePartner); // Delete a partner


module.exports = router;