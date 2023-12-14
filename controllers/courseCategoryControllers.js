const Joi = require("joi");
const SendResponse = require("../helpers/SendResponse.js");

const { CourseCategory, Course } = require("../models/index.js");

exports.getCourseCategories = async (_, res) => {
  try {
    const categories = await CourseCategory.findAll({});
    return res.status(200).send(SendResponse(200, "Success", null, categories));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.getCourseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CourseCategory.findByPk(id, {
      include: [{ model: Course, as: "courses" }],
    });

    if (!category) {
      return res.status(404).send(SendResponse(404, "Category not found", null, null));
    }

    return res.status(200).send(SendResponse(200, "Success", null, category));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.createCourseCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await CourseCategory.findOne({ where: { name } });

    if (category) {
      return res.status(400).send(SendResponse(400, "Category Already Exist", null, null));
    }

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ name });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newCategory = await CourseCategory.create({ name });
    return res.status(201).send(SendResponse(201, "Success Create Data", null, newCategory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.updateCourseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CourseCategory.findByPk(id);

    if (!category) {
      return res.status(404).send(SendResponse(404, "Category not found", null, null));
    }

    if (category.name !== name) {
      const isCategoryNameExist = await CourseCategory.findOne({ where: { name } });
      if (isCategoryNameExist) {
        return res.status(400).send(SendResponse(400, "Category Name Already Exist", null, null));
      }
    }

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ name });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newCategory = await category.update({ name });
    return res.status(201).send(SendResponse(201, "Success Update Data", null, newCategory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CourseCategory.findByPk(id);

    if (!category) {
      return res.status(404).send(SendResponse(404, "Category Not Found", null, null));
    }

    await category.destroy();
    return res.status(204).send(SendResponse(204, "Success Delete Data", null, null));
  } catch (error) {}
};
