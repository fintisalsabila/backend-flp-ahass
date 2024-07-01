var express = require('express');
var MasterModul = require('../../../controllers/web/master/master_modul');
var masterModul = new MasterModul();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

module.exports = {
    configure: function(app) {
        app.route('/MasterModul/Index').get(masterModul.selectModul);
        app.route('/MasterModul/Add').get(masterModul.addModulForm);
        app.route('/MasterModul/AddSubmit').post(upload.single('fileUpload'), masterModul.submitInsertModul);
        app.route('/MasterModul/Edit').get(masterModul.editModulForm);
        app.route('/MasterModul/EditModulSubmit/:id').post(upload.single('fileUpload'), masterModul.submitUpdateModul);
        app.route('/MasterModul/Delete').get(masterModul.deleteModul);
    }
};
