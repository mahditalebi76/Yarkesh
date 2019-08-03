const Sequelize = require('sequelize');
const sequelize = require('./database-connection');

const Project = require('./project');
const Board = require('./board');
const ProjectMembers = require('./projectMembers');

//user in database
const User = sequelize.define('user', {
  id: {
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

User.hasMany(Project, {
  foreignKey: 'userid'
});

User.hasMany(Board, {
  foreignKey: 'userid'
});
User.hasMany(ProjectMembers, {
  foreignKey: 'userid'
});

module.exports = User;
