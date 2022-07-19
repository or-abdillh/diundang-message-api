'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('messages', [
      {
        writer: 'Fulanah',
        content: 'Est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas.',
        presence: true,
        invite_id: 41,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        writer: 'Fulanah',
        content: 'Est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas.',
        presence: true,
        invite_id: 41,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        writer: 'Fulanah',
        content: 'Est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas.',
        presence: true,
        invite_id: 41,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
