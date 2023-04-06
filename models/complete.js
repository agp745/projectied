"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Complete extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Complete.init(
        {
            project_id: DataTypes.INTEGER,
            complete_text: DataTypes.STRING,
            date: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Complete",
        }
    )
    return Complete
}
