/**
 * Import Sequelize.
 */
const { Sequelize, DataTypes } = require("sequelize");

/**
 * Import the Sequelize instance that you have exported
 * in the db.config.js file.
 */
const sequelize = require("../db.config")
/**
 * Define a model that can be managed by Sequelize.
 */
const Class = sequelize.define(
    "Class", /** name of the table*/
    { /** table column details*/
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        /**
         * Other model options go here
         */
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = Class;
