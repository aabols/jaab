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
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'Users',
      [user]
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'Users',
      { username: user.username }
    );
  }
};
