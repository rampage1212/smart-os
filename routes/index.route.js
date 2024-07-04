const express = require('express');
const airbyteRoutes = require('./airbyteRoutes.route');

const router = express.Router();

router.use('/airbyte', airbyteRoutes);

module.exports = router;
