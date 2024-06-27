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
    if (!this.pool) {
      this.pool = mysql.createPool(konek);
    }
  };

  this.acquire = function (callback) {
    this.init();
    this.pool.getConnection(function (err, connection) {
      if (err) {
        console.error('Error getting database connection:', err);
        return callback(err, null);
      }
      callback(null, connection);
    });
  };
}

module.exports = new Connection();

//   this.init = function () {
//     this.pool = mysql.createPool(konek);
//   };

//   this.acquire = function (callback) {
//     this.init();
//     this.pool.getConnection(function (err, connection) {
//       callback(err, connection);
//     });
//   };
// }
// module.exports = new Connection();
