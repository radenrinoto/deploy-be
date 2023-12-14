const Joi = require("joi");
const crypto = require("crypto");
const SendResponse = require("../helpers/SendResponse.js");
const { Op } = require("sequelize");

const { User, Roles } = require("../models/index.js");
const sendEmail = require("../helpers/SendEmail.js");
const { GenerateToken, GenerateResetPasswordToken } = require("../helpers/GenerateToken.js");
const { PasswordHashing, PasswordCompare } = require("../helpers/PasswordHelpers.js");
const EmailResetPassword = require("../helpers/EmailResetPassword.js");

exports.getUsers = async (_, res) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "fullName", "email"],
      order: [["updatedAt", "DESC"]],
    });
    console.log(user, '<<< USER CONTROLER')
    return res.status(200).send(SendResponse(200, "Success", null, user));
  } catch (error) {
    console.log(error, '<< ERROR')
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "fullName", "email"],
      include: "roleUser",
    });

    if (!user) return res.status(404).send(SendResponse(404, "User Not Found", null, null));

    return res.status(200).send(SendResponse(200, "Success", null, user));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    console.log(req.body, '<<<<< BODY')


    const user = await User.findOne({
      where: {
        [Op.or]: [{ fullName }, { email }],
      },
    });

    if (user) {
      console.log(user, '<< USER')
      return res.status(400).send(SendResponse(400, "User Already Exist", null, null));
    }
    const schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = schema.validate({ fullName, email, password, confirmPassword });
    if (error) {
      console.log(error, '<<< VALIDATION ERROR')
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const passwordHashed = await PasswordHashing(password);

    const newUser = await User.create({ fullName, email, role_id: 2, password: passwordHashed });
    return res.status(201).send(SendResponse(201, "Success Create User", null, newUser));
  } catch (error) {
    console.log(error, '<<<< ERROR JS')
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const id = res.locals.id;
    const { fullName, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }

    if (fullName !== user.fullName) {
      const userWithSameName = await User.findOne({ where: { fullName } });
      if (userWithSameName) {
        return res.status(400).send(SendResponse(400, "Full name is already in use", null, null));
      }
    }

    if (email !== user.email) {
      const userWithSameEmail = await User.findOne({ where: { email } });
      if (userWithSameEmail) {
        return res.status(400).send(SendResponse(400, "Email is already in use", null, null));
      }
    }

    const schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } })
        .required(),
    });

    const { error } = schema.validate({ fullName, email });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newUser = await user.update({ fullName, email });
    return res.status(201).send(SendResponse(201, "Success Create User", null, newUser));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.body;

    const user = await User.findByPk(id);
    const role = await Roles.findByPk(roleId);
    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }
    if (!role) {
      return res.status(404).send(SendResponse(404, "Role Not Found", null, null));
    }

    const schema = Joi.object({
      roleId: Joi.number().required(),
    });

    const { error } = schema.validate({ roleId });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newRoleUser = await user.update({ role_id: roleId });
    return res.status(200).send(SendResponse(200, "Success Update Role User", null, newRoleUser));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }

    await user.destroy();
    return res.status(204).send(SendResponse(204, "Success Delete Data", null, null));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(403).send(SendResponse(403, "Unauthorized", null, null));
    }

    const passwordCompared = await PasswordCompare(password, user.password);

    if (!passwordCompared) {
      return res.status(400).send(SendResponse(400, "Password is not same", null, null));
    }

    const dataUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role_id: user.role_id,
    };

    const { refreshToken } = GenerateToken(dataUser);

    user.accessToken = refreshToken;

    await user.save();

    return res
      .status(200)
      .send(SendResponse(200, "Success Login", null, { token: user.accessToken, user: dataUser }));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const id = res.locals.id;
    const user = await User.findByPk(id);

    await user.update({ accessToken: null });
    return res.status(204).send(SendResponse(204, "Success Logout User", null, null));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const schema = Joi.object({
      email: Joi.string().required(),
    });

    const { error } = schema.validate({ email });
    if (error) {
      return res.status(400).send(SendResponse(400, "Validate error", error, null));
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send(SendResponse(404, "User not found", null, null));
    }
    const token = GenerateResetPasswordToken();
    await User.update(
      {
        resetPasswordToken: token,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    const data = {
      to: email,
      text: `Hey ${user?.fullName}`,
      subject: "Reset Your Password",
      htm: EmailResetPassword(user, token),
    };
    sendEmail(data);
    return res.status(200).send(SendResponse(200, "Success", null, { token }));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    const user = await User.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }

    const schema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      confirmPassword: Joi.valid(Joi.ref("password")),
    });

    const { error } = schema.validate({ password, confirmPassword });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const passwordHashed = await PasswordHashing(password);

    const newUserPassword = await user.update({
      password: passwordHashed,
      resetPasswordToken: null,
    });

    return res
      .status(201)
      .send(SendResponse(201, "Success Update Password", null, newUserPassword));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};
