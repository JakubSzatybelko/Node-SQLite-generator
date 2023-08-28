module.exports = function (app, db) {
  const { getAllTables, getAllColumns, getAllRows } = require('../DB-viewer/index');
  app.get('/tables', (req, res) => {
    getAllTables(db, (tables) => {
      res.send(tables);
    });
  });
  app.get('/columns/:tableName', (req, res) => {
    getAllColumns(db, req.params.tableName, (columns) => {
      res.send(columns);
    });
  });
  app.get('/rows/:tableName', (req, res) => {
    getAllRows(db, req.params.tableName, (rows) => {
      res.send(rows);
    });
  });
}