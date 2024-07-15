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
                modifiedBy: modifiedBy
            }, async function(err, results) {
                if (err) {
                    con.release();
                    console.log(err);
                } else {
                    try {
                        for (let modulName of modulNames) {
                            let modulId = await getModulId(modulName, con);
                            if (modulId) {
                                await insertModulTraining(con, {
                                    IdModulTraining: uuidv1(),
                                    IdTraining: id,
                                    IdModul: modulId,
                                    createdAt: createdAt,
                                    createdBy: createdBy,
                                    modifiedAt: modifiedAt,
                                    modifiedBy: modifiedBy
                                });
                            }
                        }
                        con.release();
                        res.redirect('/MasterTraining/Index');
                    } catch (error) {
                        console.log(error);
                        con.release();
                    }
                }
            });
        });
    };

    function getModulId(modulName, con) {
        return new Promise(function(resolve, reject) {
            con.query('SELECT IdModul FROM master_modul WHERE modulName = ?', [modulName], function(err, results) {
                if (err) {
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
    }

    function insertModulTraining(con, data) {
        return new Promise(function(resolve, reject) {
            con.query('INSERT INTO modul_training SET ?', data, function(err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
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
            con.query(`
                SELECT 
                    mt.IdTraining,
                    mt.trainingName,
                    mt.participant,
                    mt.trainingStartDate,
                    mt.trainingEndDate,
                    GROUP_CONCAT(mm.modulName ORDER BY mm.modulName SEPARATOR ', ') AS modulNames
                FROM 
                    master_training mt
                LEFT JOIN 
                    modul_training mtg ON mt.IdTraining = mtg.IdTraining
                LEFT JOIN 
                    master_modul mm ON mtg.IdModul = mm.IdModul
                GROUP BY 
                    mt.IdTraining
            `, function(err, results) {
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