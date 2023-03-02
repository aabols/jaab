'use strict';

const now = new Date();
const { ListGroups, ...shoppingList } = require('../demo/shoppingList.js');
shoppingList.createdAt = now;
shoppingList.updatedAt = now;
const shoppingListGroups = ListGroups.map(g => {
  const { ListItems, ...listGroup } = g;
  return {
    ...listGroup,
    ListId: shoppingList.id,
    createdAt: now,
    updatedAt: now,
  };
});
const shoppingListItems = ListGroups.flatMap(g => {
  return g.ListItems.map(i => ({
    ...i,
    ListGroupId: g.id,
    createdAt: now,
    updatedAt: now,
  }));
});

const db = require('../models');

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
    const demoUser = await db.User.scope('id').findOne({ where: { username: 'demouser' } });
    await queryInterface.bulkInsert(
      'Lists',
      [shoppingList],
    );
    await queryInterface.bulkInsert(
      'ListGroups',
      shoppingListGroups
    );
    await queryInterface.bulkInsert(
      'ListItems',
      shoppingListItems
    );
    await queryInterface.bulkInsert(
      'UserLists',
      [{
        UserId: demoUser.id,
        ListId: shoppingList.id,
        createdAt: now,
        updatedAt: now,
      }]
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
      'UserLists',
      { ListId: shoppingList.id }
    );
    await queryInterface.bulkDelete(
      'Lists',
      { id: shoppingList.id }
    );
  }
};
