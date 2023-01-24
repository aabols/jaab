const express = require('express');

const { getListGroup, updateListGroup, addListItem } = require('../../controllers/listGroup.js');

const router = express.Router({ mergeParams: true });

router.get('/', getListGroup);
router.put('/', updateListGroup);
router.post('/', addListItem);

module.exports = router;