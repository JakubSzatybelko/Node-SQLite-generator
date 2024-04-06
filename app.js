const { json } = require('express')
const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const port = 3001
const path = require('path');
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

app.get('/', (req, res) => {
  res.type('.html');
  res.sendFile(path.join(__dirname + '/DB-viewer/website/index.html'));
})
app.get('/src/index.js', (req, res) => {
  res.type('.js');
  res.sendFile(path.join(__dirname + '/DB-viewer/website/src/index.js'));
})
app.get('/src/style.css', (req, res) => {
  res.type('.css');
  res.sendFile(path.join(__dirname + '/DB-viewer/website/src/style.css'));
})


app.use(function (req, res) {
  res.status(404);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
