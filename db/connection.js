const { Pool } = require('pg');

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set!');
}

const db = new Pool();

db.query('SELECT * FROM snacks;').then((res) => {
  console.log(res.rows);
  return db.end();
});

module.exports = db;
