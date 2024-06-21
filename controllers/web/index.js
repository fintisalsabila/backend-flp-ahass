// Updated Ahass : Inne (5 November 2021)
var connection = require('../../config/db_prod');

function Todo() {
    var request = require('request');

    this.home = function(req, res) {
        // connection.acquire(function(err, con) {
        //     res.render('index');
        // });
        request({
            uri: baseHostDMS + baseUrlDMS + 'api_branch_all.php',
            auth: {
                'bearer': '71D55F9957524'
            },
            rejectUnauthorized: false, //add when working with https sites
            requestCert: false, //add when working with https sites
            agent: false, //add when working with https sites

        }, function(error, resultBranch) {
            if (error) {
                console.log(error);
            } else {
                var objBranch = [];
                var user = req.session.user.group_id;
                var user_id = req.session.user.branch_id;


                if (user == "d54c7a36-0590-11e8-9702-ac220be6ac47") {
                    var data_branch = JSON.parse(resultBranch.body);
                    objBranch = data_branch.data;
                    var status = "admin"

                    res.render('index', { message: null, branch_name: branch_name });

                } else {
                    var data_branch = JSON.parse(resultBranch.body);
                    var branch = null;
                    var nameBranch = null;
                    for (var j = 0; j < data_branch.data.length; j++) {
                        var id = data_branch.data[j].id;
                        var branchCode = data_branch.data[j].branch_code;
                        var branchName = data_branch.data[j].branch_name;
                        if (user_id == id) {
                            set2 = { id: id, branch_code: branchCode, branch_name: branchName }
                            objBranch.push(set2);
                            branch = branchCode;
                            nameBranch = branchName;
                        }
                    }
                    var status = "";
                    var branch_name = nameBranch;

                     res.render('index', { message: null, branch_name: branch_name });

                }
            }
        });

    };

    this.login = function(req, res) {
        if (req.session.user) {
            res.redirect("/");
            return;
        }
        var toast = req.query.toast;
        connection.acquire(function(err, con) {
            console.log(err, con);
            if (toast != null) {
                if (toast == 'success') {
                    res.render('./index', { message: 'Login Success' });
                } else if (toast == 'noUser') {
                    res.render('./login', { message: 'User Not Found' });
                } else if (toast == 'password') {
                    res.render('./login', { message: 'Wrong Password' });
                } else if (toast == 'passuser') {
                    res.render('./login', { message: 'Wrong Username Or Password' });
                } else if (toast == 'logout') {
                    res.render('./login', { message: 'Logout Success' });
                }
            } else {
                res.render('./login', { message: null });
            }
        });
    };


    this.submitLogin = function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var validpass = md5(password);
        var last_login = new Date();

        connection.acquire(function(err, con) {
            con.query('SELECT id, versi, branch_id from users where username = ?  ', [username], function(error, results, fields) {
                if (results.length == 0) {
                    res.redirect('/login?toast=' + 'noUser');
                } else {
                    var idUser = results[0].id
                    var branch_id = results[0].branch_id;
                        request.get({
                            uri: baseHostDMS + baseUrlDMS + 'api_branch.php?id=' + branch_id,
                            auth: {
                                'bearer': '71D55F9957524'
                            },
                            rejectUnauthorized: false, //add when working with https sites
                            requestCert: false, //add when working with https sites
                            agent: false, //add when working with https sites
                        }, function(error, response, body) {
                            if (error) {
                                console.log(error);
                            } else {
                                obj = JSON.parse(body);
                                console.log(obj);

                                var company_id = obj.company_id;
                                var company_code = obj.company_code;

                                con.query('SELECT u.id, u.username, u.name, u.password, u.email,u.phone_number, u.birth_date, u.gender, u.group_id, u.salesman_id, g.title, u.is_login, u.branch_id, u.branch_code, u.supervisor_id, versi FROM users u, groups g WHERE g.group_id = u.group_id AND u.username = ? ', [username], function(error, results, fields) {
                                    con.release();
                                    if (error) throw error;
                                    if (results.length > 0) {
                                        if (validpass == results[0].password) {
                                            results[0].company_id = company_id
                                            results[0].company_code = company_code

                                            req.session.user = results[0];
                                            console.log(req.session.user);
                                            req.session.isLogin = true;

                                            req.session.save(function (err) {
                                                if (err) res.status(500).send(err);
                                                res.redirect("/login?toast=" + "success");
                                            });
                                        } else {
                                            res.redirect('/login?toast=' + 'password');
                                        }
                                    } else {
                                        res.redirect('/login?toast=' + 'passuser');
                                    }
                                });
                            }
                        });
                }

            });
        });
    };


    this.logout = function(req, res) {
        if (req.session == null && req.session.user == null) {
            res.redirect('/login');
            return;
        }
        var id = req.session.user.id;
        var last_login = new Date();
     
        req.session.destroy(function(err) {
            console.log(err);
            connection.acquire(function(err, con) {
                con.query('UPDATE users SET is_login="0", last_login=? WHERE id = "' + id + '"', [last_login], function(err, result) {
                    con.release()
                    if (err) {
                        res.redirect('/login?toast=' + 'error logout');
                    } else {
                        res.redirect('/login?toast=' + 'logout');
                    }
                });
            });
        })
    };

    this.error404 = function(req, res) {
        connection.acquire(function(err, con) {
            res.render('error404');
        });
    };
}
module.exports = new Todo();