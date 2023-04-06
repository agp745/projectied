"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Todos", "todo_title")
        await queryInterface.removeColumn("Actives", "active_title")
        await queryInterface.removeColumn("Completes", "complete_title")
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn("Todos", "todo_title", {
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn("Actives", "active_title", {
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn("Completes", "complete_title", {
            type: Sequelize.STRING,
        })
    },
}
