const express = require('express');
const router = express.Router();
const swaggerRouter = require('./swagger');

router.use('/', swaggerRouter);
router.use('/movies', require('./movies'))
router.use('/shows', require('./tv_shows'))
router.use('/games', require('./games'))


router.get('/', (req, res, next) => {
    res.send('CSE 341 FINAL PROJECT API')
});


module.exports = router;