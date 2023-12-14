"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Roles, { as: "roleUser", foreignKey: "role_id" });
      User.hasMany(models.Participants, { as: "participantUser", foreignKey: "user_id" });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      accessToken: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
