const express = require('express');

const {
    getLists,
    addList,
    shareList,
    getListGroups,
    addListGroup,
    getListItems,
    addListItem 
} = require('../../controllers/list');

const router = express.Router();

router.get('/', getLists);
router.post('/', addList);
router.post('/share', shareList);
router.get('/:listId', getListGroups);
router.post('/:listId', addListGroup);
router.get('/:listId/:groupId', getListItems);
router.post('/:listId/:groupId', addListItem);

module.exports = router;