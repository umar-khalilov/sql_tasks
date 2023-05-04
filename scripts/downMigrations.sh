#!/bin/bash

started_at=$(date +"%s")

web=$(docker compose --file docker-compose.yml ps | grep server-app | awk '{print $1}')

# Down Knex's migrations.
echo "-----> Downing application migrations"
docker exec -it "$web" npx knex --knexpath ./src/database/knex.js migrate:rollback
echo "<----- Migrations downed"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
