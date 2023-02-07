const express = require('express');

const groupRoute = require('./listGroup');
const {
    getList,
    updateList,
    deleteList,
    addListGroup,
    shareList,
    unshareList,
    getUsers
} = require('../../controllers/list');

const router = express.Router({ mergeParams: true });

router.get('/users', getUsers);
router.put('/share', shareList);
router.put('/unshare', unshareList);

router.use('/:groupId', groupRoute);

router.get('/', getList);
router.put('/', updateList);
router.delete('/', deleteList);
router.post('/', addListGroup);

module.exports = router;