module.exports = {
    getEnvVarOrThrow(name) {
        const value = process.env[name];
        if (!value) {
            const errorMessage = `Please set ${name} env var`;
            throw new Error(errorMessage);
        }
        return value;
    }
};