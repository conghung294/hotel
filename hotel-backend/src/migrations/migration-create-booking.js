'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20),
      },
      orderCode: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER(20),
      },
      typeroomId: {
        type: Sequelize.INTEGER(11),
      },
      roomId: {
        type: Sequelize.INTEGER(11),
      },
      timeCome: {
        type: Sequelize.DATE,
      },
      timeGo: {
        type: Sequelize.DATE,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      paid: {
        type: Sequelize.DECIMAL(10, 2),
      },

      sale: {
        type: Sequelize.INTEGER(11),
      },

      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Bookings');
  },
};
