const List = require('../db/models/List');
const User = require('../db/models/User');
const ListGroup = require('../db/models/ListGroup');
const ListItem = require('../db/models/ListItem');

const getListGroup = async (req, res) => {
    try {
        const listGroup = await ListGroup.findOne({
            where: {
                '$List.Users.id$': req.user.id,
                id: req.params.groupId
            },
            include: [
                { model: List, include: User },
                ListItem
            ]
        });
        if (!listGroup) throw { status: 404, message: 'Group not found' };
        res.json(listGroup);
    } catch({ status, message }) {
        res.status(status || 500).json({ message });
    }
};

const updateListGroup = async (req, res) => {
    try {
        const listGroup = await ListGroup.findOne({
            where: {
                '$List.Users.id$': req.user.id,
                id: req.params.groupId
            },
            include: [
                { model: List, include: User }
            ]
        });
        if (!listGroup) throw { status: 404, message: 'Group not found' };
        listGroup.set(req.body);
        await listGroup.save({ fields: ['title'] });
        res.json(listGroup);
    } catch({ status, message}) {
        res.status(status || 400).json({ message });
    };
};

const addListItem = async (req, res) => {
    try {
        const list = await List.findOne({
            where: {
                '$Users.id$': req.user.id,
                id: req.params.listId
            },
            include: User
        });
        if (!list) throw { status: 404, message: 'Group not found' };
        const listGroup = await list.createListGroup(req.body);
        res.status(201).json(listGroup);
    } catch({ status, message }) {
        res.status(status || 400).json({ message });
    }
};

module.exports = {
    getListGroup,
    updateListGroup,
    addListItem
};