'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20),
      },

      timeCome: {
        type: Sequelize.TIME,
      },
      timeGo: {
        type: Sequelize.TIME,
      },
      comeFirst: {
        type: Sequelize.TIME,
      },
      prePayment: {
        type: Sequelize.INTEGER(11),
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Settings');
  },
};
