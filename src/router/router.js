const express = require('express');

const ApiController = require('../controllers/api-controller');

const router = express.Router();

router.route('/').post(ApiController.makeCall);

module.exports = router;
