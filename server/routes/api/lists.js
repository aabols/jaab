const express = require('express');

const listRoute = require('./list.js');
const { getLists, addList, getAllLists } = require('../../controllers/lists');

const router = express.Router();

router.get('/all', getAllLists);

router.use('/:listId', listRoute);

router.get('/', getLists);
router.post('/', addList);

module.exports = router;