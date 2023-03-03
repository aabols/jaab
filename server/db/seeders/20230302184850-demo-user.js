'use strict';

const bcrypt = require('bcrypt');
const now = new Date();
const user = {
  username: 'demouser',
  email: 'demo@user.com',
  firstName: 'Demo',
  lastName: 'User',
  password: bcrypt.hashSync('password', 10),
  legacy: false,
  createdAt: now,
  updatedAt: now,
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [user]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Users',
      { username: user.username }
    );
  }
};
