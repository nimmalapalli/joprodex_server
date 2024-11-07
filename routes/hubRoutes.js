const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const querystring = require('querystring');
// Replace these values with your actual credentials from CCAvenue
const workingKey = '5BBFE9BBC9ED010B44C2910669B10438';
const accessCode = 'AVSM67LC95AH35MSHA';
const merchantId = '3348993';

router.post('/ccavenue/initiate-payment', (req, res) => {
  const orderDetails = req.body;
  const paymentData = {
    merchant_id: merchantId,
    order_id: orderDetails.order_id,
    currency: 'INR',
    amount: orderDetails.amount,
    redirect_url: 'http://localhost:4200/', // Change this to your response URL
    cancel_url: 'https://evurbo.energy',  // Change this to your cancel URL
    language: 'EN'
  };

  const encRequest = encryptCCRequest(workingKey, querystring.stringify(paymentData));

  res.json({
    encRequest: encRequest,
    accessCode: accessCode
  });
});

function encryptCCRequest(workingKey, data) {
  const key = crypto.createHash('md5').update(workingKey).digest();
  const cipher = crypto.createCipheriv('aes-128-cbc', key, key);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

router.post('/ccavenue/payment-response', (req, res) => {
  const encryptedResponse = req.body.encResp;

  // Decrypt the response
  const decryptedResponse = decryptCCResponse(workingKey, encryptedResponse);
  const paymentResponse = querystring.parse(decryptedResponse);

  // Handle payment success or failure based on the response
  if (paymentResponse.order_status === 'Success') {
    res.json({
      status: 'success',
      message: 'Payment successful!',
      data: paymentResponse
    });
  } else {
    res.json({
      status: paymentResponse.order_status.toLowerCase(),
      message: 'Payment failed or pending!',
      data: paymentResponse
    });
  }
});

// Function to decrypt the response
function decryptCCResponse(workingKey, encryptedResponse) {
  const key = crypto.createHash('md5').update(workingKey).digest();
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, key);
  let decrypted = decipher.update(encryptedResponse, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
module.exports = router;
