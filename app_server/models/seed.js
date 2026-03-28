const fs = require('fs');
const path = require('path');
require('./db');
const mongoose = require('mongoose');
const Trip = require('./travlr');

const tripsPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

const seedTrips = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log(`Seeded ${trips.length} trips into MongoDB.`);
  } catch (error) {
    console.error('Error seeding trips:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Mongoose disconnected after seeding.');
    process.exit(0);
  }
};

seedTrips();
