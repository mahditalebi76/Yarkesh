const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');
const User = require('./user')
const ProjectMembers = require('./projectMembers')

//! INITIALIZING THE PROEJCT PROPERTY IN DATABASE
const Project = dbConnection.define('project', {
        projectId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: false
        },
        description: {
            allowNull: true,
            type: Sequelize.STRING,
            unique: false
        },
        creatorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }

    }
    // , {
    //     classMethods: {
    //         associate: function (models) {
    //             Project.belongsTo(User, {
    //                 foreignKey: 'creatorId',
    //                 targetKey: 'userId',
    //             })
    //         }
    //     }
    // }
);



Project.hasMany(ProjectMembers, {
    foreignKey: 'projectId'
});

module.exports = Project;