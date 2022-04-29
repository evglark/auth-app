const {OAuth2Client} = require('google-auth-library');

const envHelper = require('../helpers/envHelper');

const authorize = async (req, res, next) => {
    const GOOGLE_CLIENT_ID = await envHelper('GOOGLE_CLIENT_ID');
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);

        try {
            const ticket = await client.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
            const PERMITTED_EMAIL = await envHelper('PERMITTED_EMAIL');
            const payload = ticket.getPayload();
            const emailInPermittedEmailsList = PERMITTED_EMAIL
                .split(',')
                .map(el => new RegExp(el).test(payload.email))
                .filter(e => e).length;

            if (emailInPermittedEmailsList) {
                res.status(401).send({
                    error: {
                        message: 'Произведена аутентификация через не разрешенный имейл аккаунт!'
                    }
                });
            }
            req.tokenPayload = payload;
            next();
        } catch(e) {
            console.log(e);
            res.status(401).send({ error: { message: 'Вы не авторизованы!', ...e } });
        }
    } else {
        res.status(401).send({ error: { message: 'Вы не аутентифицировались!' } });
    }
};

module.exports = authorize;
