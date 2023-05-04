'use strict';

const up = async knex =>
    knex.schema
        .createTable('orders', table => {
            table.increments('id').primary();
            table
                .integer('user_id')
                .unsigned()
                .references('users.id')
                .onUpdate('CASCADE')
                .onDelete('SET NULL');
            table
                .integer('partner_id')
                .unsigned()
                .references('partners.id')
                .onUpdate('RESTRICT')
                .onDelete('SET NULL');
            table
                .integer('item_id')
                .unsigned()
                .references('items.id')
                .onUpdate('RESTRICT')
                .onDelete('SET NULL');
        })
        .then(() => {
            console.log('Migration orders successfully created');
        });

const down = async knex => knex.schema.dropTable('orders');

exports.up = up;
exports.down = down;
