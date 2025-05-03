const express = require('express');
const { getPets, getPetById, addPet, updatePet, deletePet } = require('../controllers/petController');
const upload = require('../middlewares/upload');

const router = express.Router();

// Routes
router.get('/', getPets);
router.get('/pets/:id', getPetById);
router.post('/add-pet', upload.single('image'), addPet);
router.get('/show/pets/:id', getPetById);
router.put('/update/pets/:id', updatePet);
router.delete('/delete/pets/:id', deletePet);

module.exports = router;
