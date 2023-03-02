const { Op } = require('sequelize');
const db = require('../db/models');
// const List = require('../db/models/List');
const List = db.List;
// const User = require('../db/models/User');
const User = db.User;
// const ListGroup = require('../db/models/ListGroup');
const ListGroup = db.ListGroup;

module.exports = {
    getList: async (req, res) => {
        try {
            const list = await List.findOne({
                where: {
                    id: req.params.listId,
                },
                include: [
                    {
                        model: User,
                        where: { id: req.user.id },
                        required: true,
                        attributes: [],
                    },
                    ListGroup,
                ]
            });
            if (!list) throw { status: 404, message: 'List not found' };
            res.json(list);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    updateList: async (req, res) => {
        try {
            const list = await List.findOne({
                where: {
                    id: req.params.listId,
                },
                include: {
                    model: User,
                    where: { id: req.user.id },
                    required: true,
                    attributes: [],
                },
            });
            if (!list) throw { status: 404, message: 'List not found' };
            list.set(req.body);
            await list.save({ fields: ['title'] });
            const { id, title } = list.toJSON();
            res.json({ id, title });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    deleteList: async (req, res) => {
        try {
            const list = await List.findOne({
                where: {
                    id: req.params.listId,
                },
                include: {
                    model: User,
                    where: { id: req.user.id },
                    required: true,
                    attributes: [],
                },
            });
            if (!list) throw { status: 404, message: 'List not found' };
            await list.destroy();
            res.json({ message: 'List deleted' });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    addListGroup: async (req, res) => {
        try {
            const list = await List.findOne({
                where: {
                    id: req.params.listId,
                },
                include: {
                    model: User,
                    where: { id: req.user.id },
                    required: true,
                    attributes: [],
                },
            });
            if (!list) throw { status: 404, message: 'List not found' };
            const listGroup = await list.createListGroup(req.body);
            const { id, title } = listGroup.toJSON();
            res.status(201).json({ id, title });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    shareList: async (req, res) => {
        try {
            const list = await List.findOne({
                where: {
                    id: req.params.listId,
                },
                include: {
                    model: User.scope('id'),
                    where: { id: req.user.id },
                    required: true,
                },
            });
            if (!list) throw { status: 404, message: 'List not found' };
            const user = await User.scope('id').findOne({
                where: { username: req.body.username }
            });
            if (!user) throw { status: 404, message: 'User not found' };
            await list.addUser(user);
            const { id, ...newUser } = user.toJSON();
            res.json(newUser);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    unshareList: async (req, res) => {
        try {
            const list = await List.findOne({
                where: {
                    id: req.params.listId,
                },
                include: User.scope('id'),
            });
            if (!list) throw { status: 404, message: 'List not found' };
            if (!list.Users.some(usr => usr.id === req.user.id)) throw { status: 400, message: 'List not found' };
            const user = list.Users.find(usr => usr.username === req.body.username);
            if (!user) throw { status: 404, message: 'User not found' };
            if (list.Users.length < 2) throw { status: 400, message: 'No other list owners' };
            await list.removeUser(user);
            res.json({ message: `List ${list.title} unshared with ${user.username}` });
            return;
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    getUsers: async (req, res) => {
        try {
            const listUsers = await User.findAll({
                where: { id: { [Op.ne]: req.user.id } },
                include: {
                    model: List,
                    where: { id: req.params.listId },
                    required: true,
                    attributes: [],
                    include: {
                        model: User,
                        where: { id: req.user.id },
                        required: true,
                        attributes: [],
                    },
                }
            });
            res.json(listUsers);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },
};