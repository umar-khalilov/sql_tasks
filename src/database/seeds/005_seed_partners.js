'use strict';
const { faker } = require('@faker-js/faker');

const seed = async (knex, Promise) => {
    try {
        const generatePartners = (amount = 5) =>
            new Array(amount)
                .fill(null)
                .map(_ => ({ name: faker.name.fullName() }));

        return knex
            .raw('TRUNCATE TABLE partners RESTART IDENTITY CASCADE')
            .then(() => knex('partners').insert(generatePartners(10)));
    } catch (err) {
        console.error(err);
    }
};

exports.seed = seed;
