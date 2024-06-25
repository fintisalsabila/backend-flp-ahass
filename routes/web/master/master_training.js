// Auth: Nina, Lely
var master_user = require('../../../controllers/web/master/master_user');

module.exports = {
    configure: function(app) {
        app.route('/MasterTraining/Index').get(master_user.selectMasterTraining);
        app.route('/MasterTraining/Add').get(master_user.insertMasterTraining);
        app.route('/MasterTraining/AddSubmit').post(master_user.submitInsertMasterTraining);
        app.route('/MasterTraining/Edit').get(master_user.editMasterTraining);
        app.route('/MasterTraining/EditSubmit').post(master_user.submitEditMasterTraining);
        app.route('/MasterTraining/Delete').get(master_user.deleteMasterTraining);

        //tambahan untuk select LOV
        app.route('/MasterTraining/SelectHondaID').get(master_user.selectHondaID);
        app.route('/MasterTraining/SelectBranchAll').get(master_user.selectBranchAll);
        app.route('/MasterTraining/SelectAhassAll').get(master_user.selectAhassAll);
        app.route('/MasterTraining/SelectSupervisorByBranch').get(master_user.selectSupervisorByBranch);
        app.route('/MasterTraining/SelectSalesmanByHondaID').get(master_user.selectSalesmanByHondaID);

        //tambahan untuk user driver dan pdiman (untuk tracking delivery)
        app.route('/MasterTraining/SelectDriver').get(master_user.selectDriver);

        //untuk employee ahass. created by inne
        app.route('/MasterTraining/SelectEmployee').get(master_user.selectEmployee);
    }
}