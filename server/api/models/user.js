const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');
const Project = require('./project');
const ProjectMembers = require('./projectMembers');

//!----------------------------------User definition in database----------------------------------
const User = dbConnection.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userName: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  }
});


module.exports = User;