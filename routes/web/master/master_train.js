// Auth: Nina, Lely
var MasterTrain = require('../../../controllers/web/master/master_train');

var masterTrain = new MasterTrain();

module.exports = {
    configure: function(app) {
        app.route('/MasterTraining/Index').get(masterTrain.selectMasterTrain);
        app.route('/MasterTraining/Add').get(masterTrain.addForm);
        app.route('/MasterTraining/AddSubmit').post(masterTrain.submitInsertMasterTrain);
        app.route('/MasterTraining/Edit').get(masterTrain.editForm);
        app.route('/MasterTraining/EditSubmit').post(masterTrain.submitUpdateMasterTrain);
        app.route('/MasterTraining/Delete').get(masterTrain.deleteMasterTrain);
    }
}