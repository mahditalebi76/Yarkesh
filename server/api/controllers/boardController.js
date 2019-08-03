const sequelize = require('../models/database-connection');
const Project = require('../models/project')
const Board = require('../models/board')
exports.getBoards = (req, res) => {
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


exports.createBoard = (req, res) => {
    sequelize.sync().then(() => {
        Board.create({
                title: req.body.title,
                userid: req.user.id,
                projectid: req.body.projectid
            })
            .then(() => {
                return res.status(200).json({
                    message: `Board created!`
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Board FAILED !',
                    err
                });
            });
    });

}