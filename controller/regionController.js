const RegionData = require('../models/regionData.model');

// Fetch all region data
exports.getAllRegionData = async (req, res) => {
  try {
    const regions = await RegionData.find();
    res.status(200).json(regions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch region data by specific region
exports.getRegionDataByRegion = async (req, res) => {
  const { region } = req.params;
  try {
    const regionData = await RegionData.findOne({ region });
    if (!regionData) return res.status(404).json({ message: 'Region not found' });
    res.status(200).json(regionData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new region data
exports.addRegionData = async (req, res) => {
  const { region, totalOrders, successfulDeliveries, pendingDeliveries, failedDeliveries, revenue } = req.body;

  const newRegionData = new RegionData({
    region,
    totalOrders,
    successfulDeliveries,
    pendingDeliveries,
    failedDeliveries,
    revenue,
  });

  try {
    const savedRegion = await newRegionData.save();
    res.status(201).json(savedRegion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update region data
exports.updateRegionData = async (req, res) => {
  const { region } = req.params;

  try {
    const updatedRegion = await RegionData.findOneAndUpdate(
      { region },
      req.body,
      { new: true }
    );
    if (!updatedRegion) return res.status(404).json({ message: 'Region not found' });
    res.status(200).json(updatedRegion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete region data
exports.deleteRegionData = async (req, res) => {
  const { region } = req.params;
  try {
    const deletedRegion = await RegionData.findOneAndDelete({ region });
    if (!deletedRegion) return res.status(404).json({ message: 'Region not found' });
    res.status(200).json({ message: 'Region data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
