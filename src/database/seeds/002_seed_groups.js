'use strict';

const seed = async (knex, Promise) => {
    try {
        return knex
            .raw('TRUNCATE TABLE groups RESTART IDENTITY CASCADE')
            .then(() =>
                knex('groups').insert([
                    { name: 'temporary' },
                    { name: 'regular' },
                    { name: 'editors' },
                    { name: 'admin' },
                ]),
            );
    } catch (err) {
        console.error(err);
    }
};

exports.seed = seed;
