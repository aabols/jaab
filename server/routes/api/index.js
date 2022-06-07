// import express
const express = require('express');

// create router
const router = express.Router();

// import routes
const userRoute = require('./user');
const listRoute = require('./list');

// use routes
router.use('/user', userRoute);
router.use('/list', listRoute);

// export router
module.exports = router;