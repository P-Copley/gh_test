const seed = require("./seed.js");
const data = require("./data/dev-data");
const db = require("./connection.js");

seed(data).then(() => {
  console.log("seed successful");
  return db.end();
});
