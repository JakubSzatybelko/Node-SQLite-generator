var fs = require('fs');

module.exports = function (app, db) {
  fs.readdirSync("./routes").forEach(function (file) {
    var name = file.substring(0, file.indexOf('.'));//remove .js extension from filenames
    require('../routes/' + name)(app, db);
  });
}