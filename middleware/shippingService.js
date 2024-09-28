const axios = require('axios');

// DHL API configuration
const dhlConfig = {
  headers: { 'Authorization': 'Bearer YOUR_DHL_API_KEY' },
};

// FedEx API configuration
const fedexConfig = {
  headers: { 'Authorization': 'Bearer YOUR_FEDEX_API_KEY' },
};

// Function to get rates from DHL
async function getDHLRate(params) {
  try {
    const response = await axios.post('https://api.dhl.com/mydhlapi/rates', params, dhlConfig);
    return response.data;
  } catch (error) {
    console.error('Error fetching DHL rate:', error);
    throw error;
  }
}

// Function to get rates from FedEx
async function getFedExRate(params) {
  try {
    const response = await axios.post('https://api.fedex.com/your-endpoint', params, fedexConfig);
    return response.data;
  } catch (error) {
    console.error('Error fetching FedEx rate:', error);
    throw error;
  }
}

module.exports = {
  getDHLRate,
  getFedExRate,
};
