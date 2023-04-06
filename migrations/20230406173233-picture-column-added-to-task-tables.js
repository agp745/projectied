"use strict"

const { query } = require("express")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Todos", "picture", {
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn("Actives", "picture", {
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn("Completes", "picture", {
            type: Sequelize.STRING,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Todos", "picture")
        await queryInterface.removeColumn("Actives", "picture")
        await queryInterface.removeColumn("Completes", "picture")
    },
}
