const mongoose = require('mongoose');

// Mongoose Schema & Model
const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    status: { type: String, enum: ['Found', 'Lost', 'Other'], default: 'Found' },
    age: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    ownerContact: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;