const express = require('express');

const groupRoute = require('./listGroup.js');
const { getList, updateList, addListGroup, shareList } = require('../../controllers/list.js');

const router = express.Router({ mergeParams: true });

router.use('/:groupId', groupRoute);

router.get('/', getList);
router.put('/', updateList);
router.post('/', addListGroup);
router.put('/share', shareList);

module.exports = router;