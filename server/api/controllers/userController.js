const sequelize = require('../models/database-connection');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const errorHandler = require('./errorHandler');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/secretAndUrl').jwtSecret;
const {
  validationResult
} = require('express-validator');

exports.getAllUsers = (req, res) => {
  User.findAll({}).then(resu => {
    res.status(200).json({
      resu
    });
  });
};

exports.signUp = (req, res) => {
  const err = validationResult(req).errors;
  console.log(err);
  const errors = errorHandler.handler(err);
  if (Object.keys(errors).length > 0) {
    return res.json(errors);
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        err,
        message: 'cannot hash'
      });
    } else if (hash) {
      // sequelize.sync().then(() => {
      User.create({
          userName: req.body.userName,
          email: req.body.email,
          name: req.body.name,
          password: hash
        })
        .then(user => {
          return res.status(200).json({
            message: `sign up complete welcome ${user.name}`
          });
        })
        .catch(err => {
          return res.status(500).json({
            message: 'sign up failed',
            err
          });
        });
      // });
    }
  });
};

exports.signIn = (req, res) => {
  User.findAll({
    where: {
      email: req.body.email
    }
  }).then(user => {
    bcrypt.compare(req.body.password, user[0].password, (err, check) => {
      if (err) {
        return res.status(500).json({
          message: 'compare not complete'
        });
      } else {
        if (check) {
          const jwtpayload = {
            name: user[0].name,
            email: user[0].email,
            id: user[0].id,
            usename: user[0].userName
          };
          jwt.sign(
            jwtpayload,
            jwtSecret, {
              expiresIn: '10h'
            },
            (err, encoded) => {
              if (err) {
                throw new Error('err in jwt');
              }
              res.status(201).json({
                done: true,
                secret: 'bearer ' + encoded
              });
            }
          );
        } else {
          return res.status(404).json({
            message: 'user not found'
          });
        }
      }
    });
  });
};