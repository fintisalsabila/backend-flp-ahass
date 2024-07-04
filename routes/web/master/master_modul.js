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
        app.get('/MasterModul/Index', masterModul.selectModul);
        app.get('/MasterModul/Add', masterModul.addModulForm);
        app.post('/MasterModul/AddSubmit', upload.single('fileUpload'), masterModul.submitInsertModul);
        app.get('/MasterModul/Edit', masterModul.editModulForm);
        app.post('/MasterModul/EditSubmit/:id', upload.single('fileUpload'), masterModul.submitUpdateModul);
        app.get('/MasterModul/Delete', masterModul.deleteModul);
    }
};