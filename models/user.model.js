const { DataTypes } = require('sequelize')

//import DB
const { sequelize } = require('../utils/database')

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'active'
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})

module.exports = { User }