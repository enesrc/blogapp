const { DataTypes } = require("sequelize");
const sequelize = require('../data/db');
const { name } = require("ejs");

const Category = sequelize.define("category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    timestamps: false
});

module.exports = Category;