const { List, User, UserList, ListGroup, ListItem } = require('../db/models');

module.exports = {
    getLists: async (req, res) => {
        try {
            const lists = await List
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findAll();
            res.json(lists.map(l => l.clean({ include: ['role'] })));
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    addList: async (req, res) => {
        try {
            const role = 1;
            const list = await req.user.createList(req.body, {
                through: { role },
            });
            res.json({
                ...list.clean(),
                _role: role,
            });
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        }
    },

    getAllLists: async (req, res) => {
        try {
            const lists = await List
                .scope(
                    { method: ['mustHaveUser', req.user.id] },
                    'includeGroupsAndItems'
                )
                .findAll();
            res.json(lists.map(l => l.clean({ include: ['role', 'groupsWithItems'] })));
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    }
};
