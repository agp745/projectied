"use strict"

const { QueryTypes } = require("sequelize")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Projects", "imageURL", {
            type: Sequelize.STRING,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Projects", "imageURL")
    },
}
