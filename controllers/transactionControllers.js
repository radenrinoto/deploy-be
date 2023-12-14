const Joi = require("joi");
const SendResponse = require("../helpers/SendResponse.js");
const getCurrentTimestamp = require("../helpers/TimeStamp.js");
const { User, Participants, Transaction, Course } = require("../models/index.js");
const { default: axios } = require("axios");

exports.createTransaction = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const id = res.locals.id;
    const user = await User.findByPk(id);
    const course = await Course.findByPk(courseId);
    const participant = await Participants.findOne({ where: { course_id: courseId, user_id: id } });

    if (participant) {
      return res
        .status(403)
        .send(SendResponse(403, "User has been registered on this course", null, null));
    }

    if (!user || !course) {
      return res.status(404).send(SendResponse(404, "Data Not Found", null, null));
    }

    const data = {
      transaction_details: {
        order_id: "course-" + getCurrentTimestamp(),
        gross_amount: course.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: user.fullName,
        last_name: "",
        email: user.email,
      },
    };

    const response = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic " + process.env.SERVER_KEY_BASE64,
        },
      }
    );

    if (response.status !== 201) {
      return res
        .status(response?.status)
        .send(SendResponse(response?.status, response?.statusText, null, null));
    }

    const newTransaction = await Transaction.create({
      user_id: user?.id,
      course_id: course?.id,
      status: "pending",
      payment_date: new Date(),
      tokenPayment: response?.data?.token,
    });

    return res.status(201).send(
      SendResponse(201, "Success Create Transaction", null, {
        transaction: newTransaction,
        payment: response?.data,
      })
    );
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateStatusTransaction = async (req, res) => {
  try {
    const { token } = req.params;
    const id = res.locals.id;

    const transaction = await Transaction.findOne({ where: { user_id: id, tokenPayment: token } });

    if (!transaction) {
      return res.status(404).send(SendResponse(404, "Transaction not found", null, null));
    }

    await transaction.update({ status: "settlement", tokenPayment: null });

    return res.status(201).send(SendResponse(201, "success", null, transaction));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};
