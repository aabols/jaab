const List = require('../db/models/List');
const User = require('../db/models/User');
const ListGroup = require('../db/models/ListGroup');
const ListItem = require('../db/models/ListItem');

module.exports = {
    getListItem: async (req, res) => {
        try {
            const listItem = await ListItem.findOne({
                where: {
                    '$ListGroup.List.Users.id$': req.user.id,
                    id: req.params.itemId
                },
                include: {
                    model: ListGroup,
                    include: {
                        model: List,
                        include: User
                    }
                }
            });
            if (!listItem) throw { status: 404, message: 'Item not found' };
            res.json(listItem);
        } catch({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    updateListItem: async (req, res) => {
        try {
            const listItem = await ListItem.findOne({
                where: {
                    '$ListGroup.List.Users.id$': req.user.id,
                    id: req.params.itemId
                },
                include: {
                    model: ListGroup,
                    include: {
                        model: List,
                        include: User
                    }
                }
            });
            if (!listItem) throw { status: 404, message: 'Item not found' };
            listItem.set(req.body);
            await listItem.save({ fields: ['title', 'checked'] });
            res.json(listItem);
        } catch({ status, message}) {
            res.status(status || 400).json({ message });
        };
    },

    deleteListItem: async (req, res) => {
        try {
            const listItem = await ListItem.findOne({
                where: {
                    '$ListGroup.List.Users.id$': req.user.id,
                    id: req.params.itemId
                },
                include: {
                    model: ListGroup,
                    include: {
                        model: List,
                        include: User
                    }
                }
            });
            if (!listItem) throw { status: 404, message: 'Item not found' };
            await listItem.destroy();
            res.json({ message: 'Item deleted' });
        } catch({ status, message}) {
            res.status(status || 500).json({ message });
        };
    }
};