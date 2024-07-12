var connection = require("../../../config/db_prod");
var request = require('request');
var uuidv1 = require('uuid/v1');

function MasterTraining() {
    this.addForm = function(req, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT IdModul, modulName FROM master_modul', function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.render('master_training/add', { modules: [] });
                } else {
                    res.render('master_training/add', { modules: results });
                }
            });
        });
    };

    // Ensure the `editForm` method also fetches the `modulName`
    this.editForm = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_training WHERE IdTraining = ?', [id], function(err, trainingResults) {
                if (err) {
                    con.release();
                    console.log(err);
                    res.render('master_training/edit', { data: {}, modules: [] });
                } else {
                    con.query('SELECT IdModul, modulName FROM master_modul', function(err, moduleResults) {
                        con.release();
                        if (err) {
                            console.log(err);
                            res.render('master_training/edit', { data: trainingResults[0], modules: [] });
                        } else {
                            res.render('master_training/edit', { data: trainingResults[0], modules: moduleResults });
                        }
                    });
                }
            });
        });
    };

    this.submitInsertMasterTrain = function(req, res) {
        var id = uuidv1();
        var trainingName = req.body.trainingName;
        var participant = req.body.participant;
        var trainingStartDate = req.body.trainingStartDate;
        var trainingEndDate = req.body.trainingEndDate;
        var createdAt = new Date();
        var createdBy = req.session.user.id;
        var modifiedAt = new Date();
        var modifiedBy = req.session.user.id;
        var status = req.body.status_user;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('INSERT INTO master_training SET ?', { IdTraining: id, trainingName, participant, trainingStartDate, trainingEndDate }, function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterTraining/Index');
                }
            });
        });
    };

    this.submitUpdateMasterTrain = function(req, res) {
        var id = req.params.id;
        var trainingName = req.body.trainingName;
        var participant = req.body.participant;
        var trainingStartDate = req.body.trainingStartDate;
        var trainingEndDate = req.body.trainingEndDate;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('UPDATE master_training SET ? WHERE IdTraining = ?', [{ trainingName, participant, trainingStartDate, trainingEndDate }, id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterTraining/Index');
                }
            });
        });
    };

    this.selectMasterTrain = function(req, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_training', function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_training/index', {
                        title: 'Data Master Training',
                        data: results,
                        message: null
                    });
                }
            });
        });
    };

    // this.editForm = function(req, res) {
    //     var id = req.query.id;
    //     connection.acquire(function(err, con) {
    //         if (err) throw err;
    //         con.query('SELECT * FROM master_training WHERE IdTraining = ?', [id], function(err, results) {
    //             con.release();
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.render('master_training/edit', {
    //                     title: 'Edit Data Master Training',
    //                     data: results[0]
    //                 });
    //             }
    //         });
    //     });
    // };

    // this.submitUpdateMasterTrain = function(req, res) {
    //     var id = req.params.id;
    //     var trainingName = req.body.trainingName;
    //     var participant = req.body.participant;
    //     var trainingStartDate = req.body.trainingStartDate;
    //     var trainingEndDate = req.body.trainingEndDate;
    //     var modulName = req.body.modulName;

    //     connection.acquire(function(err, con) {
    //         if (err) throw err;
    //         con.query('UPDATE master_training SET ? WHERE IdTraining = ?', [{ trainingName, participant, trainingStartDate, trainingEndDate, modulName }, id], function(err, results) {
    //             con.release();
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.redirect('/MasterTraining/Index');
    //             }
    //         });
    //     });
    // };

    this.deleteMasterTrain = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('DELETE FROM master_training WHERE IdTraining = ?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterTraining/Index');
                }
            });
        });
    };

    this.viewForm = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_training WHERE IdTraining = ?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_training/view', {
                        title: 'View Data Master Training',
                        data: results[0]
                    });
                }
            });
        });
    };    
}

module.exports = MasterTraining;