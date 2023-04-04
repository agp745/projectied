"use strict"

const { query } = require("express")
const { sequelize } = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.addColumn("Projects", "title", {
                type: Sequelize.STRING,
            })
            await queryInterface.addColumn("Projects", "description", {
                type: Sequelize.STRING,
            })
            await queryInterface.addColumn("Projects", "admin", {
                type: Sequelize.INTEGER,
            })
            return Promise.resolve()
        } catch (e) {
            return Promise.reject(e)
        }
    },

    async down(queryInterface, Sequelize) {
        try {
            await queryInterface.removeColumn("Projects", "title")
            await queryInterface.removeColumn("Projects", "description")
            await queryInterface.removeColumn("Projects", "admin")
            return Promise.resolve()
        } catch (e) {
            return Promise.reject(e)
        }
    },
}
