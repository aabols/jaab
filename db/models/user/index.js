const { DataTypes } = require('sequelize');
const sequelize = require('../../../db');
const bcrypt = require('bcrypt');

const User = sequelize.define(
    'User',
    {
        name: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            set(password) {
                this.setDataValue(
                    'password',
                    bcrypt.hashSync(password, 10)
                );
            }
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: {}
            }
        }
    }
);

module.exports = User;