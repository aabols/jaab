const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../');

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
            },
            jwt: {
                attributes: ['id']
            }
        }
    }
);

module.exports = User;