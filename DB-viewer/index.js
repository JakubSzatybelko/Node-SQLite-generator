exports.getAllTables = async function (db, callback) {
  //return all the tables in the database
  db.all("SELECT name FROM sqlite_master WHERE type='table'", function (err, tables) {
    callback(tables);
  })
}
exports.getAllColumns = function (db, tableName, callback) {
  //return all the tables in the database
  db.all("PRAGMA table_info(" + tableName + ")", function (err, columns) {
    callback(columns);
  });
}
exports.getAllRows = function (db, tableName, callback) {
  //return all the tables in the database
  db.all("SELECT * FROM " + tableName, function (err, rows) {
    callback(rows);
  });
}