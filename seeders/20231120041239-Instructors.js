"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Instructors",
      [
        {
          fullName: "Adam Sake Arfansyah",
          email: "adamsake123@yuhu.com",
        },
        {
          fullName: "Gokil",
          email: "gokil@yuhu.com",
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
     */
    await queryInterface.bulkDelete("Instructors", null, {});
  },
};
