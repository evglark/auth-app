const express = require('express');

const app = express();
require('../app')(app, '/');

app.get('/', (req, res) => {
  res.send('demo');
})

app.get('/log', (req, res) => {
  res.send('log');
})

app.get('/app', (req, res) => {
  res.send('app');
})

module.exports = app;
