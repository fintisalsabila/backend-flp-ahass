// Auth: Nina, Lely
var MasterTraining = require('../../../controllers/web/master/master_training');

var MasterTraining = new MasterTraining();

module.exports = {
    configure: function(app) {
        app.route('/MasterTraining/Index').get(MasterTraining.selectMasterTrain);
        app.route('/MasterTraining/Add').get(MasterTraining.addForm);
        app.route('/MasterTraining/AddSubmit').post(MasterTraining.submitInsertMasterTrain);
        app.route('/MasterTraining/Edit').get(MasterTraining.editForm);
        app.route('/MasterTraining/EditSubmit').post(MasterTraining.submitUpdateMasterTrain);
        app.route('/MasterTraining/Delete').get(MasterTraining.deleteMasterTrain);
    }
}