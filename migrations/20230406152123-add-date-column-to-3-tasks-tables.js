"use strict"

const { query } = require("express")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Todos", "date", {
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn("Actives", "date", {
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn("Completes", "date", {
            type: Sequelize.STRING,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Todos", "date")
        await queryInterface.removeColumn("Actives", "date")
        await queryInterface.removeColumn("Completes", "date")
    },
}
