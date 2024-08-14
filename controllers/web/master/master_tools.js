var connection = require("../../../config/db_prod");
var path = require('path');

function MasterTools() {
    this.addForm = function(req, res) {
        res.render('master_tools/add', { title: 'Add New Tool' });
    };

    this.editForm = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_tools WHERE IdTool = ?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.render('master_tools/edit', { data: {} });
                } else {
                    res.render('master_tools/edit', { data: results[0] });
                }
            });
        });
    };

    this.submitInsertMasterTool = function(req, res) {
        var tool_name = req.body.tool_name;
        var tool_detail = req.body.tool_detail;
        var status = req.body.status;
        var createdAt = new Date();
        var createdBy = req.session.user.id;

        connection.acquire(function(err, con) {
            if (err) throw err;

            con.query('INSERT INTO master_tools SET ?', {
                tool_name: tool_name,
                tool_detail: tool_detail,
                status: status,
                created_at: createdAt,
                created_by: createdBy,
                updated_at: createdAt
            }, function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.redirect('/MasterTools/Add');
                } else {
                    res.redirect('/MasterTools/Index');
                }
            });
        });
    };

    this.submitUpdateMasterTool = function(req, res) {
        var id = req.params.id;
        var tool_name = req.body.tool_name;
        var tool_detail = req.body.tool_detail;
        var status = req.body.status;
        var updatedAt = new Date();

        connection.acquire(function(err, con) {
            if (err) throw err;

            con.query('UPDATE master_tools SET ? WHERE IdTool = ?', [{
                tool_name: tool_name,
                tool_detail: tool_detail,
                status: status,
                updated_at: updatedAt
            }, id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.redirect('/MasterTools/Edit?id=' + id);
                } else {
                    res.redirect('/MasterTools/Index');
                }
            });
        });
    };

    this.selectMasterTools = function(req, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_tools', function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_tools/index', {
                        title: 'Data Master Tools',
                        data: results,
                        message: null
                    });
                }
            });
        });
    };

    this.deleteMasterTool = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('DELETE FROM master_tools WHERE IdTool =?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterTools/Index');
                }
            });
        });
    };

    this.viewForm = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_tools WHERE IdTool = ?', [id], function(err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.render('master_tools/view', { title: 'View Tool Data', data: {} });
                } else {
                    res.render('master_tools/view', { title: 'View Tool Data', data: results[0] });
                }
            });
        });
    };
}

module.exports = MasterTools;
