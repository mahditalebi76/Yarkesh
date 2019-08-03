const Sequelize = require('sequelize');

//postgreSql database . name : Yarkesh . port : 5432 
const sequelize = new Sequelize('Yarkesh', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize