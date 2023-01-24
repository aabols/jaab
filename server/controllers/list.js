const List = require('../db/models/List');
const User = require('../db/models/User');
const ListGroup = require('../db/models/ListGroup');

const getList = async (req, res) => {
    try {
        const list = await List.findOne({
            where: {
                '$Users.id$': req.user.id,
                id: req.params.listId
            },
            include: [
                User,
                ListGroup
            ]
        });
        if (!list) throw { status: 404, message: 'List not found' };
        res.json(list);
    } catch({ status, message }) {
        res.status(status || 500).json({ message });
    }
};

const updateList = async (req, res) => {
    try {
        const list = await List.findOne({
            where: {
                '$Users.id$': req.user.id,
                id: req.params.listId
            },
            include: User
        });
        if (!list) throw { status: 404, message: 'List not found' };
        list.set(req.body);
        await list.save({ fields: ['title'] });
        res.json(list);
    } catch({ status, message }) {
        res.status(status || 400).json({ message });
    }
};

const addListGroup = async (req, res) => {
    try {
        const list = await List.findOne({
            where: {
                '$Users.id$': req.user.id,
                id: req.params.listId
            },
            include: User
        });
        if (!list) throw { status: 404, message: 'List not found' };
        const listGroup = await list.createListGroup(req.body);
        res.status(201).json(listGroup);
    } catch({ status, message }) {
        res.status(status || 400).json({ message });
    }
};

const shareList = async (req, res) => {
    try {
        const list = await List.findOne({
            where: {
                '$Users.id$': req.user.id,
                id: req.params.listId
            },
            include: User
        });
        if (!list) throw { status: 404, message: 'List not found' };
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        if (!user) throw { status: 404, message: 'User not found' };
        if (await list.hasUser(user)) throw { status: 200, message: `List ${list.title} is already shared with ${user.email}` }
        await list.addUser(user);
        res.json({ message: `List ${list.title} shared with ${user.email}` });
    } catch({ status, message }) {
        res.status(status || 500).json({ message });
    }
}

module.exports = {
    getList,
    updateList,
    addListGroup,
    shareList
};