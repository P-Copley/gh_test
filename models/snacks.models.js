const db = require('../db/connection');

exports.fetchSnacks = (sortby = 'snack_name', maxprice, category_id) => {
  const validSortBys = {
    price: 'price_in_pence',
    snack_name: 'snack_name',
  };

  if (!(sortby in validSortBys)) {
    return Promise.reject({
      status: 400,
      message: 'Invalid sort by query!!!!',
    });
  }

  let query = `SELECT * FROM snacks`;
  const values = [];

  if (category_id) {
    query += `
    JOIN snacks_categories
    ON snacks_categories.snack_id = snacks.snack_id
    WHERE category_id = $${values.length + 1}
    `;
    values.push(category_id);
  }

  if (maxprice !== undefined) {
    query += ` WHERE price_in_pence < $${values.length + 1}`;
    values.push(maxprice);
  }
  query += ` ORDER BY ${validSortBys[sortby]};`;

  return db.query(query, values).then(({ rows }) => {
    return rows;
  });
};

exports.fetchSnackById = (id) => {
  return db
    .query(`SELECT * FROM snacks WHERE snack_id=$1;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: 'id not found!' });
      } else {
        return rows[0];
      }
    });
};

exports.createSnack = (snack_name, price_in_pence, is_vegan) => {
  return db
    .query(
      `INSERT INTO snacks 
                    (snack_name, price_in_pence, is_vegan)
                    VALUES ($1, $2, $3) RETURNING*;`,
      [snack_name, price_in_pence, is_vegan]
    )
    .then(({ rows }) => {
      const newSnack = rows[0];
      return newSnack;
    });
};

exports.updateSnack = (snack_id, price_in_pence) => {
  return db
    .query(
      `
    UPDATE snacks
    SET price_in_pence = $1
    WHERE snack_id = $2
    RETURNING *;
  `,
      [price_in_pence, snack_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
