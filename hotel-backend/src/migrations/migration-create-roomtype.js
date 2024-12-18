'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roomtypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20),
      },
      name: {
        type: Sequelize.STRING(50),
      },
      image: {
        type: Sequelize.BLOB('long'),
      },
      description: {
        type: Sequelize.TEXT,
      },

      quantity: {
        type: Sequelize.INTEGER(11),
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      people: {
        type: Sequelize.INTEGER(10),
      },
      area: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Roomtypes');
  },
};
