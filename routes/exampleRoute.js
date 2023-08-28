module.exports = function (app, db) {
  app.get("/test", function (req, res) {
    res.send("test11");
    if (db) {
      db.run(
        "INSERT INTO users (name, email, password) VALUES (?,?,?)",
        [req.body.name, req.body.email, req.body.password],
        (err) => {
          if (err) {
            res.status(500).send(err.message);
          }
        }
      );
    }
  });
};
