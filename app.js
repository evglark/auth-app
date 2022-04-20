const express = require('express');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');

const authApp = (app = express(), prefix = '/') => {
  const secret = process.env.PASSPORT_REDIRECT_SECRET || 'keyboard cat';

  app.use(session({ secret, resave: false, saveUninitialized: false }));
  app.use(passport.authenticate('session'));

  app.use(prefix, authGoogleRouter);

  return app;
}

module.exports = authApp;
