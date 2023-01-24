const express = require('express');

const router = express.Router();

const userRoute = require('./user');
const listsRoute = require('./lists');

router.use('/user', userRoute);
router.use('/lists', listsRoute);

module.exports = router;