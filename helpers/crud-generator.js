module.exports = function (app, db, objectMap) {
  objectMap.forEach(function (object) {
    // GET ALL
    app.get("/" + object.name, function (req, res) {
      db.all("SELECT * FROM " + object.name, (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        }
        res.send(rows);
      });
    }
    );
    // GET ONE
    app.get("/" + object.name + "/:id", function (req, res) {
      db.all("SELECT * FROM " + object.name + " WHERE id = ?", [req.params.id], (err, rows) => {
        if (err) {
          res.status(500).send(err.message);
        }
        res.send(rows);
      });
    });
    // CREATE
    app.post("/" + object.name, function (req, res) {
      let columns = [];
      let values = [];
      Object.keys(object.fields).forEach(function (key) {
        columns.push(key);
        values.push(req.body[key]);
      });
      let sqlString = "INSERT INTO " + object.name + " (" + columns.join(",") + ") VALUES (" + columns.map(function (column) {
        return "?";
      }
      ).join(",") + ")";
      db.run(sqlString, values, (err) => {
        if (err) {
          res.status(500).send(err.message);
        }
        res.send("success");
      });
    });

    // UPDATE
    app.put("/" + object.name + "/:id", function (req, res) {
      let columns = [];
      let values = [];
      Object.keys(object.fields).forEach(function (key) {
        columns.push(key + " = ?");
        values.push(req.body[key]);
      });
      let sqlString = "UPDATE " + object.name + " SET " + columns.join(",") + " WHERE id = ?";
      db.run(sqlString, [...values, req.params.id], (err) => {
        if (err) {
          res.status(500).send(err.message);
        }
        res.send("success");
      });
    });
    // DELETE
    app.delete("/" + object.name + "/:id", function (req, res) {
      db.run("DELETE FROM " + object.name + " WHERE id = ?", [req.params.id], (err) => {
        if (err) {
          res.status(500).send(err.message);
        }
        res.send("success");
      }
      );
    });
  });
}