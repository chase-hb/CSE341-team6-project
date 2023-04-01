const express = require('express');
const router = express.Router();

const tvShowController = require('../controllers/tv_shows');

router.get('/', tvShowController.getAll);

router.get('/:id', tvShowController.getSingle);

router.post('/', tvShowController.addShow);

router.put('/:id', tvShowController.updateShow);

router.delete('/:id', tvShowController.deleteShow);

module.exports = router;