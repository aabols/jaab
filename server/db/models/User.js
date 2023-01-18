const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../');

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: 'E-mail address required' },
                notEmpty: { msg: 'E-mail address required' },
                isEmail: { msg: 'Invalid e-mail address' }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'First name required' },
                notEmpty: { msg: 'First name required' },
                isAlpha: { msg: 'First name can only contain letters' }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Last name required' },
                notEmpty: { msg: 'Last name required' },
                isAlpha: { msg: 'Last name can only contain letters' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(password) {
                if (!password) {
                    throw new Error('Password required');
                }
                if (password.length < 8) {
                    throw new Error('Password should be at least 8 characters');
                }
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
                attributes: ['email', 'firstName', 'lastName']
            }
        }
    }
);

module.exports = User;