const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const passport = require('passport');
const sequelize = require('./api/models/database-connection');
require('./config/passportJWTConfig')(passport);
const User = require('./api/models/user');
const Project = require('./api/models/project');
const ProjectMembers = require('./api/models/projectMembers')
//! ---------------------- MIDDLEWARES ----------------------------------
app.use(passport.initialize());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

//! ----------------------------------Database Sync----------------------------------
Project.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'userId'
});

ProjectMembers.belongsTo(Project, {
    foreignKey: 'projectId',
    targetKey: 'projectId'
});
ProjectMembers.belongsTo(User, {
    foreignKey: 'memberId',
    targetKey: 'userId'
});


sequelize.sync();

module.exports = app;