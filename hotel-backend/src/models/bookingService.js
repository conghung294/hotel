'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookingService extends Model {
    static associate(models) {
      // Định nghĩa mối quan hệ với Booking và Service
      BookingService.belongsTo(models.Booking, {
        foreignKey: 'bookingId',
        as: 'booking',
      });

      BookingService.belongsTo(models.Service, {
        foreignKey: 'serviceId',
        as: 'service',
      });
    }
  }

  BookingService.init(
    {
      bookingId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Booking', // Đảm bảo tên model là Booking
          key: 'id',
        },
      },
      serviceId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Service', // Đảm bảo tên model là Service
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'BookingService',
      tableName: 'BookingService', // Đảm bảo bảng này tồn tại trong cơ sở dữ liệu
    }
  );

  return BookingService;
};
