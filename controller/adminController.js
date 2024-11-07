const Partner = require('../models/partner');

// Get all partners
const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching partners', error });
  }
};

// Update service charges for a specific partner
const updateServiceCharges = async (req, res) => {
  const { partnerId } = req.params;
  const { serviceChargeFixed, serviceChargePercentage } = req.body;

  try {
    // Find the partner by ID
    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Update the service charges
    partner.serviceChargeFixed = serviceChargeFixed;
    partner.serviceChargePercentage = serviceChargePercentage;

    await partner.save();
    
    res.json({ message: 'Service charges updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service charges', error });
  }
};

// Delete a partner
const deletePartner = async (req, res) => {
  const { partnerId } = req.params;

  try {
    const partner = await Partner.findByIdAndDelete(partnerId);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting partner', error });
  }
};

module.exports = { getAllPartners, updateServiceCharges, deletePartner };
