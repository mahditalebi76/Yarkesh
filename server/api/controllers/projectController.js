const Project = require('../models/project');
const ProjectMembers = require('../models/projectMembers');
const User = require('../models/user');
exports.getProjectsByCreatorId = (req, res) => {
  // finding projects created by this certain user
  Project.findAll({
      where: {
        creatorId: req.user.userId
      }
    })
    .then(projects => {
      return res.status(200).json({
        projects
      });
    })
    .catch(err => {
      return res.status(500).json({
        err
      });
    });
};

exports.getSingleProject = (req, res) => {
  Project.findAll({
      where: {
        projectId: req.body.projectId
      },
      include: [{
        model: User,
        attributes: ['name']
      }]
    })
    .then(projectInfo => {
      return res.status(200).json({
        projectInfo: projectInfo[0]
      });
    })
    .catch(err => {
      return res.status(500).json({
        err: err.toString()
      });
    });
};

exports.createProject = (req, res) => {
  //creating project with foreign key for user
  Project.create({
      title: req.body.title,
      description: req.body.description,
      // foreign key to user : creatorId given from the jwt
      creatorId: req.user.userId
    })
    .then(result => {
      ProjectMembers.create({
        memberId: req.user.userId,
        projectId: result.projectId
      });
      return res.status(200).json({
        message: `project created!`
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Project FAILED !',
        err
      });
    });
};