const express = require('express');
const axios = require('axios');

const authorize = require('../middleware/authorize');
const envHelper = require('../helpers/envHelper');

const router = express.Router();
const FRONTEND_REDIRECT = process.env.FRONTEND_REDIRECT;

router.get('/google/code', async (req, res) => {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += '?response_type=code';
    url += `&redirect_uri=${FRONTEND_REDIRECT}`;
    url += '&scope=email';
    url += `&client_id=${await envHelper('GOOGLE_CLIENT_ID')}`;
    res.redirect(url);
});

router.post('/google/token', async (req, res) => {
    const {code} = req.body;
    const response = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: await envHelper('GOOGLE_CLIENT_ID'),
        client_secret: await envHelper('GOOGLE_CLIENT_SECRET'),
        redirect_uri: `${FRONTEND_REDIRECT}`,
        grant_type: 'authorization_code',
    }, {});
    res.status(200).send(response.data);
});

router.get('/google/token', authorize, async (req, res) => {
    res.status(200).send(req.tokenPayload);
});

module.exports = router;
