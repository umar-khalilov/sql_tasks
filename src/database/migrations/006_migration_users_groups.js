'use strict';

const up = async knex =>
    knex.schema
        .createTable('users_groups', table => {
            table.integer('user_id').unsigned();
            table
                .foreign('user_id')
                .references('users.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('group_id').unsigned();
            table
                .foreign('group_id')
                .references('groups.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .then(() => {
            console.log('Migration users_groups successfully created');
        });

const down = knex => knex.schema.dropTable('users_groups');

exports.up = up;
exports.down = down;
