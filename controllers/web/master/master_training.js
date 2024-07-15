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
        // var status = req.body.status_user;
        var modulNames = req.body.modulName; // array of selected modul names

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('INSERT INTO master_training SET ?', {
                IdTraining: id,
                trainingName: trainingName,
                participant: participant,
                trainingStartDate: trainingStartDate,
                trainingEndDate: trainingEndDate,
                createdAt: createdAt,
                createdBy: createdBy,
                modifiedAt: modifiedAt,
                modifiedBy: modifiedBy,
                // status: status
            }, function(err, results) {
                if (err) {
                    con.release();
                    console.log(err);
                } else {
                    // Insert into modul_training table
                    modulNames.forEach(function(modulName) {
                        var modulId = getModulId(modulName);
                        if (modulId) {
                            con.query('INSERT INTO modul_training SET ?', {
                                IdModulTraining: uuidv1(),
                                IdTraining: id,
                                IdModul: modulId
                            }, function(err, results) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });
                    con.release();
                    res.redirect('/MasterTraining/Index');
                }
            });
        });
    };

    // helper function to get modulId from modulName
    function getModulId(modulName) {
        return new Promise(function(resolve, reject) {
            connection.acquire(function(err, con) {
                if (err) throw err;
                con.query('SELECT IdModul FROM master_modul WHERE modulName = ?', [modulName], function(err, results) {
                    con.release();
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            resolve(results[0].IdModul);
                        } else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }

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