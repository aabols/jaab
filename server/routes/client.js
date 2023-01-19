const express = require('express');
const path = require('path');

const router = express.Router();

CLIENT_ROOT = path.resolve(__dirname, "../../client/build");

router.use(express.static(CLIENT_ROOT));
router.use('*', express.static(CLIENT_ROOT));

module.exports = router;