const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  } ,
  password: {
    type:DataTypes.STRING,
    allowNull: false
  }

});

module.exports = User;
