var connection = require("../../../config/db_prod");
var uuidv1 = require('uuid/v1');

function MasterModul() {
    this.addModulForm = function(req, res) {
        res.render('master_modul/add');
    };

    this.submitInsertModul = function(req, res) {
        var IdModul = uuidv1();
        var modulName = req.body.modulName;
        var fileUpload = req.files[0].filename;
        var createdAt = new Date();
        var createdBy = req.session.user.id;
        var modifiedAt = new Date();
        var modifiedBy = req.session.user.id;

        if (!fileUpload) {
            return res.status(400).send('File upload failed.');
        }

        connection.acquire(function(err, con) {
            if (err) throw err;
            // Fetch the maximum IdModul to calculate the next IdModul
            con.query('SELECT MAX(IdModul) AS maxId FROM master_modul', function(err, results) {
                if (err) {
                    con.release();
                    console.log(err);
                    return res.status(500).send('Failed to get max IdModul.');
                }
                var maxId = results[0].maxId;
                var IdModul = maxId ? (parseInt(maxId) + 1) : 50000;

                con.query('INSERT INTO master_modul (IdModul, modulName, fileUpload, createdAt, createdBy, modifiedAt, modifiedBy) VALUES (?, ?, ?, ?, ?, ?, ?)', [IdModul, modulName, fileUpload, createdAt, createdBy, modifiedAt, modifiedBy], function(err, results) {
                    con.release();
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Failed to insert data.');
                    } else {
                        res.redirect('/MasterModul/Index');
                    }
                });
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

    this.viewForm = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_modul WHERE IdModul = ?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_modul/view', {
                        title: 'View Data Master Modul',
                        data: results[0]
                    });
                }
            });
        });
    };
}

module.exports = MasterModul;