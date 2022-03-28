const { DataTypes } = require('sequelize');

//import DB
const { sequelize } = require('../utils/database');

const Actor = sequelize.define('actor', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    require: true,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(50),
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
  age: {
    type: DataTypes.INTEGER,
    require: true,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Actor };
