const express = require('express');

const { loginUser, loginUserLegacy } = require('../controllers/auth');

const router = express.Router();

// router.post('/', loginUser);
router.post('/', loginUserLegacy);

module.exports = router;