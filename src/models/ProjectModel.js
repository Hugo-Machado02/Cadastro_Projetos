const { DataTypes } = require("sequelize");
const sequelize = global.sequelizeInstance;
const UserModel = require("./UserModel");

const project = sequelize.define("projects", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
});

project.belongsTo(UserModel, { 
    foreignKey: 'managerId',
    as: 'User'
});

module.exports = project;