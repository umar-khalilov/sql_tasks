'use strict';

const seed = async (knex, Promise) => {
    try {
        const groups = await knex
            .select('id')
            .from('groups')
            .pluck('id')
            .then(id => id);

        const users = await knex
            .select('id')
            .from('users')
            .pluck('id')
            .then(id => id);

        const getUsersGroups = (userArr = [], groupArr = []) => {
            const length = userArr.length;
            const usersGroups = [];
            for (let i = 0; i < groupArr.length; i++) {
                for (let j = 0; j < length; j++) {
                    usersGroups.push({
                        user_id: userArr.at(j),
                        group_id: groupArr.at(i),
                    });
                }
            }
            return usersGroups;
        };

        const generateUsersGroups = (userArr = [], groupArr = []) => {
            const groupId = groupArr.pop();
            const adminId = userArr.pop();
            const bigArray = getUsersGroups(userArr, groupArr);
            bigArray.push({ user_id: adminId, group_id: groupId });
            return bigArray;
        };

        return knex
            .raw('TRUNCATE TABLE users_groups RESTART IDENTITY CASCADE')
            .then(() =>
                knex.batchInsert(
                    'users_groups',
                    generateUsersGroups(users, groups),
                ),
            );
    } catch (err) {
        console.error(err);
    }
};

exports.seed = seed;
