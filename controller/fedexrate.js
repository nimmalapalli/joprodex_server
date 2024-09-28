const axios = require('axios');

// Replace these with your actual credentials
const clientId = 'l7f2bd9f76a2ce4a8496ec606c8325a989';
const clientSecret = '02c6dea55fd548d2949bf1ffde41c6e4';

// Function to get an OAuth token
async function getOAuthToken() {
  const tokenUrl = 'https://apis-sandbox.fedex.com/oauth/token';
  const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  }).toString();

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error) {
    throw new Error(`Failed to obtain OAuth token: ${error.message}`);
  }
}

// Function to get shipping rates
async function getShippingRates(token, shipmentDetails) {
  const rateUrl = 'https://apis-sandbox.fedex.com/rate/v1/rates/quotes';

  try {
    const response = await axios.post(rateUrl, shipmentDetails, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch shipping rates: ${error.message}`);
  }
}
async function postShipping(token, shipmentDetails) {
    const rateUrl = 'https://apis-sandbox.fedex.com/ship/v1/shipments';
  
    try {
      const response = await axios.post(rateUrl, shipmentDetails, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch shipping rates: ${error.message}`);
    }
  }
module.exports = { getOAuthToken, getShippingRates ,postShipping};
