// Desc: This file is used to seed the database with data
const seeds = require('../objects/seeds.json');

module.exports = function (db) {
  //loop through the seeds and insert them into the database
  seeds.forEach((seed) => {
    let fields = seed.fields;
    db.run("INSERT INTO " + seed.tableName + " (" + Object.keys(fields).join(",") + ") VALUES (" + Object.values(fields).join(",") + ")");
  });
}