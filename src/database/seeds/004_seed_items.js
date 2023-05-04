'use strict';
const { faker } = require('@faker-js/faker');

const seed = async (knex, Promise) => {
    try {
        const generateItems = (amount = 5) =>
            new Array(amount).fill(null).map(_ => ({
                name: faker.vehicle.vehicle(),
                price: faker.commerce.price(500, 2000, 2),
            }));

        return knex
            .raw('TRUNCATE TABLE items RESTART IDENTITY CASCADE')
            .then(() => knex('items').insert(generateItems(2)));
    } catch (err) {
        console.error(err);
    }
};

exports.seed = seed;
