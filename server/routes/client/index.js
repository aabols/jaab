// import express
const express = require('express');

// import path
const path = require('path');

// create router
const router = express.Router();

// set parameters
CLIENT_ROOT = path.resolve(__dirname, "../../../client/build");

// static
router.use(express.static(
    CLIENT_ROOT
));

// get route
router.get(
    '/',
    (req, res) => {
        res.sendFile(CLIENT_ROOT);
    }
);

// export router
module.exports = router;