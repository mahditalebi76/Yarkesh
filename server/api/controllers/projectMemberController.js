const Project = require('../models/project');
const ProjectMembers = require('../models/projectMembers');
const User = require('../models/user')
exports.getProjectMembers = (req, res) => {
    //TODO fix this shit
    ProjectMembers.findAll({
        where: {
            projectId: req.body.projectId
        },
        include: [{
            model: User,
            attributes: ['name', 'email', 'userName']
        },
        {
            model: Project,
            attributes: ['title']
        }

        ],
    })
        .then(result => {
            return res.status(200).json({
                result
            });
        });
};


exports.addMembers = (req, res) => {
    ProjectMembers.create({
        memberId: req.body.userId,
        projectId: req.body.projectId
    })
        .then(() => {
            return res.status(200).json({
                message: 'member added to project'
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
                message: 'adding member FAILED !'
            });
        });
};