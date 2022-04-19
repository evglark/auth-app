const express = require('express');
const router = express.Router();

const getLoginRoutes = () =>
    router.get('/main', (req, res, next) => {
        if (!req.user) {
            return res
                .status(401)
                .send(`
                  Unauthorized<br>
                  <a class="button" href="/login/federated/google">Sign in</a>
                `);
        }
        next();
    }, (req, res, next) => {
        res.locals.filter = null;
        return res
            .status(200)
            .send(`
                Authorized<br>
                <form action="/logout" method="post">
                    <button class="logout" type="submit">Sign out</button>
                </form>
            `);
    });

module.exports = getLoginRoutes;
