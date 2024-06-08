const { json } = require('express')
const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const port = 3001
const path = require('path');
const fs = require('fs')
var cors = require('cors')
const archiver = require('archiver');

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


app.get('/generate', (req, res) => {
  //read files from the folder appGenerator/src and copy them into the folder out 
  const folder = './appGenerator';
  const out = '/out';
  fs.readdir(folder+ '/src', (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(file => {
      fs.copyFile(folder + '/src/' + file, folder + out + '/' + file, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
    );
  });
  /// then we will generate all the app files

  /// then we will zip the folder out and send it to the user
  const output = fs.createWriteStream(__dirname + '/out.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });
  archive.on('error', function (err) {
    throw err;
  });
  archive.pipe(output);
  archive.directory(folder + out, false);
  archive.finalize();

  res.send('OK');
})


app.use(function (req, res) {
  res.status(404);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
