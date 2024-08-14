var MasterTools = require('../../../controllers/web/master/master_tools');
var masterTools = new MasterTools();

module.exports = {
    configure: function(app) {
        app.route('/MasterTools/Index').get(masterTools.selectMasterTools);
        app.route('/MasterTools/Add').get(masterTools.addForm);
        app.route('/MasterTools/AddSubmit').post(masterTools.submitInsertMasterTool);
        app.route('/MasterTools/Edit').get(masterTools.editForm);
        app.route('/MasterTools/EditSubmit/:id').post(masterTools.submitUpdateMasterTool);
        app.route('/MasterTools/Delete').get(masterTools.deleteMasterTool);
        app.route('/MasterTools/View').get(masterTools.viewForm);
    }
};
