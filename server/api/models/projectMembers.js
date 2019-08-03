const Sequelize = require('sequelize');
const sequelize = require('./database-connection');

const Project = require('./project')
const User = require('./user')

const ProjectMembers = sequelize.define('projectmembers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    projectid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }

});

// Board.belongsTo(Project);
module.exports = ProjectMembers;