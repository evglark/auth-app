const { getSecret } = require('../services/secretManager');
const { getEnvVarOrThrow } = require('../env');

async function envHelper(nameVariable) {
    const variable = getEnvVarOrThrow(nameVariable);
    return process.env.NODE_ENV === 'production'
        ? await getSecret(variable) : variable;
}

module.exports = envHelper;
