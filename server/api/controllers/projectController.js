const sequelize = require('../models/database-connection');
const Project = require('../models/project')

exports.getProjects = (req, res) => {
  Project.findAll({
    where: {
      userid: req.user.id
    }
  }).then(resu => {
    res.status(200).json({
      resu
    });
  });
};


exports.createProject = (req, res) => {
  sequelize.sync().then(() => {
    Project.create({
        title: req.body.title,
        description: req.body.description,
        userid: req.user.id,
      })
      .then(() => {
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
  });

}