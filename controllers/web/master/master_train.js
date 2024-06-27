var connection = require("../../../config/db_prod");
var request = require('request');
var uuidv1 = require('uuid/v1');

function MasterTrain() {
    this.addForm = function(req, res) {
        res.render('master_training/add');
    };

    this.submitInsertMasterTrain = function(req, res) {
        var id = uuidv1();
        var trainingName = req.body.trainingName;
        var participant = req.body.participant;
        var trainingStartDate = req.body.trainingStartDate;
        var trainingEndDate = req.body.trainingEndDate;
        var modul = req.body.modul;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('INSERT INTO master_training SET?', { IdTraining: id, trainingName, participant, trainingStartDate, trainingEndDate, modul }, function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/master_training');
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
                        data: results
                    });
                }
            });
        });
    };

    this.editForm = function(req, res) {
        var id = req.params.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_training WHERE IdTraining =?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_training/edit', {
                        title: 'Edit Data Master Training',
                        data: results[0]
                    });
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
        var modul = req.body.modul;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('UPDATE master_training SET? WHERE IdTraining =?', [{ trainingName, participant, trainingStartDate, trainingEndDate, modul }, id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/master_training');
                }
            });
        });
    };

    this.deleteMasterTrain = function(req, res) {
        var id = req.params.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('DELETE FROM master_training WHERE IdTraining =?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/master_training');
                }
            });
        });
    };
}

module.exports = MasterTrain;