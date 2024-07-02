var connection = require("../../../config/db_prod");
var uuidv1 = require('uuid/v1');

function MasterModul() {
    this.addModulForm = function(req, res) {
        res.render('master_modul/add');
    };

    this.submitInsertModul = function(req, res) {
        var idModul = uuidv1();
        var modulName = req.body.modulName;
        var fileUpload = req.file ? req.file.filename : null; // Assuming 'fileUpload' is the name attribute of file input in the form

        if (!fileUpload) {
            return res.status(400).send('File upload failed.');
        }

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('INSERT INTO master_modul (IdModul, modulName, file) VALUES (?, ?, ?)', [idModul, modulName, fileUpload], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.status(500).send('Database error.');
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
                    res.render('master_modul/index', {
                        title: 'Data Master Modul',
                        data: [],
                        message: 'Error fetching data'
                    });
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

    // Render edit module form
    this.editModulForm = function(req, res) {
        var idModul = req.query.id;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_modul WHERE IdModul = ?', [idModul], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.redirect('/MasterModul/Index'); // Redirect to index with error message
                } else {
                    res.render('master_modul/edit', {
                        title: 'Edit Data Master Modul',
                        data: results[0]
                    });
                }
            });
        });
    };

    // Handle submission of updated module with file upload
    this.submitUpdateModul = function(req, res) {
        var idModul = req.params.id;
        var modulName = req.body.modulName;
        var fileUpload = req.file ? req.file.filename : req.body.oldFile; 
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('UPDATE master_modul SET modulName = ?, file = ? WHERE IdModul = ?', [modulName, fileUpload, idModul], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.redirect('/MasterModul/Edit?id=' + idModul); 
                } else {
                    res.redirect('/MasterModul/Index');
                }
            });
        });
    };

    // Delete module
    this.deleteModul = function(req, res) {
        var idModul = req.query.id;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('DELETE FROM master_modul WHERE IdModul = ?', [idModul], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.redirect('/MasterModul/Index');
                } else {
                    res.redirect('/MasterModul/Index');
                }
            });
        });
    };
}

module.exports = MasterModul;
