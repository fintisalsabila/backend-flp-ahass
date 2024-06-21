// Auth: Nina, Lely
var master_user = require('../../../controllers/web/master/master_user');

module.exports = {
    configure: function(app) {
        app.route('/MasterUser/Index').get(master_user.selectMasterUser);
        app.route('/MasterUser/Add').get(master_user.insertMasterUser);
        app.route('/MasterUser/AddSubmit').post(master_user.submitInsertMasterUser);
        app.route('/MasterUser/Edit').get(master_user.editMasterUser);
        app.route('/MasterUser/EditSubmit').post(master_user.submitEditMasterUser);
        app.route('/MasterUser/Delete').get(master_user.deleteMasterUser);

        //tambahan untuk select LOV
        app.route('/MasterUser/SelectHondaID').get(master_user.selectHondaID);
        app.route('/MasterUser/SelectBranchAll').get(master_user.selectBranchAll);
        app.route('/MasterUser/SelectAhassAll').get(master_user.selectAhassAll);
        app.route('/MasterUser/SelectSupervisorByBranch').get(master_user.selectSupervisorByBranch);
        app.route('/MasterUser/SelectSalesmanByHondaID').get(master_user.selectSalesmanByHondaID);

        //tambahan untuk user driver dan pdiman (untuk tracking delivery)
        app.route('/MasterUser/SelectDriver').get(master_user.selectDriver);

        //untuk employee ahass. created by inne
        app.route('/MasterUser/SelectEmployee').get(master_user.selectEmployee);
    }
}