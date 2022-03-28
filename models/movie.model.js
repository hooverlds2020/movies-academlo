const { DataTypes } = require('sequelize');

//import DB
const { sequelize } = require('../utils/database');

const Movie = sequelize.define('movie', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    require: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(100),
    require: true,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    require: true,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  genre: {
    type: DataTypes.STRING(50),
    require: true,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Movie };
