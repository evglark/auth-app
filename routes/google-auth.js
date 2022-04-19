const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

const router = express.Router();

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/main',
  failureRedirect: '/login'
}));

router.get('/google-auth-check', (req, res) => {
  if (!req.user) return res.status(401).send({ auth: false });
  res.status(200).send({ auth: true, user: req.user });
});

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ]
  }, (issuer, user, done) => {
      return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user.id, username: user.username })
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

module.exports = router;