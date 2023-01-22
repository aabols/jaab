const { DataTypes } = require('sequelize');

const sequelize = require('..');
const ListGroup = require('./ListGroup');

const ListItem = sequelize.define(
    'ListItem',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Item must have a name'},
                notEmpty: { msg: 'Item must have a name'}
            }
        },
        checked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {}
);

ListGroup.hasMany(ListItem, { onDelete: 'CASCADE' });
ListItem.belongsTo(ListGroup);

module.exports = ListItem;