const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

// router.param('id', petController.checkID);

router
  .route('/youngest-adoptable-pups')
  .get(petController.currentlyAdoptablePups, petController.getAllPets);

router.route('/').get(petController.getAllPets).post(petController.createAPet);

router
  .route('/:id')
  .get(petController.getAPet)
  .patch(petController.updateAPet)
  .delete(petController.deleteAPet);

module.exports = router;
