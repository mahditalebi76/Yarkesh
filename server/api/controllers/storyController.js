const Project = require('../models/project');
const ProjectMembers = require('../models/projectMembers');
const User = require('../models/user');
const Story = require('../models/story')

exports.getProjectStories = (req, res) => {
    // finding projects created by this certain user
    Story.findAll({
            where: {
                projectId: req.body.projectId
            }
        })
        .then(stories => {
            return res.status(200).json({
                stories
            });
        })
        .catch(err => {
            return res.status(500).json({
                err
            });
        });
};


exports.createStory = (req, res) => {
    ProjectMembers.findAll({
        where: {
            memberId: req.body.userId,
            projectId: req.body.projectId
        }
    }).then(result => {
        if (result.length) {
            //creating project with foreign key for user
            Story.create({
                    who: req.body.who,
                    what: req.body.what,
                    why: req.body.why,
                    acceptance: req.body.acceptance,
                    // foreign key to user : creatorId given from the jwt
                    creatorId: req.body.userId,
                    projectId: req.body.projectId
                })
                .then(result => {
                    return res.status(200).json({
                        message: `story created!`,
                        result
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        message: 'story FAILED !',
                        err
                    });
                });
        } else {
            return res.status(500).json({
                message: 'this user is not a member of this project'
            })
        }
    })










};