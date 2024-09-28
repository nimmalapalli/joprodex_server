const express = require('express');
const router = express.Router();
const shippingService = require('../middleware/shippingService');

// Endpoint to get DHL rates
router.post('/dhl-rate', async (req, res) => {
  try {
    const rate = await shippingService.getDHLRate(req.body);
    res.json(rate);
  } catch (error) {
    res.status(500).send('Error retrieving DHL rate');
  }
});

// Endpoint to get FedEx rates
router.post('/fedex-rate', async (req, res) => {
  try {
    const rate = await shippingService.getFedExRate(req.body);
    res.json(rate);
  } catch (error) {
    res.status(500).send('Error retrieving FedEx rate');
  }
});

module.exports = router;
