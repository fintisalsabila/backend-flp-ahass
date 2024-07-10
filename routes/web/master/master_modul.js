var MasterModul = require('../../../controllers/web/master/master_modul');
var masterModul = new MasterModul();

module.exports = {
    configure: function(app) {
        app.route('/MasterModul/Index').get(masterModul.selectModul);
        app.route('/MasterModul/Add').get(masterModul.addModulForm);
        app.route('/MasterModul/AddSubmit').post(masterModul.submitInsertModul);
        app.route('/MasterModul/Edit').get(masterModul.editModulForm);
        app.route('/MasterModul/EditSubmit/:id').post(masterModul.submitUpdateModul);
        app.route('/MasterModul/Delete').get(masterModul.deleteModul);
        app.route('/MasterModul/View').get(masterModul.viewForm);
    }
};