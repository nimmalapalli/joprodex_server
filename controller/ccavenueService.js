const crypto = require('crypto');
const querystring = require('querystring');

const accessCode = 'AVSM67LC95AH35MSHA';  // Replace with your CCAvenue Access Code
const workingKey = '5BBFE9BBC9ED010B44C2910669B10438';  // Replace with your CCAvenue Working Key
const ccavenueUrl = 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

function encrypt(data, key) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function createPaymentRequest(orderDetails) {
  // Convert order details to query string format
  const orderData = querystring.stringify(orderDetails);

  // Encrypt the order data
  const encryptedData = encrypt(orderData, workingKey);

  // Generate the full URL with access code and encrypted data
  const paymentUrl = `${ccavenueUrl}&encRequest=${encryptedData}&access_code=${accessCode}`;
  
  return paymentUrl;
}

module.exports = {
  createPaymentRequest,
};
