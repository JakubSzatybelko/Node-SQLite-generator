module.exports = function objectMapper(db, objectMap) {
  objectMap.forEach(function (object) {
    let columns = [];
    Object.keys(object.fields).forEach(function (key) {
      columns.push({ tableName: key, dataType: object.fields[key] });
    });
    let sqlString = "CREATE TABLE IF NOT EXISTS " + object.name + " ( id INTEGER PRIMARY KEY AUTOINCREMENT, " + columns.map(function (column) {
      return column.tableName + " " + column.dataType;
    }
    ).join(",") + ");";
    db.run(sqlString, (err) => {
      if (err) throw err;
      console.log(object.name, " Table created");
    }
    );
  });
}