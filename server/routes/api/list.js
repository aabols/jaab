const express = require('express');

const groupRoute = require('./listGroup');
const {
    getList,
    updateList,
    deleteList,
    addListGroup,
    shareList
} = require('../../controllers/list');

const router = express.Router({ mergeParams: true });

router.use('/:groupId', groupRoute);

router.get('/', getList);
router.put('/', updateList);
router.delete('/', deleteList);
router.post('/', addListGroup);
router.put('/share', shareList);

module.exports = router;