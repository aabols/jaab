const { List, User, ListGroup, ListItem } = require('../db/models');

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