const express = require('express');
const router = express.Router();

const gameController = require('../controllers/games');

router.get('/', gameController.getAll);

router.get('/:id', gameController.getSingle);

router.post('/', gameController.addGame);

router.put('/:id', gameController.updateGame);

router.delete('/:id', gameController.deleteGame);

module.exports = router;