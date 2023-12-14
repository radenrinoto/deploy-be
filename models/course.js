"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.CourseCategory, {
        as: "courseCategory",
        foreignKey: "category_id",
      });
      Course.belongsTo(models.Instructor, {
        as: "courseInstructor",
        foreignKey: "instructor_id",
      });
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      qualified: DataTypes.STRING,
      instructor_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      is_close: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      max_participants: DataTypes.INTEGER,
      count_participants: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  Course.beforeDestroy(async (course, options) => {
    try {
      await sequelize.models.Participants.destroy({
        where: {
          course_id: course.id,
        },
      });
    } catch (error) {
      console.error("Error deleting related Participants:", error);
    }
  });
  return Course;
};
