// import express
const express = require('express');

// create router
const router = express.Router();

// import controllers
const { getUsers, addUser } = require('../../../controllers/user');

// get route
router.get('/', getUsers);

// post route
router.post('/', addUser);

// export router
module.exports = router;