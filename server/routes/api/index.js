// import express
const express = require('express');

// create router
const router = express.Router();

// get route
router.get(
    '/:root?/*',
    (req, res) => {
        res.json({
            message: "Hello API!",
            params: req.params
        });
    }
);

// export router
module.exports = router;