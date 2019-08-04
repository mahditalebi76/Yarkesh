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
        references: {
            model: User,
            key: 'userId',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }

});


Project.hasMany(ProjectMembers, {
    foreignKey: 'projectId'
});
module.exports = Project;