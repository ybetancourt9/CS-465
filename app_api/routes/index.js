const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');
const authController = require('../controllers/authentication');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const headers = authHeader.split(' ');

  if (headers.length < 2) {
    res.sendStatus(401);
    return;
  }

  const token = headers[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      return;
    }

    req.auth = decoded;
    next();
  });
}

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripCode', ctrlTrips.tripsFindCode);
router.post('/trips', authenticateJWT, ctrlTrips.tripsCreate);
router.put('/trips/:tripCode', authenticateJWT, ctrlTrips.tripsUpdateCode);
router.delete('/trips/:tripCode', authenticateJWT, ctrlTrips.tripsDeleteCode);

module.exports = router;
