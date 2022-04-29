const express = require('express');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');

const authGoogle2Router = require('./routes/googleAuth2');

const authApp = (app = express(), prefix = '/') => {
  const secret = process.env.GOOGLE_CLIENT_SECRET || 'keyboard cat';

  app.use(session({ secret, resave: false, saveUninitialized: false }));
  app.use(passport.authenticate('session'));

  app.use(prefix, authGoogle2Router);

  return app;
}

module.exports = authApp;