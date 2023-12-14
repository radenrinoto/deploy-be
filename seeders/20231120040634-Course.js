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
      "Courses",
      [
        {
          title: "Nama Kursus 1",
          description: "Deskripsi Kursus 1",
          qualified: "Persyaratan Kursus 1",
          instructor_id: 1,
          category_id: 1,
          start_date: new Date("2023-01-01"),
          end_date: new Date("2023-02-01"),
          is_close: false,
          image: "https://example.com/image1.jpg",
          price: 10000,
          max_participants: 20,
          count_participants: 0,
        },
        {
          title: "Nama Kursus 2",
          description: "Deskripsi Kursus 2",
          qualified: "Persyaratan Kursus 2",
          instructor_id: 2,
          category_id: 2,
          start_date: new Date("2023-02-01"),
          end_date: new Date("2023-03-01"),
          is_close: false,
          image: "https://example.com/image2.jpg",
          price: 10000,
          max_participants: 15,
          count_participants: 0,
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
     * await queryInterface.bulkDelete('Courses', null, {});
     */
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
