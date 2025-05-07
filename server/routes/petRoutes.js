const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { addPet, getPets, getPetById, updatePet, deletePet } = require('../controllers/petController');

// Make sure upload.single() is used correctly
router.post('/pets', upload.single('image'), addPet);
router.get('/pets', getPets); 
router.get('/pets/:id', getPetById);
router.put('/pets/:id', upload.single('image'), updatePet);
router.delete('/pets/:id', deletePet);



module.exports = router;