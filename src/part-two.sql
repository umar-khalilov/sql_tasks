-- 1) Посчитать сколько товаров в штуках купили активные пользователи себе сами. 
-- Т.е необходимо получит ответ вида: " id пользователя, login пользователя, к-во покупок в штуках"
SELECT users.id AS "id пользователя",
    users.login AS "login пользователя",
    count(orders.item_id) AS "Кол-во покупок в штуках"
FROM users
    JOIN orders ON users.id = orders.user_id
WHERE users.activated = true
    AND orders.partner_id IS NULL
GROUP BY users.id,
    users.login;

-- 2) Посчитать то же, что и в п.1, только в деньгах. Т.е на какую сумму скупился каждый юзер.
SELECT users.id AS "id пользователя",
    users.login AS "login пользователя",
    sum(items.price) AS "Сумма на которую скупился юзер"
FROM users
    JOIN orders ON users.id = orders.user_id
    JOIN items ON orders.item_id = items.id
WHERE users.activated = true
    AND orders.partner_id IS NULL
GROUP BY users.id,
    users.login;

-- 3) Посчитать скольким пользователям купил товары каждый из партнеров. При этом, если партнер покупает товар одному и тому же пользователю дважды - это 1-на покупка.
SELECT count(DISTINCT orders.user_id) AS "Кол-во юзеров",
    partners.id AS "id партнёра"
FROM orders
    JOIN partners ON partners.id = orders.partner_id
WHERE orders.partner_id IS NOT NULL
GROUP BY partners.id;

-- 4) Подсчитать какую сумму потратил партнер на каждого пользователя.
SELECT partners.id AS "id партнёра",
    partners.name AS "имя партнёра",
    users.id AS "id юзера",
    sum(items.price) AS "Сумма потраченная на юзера"
FROM partners
    JOIN orders ON partners.id = orders.partner_id
    JOIN items ON items.id = orders.item_id
    JOIN users ON users.id = orders.user_id
GROUP BY partners.id,
    partners.name,
    users.id
ORDER BY partners.id,
    users.id DESC;

-- 5) Тут попроще - посчитать сколько итого потратил каждый партнер.
SELECT partners.id AS "id партнёра",
    partners.name AS "имя партнёра",
    sum(items.price) AS "Общая потраченная сумма партнера"
FROM partners
    JOIN orders ON partners.id = orders.partner_id
    JOIN items ON orders.item_id = items.id
GROUP BY partners.id
ORDER BY partners.id ASC;