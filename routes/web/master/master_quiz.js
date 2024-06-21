// Auth: Lely
var master_quiz = require('../../../controllers/web/master/master_quiz');

module.exports = {
    configure: function(app) {
        app.route('/MasterQuiz/Index').get(master_quiz.selectMasterQuiz);
        app.route('/MasterQuiz/Add').get(master_quiz.insertMasterQuiz);
        app.route('/MasterQuiz/AddSubmit').post(master_quiz.submitInsertMasterQuiz);
        app.route('/MasterQuiz/UploadSubmit').post(master_quiz.submitUploadMasterQuiz);
        app.route('/MasterQuiz/Upload').get(master_quiz.uploadMasterQuiz);
        app.route('/MasterQuiz/Edit').get(master_quiz.editMasterQuiz);
        app.route('/MasterQuiz/EditSubmit').post(master_quiz.submitEditMasterQuiz);
        app.route('/MasterQuiz/Delete').get(master_quiz.deleteMasterQuiz);
    }
};