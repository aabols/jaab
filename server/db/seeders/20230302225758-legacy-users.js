'use strict';

const now = new Date();
const legacyUsers = [
  'legacyuser',
].map(u => ({
  username: u,
  email: 'legacy@user.com',
  firstName: 'Legacy',
  lastName: 'User',
  password: 'password',
  legacy: true,
  createdAt: now,
  updatedAt: now,
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      legacyUsers
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Users',
      {
        [Sequelize.Op.or]: {
          legacy: true,
          username: { [Sequelize.Op.substring]: 'legacyuser' },
        }
      }
    );
  }
};
