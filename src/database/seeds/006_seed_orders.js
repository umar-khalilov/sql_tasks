'use strict';

const seed = async (knex, Promise) => {
    try {
        const users = await knex
            .select('id')
            .from('users')
            .pluck('id')
            .then(id => id);

        const partners = await knex
            .select('id')
            .from('partners')
            .pluck('id')
            .then(id => id);

        const items = await knex
            .select('id')
            .from('items')
            .pluck('id')
            .then(id => id);

        const generateOrders = (amount = 1000) => {
            return new Array(amount).fill(null).map((_, index) => ({
                user_id: users[index],
                partner_id: partners[Math.floor(Math.random() * (10 - 0 + 1))],
                item_id: items[Math.floor(Math.random() * (2 - 1 + 1))],
            }));
        };

        const firstIteration = generateOrders(200_000);
        const secondIteration = generateOrders(200_000);
        const thirdIteration = generateOrders(100_000);

        const rows = [...firstIteration, ...secondIteration, ...thirdIteration];

        return knex
            .raw('TRUNCATE TABLE orders RESTART IDENTITY CASCADE')
            .then(() => knex.batchInsert('orders', rows));
    } catch (err) {
        console.error(err);
    }
};

exports.seed = seed;
