const express = require('express');

const { getLists, addList, shareList } = require('../../controllers/list');

const router = express.Router();

router.get('/', getLists);
router.post('/', addList);
router.post('/share', shareList);

module.exports = router;