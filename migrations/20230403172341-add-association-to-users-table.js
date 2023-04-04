"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("Projects", {
            fields: ["user_id"],
            type: "foreign key",
            name: "fk_projects",
            references: {
                table: "Users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("Projects", "fk_projects")
    },
}
