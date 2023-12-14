const Joi = require("joi");
const SendResponse = require("../helpers/SendResponse.js");

const {
  CourseCategory,
  Course,
  User,
  Participants,
  Transaction,
  Instructor,
} = require("../models/index.js");

exports.getCourses = async (_, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: CourseCategory, as: "courseCategory" }],
    });
    return res.status(200).send(SendResponse(200, "Success", null, courses));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id, {
      include: [
        { model: CourseCategory, as: "courseCategory" },
        { model: Instructor, as: "courseInstructor" },
      ],
    });

    if (!course) {
      return res.status(404).send(SendResponse(404, "Course Not found", null, null));
    }

    if (course.is_close) {
      return res.status(400).send(SendResponse(400, "Course closed", null, null));
    }

    return res.status(200).send(SendResponse(200, "Success", null, course));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.getMyCourse = async (_, res) => {
  try {
    const decodedId = res.locals.id;

    const user = await User.findByPk(decodedId, {
      include: [{ model: Participants, as: "participantUser" }],
    });

    if (!user) {
      return res.status(404).send(SendResponse(404, "User not found", null, null));
    }

    if (user.id !== decodedId) {
      return res.status(403).send(SendResponse(403, "Unauthorized", null, null));
    }

    return res.status(200).send(SendResponse(200, "Success", null, user.participantUser));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      qualified,
      instructor_id,
      category_id,
      start_date,
      end_date,
      max_participants,
      price,
    } = req.body;

    const image = req.imageUrl;

    const course = await Course.findOne({ where: { title } });

    if (course) {
      return res.status(400).send(SendResponse(400, "Title already used", null, null));
    }

    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      qualified: Joi.string().min(3).required(),
      instructor_id: Joi.number().required(),
      category_id: Joi.number().required(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      max_participants: Joi.number().required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
    });

    const { error } = schema.validate({
      title,
      description,
      qualified,
      instructor_id,
      category_id,
      start_date,
      end_date,
      max_participants,
      image,
      price,
    });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newCourse = await Course.create({
      title,
      description,
      qualified,
      instructor_id,
      category_id,
      start_date,
      end_date,
      is_close: false,
      max_participants,
      count_participants: max_participants,
      image,
      price,
    });

    return res.status(200).send(SendResponse(200, "Success", null, newCourse));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      qualified,
      instructor_id,
      category_id,
      start_date,
      end_date,
      max_participants,
      price,
    } = req.body;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).send(SendResponse(404, "Course not found", null, null));
    }

    if (course?.title !== title) {
      const isExistingCourseTitle = await Course.findOne({ where: { title } });
      if (isExistingCourseTitle) {
        return res.status(400).send(SendResponse(400, "Title Already Used", null, null));
      }
    }

    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      qualified: Joi.string().min(3).required(),
      instructor_id: Joi.number().required(),
      category_id: Joi.number().required(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      max_participants: Joi.number().required(),
      price: Joi.number().required(),
    });

    const { error } = schema.validate({
      title,
      description,
      qualified,
      instructor_id,
      category_id,
      start_date,
      end_date,
      max_participants,
      price,
    });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const updateCourse = await course.update({
      title,
      description,
      qualified,
      instructor_id,
      category_id,
      start_date,
      end_date,
      max_participants,
      price,
    });

    return res.status(200).send(SendResponse(200, "Success Update", null, updateCourse));
  } catch (error) {
    console.log(error);
    return res.status(500).send(SendResponse(500, "Internal Server Error", null, null));
  }
};

exports.updateImageCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.imageUrl;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).send(SendResponse(404, "Course not found", null, null));
    }

    if (!image) {
      return res.status(400).send(SendResponse(400, "Image is required", null, null));
    }
    const updateImage = await course.update({ image });
    return res.status(200).send(SendResponse(200, "Success Update", null, updateImage));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateCountParticipantCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const id = res.locals.id;
    const course = await Course.findByPk(courseId);
    const user = await User.findByPk(id);

    const isPaidTransaction = await Transaction.findOne({
      where: { user_id: user.id, course_id: course.id },
    });

    const alreadyRegistered = await Participants.findOne({
      where: {
        course_id: course.id,
        user_id: user.id,
      },
    });

    if (!course || !user) {
      return res.status(404).send(SendResponse(404, "Data Not Found", null, null));
    }

    if (isPaidTransaction?.status === "pending" || !isPaidTransaction) {
      return res.status(400).send(SendResponse(400, "This User has not paid", null, null));
    }

    if (alreadyRegistered) {
      return res
        .status(400)
        .send(SendResponse(400, "This user already registered on this course", null, null));
    }

    if (course?.count_participants > 0 && isPaidTransaction?.status === "settlement") {
      course.count_participants -= 1;
      await course.save();

      const participants = await Participants.create({
        course_id: courseId,
        user_id: user.id,
        enrollment_date: new Date(),
      });

      return res.status(200).send(SendResponse(200, "Success Daftar", null, participants));
    } else {
      return res.status(400).send(SendResponse(400, "Participant telah penuh", null, null));
    }
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).send(SendResponse(404, "Data Not Found", null, null));
    }

    await course.destroy();

    return res.status(204).send(SendResponse(204, "Success delete course", null, null));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};
