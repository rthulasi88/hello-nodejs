/**
 *   Import de sequelize
 **/
const { Sequelize, DataTypes } = require("sequelize");
/**
 * Import de l'instence de sequelize dans bd.config.js
 *
 * **/
const sequelize = require("../db.config.js")
/**
 *
 * Definire un model gérée par sequelize
 *
 * **/
const Class = sequelize.define(
    "test", /** nom de la class */
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
    }
);
module.exports = Class;
