const Sequelize = require('sequelize');
const sequelize = require('./database-connection');

const User = require('./user')
const Board = require('./board')
const ProjectMembers = require('./projectMembers')

const Project = sequelize.define('project', {
    id: {
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
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }

});

// Board.belongsTo(Project);

Project.hasMany(Board, {
    foreignKey: 'projectid'
});

Project.hasMany(ProjectMembers, {
    foreignKey: 'projectid'
});
module.exports = Project;