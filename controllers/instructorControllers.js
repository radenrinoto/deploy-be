const Joi = require("joi");
const SendResponse = require("../helpers/SendResponse.js");

const { Instructor } = require("../models/index.js");

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.findAll();
    return res.status(200).send(SendResponse(200, "Instructor", null, instructors));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};
