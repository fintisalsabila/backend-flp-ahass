var connection = require("../../../config/db_prod");

function MasterOrderTools() {
    this.addForm = function (req, res) {
        res.render('master_ordertools/add', { title: 'Add New Order Tool' });
    };

    this.editForm = function (req, res) {
        var id = req.query.id;
        connection.acquire(function (err, con) {
            if (err) throw err;
            con.query('SELECT * FROM catalog_tools WHERE IdOrderTool = ?', [id], function (err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.render('master_ordertools/edit', { data: {} });
                } else {
                    res.render('master_ordertools/edit', { data: results[0] });
                }
            });
        });
    };

    this.submitInsertOrderTool = function (req, res) {
        var tool_image = req.body.tool_image;
        var tool_part_number = req.body.tool_part_number;
        var tool_name = req.body.tool_name;
        var price = req.body.price;
        var stock = req.body.stock;
        var createdAt = new Date();

        connection.acquire(function (err, con) {
            if (err) throw err;

            con.query('INSERT INTO catalog_tools SET ?', {
                tool_image: tool_image,
                tool_part_number: tool_part_number,
                tool_name: tool_name,
                price: price,
                stock: stock,
                created_at: createdAt,
                updated_at: createdAt
            }, function (err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.redirect('/MasterOrderTools/Add');
                } else {
                    res.redirect('/MasterOrderTools/Index');
                }
            });
        });
    };

    this.submitUpdateOrderTool = function (req, res) {
        var id = req.params.id;
        var tool_image = req.body.tool_image;
        var tool_part_number = req.body.tool_part_number;
        var tool_name = req.body.tool_name;
        var price = req.body.price;
        var stock = req.body.stock;
        var updatedAt = new Date();

        connection.acquire(function (err, con) {
            if (err) throw err;

            con.query('UPDATE catalog_tools SET ? WHERE IdOrderTool = ?', [{
                tool_image: tool_image,
                tool_part_number: tool_part_number,
                tool_name: tool_name,
                price: price,
                stock: stock,
                updated_at: updatedAt
            }, id], function (err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.redirect('/MasterOrderTools/Edit?id=' + id);
                } else {
                    res.redirect('/MasterOrderTools/Index');
                }
            });
        });
    };

    this.selectOrderTools = function (req, res) {
        connection.acquire(function (err, con) {
            if (err) throw err;
            con.query('SELECT * FROM catalog_tools', function (err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.render('master_ordertools/index', {
                        title: 'Data Master Order Tools',
                        data: results,
                        message: null
                    });
                }
            });
        });
    };

    this.deleteOrderTool = function (req, res) {
        var id = req.query.id;
        connection.acquire(function (err, con) {
            if (err) throw err;
            con.query('DELETE FROM catalog_tools WHERE IdOrderTool = ?', [id], function (err, results) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/MasterOrderTools/Index');
                }
            });
        });
    };

    this.viewForm = function (req, res) {
        var id = req.query.id;
        connection.acquire(function (err, con) {
            if (err) throw err;
            con.query('SELECT * FROM catalog_tools WHERE IdOrderTool = ?', [id], function (err, results) {
                con.release();
                if (err) {
                    console.log(err);
                    res.render('master_ordertools/view', { title: 'View Order Tool Data', data: {} });
                } else {
                    res.render('master_ordertools/view', { title: 'View Order Tool Data', data: results[0] });
                }
            });
        });
    };
}

module.exports = MasterOrderTools;