//Auth : Ratri
var login = require('../../controllers/api/login');

module.exports = {
    configure: function(app) {
        app.route('/ahass_login').post(login.loginAhass);
    }
};