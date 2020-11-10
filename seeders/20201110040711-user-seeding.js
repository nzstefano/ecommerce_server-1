"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require("../data/user.json");
    data.forEach((value) => {
      value.updatedAt = new Date();
      value.createdAt = new Date();
      value.password = hashPassword(value.password);
    });
    await queryInterface.bulkInsert("Users", data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null);
  },
};
