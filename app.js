const express = require('express');
const path = require('path');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/google-auth');

const authApp = (app = express(), prefix = '/') => {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(cookieParser());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(passport.authenticate('session'));

  app.use(prefix, authRouter);
  app.use(prefix, indexRouter());
  app.get(prefix, (req, res) => {
    res.send('auth-api');
  });

  return app;
}

module.exports = authApp;
