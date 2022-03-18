const { DataTypes } = require('sequelize')

//import DB
const { sequelize } = require('../utils/database')

const ActorInMovie = sequelize.define('actorinmovie', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },    
    actorId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

module.exports = { ActorInMovie }