const { List, User, ListGroup, ListItem } = require('../db/models');

module.exports = {
    getListItem: async (req, res) => {
        try {
            const listItem = await ListItem.findOne({
                where: {
                    id: req.params.itemId,
                },
                include: {
                    model: ListGroup,
                    required: true,
                    attributes: [],
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
                },
            });
            if (!listItem) throw { status: 404, message: 'Item not found' };
            res.json(listItem);
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    updateListItem: async (req, res) => {
        try {
            const listItem = await ListItem.findOne({
                where: {
                    id: req.params.itemId,
                },
                include: {
                    model: ListGroup,
                    required: true,
                    attributes: [],
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
                },
            });
            if (!listItem) throw { status: 404, message: 'Item not found' };
            listItem.set(req.body);
            await listItem.save({ fields: ['title', 'checked'] });
            const { id, title, checked } = listItem;
            res.json({ id, title, checked });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        };
    },

    deleteListItem: async (req, res) => {
        try {
            const listItem = await ListItem.findOne({
                where: {
                    id: req.params.itemId,
                },
                include: {
                    model: ListGroup,
                    required: true,
                    attributes: [],
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
                },
            });
            if (!listItem) throw { status: 404, message: 'Item not found' };
            await listItem.destroy();
            res.json({ message: 'Item deleted' });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        };
    },
};