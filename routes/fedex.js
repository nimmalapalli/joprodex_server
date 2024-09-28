// const express = require('express');
// const router = express.Router();





// const axios = require('axios');




// const input = {
//     grant_type: 'client_credentials',
//     client_id: 'l7f2bd9f76a2ce4a8496ec606c8325a989',
//     client_secret: '02c6dea55fd548d2949bf1ffde41c6e4'
//   };


// // const qs = require('qs');

// // // Convert the input object to a URL-encoded string
// // const data = qs.stringify(input);

// // axios.post('https://apis-sandbox.fedex.com/oauth/token', data, {
// //   headers: {
// //     'Content-Type': 'application/x-www-form-urlencoded',
// //   },
// //   withCredentials: true,
// // })
// //   .then((response) => {
// //     console.log(response.data);
// //   })
// //   .catch((error) => {
// //     console.error(`Error: ${error.message}`);
// //   });

// router.get('/fedexapi', (req, res) => {
//   let data = JSON.stringify({
//     "accountNumber": {
//       "value": "740561073"
//     },
//     "requestedShipment": {
//       "shipper": {
//         "address": {
//           "postalCode": 500001,
//           "countryCode": "IN"
//         }
//       },
//       "recipient": {
//         "address": {
//           "postalCode": 600021,
//           "countryCode": "IN"
//         }
//       },
//       "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
//       "packagingType": "YOUR_PACKAGING",
//       "shipmentSpecialServices": {
//         "specialServiceTypes": [
//           "COD"
//         ]
//       },
//       "rateRequestType": [
//         "LIST",
//         "ACCOUNT"
//       ],
//       "customsClearanceDetail": {
//         "dutiesPayment": {
//           "paymentType": "SENDER",
//           "payor": {
//             "responsibleParty": null
//           }
//         },
//         "commercialInvoice": {
//           "shipmentPurpose": "SOLD"
//         },
//         "freightOnValue": "CARRIER_RISK",
//         "commodities": [
//           {
//             "description": "Camera",
//             "weight": {
//               "value": 1,
//               "units": "KG"
//             },
//             "quantity": 1,
//             "quantityUnits": "PCS",
//             "customsValue": {
//               "amount": 100,
//               "currency": "INR"
//             }
//           }
//         ]
//       },
//       "requestedPackageLineItems": [
//         {
//           "weight": {
//             "units": "KG",
//             "value": 1
//           }
//         }
//       ]
//     }
//   });
  
//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://apis-sandbox.fedex.com/rate/v1/rates/quotes',
//     headers: { 
//       'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMtVFAiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsN2YyYmQ5Zjc2YTJjZTRhODQ5NmVjNjA2YzgzMjVhOTg5In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjEwLVNlcC0yMDI0IDE0OjExOjQ5IEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1zdGFnaW5nLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE3MjU5OTkxMDksImp0aSI6ImM4YTIzYTFjLThlMGMtNGZhZC1iMWZkLTQ2OGJkYjhlNTVmYSJ9.PY5THgcEjydVvGLk2_fnb5GBLrYwI5_eCsk89fEkZUMzdBTkE8KLakoPyQ2R_dHdxmZvzQmcmJRKlTtH2GqJCizUDNGQhNuJetcfjuEv4mm4SkBLsGKBaOIQ5KBc3biz5x0Mfk_G7KW1gJfNIKcJ_gHMvXtLXNpWXWiNLr7KbT8Ms2ZBrMav_vp3rUVI5eeDJ9EePoNskbdn1z-HbqHCXmc8YMRtjG7ep2X7QgPpp0MHJAnQEi8-C4hDsx80Q-OXpavDwWAitlLvfWJG7LBwWI4egIbqyRUpT_5JV1Hmai28uxqIniSMhMqmS9YLvVXlfUNc6A793yCPXEtvhMPalpoSAjk63hlYWawHLO_hxP35anW1jqbDw4fZaC5ymdRthhlvie02P9UFBE2dB-qDfeIEMdY3KK7eEKZRnpdrmilJmkSY7RJnJ9cuh8znhavvFvoeS_6qP0suzIlZkj4ZXe459Eb0lC6X8Q-wkY9imn-_FRKiBsH23Brm8jPbu9EzGheIQ-o2--L57w10R84Q_nTtYqdgB_PS7UOx1CEs5mncQCvzmBzSudnWtnMAuXyneZalcmSZ1sZGgR8e_BJJLVI7tY7nBKmsmT3og28EtBenr4mVhMqkQH7Kx8KFibWjw5onaljSd32h3sjYPJR273l2f_LruGo7_Q1VFJdRR64', 
//       'Content-Type': 'application/json'
//     },
//     data: data
//   };
  
//   axios.request(config)
//     .then(response => {
//       // Send the response data to the client
//       res.json(response.data);
//     })
//     .catch(error => {
//       // Send an error response to the client
//       res.status(500).json({ error: error.message });
//     });
// });



// module.exports = router;




const express = require('express');
const router = express.Router();
const { getOAuthToken, getShippingRates ,postShipping } = require('../controller/fedexrate');

router.post('/fedexapi', async (req, res) => {
  try {
    // Get OAuth token
    const token = await getOAuthToken();

    // Extract shipment details from the request body
    const shipmentDetails = req.body;

    // Ensure shipment details contain required fields
    if (!shipmentDetails || !shipmentDetails.requestedShipment || !shipmentDetails.accountNumber) {
      return res.status(400).json({ error: 'Missing required shipment details' });
    }

    // Get shipping rates
    const rates = await getShippingRates(token, shipmentDetails);
    res.json(rates);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/fedexapishipment', async (req, res) => {
  try {
    // Get OAuth token
    const token = await getOAuthToken();

    // Extract shipment details from the request body
    const shipmentDetails = req.body;

    // Ensure shipment details contain required fields
    if (!shipmentDetails || !shipmentDetails.requestedShipment || !shipmentDetails.accountNumber) {
      return res.status(400).json({ error: 'Missing required shipment details' });
    }

    // Get shipping rates
    const rates = await postShipping(token, shipmentDetails);
    res.json(rates);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
