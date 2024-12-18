'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roomtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Roomtype.hasMany(models.Room, {
        foreignKey: 'typeId',
        as: 'roomtypeData',
      });

      Roomtype.hasMany(models.Booking, {
        foreignKey: 'typeroomId',
        as: 'typeData',
      });
    }
  }
  Roomtype.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10, 2),
      people: DataTypes.INTEGER,
      area: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Roomtype',
    }
  );
  return Roomtype;
};
