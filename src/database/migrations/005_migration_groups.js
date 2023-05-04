'use strict';

const up = async knex =>
    knex.schema
        .createTable('groups', table => {
            table.increments('id').primary();
            table.string('name', 350).unique().notNullable();
        })
        .then(() => {
            console.log('Migration groups successfully created');
        });

const down = async knex => knex.schema.dropTable('groups');

exports.up = up;
exports.down = down;
