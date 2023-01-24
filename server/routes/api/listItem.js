const express = require('express');

const { getListItem, updateListItem, deleteListItem } = require('../../controllers/listItem');

const router = express.Router({ mergeParams: true });

router.get('/', getListItem);
router.put('/', updateListItem);
router.delete('/', deleteListItem);

module.exports = router;