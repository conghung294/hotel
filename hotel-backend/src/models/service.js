'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsToMany(models.Booking, {
        through: 'BookingService',
        foreignKey: 'serviceId', // Sửa tham chiếu khóa ngoại
        as: 'bookings',
      });
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );
  return Service;
};
