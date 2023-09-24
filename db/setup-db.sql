-- database creation
DROP DATABASE IF EXISTS nc_snacks;
CREATE DATABASE nc_snacks;

-- -- database connection
-- \c nc_snacks;

-- -- table creation
-- CREATE TABLE snacks (
--   snack_id SERIAL PRIMARY KEY,
--   snack_name VARCHAR,
--   is_vegan BOOLEAN,
--   price_in_pence INT
-- );

-- CREATE TABLE categories (
--   category_id SERIAL PRIMARY KEY,
--   category_name TEXT
-- );

-- CREATE TABLE snacks_categories (
--   snack_id INT REFERENCES snacks(snack_id),
--   category_id INT REFERENCES categories(category_id)
-- );

-- CREATE TABLE northcoders (
--   northcoder_id SERIAL PRIMARY KEY,
--   first_name VARCHAR,
--   nickname TEXT,
--   loves_to_code BOOLEAN,
--   favourite_snack_id INT REFERENCES snacks(snack_id)
-- );

-- -- data insertion
-- INSERT INTO snacks
-- (snack_name, is_vegan, price_in_pence)
-- VALUES
-- ('mars bar', FALSE, 100),
-- ('oreo', TRUE, 75),
-- ('party ring', TRUE, 80),
-- ('snickers', FALSE, 105),
-- ('kit kat', FALSE, 70),
-- ('pepsi', FALSE, 80),
-- ('coffee', TRUE, 300),
-- ('banana', TRUE, 45),
-- ('wotsits', FALSE, 65),
-- ('toast', TRUE, 10),
-- ('crisp butty', TRUE, 100),
-- ('chocolate raisins', FALSE, 120),
-- ('oreo, snickers and banana milkshake... on toast!', FALSE, 1000);

-- INSERT INTO categories
-- (category_name)
-- VALUES
-- ('chocolate'),
-- ('biscuit'),
-- ('fruit'),
-- ('drink'),
-- ('crisps'),
-- ('bread'),
-- ('nuts');

-- INSERT INTO snacks_categories
-- (snack_id, category_id)
-- VALUES
-- (1, 1),
-- (2, 1),
-- (2, 2),
-- (3, 2),
-- (4, 1),
-- (4, 7),
-- (5, 1),
-- (5, 2),
-- (6, 4),
-- (7, 4),
-- (8, 3),
-- (9, 5),
-- (10, 6),
-- (11, 5),
-- (11, 6),
-- (12, 1),
-- (12, 3),
-- (13, 1),
-- (13, 2),
-- (13, 7),
-- (13, 3),
-- (13, 4),
-- (13, 6);

-- INSERT INTO northcoders
-- (first_name, nickname, loves_to_code, favourite_snack_id)
-- VALUES
-- ('david', 'dave', TRUE, 13),
-- ('rose', 'big boss', TRUE, 3),
-- ('david', 'big boss', TRUE, 3),
-- ('kev', 'sem 3 king', TRUE, 5);

-- -- queries
-- SELECT * FROM snacks;
-- SELECT * FROM categories;
-- SELECT * FROM snacks_categories;
-- SELECT * FROM northcoders;