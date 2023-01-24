const express = require('express');

const itemRoute = require('./listItem');
const {
    getListGroup,
    updateListGroup,
    addListItem,
    deleteListGroup
} = require('../../controllers/listGroup.js');

const router = express.Router({ mergeParams: true });

router.use('/:itemId', itemRoute);

router.get('/', getListGroup);
router.put('/', updateListGroup);
router.post('/', addListItem);
router.delete('/', deleteListGroup);

module.exports = router;