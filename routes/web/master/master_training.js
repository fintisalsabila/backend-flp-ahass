var MasterTraining = require('../../../controllers/web/master/master_training');
var masterTraining = new MasterTraining();

module.exports = {
    configure: function(app) {
        app.route('/MasterTraining/Index').get(masterTraining.selectMasterTrain);
        app.route('/MasterTraining/Add').get(masterTraining.addForm);
        app.route('/MasterTraining/AddSubmit').post(masterTraining.submitInsertMasterTrain);
        app.route('/MasterTraining/Edit').get(masterTraining.editForm);
        app.route('/MasterTraining/EditSubmit/:id').post(masterTraining.submitUpdateMasterTrain);
        app.route('/MasterTraining/Delete').get(masterTraining.deleteMasterTrain);
    }
}
