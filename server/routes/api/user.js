const express = require('express');

const { getUsers, deleteUser } = require('../../controllers/user');

const router = express.Router();

router.get('/', getUsers);
router.delete('/', deleteUser);

module.exports = router;