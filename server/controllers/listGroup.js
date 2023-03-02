const db = require('../db/models');
// const List = require('../db/models/List');
const List = db.List;
// const User = require('../db/models/User');
const User = db.User;
// const ListGroup = require('../db/models/ListGroup');
const ListGroup = db.ListGroup;
// const ListItem = require('../db/models/ListItem');
const ListItem = db.ListItem;

module.exports = {
    getListGroup: async (req, res) => {
        try {
            const listGroup = await ListGroup.findOne({
                where: {
                    id: req.params.groupId,
                },
                include: [
                    {
                        model: List,
                        required: true,
                        attributes: [],
                        include: {
                            model: User,
                            where: { id: req.user.id },
                            required: true,
                        },
                    },
                    ListItem
                ]
            });
            if (!listGroup) throw { status: 404, message: 'Group not found' };
            res.json(listGroup);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    updateListGroup: async (req, res) => {
        try {
            const listGroup = await ListGroup.findOne({
                where: {
                    id: req.params.groupId,
                },
                include: {
                    model: List,
                    required: true,
                    attributes: [],
                    include: {
                        model: User,
                        where: { id: req.user.id },
                        required: true,
                        attributes: [],
                    },
                },
            });
            if (!listGroup) throw { status: 404, message: 'Group not found' };
            listGroup.set(req.body);
            await listGroup.save({ fields: ['title'] });
            const { id, title } = listGroup.toJSON();
            res.json({ id, title });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        };
    },

    deleteListGroup: async (req, res) => {
        try {
            const group = await ListGroup.findOne({
                where: { id: req.params.groupId },
                include: {
                    model: List,
                    required: true,
                    include: {
                        model: User,
                        where: { id: req.user.id },
                        required: true,
                    }
                }
            });
            if (!group) throw { status: 400, message: 'Group not found' };
            group.destroy();
            res.json({ message: 'Group deleted' });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        };
    },

    addListItem: async (req, res) => {
        try {
            const listGroup = await ListGroup.findOne({
                where: {
                    id: req.params.groupId,
                },
                include: {
                    model: List,
                    required: true,
                    attributes: [],
                    include: {
                        model: User,
                        where: { id: req.user.id },
                        required: true,
                        attributes: [],
                    },
                },
            });
            if (!listGroup) throw { status: 404, message: 'Group not found' };
            const listItem = await listGroup.createListItem(req.body);
            const { id, title, checked } = listItem.toJSON();
            res.status(201).json({ id, title, checked });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        };
    },
};