const express = require('express');
const mongoose = require('mongoose');

const app = express();

require("dotenv").config();
const cors = require('cors')

const authRoute = require('./routes/auth.route');
const router = require('./routes/router');

const shipmentRoute = require('./routes/shipmentRoute');
const paymentRoute = require('./routes/paymentRoute');
     
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const port = process.env.PORT || 8000;

const nimbus =require('./routes/nimbuspost.js')
const fedex =require('./routes/fedex.js')
const warehouse=require('./routes/warehouse.route.js');
const contactForm = require('./routes/staticwebsiteRoutes/contact.route.js')

const hubRoutes=require('./routes/hubRoutes.js');
const ccavenue=require('./routes/ccavenuePayment.js')

const uploadRoutes= require('./routes/upload.route.js');
const ecomexpress =require('./routes/ecomexpress.js');
const rateRoutes = require('./routes/rate.route.js');
const partnerRoutes = require('./routes/partner.route.js');
const regionDataRoutes = require('./routes/regionData.routes.js');

const uri =  
`mongodb+srv://snvitsolutions5:4CNhVx3Lp9rZ0NS8@cluster0.2smu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true`


// `mongodb://localhost:27017`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB Atlas with Mongoose:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB Atlas with Mongoose');
});



app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());

app.use(express. urlencoded({extended:false}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 next();
});



app.use('/api', authRoute);
app.use('/api', router);
app.use('/api', shipmentRoute);
app.use('/api',paymentRoute);
app.use('/api',nimbus)
app.use('/api',fedex);
app.use('/api',warehouse);
app.use('/api',contactForm);
app.use('/api', hubRoutes);
app.use('/api', uploadRoutes);
app.use('/api',ccavenue);
app.use('/api',ecomexpress);
app.use('/api',rateRoutes);
app.use('/api',partnerRoutes);
app.use('/api/regions', regionDataRoutes);
app.post('/api/fedex-rate', async (req, res) => {
  try {
    const rate = await fedexService.getFedExRate(req.body);
    res.json(rate);
  } catch (error) {
    res.status(500).send('Error retrieving FedEx rate');
  }
});

 app.get('/',(req,res)=>{
  res.send('welcome')
 });

//  const axios = require('axios');

//  // Replace these values with your actual credentials
//  const refreshToken = 'Atzr|IwEBIKUNPZKv5YKDr2FlNUGZ2HxRUSl545abNQ_pYU43cjUmLAgXQ49aDAMDommfxblH6DVk7kuTSdJB07pxqkgpMhAQHu4fbZp5iNVvO8RiCIU0NWec6K8qJoErSNCIQQ5dBQesYLU5WAxk0DJu2azUpb6mjrQzZdZ-NDwNiZTN6FQOJoqN2lhfFTiC-RbzK3SvjSEWh0w2E0OiwUwgQHKtYn7YzNC6hfd6RB8QOGTthn5rE9IAKQyFjH0XM90VvQxkkseFlZr8rzS8p0ghXXBQoDew3RySUNyD7eVEPXq5zHaTL_ugN8rPlfXKkPTx_OzzC5A';
//  const clientId = 'amzn1.application-oa2-client.5dc30b2a1a8c4278be595d45d288df8b';
//  const clientSecret = 'amzn1.oa2-cs.v1.c6e1e0907ea3112b2de8d651a9b4ed6607840be88a69828708644a9e530d5e82';
 
// //  const getAccessToken = async () => {
// //    try {
// //      const response = await axios.post('https://api.amazon.com/auth/o2/token', null, {
// //        params: {
// //          refresh_token: refreshToken,
// //          client_id: clientId,
// //          client_secret: clientSecret,
// //          grant_type: 'refresh_token',
// //        },
// //        headers: {
// //          'Content-Type': 'application/x-www-form-urlencoded'
// //        }
// //      });
 
// //      // Access token
// //      console.log('Access Token:', response.data.access_token);
// //    } catch (error) {
// //      console.error('Error fetching access token:', error.response ? error.response.data : error.message);
// //    }
// //  };
 
// //  getAccessToken();
 
// const AMZ_API_URL = 'https://sandbox.sellingpartnerapi-eu.amazon.com/shipping/v2/shipments/rates'; // Update with actual endpoint

// const getAccessToken = async () => {
//   try {
//     const response = await axios.post('https://api.amazon.com/auth/o2/token', null, {
//       params: {
//         refresh_token: refreshToken,
//         client_id: clientId,
//         client_secret: clientSecret,
//         grant_type: 'refresh_token',
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });

//     console.log('Access Token:', response.data.access_token);
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error fetching access token:', error.response ? error.response.data : error.message);
//     throw new Error('Unable to fetch access token');
//   }
// };
// var accessToken=`Atza|IwEBIIzEy_6pGPlPaXdm2ZRseE-A45rgkBPH7T_k-3JXDKshXTPw9W7tw6UcvPF0AAIeDAkujfFnxoaZcvwEjfbg2Bndd4wDfonLXbS7C7Zo93PHsxBln3dQwRZxeh40Q9Eo3Ie4-71WHqzvZXwwYL1xKkBXOnepyhfY9eHr9f9a5Nib6bda1SBGv0jhk2nSNpVHeSBem3Ol_JhXVJteTQEFrBWbe85vO6jBbtWjOmelECHg1KW-HVc9_x8KIkqc8cuoNrzg05ZDhKOQL6QJqWzQIKYNixbxr-M2_-xONRU3lIm6izQFjbphfzmP1Kwbr8adYYD3ea1NNcOzBHdZtr42Rq90`
// const getShippingRates = async (accessToken, shipmentDetails) => {
//   try {
//     const response = await axios.post(AMZ_API_URL, shipmentDetails, {
//       headers: {
//         'Authorization': `Atza|IwEBIHSUEyyYEbqLW6zBKklkXR0W9NFvEV1mk_M5_UQCt92qheAf3BvLiC6ZwugYT_Hh3-pElSbGwfyJWgerBLWBgudEmUdDCkr1Ufjjyhi6WcgjT5O0bbRyEgiybEPDRqOwCAGthHXTbMFE4ab7-vDsBSh-RO8kEqP8ZXSjnRL3LAk6b6W7uY4BhtA_mQ-uJGevZ2Twdl5bhLkhbcDajcWsS3PF7_bOhoMSv9EhLg5ll_Bw4rtJkfKeoqVEHGxQODvkJ2cSvx2tQAvUa1Rljo-cMepfrQpbCS4L8WVaqNBpKEZUvZLfZDthMdgjSUmpQXpnaFRHYpZsD23206WoJ52oInYr`,
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log('Shipping Rates:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching shipping rates:', error.response ? error.response.data : error.message);
//     throw new Error('Unable to fetch shipping rates');
//   }
// };



// const main = async () => {
//   try {
//     const accessToken = await getAccessToken();

//     // Define shipment details (replace with your actual data)
//     const shipmentDetails = {
//       origin: {
//         country: 'US',
//         postal_code: '90210',
//         city: 'Beverly Hills',
//       },
//       destination: {
//         country: 'US',
//         postal_code: '10001',
//         city: 'New York',
//       },
//       weight: {
//         value: 5,
//         unit: 'LB',
//       },
//       dimensions: {
//         length: 10,
//         width: 8,
//         height: 4,
//         unit: 'IN',
//       },
//     };

//     const shippingRates = await getShippingRates(accessToken, shipmentDetails);
//     console.log('Shipping Rates Response:', shippingRates);
//   } catch (error) {
//     console.error('Error in main function:', error.message);
//   }
// };

// main();

//Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});