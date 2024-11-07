const express = require('express');
const router = express.Router();
const regionDataController = require('../controller/regionController');

// Routes
router.get('/getallregions', regionDataController.getAllRegionData);
router.get('/:region', regionDataController.getRegionDataByRegion);
router.post('/', regionDataController.addRegionData);
router.put('/:region', regionDataController.updateRegionData);
router.delete('/:region', regionDataController.deleteRegionData);

module.exports = router;
