const { json } = require('express')
const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const port = 3000
var cors = require('cors')

app.use(cors())
app.use(express.json())

myCleanup = function () {
  db.close();
  console.log('cleanup');
};
require('./helpers/cleanup').Cleanup(myCleanup);

let db = new sqlite3.Database('./db.sqlite3', (err) => {
  if (err) { console.error(err.message) }
});

require('./helpers/automaticRouting')(app, db);

const objectMap = require('./objects');

// require('./helpers/objectMaper')(db, objectMap);
// require('./helpers/db-seeder')(db);
require('./helpers/crud-generator')(app, db, objectMap);

app.use(function (req, res) {
  res.status(404);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
