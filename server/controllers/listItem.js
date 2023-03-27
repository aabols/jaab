const { List, User, ListGroup, ListItem } = require('../db/models');

module.exports = {
    getListItem: async (req, res) => {
        try {
            const listItem = await ListItem
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findByPk(req.params.itemId);
            if (!listItem) throw { status: 404, message: 'Item not found' };
            res.json(listItem.clean());
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        }
    },

    updateListItem: async (req, res) => {
        try {
            const listItem = await ListItem
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findByPk(req.params.itemId);
            if (!listItem) throw { status: 404, message: 'Item not found' };
            const role = listItem.ListGroup.List.Users[0].UserList.role;
            if (role > 4) throw { status: 403, message: 'Insufficient role' };
            listItem.set(req.body);
            const fields = (role === 4)
                ? ['checked']
                : ['title', 'checked'];
            await listItem.save({ fields });
            res.json(listItem.clean());
        } catch ({ status, message }) {
            res.status(status || 400).json({ message });
        };
    },

    deleteListItem: async (req, res) => {
        try {
            const listItem = await ListItem
                .scope({ method: ['mustHaveUser', req.user.id] })
                .findByPk(req.params.itemId);
            if (!listItem) throw { status: 404, message: 'Item not found' };
            const role = listItem.ListGroup.List.Users[0].UserList.role;
            if (role > 3) throw { status: 403, message: 'Insufficient role' };
            await listItem.destroy();
            res.json({ message: 'Item deleted' });
        } catch ({ status, message }) {
            res.status(status || 500).json({ message });
        };
    },
};
