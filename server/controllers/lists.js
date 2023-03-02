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
    getLists: async (req, res) => {
        try {
            const lists = await List.findAll({
                include: {
                    model: User,
                    where: { id: req.user.id },
                    required: true,
                    attributes: [],
                }
            });
            res.json(lists);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    addList: async (req, res) => {
        try {
            const newList = await req.user.createList(req.body);
            const { id, title } = newList.toJSON();
            res.status(201).json({ id, title });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    getAllLists: async (req, res) => {
        try {
            const lists = await List.findAll({
                include: [
                    {
                        model: User,
                        where: { id: req.user.id },
                        required: true,
                        attributes: [],
                    }, {
                        model: ListGroup,
                        include: ListItem
                    }
                ]
            });
            res.json(lists);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    }
};