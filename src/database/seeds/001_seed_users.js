'use strict';
const { createHash } = require('node:crypto');
const { faker } = require('@faker-js/faker');

const seed = async (knex, Promise) => {
    try {
        const hashPassword = plainPassword => {
            const hash = createHash('sha512');
            hash.update(plainPassword);
            return hash.digest('hex');
        };

        const generateUsers = (amount = 100) =>
            new Array(amount).fill(null).map((_, index) => ({
                login: `${faker.internet.userName()}_${index}`,
                password: hashPassword(
                    faker.internet.password(
                        25,
                        true,
                        /[A-ZА-Я][a-zа-я]/,
                        'Passw',
                    ),
                ),
                registration_date: faker.date.between(
                    '2017-01-01T00:00:00.000Z',
                    '2018-01-01T00:00:00.000Z',
                ),
                last_visit_date: faker.date.past(1, '2019-01-01T00:00:00.000Z'),
                ip: faker.internet.ipv4(),
                activated: Math.random() > 0.5,
            }));

        return knex
            .raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
            .then(() => knex.batchInsert('users', generateUsers(200_000)));
    } catch (err) {
        console.error(err);
    }
};

exports.seed = seed;
