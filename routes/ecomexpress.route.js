const axios = require('axios');
require('dotenv').config();

const API_KEY = '';
const ACCOUNT_ID = 'internaltest_staging';

// Function to get shipping rate
const getShippingRate = async (originPin, destinationPin, weight) => {
  const url = 'https://clbeta.ecomexpress.in/apiv2/manifest_awb/'; 
  
  const data = {
    originPin: originPin,
    destinationPin: destinationPin,
    weight: weight,
    accountId: ACCOUNT_ID
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  };

  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching rates:', error.response ? error.response.data : error.message);
  }
};

// Example usage
(async () => {
  const rate = await getShippingRate('110001', '400001', 5); // Origin Pin, Destination Pin, Weight (in kg)
  console.log('Shipping Rate:', rate);
})();
