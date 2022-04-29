const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const getSecret = async name => {
    const [version] = await client.accessSecretVersion({ name: `${name}/versions/latest` });
    const payload = version.payload.data.toString();
    return payload;
}

module.exports = {
    getSecret,
}
