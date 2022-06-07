const express = require('express');

const { getUsers, addUser } = require('../../controllers/user');

const router = express.Router();

router.get('/', getUsers);

module.exports = router;