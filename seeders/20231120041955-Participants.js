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
      "Participants",
      [
        {
          course_id: 1,
          user_id: 1,
          enrollment_date: new Date("2023-01-15"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          course_id: 2,
          user_id: 2,
          enrollment_date: new Date("2023-02-01"),
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
     * await queryInterface.bulkDelete('Participants', null, {});
     */
    await queryInterface.bulkDelete("Participants", null, {});
  },
};
