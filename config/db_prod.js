var mysql = require("mysql");

function Connection() {
  this.pool = null;

  var konek = {
    host: "",
    user: "root",
    password: "",
    database: "",
  };

  this.init = function () {
    this.pool = mysql.createPool(konek);
  };

  this.acquire = function (callback) {
    this.init();
    this.pool.getConnection(function (err, connection) {
      callback(err, connection);
    });
  };
}
module.exports = new Connection();
