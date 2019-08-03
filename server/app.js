const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const passport = require('passport');

require("./config/passportJWTConfig")(passport);


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


module.exports = app;