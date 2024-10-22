'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Roomtype, {
        foreignKey: 'typeId',
        targetKey: 'id',
        as: 'roomtypeData',
      });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      booking_time: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
