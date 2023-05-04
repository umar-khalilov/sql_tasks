'use strict';
const { join } = require('node:path');
const { config } = require('dotenv');

const result = config({
    path: join(__dirname, '..', '..', '.env'),
});

if (result.error) {
    throw result.error;
}

const {
    parsed: {
        NODE_ENV,
        SERVER_PORT,
        DB_PORT,
        DB_CLIENT,
        DB_HOST,
        DB_USER,
        DB_NAME,
        DB_PASSWORD,
    },
} = result;

const configuration = Object.freeze({
    nodeEnv: NODE_ENV,
    serverPort: parseInt(SERVER_PORT, 10),
    dbPort: parseInt(DB_PORT, 10),
    dbHost: DB_HOST,
    dbClient: DB_CLIENT,
    dbName: DB_NAME,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
});

module.exports = { configuration };
