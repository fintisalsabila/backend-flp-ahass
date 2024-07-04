var connection = require("../../../config/db_prod");
var uuidv1 = require('uuid/v1');

function MasterModul() {
    this.addModulForm = function(req, res) {
        res.render('master_modul/add');
    };

    this.submitInsertModul = function(req, res) {
        var IdModul = uuidv1();
        var modulName = req.body.modulName;
        var fileUpload = req.files[0].filename

        console.log("ratri" + JSON.stringify(req.files))
        console.log("ratrii" + fileUpload)

        if (!fileUpload) {
            return res.status(400).send('File upload failed.');
        }

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('INSERT INTO master_modul (IdModul, modulName, fileUpload) VALUES (?, ?, ?)', [IdModul, modulName, fileUpload], function(err, results) {
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
            if (err) {
                console.log(err);
                return res.render('master_modul/index', {
                    title: 'Data Master Modul',
                    data: [],
                    message: 'Error fetching data'
                });
            }
            con.query('SELECT * FROM master_modul', function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    return res.render('master_modul/index', {
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

    this.editModulForm = function(req, res) {
        var IdModul = req.query.id;

        connection.acquire(function(err, con) {
            if (err) {
                console.log(err);
                return res.redirect('/MasterModul/Index');
            }
            con.query('SELECT * FROM master_modul WHERE IdModul = ?', [IdModul], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    return res.redirect('/MasterModul/Index');
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
        var IdModul = req.params.id;
        var modulName = req.body.modulName;
        var fileUpload = req.file ? req.file.filename : req.body.oldFile; 

        connection.acquire(function(err, con) {
            if (err) {
                console.log(err);
                return res.redirect('/MasterModul/Edit?id=' + IdModul);
            }
            con.query('UPDATE master_modul SET modulName = ?, fileUpload = ? WHERE IdModul = ?', [modulName, fileUpload, IdModul], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    return res.redirect('/MasterModul/Edit?id=' + IdModul);
                } else {
                    res.redirect('/MasterModul/Index');
                }
            });
        });
    };

    this.deleteModul = function(req, res) {
        var IdModul = req.query.id;

        connection.acquire(function(err, con) {
            if (err) {
                console.log(err);
                return res.redirect('/MasterModul/Index');
            }
            con.query('DELETE FROM master_modul WHERE IdModul = ?', [IdModul], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    return res.redirect('/MasterModul/Index');
                } else {
                    res.redirect('/MasterModul/Index');
                }
            });
        });
    };
}

module.exports = MasterModul;