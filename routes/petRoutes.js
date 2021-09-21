const express = require('express');
const petController = require('./../controllers/petController');
const router = express.Router();

router
.route('/')
.get(petController.getAllPets)
.post(petController.createAPet);

router
.route('/:id')
.get(petController.getAPet)
.patch(petController.updateApet)
.delete(petController.deleteAPet);

module.exports = router;