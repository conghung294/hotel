'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Setting.init(
    {
      timeCome: DataTypes.DATE,
      timeGo: DataTypes.DATE,
      comeFirst: DataTypes.DATE,
      prePayment: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Setting',
    }
  );
  return Setting;
};
