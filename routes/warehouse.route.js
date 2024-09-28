const express = require('express');
const router = express.Router();
const Warehouse = require('../models/warehouse.model');
const User =require('../models/user')
// Create a new warehouse
router.post('/create', async (req, res) => {
  const { name, location, capacity ,type,user_id} = req.body;

  try {
    const newWarehouse = new Warehouse({ name, location, capacity,type ,user_id});
    await newWarehouse.save();
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.aggregate([
            
      {
          $lookup:{
            from:User.collection.name,
            localField:'user_id',
            foreignField:'_id',
            as:'userDetails'
          }
      }
  ]);
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single warehouse by ID
router.get('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a warehouse by ID
router.put('/:id', async (req, res) => {
  const { name, location, capacity } = req.body;

  try {
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      { name, location, capacity },
      { new: true }
    );
    if (!updatedWarehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a warehouse by ID
router.delete('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
