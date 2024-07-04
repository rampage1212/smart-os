const express = require('express');
const router = express.Router();
const airbyteController = require('../controllers/airbyteController');

router.post('/authenticate', airbyteController.authenticateUser);
router.post('/setup-destination', airbyteController.setupDestination);
router.post('/setup-connection', airbyteController.setupConnection);

module.exports = router;
