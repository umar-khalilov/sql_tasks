'use strict';

const up = async knex =>
    knex.schema
        .createTable('items', table => {
            table.increments('id').primary();
            table.string('name', 300).notNullable();
            table.float('price', 10, 2).checkPositive().notNullable();
        })
        .then(() => {
            console.log('Migration items successfully created');
        });

const down = async knex => knex.schema.dropTable('items');

exports.up = up;
exports.down = down;
