const { DataTypes } = require('sequelize');

const sequelize = require('../');
const List = require('./List');

const ListGroup = sequelize.define(
    'ListGroup',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Group must have a name'},
                notEmpty: { msg: 'Group must have a name'}
            }
        }
    }, {}
);

List.hasMany(ListGroup, { onDelete: 'CASCADE' });
ListGroup.belongsTo(List);

module.exports = ListGroup;