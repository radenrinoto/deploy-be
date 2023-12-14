"use strict";

const { PasswordHashing } = require("../helpers/PasswordHelpers");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "SuperAdmin",
          password: await PasswordHashing("superadmin123"),
          email: "superadmin123@mail.com",
          role_id: 1,
          accessToken: null,
          resetPasswordToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "user",
          password: await PasswordHashing("user123"),
          email: "user123@mail.com",
          role_id: 2,
          accessToken: null,
          resetPasswordToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
