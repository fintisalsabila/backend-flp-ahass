// Auth: Nina, Lely
var MasterTrain = require('../../../controllers/web/master/master_train');

var masterTrain = new MasterTrain();

module.exports = {
    configure: function(app) {
        app.route('/MasterTrain/Index').get(masterTrain.selectMasterTrain);
        app.route('/MasterTrain/Add').get(masterTrain.addForm);
        app.route('/MasterTrain/AddSubmit').post(masterTrain.submitInsertMasterTrain);
        app.route('/MasterTrain/Edit').get(masterTrain.editForm);
        app.route('/MasterTrain/EditSubmit').post(masterTrain.submitUpdateMasterTrain);
        app.route('/MasterTrain/Delete').get(masterTrain.deleteMasterTrain);
    }
}