'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: "Admin",
      email: "admin@gmail.com",
      password: "$2b$10$1Fq44R2xZNJI8wlFjJQ3su0QShaAhIoY/b5ogTHIh0KCatlx8.6oy",
      dataCadastro: new Date(),
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@gmail.com' }, {});
  }
};