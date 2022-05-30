// import express
const express = require('express');

// create router
const router = express.Router();

// import routes
const User = require('./user');

// use routes
router.use('/user', User);

// export router
module.exports = router;