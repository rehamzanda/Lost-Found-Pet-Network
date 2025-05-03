const mongoose = require('mongoose');

// Mongoose Schema & Model
const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    ownerContact: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;