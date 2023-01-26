const ListGroup = require('../db/models/ListGroup');
const ListItem = require('../db/models/ListItem');

module.exports = {
    getLists: async (req, res) => {
        try {
            const lists = await req.user.getLists();
            res.json(lists);
        } catch({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },
        
    addList: async (req, res) => {
        try {
            const newList = await req.user.createList(req.body);
            newList.reload();
            res.status(201).json(newList);
        } catch({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    getAllLists: async (req, res) => {
        try {
            const lists = await req.user.getLists({
                include: [{
                    model: ListGroup,
                    include: ListItem
                }]
            });
            res.json(lists);
        } catch({ status, message }) {
            res.status(status || 500).json({ message });
        }
    }
};