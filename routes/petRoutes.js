const express = require('express');
const petController = require('./../controllers/petController');
const router = express.Router();

router.param('id', petController.checkID);

router
.route('/')
.get(petController.getAllPets)
.post(petController.checkBody, petController.createAPet);

router
.route('/:id')
.get(petController.getAPet)
.patch(petController.updateApet)
.delete(petController.deleteAPet);

module.exports = router;