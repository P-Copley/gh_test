const format = require('pg-format');
const db = require('./connection.js');

const seed = ({ categories, snacks, northcoders }) => {
  return db
    .query('DROP TABLE IF EXISTS northcoders;')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS snacks_categories;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS categories;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS snacks;');
    })
    .then(() => {
      return db.query(`
        CREATE TABLE snacks (
          snack_id SERIAL PRIMARY KEY,
          snack_name VARCHAR,
          is_vegan BOOLEAN,
          price_in_pence INT
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE categories (
          category_id SERIAL PRIMARY KEY,
          category_name TEXT
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE snacks_categories (
          snack_id INT REFERENCES snacks(snack_id),
          category_id INT REFERENCES categories(category_id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE northcoders (
          northcoder_id SERIAL PRIMARY KEY,
          first_name VARCHAR,
          nickname TEXT,
          loves_to_code BOOLEAN,
          favourite_snack_id INT REFERENCES snacks(snack_id)
        );
      `);
    })
    .then(() => {
      const formattedCategories = categories.map((category) => {
        return [category.category_name];
      });
      const insertCategoriesQueryString = format(
        `
        INSERT INTO categories
        (category_name)
        VALUES
        %L;
      `,
        formattedCategories
      );

      return db.query(insertCategoriesQueryString);
    })
    .then(() => {
      const formattedSnacks = snacks.map((snack) => {
        return [snack.snack_name, snack.is_vegan, snack.price_in_pence];
      });
      const insertSnacksQueryString = format(
        `
        INSERT INTO snacks
        (snack_name, is_vegan, price_in_pence)
        VALUES
        %L
        RETURNING *;
      `,
        formattedSnacks
      );

      return db.query(insertSnacksQueryString);
    })
    .then((result) => {
      const insertedSnacks = result.rows;
      const formattedNorthcoders = northcoders.map((northcoder) => {
        const northcoderFavouriteSnack = insertedSnacks.find((snack) => {
          return snack.snack_name === northcoder.favourite_snack;
        });

        const favourite_snack_id = northcoderFavouriteSnack.snack_id;
        return [
          northcoder.first_name,
          northcoder.nickname,
          northcoder.loves_to_code,
          favourite_snack_id
        ];
      });

      const insertNorthcodersQueryString = format(
        `
        INSERT INTO northcoders
        (first_name, nickname, loves_to_code, favourite_snack_id)
        VALUES
        %L;
      `,
        formattedNorthcoders
      );

      return db.query(insertNorthcodersQueryString);
    });
};

module.exports = seed;
