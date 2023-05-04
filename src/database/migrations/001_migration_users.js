'use strict';

const up = async knex =>
    knex.schema
        .createTable('users', table => {
            table.increments('id').primary();
            table.string('login', 255).unique().notNullable();
            table.text('password').notNullable();
            table.date('registration_date').notNullable();
            table.date('last_visit_date').notNullable();
            table.specificType('ip', 'inet').notNullable();
            table.boolean('activated').notNullable();
        })
        .then(() => {
            console.log('Migration users successfully created');
        });

const down = async knex => knex.schema.dropTable('users');

exports.up = up;
exports.down = down;
