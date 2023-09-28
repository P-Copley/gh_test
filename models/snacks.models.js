const db = require("../db/connection")

exports.fetchSnacks = () => {
  return db.query("SELECT * FROM snacks;").then(({ rows }) => {
    return rows
  })
}

exports.fetchSnackById = (id) => {
  return db
    .query(`SELECT * FROM snacks WHERE snack_id=$1;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "id not found!"})
      } else {
        return rows[0];
      }
    })
}

exports.createSnack = (snack_name, price_in_pence, is_vegan) => {
  return db.query(
    `INSERT INTO snacks 
                    (snack_name, price_in_pence, is_vegan)
                    VALUES ($1, $2, $3) RETURNING*;`,
    [snack_name, price_in_pence, is_vegan]
  )
  .then(({rows}) => {
    const newSnack = rows[0]
    return newSnack
  })
}
