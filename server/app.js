const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const passport = require('passport');
const sequelize = require('./api/models/database-connection');
const User = require('./api/models/user');
require('./config/passportJWTConfig')(passport);

// sequelize.sync().then(() => {
//     User.create({
//         userName: "test1",
//         email: "test2@yahoo.com",
//         name: "test3",
//         password: "1234567asd"
//     })
// });

//Middlewares
app.use(passport.initialize());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

sequelize.sync()

module.exports = app;