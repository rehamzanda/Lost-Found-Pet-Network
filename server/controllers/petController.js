const Pet = require('../models/petModel');
const petSchemaValidation = require('../validation/petValidation');

// Get all pets
exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching pets' });
  }
};



// Add a new pet

exports.addPet = async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Please upload an image' });
      }
  
      const petData = {
        ...req.body,
        image: req.file.path, // Store the path to the uploaded file
        status: 'Found'
      };
  
      const pet = new Pet(petData);
      await pet.save();
      
      res.status(201).json({
        success: true,
        data: pet
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error adding pet' });
    }
  };

// Get pet details
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ error: 'Pet not found' });
        res.json(pet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching pet details' });
    }
};

// Update pet details
exports.updatePet = async (req, res) => {
    try {
        const { error } = petSchemaValidation.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pet) return res.status(404).json({ error: 'Pet not found' });

        res.json(pet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating pet details' });
    }
};

// Delete a pet
exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) return res.status(404).json({ error: 'Pet not found' });

        res.json({ message: 'Pet deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting pet' });
    }
};