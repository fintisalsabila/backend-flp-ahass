var connection = require("../../../config/db_prod");
var uuidv1 = require('uuid/v1');

function MasterModul() {
    // Modul CRUD
    this.addModulForm = function(req, res) {
        res.render('master_modul/add');
    };

    this.submitInsertModul = function(req, res) {
        var idModul = uuidv1();
        var modulName = req.body.modulName;
        var fileUpload = req.file.filename;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('INSERT INTO master_modul (IdModul, modulName, modulFile) VALUES (?, ?, ?)', [id, modulName, fileUpload], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterModul/Index');
                }
            });
        });
    };

    this.selectModul = function(req, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_modul', function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_modul/index', {
                        title: 'Data Master Modul',
                        data: results,
                        message: null
                    });
                }
            });
        });
    };

    this.editModulForm = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_modul WHERE IdModul = ?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_modul/edit', {
                        title: 'Edit Data Master Modul',
                        data: results[0]
                    });
                }
            });
        });
    };

    this.submitUpdateModul = function(req, res) {
        var idModul = req.params.id;
        var modulName = req.body.modulName;
        var fileUpload = req.file ? req.file.filename : req.body.oldFile;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('UPDATE master_modul SET modulName = ?, modulFile = ? WHERE IdModul = ?', [modulName, fileUpload, id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterModul/Index');
                }
            });
        });
    };

    this.deleteModul = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('DELETE FROM master_modul WHERE IdModul = ?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterModul/Index');
                }
            });
        });
    };
}

module.exports = MasterModul;
