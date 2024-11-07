// routes/api.js

const express = require('express');
const axios = require('axios');
const Shipment = require('../models/Ecomexpress');

const router = express.Router();

// API Base URL
const API_BASE_URL = 'https://clbeta.ecomexpress.in/apiv2';

// Basic authentication credentials
const USERNAME = 'internaltest_staging'; // Replace with your username
const PASSWORD = '@^2%d@xhH^=9xK4U'; // Replace with your password

// // Create a basic auth header
// const getAuthHeader = () => {
//     const token = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
//     return { Authorization: `Basic ${token}` };
// };

// // // Pincode Serviceable API
// // router.post('/check-pincode', async (req, res) => {
// //     try {
// //         const response = await axios.post(`${API_BASE_URL}/pincodes/`, req.body, { headers: getAuthHeader() });
// //         res.json(response.data);
// //     } catch (error) {
// //         res.status(error.response ? error.response.status : 500).send(error.message);
// //     }
// // });

// // Fetch Waybill API
// // router.get('/fetch-waybill/:awb', async (req, res) => {
// //     try {
// //         const response = await axios.get(`${API_BASE_URL}/fetch_awb/${req.params.awb}`, { headers: getAuthHeader() });
// //         res.json(response.data);
// //     } catch (error) {
// //         res.status(error.response ? error.response.status : 500).send(error.message);
// //     }
// // });
// router.post('')
// // Forward Manifest API
// router.post('/forward-manifest', async (req, res) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/manifest_awb/`, req.body, { headers: getAuthHeader() });
//         res.json(response.data);
//     } catch (error) {
//         res.status(error.response ? error.response.status : 500).send(error.message);
//     }
// });

// // Reverse Manifest API
// router.post('/reverse-manifest', async (req, res) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/manifest_awb_rev_v2/`, req.body, { headers: getAuthHeader() });
//         res.json(response.data);
//     } catch (error) {
//         res.status(error.response ? error.response.status : 500).send(error.message);
//     }
// });

// // Tracking API
// router.get('/track/:awb', async (req, res) => {
//     try {
//         const response = await axios.get(`https://clbeta.ecomexpress.in/track_me/api/mawbd/${req.params.awb}`, { headers: getAuthHeader() });
//         res.json(response.data);
//     } catch (error) {
//         res.status(error.response ? error.response.status : 500).send(error.message);
//     }
// });

// // NDR Data API
// router.get('/ndr-data', async (req, res) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/ndr_resolutions/`, { headers: getAuthHeader() });
//         res.json(response.data);
//     } catch (error) {
//         res.status(error.response ? error.response.status : 500).send(error.message);
//     }
// });

// // Shipment Cancellation API
// router.post('/cancel-shipment', async (req, res) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/cancel_awb/`, req.body, { headers: getAuthHeader() });
//         res.json(response.data);
//     } catch (error) {
//         res.status(error.response ? error.response.status : 500).send(error.message);
//     }
// });

// // Add shipment data to MongoDB
// router.post('/shipments', async (req, res) => {
//     const shipment = new Shipment(req.body);
//     try {
//         const savedShipment = await shipment.save();
//         res.status(201).json(savedShipment);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });

// // Get all shipments from MongoDB
// router.get('/shipments', async (req, res) => {
//     try {
//         const shipments = await Shipment.find();
//         res.json(shipments);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// // Get a specific shipment by ID
// router.get('/shipments/:id', async (req, res) => {
//     try {
//         const shipment = await Shipment.findById(req.params.id);
//         if (!shipment) return res.status(404).send('Shipment not found');
//         res.json(shipment);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });
router.post('/fetch-waybill', async (req, res) => {
    const { username, password, count, type } = req.body;

    // Basic authentication credentials
    const authHeader = {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    };

    try {
        const response = await axios.post('https://clbeta.ecomexpress.in/apiv2/fetch_awb', {
            count,
            type,
        }, {
            headers: authHeader,
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching waybill:', error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});


module.exports = router;
