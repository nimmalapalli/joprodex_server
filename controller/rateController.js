// controllers/rateController.js
const Partner = require('../models/partner');
// Get zone based on pincode (using your provided state and zone mapping)
const stateToZone = { 
    'Delhi': 'zone1',
    'Haryana': 'zone1',
    'Punjab': 'zone1',
    'Uttar Pradesh': 'zone1',
    'Uttarakhand': 'zone1',
    'Himachal Pradesh': 'zone1',
    'Jammu and Kashmir': 'zone1',
    
    // Western India
    'Maharashtra': 'zone2',
    'Gujarat': 'zone2',
    'Rajasthan': 'zone2',
    'Dadra and Nagar Haveli and Daman and Diu': 'zone2',
    
    // Southern India
    'Tamil Nadu': 'zone3',
    'Karnataka': 'zone3',
    'Kerala': 'zone3',
    'Andhra Pradesh': 'zone3',
    'Telangana': 'zone3',
    
    // Eastern India
    'West Bengal': 'zone4',
    'Odisha': 'zone4',
    'Bihar': 'zone4',
    'Jharkhand': 'zone4',
    
    // North-Eastern India
    'Assam': 'zone5',
    'Nagaland': 'zone5',
    'Manipur': 'zone5',
    'Tripura': 'zone5',
    'Meghalaya': 'zone5',
    'Mizoram': 'zone5',
    'Arunachal Pradesh': 'zone5',
    
    // Central India
    'Madhya Pradesh': 'zone4',
    'Chhattisgarh': 'zone4',
    
    // Union Territories
    'Andaman and Nicobar Islands': 'zone5',
    'Chandigarh': 'zone1',
    'Lakshadweep': 'zone3',
   
    'Puducherry': 'zone3',
    'Ladakh': 'zone1',
};
const pincodeToState = {  // Northern India
    '110001': 'Delhi',
    '110002': 'Delhi',
    '110003': 'Delhi',
    '122001': 'Haryana',
    '140001': 'Punjab',
    '144205': 'Punjab',
    '248001': 'Uttarakhand',
    '263001': 'Uttarakhand',
    '176001': 'Himachal Pradesh',
    '180001': 'Jammu and Kashmir',
    '182101': 'Jammu and Kashmir',
    
    // Western India
    '400001': 'Maharashtra',
    '400002': 'Maharashtra',
    '400003': 'Maharashtra',
    '380001': 'Gujarat',
    '380002': 'Gujarat',
    '411001': 'Maharashtra',
    '302001': 'Rajasthan',
    '320001': 'Rajasthan',
    '396001': 'Dadra and Nagar Haveli and Daman and Diu',
  
    // Southern India
    '600001': 'Tamil Nadu', // Chennai
    '600002': 'Tamil Nadu',
    '560001': 'Karnataka', // Bangalore
    '500001': 'Telangana', // Hyderabad
    '500002': 'Telangana',
    '680001': 'Kerala', // Thrissur
    '695001': 'Kerala', // Thiruvananthapuram
    '517001': 'Andhra Pradesh',
   
  
    // Eastern India
    '700001': 'West Bengal', // Kolkata
    '700002': 'West Bengal',
    '751001': 'Odisha', // Bhubaneswar
    '760001': 'Odisha',
    '800001': 'Bihar', // Patna
    '814001': 'Jharkhand', // Dhanbad
  
    // North-Eastern India
    '781001': 'Assam', // Guwahati
    '794001': 'Meghalaya', // Shillong
    '797001': 'Nagaland', // Kohima
    '795001': 'Manipur', // Imphal
    '799001': 'Tripura', // Agartala
    '790001': 'Arunachal Pradesh', // Itanagar
    '795002': 'Mizoram', // Aizawl
  
    // Central India
    '462001': 'Madhya Pradesh', // Bhopal
    '492001': 'Chhattisgarh', // Raipur
  
    // Union Territories
   
    '601001': 'Puducherry',
    '744101': 'Andaman and Nicobar Islands',
    '100001': 'Chandigarh',
    '194101': 'Ladakh',
  
    '682001': 'Lakshadweep', };

function getZoneByPincode(pincode) {
  const state = pincodeToState[pincode] || 'Unknown';
  return stateToZone[state] || 'zone1';
}

const calculateRatesForAllPartners = async (req, res) => {
  const { 
    weight, 
    dimensions, 
    fromPincode, 
    toPincode, 
    serviceType, 
    insuranceValue 
  } = req.body;

  try {
    // Fetch all partners
    const partners = await Partner.find();

    if (!partners.length) {
      return res.status(404).json({ message: 'No partners found' });
    }

    const fromZone = getZoneByPincode(fromPincode);
    const toZone = getZoneByPincode(toPincode);

    // Prepare an array to hold the calculated rates
    const rates = [];

    // Loop through each partner and calculate rates
    for (const partner of partners) {
      const zoneCharge = (partner.zoneSurcharges.get(fromZone) || 0) + (partner.zoneSurcharges.get(toZone) || 0);

      let weightSurcharge = 0;
      if (weight > 5) {
        weightSurcharge = (weight - 5) * partner.weightSurcharge;
      }

      const dimensionWeight = (dimensions.length * dimensions.width * dimensions.height) / 5000;
      const dimensionSurcharge = Math.max(0, dimensionWeight - weight) * partner.dimensionSurcharge;

      const serviceTypeSurcharge = serviceType === 'express' ? partner.expressSurcharge : 0;

      const insuranceFee = (insuranceValue > 0) ? (insuranceValue * partner.insuranceRate) : 0;

      let totalRate = partner.baseRate + weightSurcharge + dimensionSurcharge + zoneCharge + serviceTypeSurcharge + insuranceFee;

      const percentageServiceCharge = (totalRate * partner.serviceChargePercentage) / 100;
      const totalServiceCharge = partner.serviceChargeFixed + percentageServiceCharge;

      totalRate += totalServiceCharge;

      // Add the calculated rate for the partner to the list
      rates.push({
        partnerName: partner.name, // Assuming partner has a 'name' field
        shippingCost: totalRate,
        serviceCharge: totalServiceCharge
      });
    }

    // Return the list of rates
    res.json({ rates });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating rates for partners', error });
  }
};

module.exports = { calculateRatesForAllPartners };