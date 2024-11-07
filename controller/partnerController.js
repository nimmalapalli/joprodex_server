const Partner = require('../models/partner');

// Add a new delivery partner
const addPartner = async (req, res) => {
  const { name, baseRate, zoneSurcharges, weightSurcharge, dimensionSurcharge, expressSurcharge, insuranceRate } = req.body;
  try {
    const newPartner = new Partner({
      name,
      baseRate,
      zoneSurcharges,
      weightSurcharge,
      dimensionSurcharge,
      expressSurcharge,
      insuranceRate
    });
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: 'Error adding partner', error });
  }
};

// Get all delivery partners
const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching partners', error });
  }
};

// Update an existing delivery partner
const updatePartner = async (req, res) => {
  const { id } = req.params; // Get the partner ID from the request parameters
  const updates = req.body; // Get the updated data from the request body

  try {
    const updatedPartner = await Partner.findByIdAndUpdate(id, updates, { new: true }); // Update the partner and return the new document
    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(updatedPartner); // Respond with the updated partner
  } catch (error) {
    res.status(500).json({ message: 'Error updating partner', error });
  }
};

// Delete a delivery partner
const deletePartner = async (req, res) => {
  const { id } = req.params; // Get the partner ID from the request parameters

  try {
    const deletedPartner = await Partner.findByIdAndDelete(id); // Delete the partner
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json({ message: 'Partner deleted successfully' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting partner', error });
  }
};

module.exports = { addPartner, getPartners, updatePartner, deletePartner };
