//Auth : Inne
var index = require('./../../controllers/web/index');

module.exports = {
    configure: function(app) {
        app.route('/').get(index.home);
        app.route('/login').get(index.login);
        app.route('/login').post(index.submitLogin);
        app.route('/logout').get(index.logout);
        // if (responseObject.status == 'Access denied') {
        app.route('/error404').get(index.error404);
        // app.route('/dashboard').post(index.dashboard);
        // }
    },
};