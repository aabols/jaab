// import express
const express = require('express');

// create router
const router = express.Router();

// get route
router.get(
    '/',
    (req, res) => {
        res.send("Hello World")
    }
);

// export router
module.exports = router;