const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://kareemhinde8:wJ0qrWOSEP4d8NnR@cluster0.yq54pjg.mongodb.net/petfinder");
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB; // Fixed typo here