const sequelize = require('../models/database-connection');
const Project = require('../models/project')
const Board = require('../models/board')
const ProjectMembers = require('../models/projectMembers')
exports.getProjectMembers = (req, res) => {
    Board.findAll({
        where: {
            userid: req.user.id,
            projectid: req.body.projectid
        }
    }).then(boards => {
        res.status(200).json({
            boards
        });
    });
};






exports.addMembers = (req, res) => {
    sequelize.sync().then(() => {

        // if (req.user.id === Project.findAll({
        //         where: {
        //             id: req.body.projectid
        //         },
        //         attributes: ['userid']

        //     }))
        console.log(Project.findAll({
            where: {
                id: req.body.projectid
            },
            attributes: ['userid']

        }))

        ProjectMembers.create({
                userid: req.body.userid,
                projectid: req.body.projectid
            })
            .then(() => {
                return res.status(200).json({
                    message: `member added to project!`
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'member FAILED !',
                    err
                });
            });
    });

}