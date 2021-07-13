const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seatsController');

router.get('/getAllSeats', seatsController.getAllSeats);

router.post('/allocate/:numOfSeats', seatsController.getAllocatedSeats);

router.post('/seats/:rowNo/:status/:seatNo', seatsController.changeSeatstatus);

module.exports = router;