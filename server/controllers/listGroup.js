const List = require('../db/models/List');
const User = require('../db/models/User');
const ListGroup = require('../db/models/ListGroup');
const ListItem = require('../db/models/ListItem');

module.exports = {
    getListGroup: async (req, res) => {
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
    },

    updateListGroup: async (req, res) => {
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
    },

    deleteListGroup: async (req, res) => {
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
            await listGroup.destroy();
            res.json({ message: 'Group deleted' });
        } catch({ status, message}) {
            res.status(status || 500).json({ message });
        };
    },

    addListItem: async (req, res) => {
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
            const listItem = await listGroup.createListItem(req.body);
            res.status(201).json(listItem);
        } catch({ status, message }) {
            res.status(status || 400).json({ message });
        }
    }
};