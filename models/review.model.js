const { DataTypes } = require('sequelize')

//import DB
const { sequelize } = require('../utils/database')

const Review = sequelize.define('review', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'active'
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

module.exports = { Review }