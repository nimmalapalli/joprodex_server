// routes/hubRoutes.js
const express = require('express');
const router = express.Router();
const HubModel = require('../models/HubModel');
router.post('/models', async (req, res) => {
    const { hub, models } = req.body;
  
    // Validate input
    if (!hub || !Array.isArray(models) || models.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: hub and models are required',
      });
    }
  
    try {
      const newHub = new HubModel({ hub, models });
      await newHub.save();
  
      res.status(201).json({
        success: true,
        message: 'Hub created successfully',
        hub: newHub,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  });
// API endpoint to get models based on selected hub
router.get('/models/:hub', async (req, res) => {
  const hub = req.params.hub;

  try {
    const hubData = await HubModel.findOne({ hub });

    if (hubData) {
      res.json({
        success: true,
        models: hubData.models,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Hub not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;
