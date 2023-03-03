"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail_Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail_Transaction.belongsTo(models.comic, { foreignKey: "comicId" });
      Detail_Transaction.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
      });
    }
  }
  Detail_Transaction.init(
    {
      comicId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,

      transactionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Detail_Transaction",
    }
  );
  return Detail_Transaction;
};
