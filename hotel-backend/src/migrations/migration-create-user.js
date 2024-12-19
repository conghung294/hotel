'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(20),
      },
      email: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING(128),
      },
      name: {
        type: Sequelize.STRING(50),
      },

      cccd: {
        type: Sequelize.STRING(12),
      },

      address: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING(10),
      },

      role: {
        type: Sequelize.STRING(50),
      },
      phoneNumber: {
        type: Sequelize.STRING(10),
      },
      resetPasswordToken: {
        type: Sequelize.STRING(128),
      },
      resetPasswordExpires: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Users');
  },
};
