const Trip = require('../models/travlr');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.tripsList = async (_req, res) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 });
    sendJsonResponse(res, 200, trips);
  } catch (error) {
    sendJsonResponse(res, 500, {
      message: 'Error retrieving trips',
      error: error.message
    });
  }
};

module.exports.tripsFindCode = async (req, res) => {
  try {
    const trips = await Trip.find({ code: req.params.tripCode });

    if (!trips || trips.length === 0) {
      sendJsonResponse(res, 404, {
        message: `Trip code ${req.params.tripCode} not found`
      });
      return;
    }

    sendJsonResponse(res, 200, trips);
  } catch (error) {
    sendJsonResponse(res, 500, {
      message: 'Error retrieving trip',
      error: error.message
    });
  }
};
