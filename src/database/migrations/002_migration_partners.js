'use strict';

const up = async knex =>
    knex.schema
        .createTable('partners', table => {
            table.increments('id').primary();
            table.string('name', 300).notNullable();
        })
        .then(() => {
            console.log('Migration partners successfully created');
        });

const down = async knex => knex.schema.dropTable('partners');

exports.up = up;
exports.down = down;
