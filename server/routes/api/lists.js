const express = require('express');

const listRoute = require('./list.js');
const { getLists, addList } = require('../../controllers/lists');

const router = express.Router();

router.use('/:listId', listRoute);

router.get('/', getLists);
router.post('/', addList);

module.exports = router;