const db = require('../db/connection');

exports.fetchCategoryById = (category_id) => {
  return db
    .query(`SELECT * FROM categories WHERE category_id = $1`, [category_id])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, message: 'not found' });
      } else {
        return result.rows[0];
      }
    });
};
