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
  }
  // , {
  //   classMethods: {
  //     associate: function (models) {
  //       User.hasMany(models.Project, {
  //         foreignKey: 'creatorId'
  //       })
  //     }
  //   }
  // }

);

// User.associate = function(model) {
//   User.hasMany(models.Project , {
//     foreignKey: 'userId',
//     as : 'creatorId'
//   })
// }

User.hasMany(Project, {
  foreignKey: 'creatorId',
  onDelete: 'CASCADE',
  constraints: true
});

//TODO delete this
User.hasMany(ProjectMembers, {
  foreignKey: 'memberId',
  onDelete: 'CASCADE',
  constraints: true
});

module.exports = User;