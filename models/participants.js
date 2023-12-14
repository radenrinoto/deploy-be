"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participants.belongsTo(models.Course, { foreignKey: "course_id" });
      Participants.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Participants.init(
    {
      course_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      enrollment_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Participants",
    }
  );
  return Participants;
};
