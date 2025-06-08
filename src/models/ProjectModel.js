const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Project = sequelize.define("Project", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    managerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    sequelize,
    tableName: "projects",
    timestamps: false,
});

module.exports = Project;