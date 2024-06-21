var mysql = require("mysql");

function Connection() {
  this.pool = null;

  var konek = {
    host: "localhost",
    user: "root",
    password: "",
    database: "flp_ahass",
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
