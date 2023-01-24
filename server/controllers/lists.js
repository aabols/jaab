const getLists = async (req, res) => {
    try {
        const lists = await req.user.getLists();
        res.json(lists);
    } catch({ status, message }) {
        res.status(status || 500).json({ message });
    }
};

const addList = async (req, res) => {
    try {
        const newList = await req.user.createList(req.body);
        newList.reload();
        res.status(201).json(newList);
    } catch({ status, message }) {
        res.status(status || 400).json({ message });
    }
};

module.exports = {
    getLists,
    addList
};