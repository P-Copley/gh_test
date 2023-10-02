const { Pool } = require("pg");
const dotenv = require("dotenv");

const ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set!");
}

console.log(process.env.PGDATABASE);

const db = new Pool();

module.exports = db;
