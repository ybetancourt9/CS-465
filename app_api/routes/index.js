const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

router.get('/trips', ctrlTrips.tripsList);
router.post('/trips', ctrlTrips.tripsCreate);
router.get('/trips/:tripCode', ctrlTrips.tripsFindCode);
router.put('/trips/:tripCode', ctrlTrips.tripsUpdateCode);
router.delete('/trips/:tripCode', ctrlTrips.tripsDeleteCode);

module.exports = router;
