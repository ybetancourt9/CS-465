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
    const trip = await Trip.findOne({ code: req.params.tripCode });

    if (!trip) {
      sendJsonResponse(res, 404, {
        message: `Trip code ${req.params.tripCode} not found`
      });
      return;
    }

    sendJsonResponse(res, 200, trip);
  } catch (error) {
    sendJsonResponse(res, 500, {
      message: 'Error retrieving trip',
      error: error.message
    });
  }
};

module.exports.tripsCreate = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    sendJsonResponse(res, 201, trip);
  } catch (error) {
    sendJsonResponse(res, 400, {
      message: 'Error creating trip',
      error: error.message
    });
  }
};

module.exports.tripsUpdateCode = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trip) {
      sendJsonResponse(res, 404, {
        message: `Trip code ${req.params.tripCode} not found`
      });
      return;
    }

    sendJsonResponse(res, 200, trip);
  } catch (error) {
    sendJsonResponse(res, 400, {
      message: 'Error updating trip',
      error: error.message
    });
  }
};

module.exports.tripsDeleteCode = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });

    if (!trip) {
      sendJsonResponse(res, 404, {
        message: `Trip code ${req.params.tripCode} not found`
      });
      return;
    }

    sendJsonResponse(res, 204, null);
  } catch (error) {
    sendJsonResponse(res, 500, {
      message: 'Error deleting trip',
      error: error.message
    });
  }
};
