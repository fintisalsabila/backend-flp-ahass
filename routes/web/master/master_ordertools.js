var MasterOrderTools = require('../../../controllers/web/master/master_ordertools');
var masterOrderTools = new MasterOrderTools();

module.exports = {
    configure: function (app) {
        app.route('/MasterOrderTools/Index').get(masterOrderTools.selectOrderTools);
        app.route('/MasterOrderTools/Add').get(masterOrderTools.addForm);
        app.route('/MasterOrderTools/AddSubmit').post(masterOrderTools.submitInsertOrderTool);
        app.route('/MasterOrderTools/Edit').get(masterOrderTools.editForm);
        app.route('/MasterOrderTools/EditSubmit/:id').post(masterOrderTools.submitUpdateOrderTool);
        app.route('/MasterOrderTools/Delete').get(masterOrderTools.deleteOrderTool);
        app.route('/MasterOrderTools/View').get(masterOrderTools.viewForm);
    }
};