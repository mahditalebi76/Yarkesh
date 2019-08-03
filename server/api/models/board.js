const Sequelize = require('sequelize');
const sequelize = require('./database-connection');

const User = require('./user')
const Project = require('./project')

const Board = sequelize.define('board', {
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

// Project.belongsTo(User);

module.exports = Board;