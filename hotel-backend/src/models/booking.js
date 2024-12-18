'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'bookingData',
      });

      Booking.belongsTo(models.Room, {
        foreignKey: 'roomId',
        targetKey: 'id',
        as: 'roomData',
      });

      Booking.belongsTo(models.Roomtype, {
        foreignKey: 'typeroomId',
        targetKey: 'id',
        as: 'typeData',
      });

      Booking.belongsToMany(models.Service, {
        through: 'BookingService',
        foreignKey: 'bookingId', // Sửa tham chiếu khóa ngoại
        as: 'services',
      });
    }
  }

  Booking.init(
    {
      orderCode: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      typeroomId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      timeCome: DataTypes.DATE,
      timeGo: DataTypes.DATE,
      price: DataTypes.DECIMAL(10, 2),
      status: DataTypes.STRING,
      sale: DataTypes.INTEGER,
      paid: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
