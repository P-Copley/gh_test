const format = require('pg-format');
const db = require('./connection.js');
const {
  formatNorthcoders,
  createRefObj,
  formatSnacksCategories
} = require('./utils.js');

const seed = ({ categories, snacks, northcoders }) => {
  return Promise.all([
    db.query('DROP TABLE IF EXISTS northcoders;'),
    db.query('DROP TABLE IF EXISTS snacks_categories;')
  ])
    .then(() => {
      return Promise.all([
        db.query('DROP TABLE IF EXISTS categories;'),
        db.query('DROP TABLE IF EXISTS snacks;')
      ]);
    })
    .then(() => {
      return Promise.all([
        db.query(`
          CREATE TABLE snacks (
            snack_id SERIAL PRIMARY KEY,
            snack_name VARCHAR,
            is_vegan BOOLEAN,
            price_in_pence INT
          );
      `),
        db.query(`
          CREATE TABLE categories (
            category_id SERIAL PRIMARY KEY,
            category_name TEXT
          );
    `)
      ]);
    })
    .then(() => {
      return Promise.all([
        db.query(`
          CREATE TABLE snacks_categories (
            snack_id INT REFERENCES snacks(snack_id),
            category_id INT REFERENCES categories(category_id)
          );
      `),
        db.query(`
          CREATE TABLE northcoders (
            northcoder_id SERIAL PRIMARY KEY,
            first_name VARCHAR,
            nickname TEXT,
            loves_to_code BOOLEAN,
            favourite_snack_id INT REFERENCES snacks(snack_id)
          );
    `)
      ]);
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

      const formattedCategories = categories.map((category) => {
        return [category.category_name];
      });
      const insertCategoriesQueryString = format(
        `
        INSERT INTO categories
        (category_name)
        VALUES
        %L
        RETURNING *;
      `,
        formattedCategories
      );

      return Promise.all([
        db.query(insertSnacksQueryString),
        db.query(insertCategoriesQueryString)
      ]);
    })
    .then(([{ rows: insertedSnacks }, { rows: insertedCategories }]) => {
      const snackRef = createRefObj(insertedSnacks, 'snack_name', 'snack_id');
      const categoryRef = createRefObj(
        insertedCategories,
        'category_name',
        'category_id'
      );

      const formattedNorthcoders = formatNorthcoders(northcoders, snackRef);
      const insertNorthcodersQueryString = format(
        `
        INSERT INTO northcoders
        (first_name, nickname, loves_to_code, favourite_snack_id)
        VALUES
        %L;
      `,
        formattedNorthcoders
      );

      const formattedSnacksCategories = formatSnacksCategories(
        snacks,
        snackRef,
        categoryRef
      );
      const insertSnacksCategoriesQueryString = format(
        `
        INSERT INTO snacks_categories
        (snack_id, category_id)
        VALUES
        %L;
      `,
        formattedSnacksCategories
      );

      return Promise.all([
        db.query(insertNorthcodersQueryString),
        db.query(insertSnacksCategoriesQueryString)
      ]);
    });
};

module.exports = seed;
