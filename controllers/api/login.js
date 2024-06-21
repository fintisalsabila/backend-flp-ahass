//Auth : Ratri
var connection = require("../../config/db_prod");

function Todo() {
    //tambahan dari nina untuk apps ahas
    this.loginAhass = function(req, res, next) {

        var username = req.body.username;
        var password = req.body.password;
        var validpass = md5(password);
        var last_login = new Date();
        var periode = dateFormat(last_login, "yyyy-mm-dd");

        connection.acquire(function(err, con) {
            var islogin = "1"
            con.query('SELECT u.id, u.username, u.sls_kode, u.name, u.password, u.email, u.phone_number, u.birth_date, u.gender, u.group_id, g.title, u.image, u.salesman_id, u.supervisor_id, u.is_login, u.branch_id, u.branch_code, u.versi, u.sls_nama, u.branch_name, u.ahass_id, u.ahass_code, u.ahass_name, u.employee_id, u.employee_kode, u.employee_nama, u.stall_code FROM users u, groups g WHERE g.group_id = u.group_id AND u.username = ?', [username], function(error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    var is_login = results[0].is_login;
                    if (validpass == results[0].password) {
                        //modified by : hakim
                        var id = results[0].id;
                        con.query('SELECT user_id, last_login FROM logs_login WHERE user_id= "'+ id +'" AND SUBSTR(last_login, 1, 10) = "' + periode + '" ', function(err1, data) {
                            if (err1) throw err1;
                            if(data.length > 0){
                                //update
                                con.query('UPDATE logs_login SET last_login=? WHERE user_id = "' + id + '" AND last_login = "' + data.last_login + '" ', [last_login], function(err2, data) {
                                    if (err2) {
                                        // console.log(err2, "eror 123 update");
                                        // results[0]["status"] = "gagal";
                                        // res.json(results[0]);
                                        // res.status(401);
                                        res.send({ status: 400, message: 'UPDATE failed' });
                                    } else {
                                        // console.log("sukses 123 update");
                                        // console.log(err2, "update");
                                        // results[0]["status"] = "success";
                                        res.json(results[0]);
                                        // res.status(200);
                                        res.send({ status: 200, message: 'UPDATE successfully' });
                                    }
                                });
                            }else {
                                //insert
                                con.query('INSERT INTO logs_login (user_id, last_login) VALUES (?,?)', [id, last_login], function(err, data) {
                                    if (err) {
                                        // console.log('eror 123')
                                        // results[0]["status"] = "gagal";
                                        // res.json(results[0]);
                                        // res.status(401);
                                        res.send({ status: 400, message: 'INSERT failed' });
                                    } else {
                                        // console.log("sukses 123");
                                        // results[0]["status"] = "success";
                                        // res.json(results[0]);
                                        // res.status(200);
                                        res.send({ status: 200, message: 'INSERT successfully' });
                                    }
                                });
                            }
                        });
                        //end modified

                        results[0]["status"] = "success";
                        res.json(results[0]);
                        res.status(200).send();
                        // res.status(200);
                        // res.send({ status: 200, message: 'Login successfully' });
                    } else {
                        results[0]['status'] = "wrong password"
                        res.json(results[0]);
                        res.status(401).send();
                    }
                } else {
                    res.status(401).json({
                        message: "nodata"
                    });
                }
            });
            // con.end();
        });
    }
}

module.exports = new Todo();