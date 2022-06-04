// import express
const express = require('express');

// create router
const router = express.Router();

// import routes
const userRoute = require('./user');

// use routes
router.use('/user', userRoute);

// export router
module.exports = router;