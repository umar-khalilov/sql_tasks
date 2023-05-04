'use strict';
const { configuration } = require('./src/config');

module.exports = {
    development: {
        client: configuration.dbClient,
        connection: {
            host: configuration.dbHost,
            port: configuration.dbPort,
            user: configuration.dbUser,
            password: configuration.dbPassword,
            database: configuration.dbName,
            charset: 'utf8',
        },
        pool: { min: 0, max: 7 },
        migrations: {
            directory: `${__dirname}/src/database/migrations`,
            tableName: 'migrations',
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`,
        },
    },
    staging: {},
    production: {},
};
