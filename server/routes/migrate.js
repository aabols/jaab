const express = require('express');

const { migrateUser } = require('../controllers/user');

const router = express.Router();

router.post('/', migrateUser);

module.exports = router;