//Auth : Ratri
var connection = require("../../../config/db_prod");

var request = require('request');

function Todo() {

    //created by inne
    this.selectEmployee = function(req, res) {
        var ahassCode = req.query.ahassCode;
        console.log(ahassCode);
        request({
            uri: baseHostAhass + baseUrlAhass + 'api_karyawan_branch.php?branch_code=' + ahassCode,
            auth: {
                'bearer': '71D55F9957524'
            },
            rejectUnauthorized: false, //add when working with https sites
            requestCert: false, //add when working with https sites
            agent: false, //add when working with https sites

        }, function(error, LOVEmployee) {
            if (error) {
                console.log(error);
            } else {
                var data_employee = JSON.parse(LOVEmployee.body);
                objEmployee = data_employee.data;

                var page = null;
                var totalData = objEmployee.length;
                var totalPage = totalData / 10;
                var currPage = 0;
                for (var i = 0; i < objEmployee.length; i++) {
                    if (i % 10 == 0) {
                        currPage = currPage + 1;
                        objEmployee[i].page = currPage;
                    } else {
                        currPage = currPage;
                        objEmployee[i].page = currPage;
                    }
                }
                // console.log(objCoba);
                res.send({ data: objEmployee });
            }
        });
    };


    this.selectDriver = function(req, res) {
        var noDlr = req.query.nodlr;
        // noDlr = "059";
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * FROM master_driver WHERE branch_code =  "'+noDlr+'" ORDER BY nama_driver desc', function(err, dataDriver) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    objDriver =  JSON.parse(JSON.stringify(dataDriver));
                    console.log(dataDriver);
                    
                    var page = null;
                    var totalData = objDriver.length;
                    var totalPage = totalData / 10;
                    var currPage = 0;
                    for (var i = 0; i < objDriver.length; i++) {
                        if (i % 10 == 0) {
                            currPage = currPage + 1;
                            objDriver[i].page = currPage;
                        } else {
                            currPage = currPage;
                            objDriver[i].page = currPage;
                        }
                    }
                    console.log(objDriver);
                   
                    res.send({ data: objDriver });
                }
            })
        });
    };

    this.selectMasterUser = function(req, res, next) {
        var id = req.query.id;
        var toast = req.query.toast;

        if (id != null) {
            detailMasterUser(req, res, next);
            return;
        }
        connection.acquire(function(err, con) {
            con.query('SELECT u.id, u.name, u.email, u.phone_number, u.branch_name,u.ahass_name, u.username, g.title,u.honda_id FROM users u, groups g WHERE u.group_id = g.group_id and u.versi = "1" order by created_at desc', function(err, rows) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(JSON.stringify(rows));
                    if (toast != null) {
                        if (toast == 'add') {
                            res.render('master_user/index', { obj: obj, message: 'Add Data Success' });
                        } else if (toast == 'add_failed') {
                            res.render('master_user/index', { obj: obj, message: 'Add Data Failed' });
                        } else if (toast == 'edit') {
                            res.render('master_user/index', { obj: obj, message: 'Update Data Success' });
                        } else if (toast == 'delete') {
                            res.render('master_user/index', { obj: obj, message: 'Delete Data Success' });
                        } else if (toast == 'sama') {
                            res.render('master_user/index', { obj: obj, message: 'Username Sudah Ada' });
                        } else if (toast == 'kosong') {
                            res.render('master_user/index', { obj: obj, message: 'Data Gagal Disimpan, Data DMS Tidak Lengkap !' });
                        }
                    } else {
                        res.render('master_user/index', { obj: obj, message: null });
                    }
                }
            });
        });
    }

    this.insertMasterUser = function(req, res) {

        var id_branch = req.body.branch_id;
        // console.log(id_branch);
        var honda = req.query.honda;

        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT group_id, title FROM groups', function(err, dataGroup) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    request({
                        uri: baseHostDMS + baseUrlDMS + 'api_salesmen_all.php',
                        auth: {
                            'bearer': '71D55F9957524'
                        },
                        rejectUnauthorized: false, //add when working with https sites
                        requestCert: false, //add when working with https sites
                        agent: false, //add when working with https sites

                    }, function(error, LOVSlsmn) {
                        if (error) {
                            console.log(error);
                        } else {
                            var data_sls = JSON.parse(LOVSlsmn.body);
                            objSls = data_sls.data;
                            // console.log(LOVBranch);
                            console.log(dataGroup);
                            objGroup = JSON.parse(JSON.stringify(dataGroup));
                            objHondaID = null;

                            // console.log(objHondaID.listSalesman[0].Hondaid.honda_id);
                            res.render('master_user/add');
                        }
                    });
                }
            })
        });
    };

    this.selectHondaID = function(req, res) {
        var noDlr = req.query.nodlr;
        console.log(noDlr);
        request({
            uri: baseHostIntranet + baseUrlIntranet + 'salesmens/getSalesman/' + noDlr,
            json: true,
        }, function(error, LovHondaID) {
            if (error) {
                console.log(error);
            } else {
                objCoba = JSON.parse(JSON.stringify(LovHondaID.body));
                console.log(objCoba);
                // res.render('master_user/dialog_add', { objHondaID: objCoba });

                var page = null;
                var totalData = objCoba.listSalesman.length;
                var totalPage = totalData / 10;
                var currPage = 0;
                for (var i = 0; i < objCoba.listSalesman.length; i++) {
                    if (i % 10 == 0) {
                        currPage = currPage + 1;
                        objCoba.listSalesman[i].page = currPage;
                    } else {
                        currPage = currPage;
                        objCoba.listSalesman[i].page = currPage;
                    }
                }
                console.log(objCoba);
                res.send({ data: objCoba });
            }
        });
    };

    this.selectSupervisorByBranch = function(req, res) {
        var noDlr = req.query.nodlr;
        request({
            uri: baseHostDMS + baseUrlDMS + 'api_supervisor.php?branch_id=' + noDlr,
            auth: {
                'bearer': '71D55F9957524'
            },
            rejectUnauthorized: false, //add when working with https sites
            requestCert: false, //add when working with https sites
            agent: false, //add when working with https sites

        }, function(error, LOVBranch) {
            if (error) {
                console.log(error);
            } else {
                var data_branch = JSON.parse(LOVBranch.body);
                objSupervisor = data_branch.data;

                var page = null;
                var totalData = objSupervisor.length;
                var totalPage = totalData / 10;
                var currPage = 0;
                for (var i = 0; i < objSupervisor.length; i++) {
                    if (i % 10 == 0) {
                        currPage = currPage + 1;
                        objSupervisor[i].page = currPage;
                    } else {
                        currPage = currPage;
                        objSupervisor[i].page = currPage;
                    }
                }
                // console.log(objCoba);
                res.send({ data: objSupervisor });
            }
        });
    };

    this.selectBranchAll = function(req, res) {
        request({
            uri: baseHostDMS + baseUrlDMS + 'api_branch_all.php',
            auth: {
                'bearer': '71D55F9957524'
            },
            rejectUnauthorized: false, //add when working with https sites
            requestCert: false, //add when working with https sites
            agent: false, //add when working with https sites

        }, function(error, LOVBranch) {
            if (error) {
                console.log(error);
            } else {
                var data_branch = JSON.parse(LOVBranch.body);
                objBranch = data_branch.data;

                var page = null;
                var totalData = objBranch.length;
                var totalPage = totalData / 10;
                var currPage = 0;
                for (var i = 0; i < objBranch.length; i++) {
                    if (i % 10 == 0) {
                        currPage = currPage + 1;
                        objBranch[i].page = currPage;
                    } else {
                        currPage = currPage;
                        objBranch[i].page = currPage;
                    }
                }
                // console.log(objCoba);
                res.send({ data: objBranch });
            }
        });
    };

    this.selectAhassAll = function(req, res) {
        request({
            uri: baseHostAhass + baseUrlAhass + 'api_ahass_all.php',
            auth: {
                'bearer': '71D55F9957524'
            },
            rejectUnauthorized: false, //add when working with https sites
            requestCert: false, //add when working with https sites
            agent: false, //add when working with https sites

        }, function(error, LOVAhass) {
            if (error) {
                console.log(error);
            } else {
                var data_ahass = JSON.parse(LOVAhass.body);
                objAhass = data_ahass.data;

                var page = null;
                var totalData = objAhass.length;
                var totalPage = totalData / 10;
                var currPage = 0;
                for (var i = 0; i < objAhass.length; i++) {
                    if (i % 10 == 0) {
                        currPage = currPage + 1;
                        objAhass[i].page = currPage;
                    } else {
                        currPage = currPage;
                        objAhass[i].page = currPage;
                    }
                }
                // console.log(objCoba);
                res.send({ data: objAhass });
            }
        });
    };

    this.selectSalesmanByHondaID = function(req, res) {
        var hondaID = req.query.honda_id;
        request({
            uri: baseHostDMS + baseUrlDMS + 'api_salesman_byhondaid.php?honda_id=' + hondaID,
            auth: {
                'bearer': '71D55F9957524'
            },
            rejectUnauthorized: false, //add when working with https sites
            requestCert: false, //add when working with https sites
            agent: false, //add when working with https sites

        }, function(error, LOVSlsmn) {
            if (error) {
                console.log(error);
            } else {
                var data_sls = JSON.parse(LOVSlsmn.body);
                objSls = data_sls.data;

                var page = null;
                var totalData = objSls.length;
                var totalPage = totalData / 10;
                var currPage = 0;
                for (var i = 0; i < objSls.length; i++) {
                    if (i % 10 == 0) {
                        currPage = currPage + 1;
                        objSls[i].page = currPage;
                    } else {
                        currPage = currPage;
                        objSls[i].page = currPage;
                    }
                }
                // console.log(objCoba);
                res.send({ data: objSls });
            }
        });
    };

    //Updated by Anggi 6/1/2021
    //Updated by inne Jul2021
    this.submitInsertMasterUser = function(req, res) {
        var id = uuidv1();
        var name = req.body.name;
        var username = req.body.username;
        var password = "1234567890";
        var validpass = md5(password);
        var email = null;
        var phone_number = null;
        var birth_date = "1990-01-01";
        var gender = null;
        var branch_id = req.body.branch_id;
        var branch_name = req.body.branch_name;
        var branch_code = req.body.branch_code;
        var supervisor_nama = req.body.supervisor_nama;
        var sls_nama = req.body.sls_nama;
        var sls_kode = req.body.sls_kode;
        var status_user = req.body.status_user;
        var group_id = req.body.group_id;
        var salesman_id = req.body.salesman_id;
        var supervisor_id = req.body.supervisor_id;
        var created_at = new Date();
        var created_by = req.session.user.id;
        var modified_at = new Date();
        var modi_by = req.session.user.id;
        var driver_id = req.body.driver_id;

        var ahass_id = req.body.ahass_id;
        var ahass_name = req.body.ahass_name;
        var ahass_code = req.body.ahass_code;

        var employee_id = req.body.employee_id;
        var employee_nama = req.body.employee_nama;
        var employee_kode = req.body.employee_kode;
        var emp_kode = req.body.emp_kode;
        var emp_nama = req.body.emp_nama;
        var honda_id = req.body.honda_id;
        var dataStall = req.body.stall_code;

        var versi = "1";

        var status_aktivasi = null;

        if(group_id=="ea22e39e-0590-11e8-9702-ac220be6ac47"){//salesman
             status_aktivasi = "T";

        }else if(group_id=="ea16bbd9-0590-11e8-9702-ac220be6ac47"){//supervisor
         status_aktivasi = "T";
            
        }else if(group_id=="ea047b9b-0590-11e8-9702-ac220be6ac47"){//admin dealer
         status_aktivasi = "T";
            
        }else {
            status_aktivasi = null;
        }



        if ((branch_code=='')&&(ahass_code=='')){

        	connection.acquire(function(err, con) {

                                if (err) throw err;
                                con.query('SELECT username FROM users WHERE username = "' + username + '"', function(err, data) {
                                    con.release();
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    } else {
                                        console.log(data.length);
                                        if (data.length != 0) {
                                            res.redirect('/MasterUser/Index?toast=' + 'sama');
                                        } else {

                                            connection.acquire(function(err, con) {
                                                con.query('INSERT INTO users (id, name, username,password,email,phone_number,birth_date,gender,branch_id,branch_name,branch_code, group_id,supervisor_id,supervisor_nama, salesman_id, sls_nama,sls_kode, status_user, created_at,created_by,modified_at,modi_by, versi, driver_id,status_aktivasi,ahass_id,ahass_code,ahass_name,employee_id,employee_kode,employee_nama,honda_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, name, username, validpass, email, phone_number, birth_date, gender, branch_id, branch_name, branch_code, group_id, supervisor_id, supervisor_nama, salesman_id, sls_nama, sls_kode, status_user, created_at, created_by, modified_at, modi_by, versi, driver_id,status_aktivasi,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                                    con.release();
                                                    if (err) {
                                                        console.log(err);
                                                        // res.send({ status: 400, message: 'Master user creation failed' });
                                                        res.redirect('/MasterUser/Index?toast=' + 'add_failed');
                                                    } else {
                                                        res.redirect('/MasterUser/Index?toast=' + 'add');
                                                    }
                                                });
                                            });
                                        }
                                    }
                                });
            });
        }
        else if (branch_code==''){
            // edited by inne 14sep 21
            request({
                uri: baseHostAhass + baseUrlAhass + 'api_karyawan_byid.php?branch_id=' + ahass_id+'&id_karyawan='+ employee_id,
                auth: {
                'bearer': '71D55F9957524'
                  },
                  rejectUnauthorized: false,//add when working with https sites
                  requestCert: false,//add when working with https sites
                  agent: false,//add when working with https sites

            }, function(error, resultKaryawan) {
                connection.acquire(function(err, con) {
                    if (err) throw err;
                    con.query('SELECT employee_kode FROM users WHERE employee_kode = "' + emp_kode + '"', function(err, data) {
                        con.release();
                        if (err) {
                            console.log(err);
                            throw err;
                        } else {
                            console.log(data.length);
                            if (data.length != 0) {
                                res.redirect('/MasterUser/Index?toast=' + 'sama');
                            } else {
                                connection.acquire(function(err, con) {
                                    con.query('INSERT INTO users (id, name, username,password,email,phone_number,birth_date,gender,branch_id,branch_name,branch_code, group_id,supervisor_id,supervisor_nama, salesman_id, sls_nama,sls_kode, status_user, created_at,created_by,modified_at,modi_by, versi, driver_id,status_aktivasi,ahass_id,ahass_code,ahass_name,employee_id,employee_kode,employee_nama,honda_id,stall_code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, name, username, validpass, email, phone_number, birth_date, gender, branch_id, branch_name, branch_code, group_id, supervisor_id, supervisor_nama, salesman_id, sls_nama, sls_kode, status_user, created_at, created_by, modified_at, modi_by, versi, driver_id,status_aktivasi,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id,dataStall], function(err, result) {
                                        con.release();
                                        if (err) {
                                            console.log(err);
                                            // res.send({ status: 400, message: 'Master user creation failed' });
                                            res.redirect('/MasterUser/Index?toast=' + 'add_failed');
                                        } else {
                                            res.redirect('/MasterUser/Index?toast=' + 'add');
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            });

        }else{

            connection.acquire(function(err, con) {
                                if (err) throw err;
                                con.query('SELECT username FROM users WHERE username = "' + username + '"', function(err, data) {
                                    con.release();
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    } else {
                                        console.log(data.length);
                                        if (data.length != 0) {
                                            res.redirect('/MasterUser/Index?toast=' + 'sama');
                                        } else {
                                            connection.acquire(function(err, con) {
                                                con.query('INSERT INTO users (id, name, username,password,email,phone_number,birth_date,gender,branch_id,branch_name,branch_code, group_id,supervisor_id,supervisor_nama, salesman_id, sls_nama,sls_kode, status_user, created_at,created_by,modified_at,modi_by, versi, driver_id,status_aktivasi,ahass_id,ahass_code,ahass_name,employee_id,employee_kode,employee_nama,honda_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, name, username, validpass, email, phone_number, birth_date, gender, branch_id, branch_name, branch_code, group_id, supervisor_id, supervisor_nama, salesman_id, sls_nama, sls_kode, status_user, created_at, created_by, modified_at, modi_by, versi, driver_id,status_aktivasi,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                                    con.release();
                                                    if (err) {
                                                        console.log(err);
                                                        // res.send({ status: 400, message: 'Master user creation failed' });
                                                        res.redirect('/MasterUser/Index?toast=' + 'add_failed');
                                                    } else {
                                                        res.redirect('/MasterUser/Index?toast=' + 'add');
                                                    }
                                                });
                                            });
                                        }
                                    }
                                });
            });

        }











    }

    this.editMasterUser = function(req, res) {
        var id = req.query.id;
        var ahass_code = req.query.ahass_code;

        // const dateformat = require('dateformat');
        // let now = new Date();
        // dateformat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT u.id, u.name, u.username, u.email, u.phone_number, u.gender, u.birth_date, u.supervisor_id, u.supervisor_nama, u.status_user, u.group_id, g.title as group_name, u.sls_nama, u.sls_kode,u.branch_id, u.branch_code, u.branch_name,u.ahass_id, u.ahass_code, u.ahass_name,u.employee_id,u.employee_kode,u.employee_nama,u.honda_id FROM users u LEFT OUTER JOIN groups g ON u.group_id = g.group_id WHERE u.id ="' + id + '" ORDER BY modified_at desc', function(err, rows) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    console.log(rows);
                    connection.acquire(function(err, con) {
                        if (err) throw err;
                        con.query('SELECT group_id, title FROM groups', function(err, dataGroup) {
                            con.release();
                            if (err) {
                                console.log(err);
                            } else {
                                // connection.acquire(function(err, con) {
                                //     if (err) throw err;
                                //     con.query('SELECT sv.id, sv.supervisor_nama, bc.name as branch_name FROM supervisors sv, branches bc WHERE bc.id = sv.branch_id order by supervisor_nama desc', function(err, dataSupervisor) {
                                //         con.release();
                                //         if (err) {
                                //             console.log(err);
                                //         } else {
                                //             connection.acquire(function(err, con) {
                                //                 if (err) throw err;
                                //                 con.query('SELECT s.id, s.sls_nama, sp.supervisor_nama, b.name as branch_name FROM salesmen s LEFT OUTER JOIN supervisors sp ON s.supervisor_id = sp.id LEFT OUTER JOIN branches b ON s.branch_id = b.id order by sls_nama desc', function(err, dataLOV) {
                                //                     con.release();
                                //                     if (err) {
                                //                         console.log(err);
                                //                     } else {
                                //                         connection.acquire(function(err, con) {
                                //                             if (err) throw err;
                                //                             con.query('SELECT id, name FROM branches', function(err, dataBranch) {
                                //                                 con.release();
                                //                                 if (err) {
                                //                                     console.log(err);
                                //                                 } else {

                                //                                 }
                                //                             });
                                //                         });
                                //                     }
                                //                 });
                                //             });
                                //         }
                                //     });
                                // });


                                                                    request({
                                                                        uri: baseHostAhass + baseUrlAhass + 'api_ahass_all.php',
                                                                        auth: {
                                                                            'bearer': '71D55F9957524'
                                                                        },
                                                                        rejectUnauthorized: false, //add when working with https sites
                                                                        requestCert: false, //add when working with https sites
                                                                        agent: false, //add when working with https sites

                                                                    }, function(error, LOVAhass) {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        } else {
                                                                            var data_ahass = JSON.parse(LOVAhass.body);
                                                                            objAhass = data_ahass.data;

                                                                            var page = null;
                                                                            var totalData = objAhass.length;
                                                                            var totalPage = totalData / 10;
                                                                            var currPage = 0;
                                                                            for (var i = 0; i < objAhass.length; i++) {
                                                                                if (i % 10 == 0) {
                                                                                    currPage = currPage + 1;
                                                                                    objAhass[i].page = currPage;
                                                                                } else {
                                                                                    currPage = currPage;
                                                                                    objAhass[i].page = currPage;
                                                                                }
                                                                            }
                                                                            // console.log(objCoba);
                                                                            // res.send({ data: objAhass });
                                                                 


                                                                            //awal
                                                                            // objBranch = JSON.parse(JSON.stringify(dataBranch));
                                                                            for (i = 0; i < rows.length; i++) {
                                                                                if (rows[i]["phone_number"] == null) {
                                                                                    rows[i]["phone_number"] = "";
                                                                                }

                                                                                if (rows[i]["email"] == null) {
                                                                                    rows[i]["email"] = "";
                                                                                }
                                                                            }
                                                                            obj = JSON.parse(JSON.stringify(rows));
                                                                            // objLOV = JSON.parse(JSON.stringify(dataLOV));
                                                                            // objSupervisor = JSON.parse(JSON.stringify(dataSupervisor));
                                                                            objGroup = JSON.parse(JSON.stringify(dataGroup));
                                                                            res.render('master_user/edit', { obj: obj, objGroup: objGroup,data: objAhass });
                                                                            //batas lama

                                                                                   }
                                                                            });
                                                                            //akhir

                            }
                        })
                    });

                }
            });
        });
    };


    // update by inne
    this.submitEditMasterUser = function(req, res) {
        var id = req.query.id;
        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;
        var validpass = md5(password);
        var email = req.body.email;
        var phone_number = req.body.phone_number;
        var birth_date = req.body.birth_date;
        var gender = req.body.gender;
        var branch_id = req.body.branch_id;
        var branch_name = req.body.branch_name;
        var branch_code = req.body.branch_code;
        var salesman_id = req.body.salesman_id;
        var sls_nama = req.body.sls_nama;
        var sls_kode = req.body.sls_kode;
        var status_user = req.body.status_user;
        var group_id = req.body.group_id;
        var salesman_id = req.body.salesman_id;
        var supervisor_id = req.body.supervisor_id;
        var supervisor_nama = req.body.supervisor_nama;
        var created_at = new Date();
        var created_by = req.session.user.id;
        var modified_at = new Date();
        var modi_by = req.session.user.id;
        //added by inne
        var ahass_id = req.body.ahass_id;
        var ahass_name = req.body.ahass_name;
        var ahass_code = req.body.ahass_code;

        var employee_id = req.body.employee_id;
        var employee_nama = req.body.employee_nama;
        var emp_kode = req.body.emp_kode;
        var honda_id = req.body.honda_id;

        var dataStall = req.body.stall_code;
        // console.log(branch_code);
        // console.log(77);

        if ((branch_code=='')&&(ahass_code=='')){
        	                if(password == ""){
                    if(status_user=="T"){
                                    status_aktivasi = "T";
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, status_aktivasi = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?   WHERE id = "' + id + '"', [name, username, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,status_aktivasi,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }else if(status_user=="A"){
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ? WHERE id = "' + id + '"', [name, username, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }
                } else {
                    if(status_user=="T"){
                                    status_aktivasi = "T";
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, password = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, status_aktivasi = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?  WHERE id = "' + id + '"', [name, username, validpass, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,status_aktivasi,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }else if(status_user=="A"){
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, password = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?  WHERE id = "' + id + '"', [name, username, validpass, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }
                }

        }else if (branch_code==''){
            if(password == ""){
                if(status_user=="T"){
                    status_aktivasi = "T";
                    connection.acquire(function(err, con) {
                        con.query('UPDATE users set name = ?, username = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, status_aktivasi = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?, stall_code = ?   WHERE id = "' + id + '"', [name, username, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,status_aktivasi,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id,dataStall], function(err, result) {
                            con.release();
                            if (err) {
                                console.log(err);
                                res.send({ status: 400, message: 'Master user update failed' });
                            } else {
                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                            }
                        });
                    });
                }else if(status_user=="A"){
                    connection.acquire(function(err, con) {
                        con.query('UPDATE users set name = ?, username = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?, stall_code = ? WHERE id = "' + id + '"', [name, username, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id,dataStall], function(err, result) {
                            con.release();
                            if (err) {
                                console.log(err);
                                res.send({ status: 400, message: 'Master user update failed' });
                            } else {
                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                            }
                        });
                    });
                }
            } else {
                if(status_user=="T"){
                    status_aktivasi = "T";
                    connection.acquire(function(err, con) {
                        con.query('UPDATE users set name = ?, username = ?, password = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, status_aktivasi = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?, stall_code = ?  WHERE id = "' + id + '"', [name, username, validpass, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,status_aktivasi,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id,dataStall], function(err, result) {
                            con.release();
                            if (err) {
                                console.log(err);
                                res.send({ status: 400, message: 'Master user update failed' });
                            } else {
                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                            }
                        });
                    });
                }else if(status_user=="A"){
                    connection.acquire(function(err, con) {
                        con.query('UPDATE users set name = ?, username = ?, password = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?,stall_code = ?  WHERE id = "' + id + '"', [name, username, validpass, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id, dataStall], function(err, result) {
                            con.release();
                            if (err) {
                                console.log(err);
                                res.send({ status: 400, message: 'Master user update failed' });
                            } else {
                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                            }
                        });
                    });
                }
            }
        }else{
                if(password == ""){
                    if(status_user=="T"){
                                    status_aktivasi = "T";
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, status_aktivasi = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?   WHERE id = "' + id + '"', [name, username, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,status_aktivasi,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }else if(status_user=="A"){
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ? WHERE id = "' + id + '"', [name, username, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }
                } else {
                    if(status_user=="T"){
                                    status_aktivasi = "T";
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, password = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, status_aktivasi = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?  WHERE id = "' + id + '"', [name, username, validpass, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,status_aktivasi,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }else if(status_user=="A"){
                                    connection.acquire(function(err, con) {
                                        con.query('UPDATE users set name = ?, username = ?, password = ?, phone_number = ?, birth_date =?, email = ?, gender = ?, branch_name = ?, branch_id = ?, branch_code = ?, status_user = ?,  modified_at = ?, modi_by = ?, supervisor_id = ?, supervisor_nama = ?, salesman_id = ?, sls_kode = ?, sls_nama = ?, ahass_id = ?, ahass_code = ?, ahass_name = ?, employee_id = ?, employee_kode = ?, employee_nama = ?, honda_id = ?  WHERE id = "' + id + '"', [name, username, validpass, phone_number, birth_date, email, gender, branch_name, branch_id, branch_code, status_user, modified_at, modi_by, supervisor_id, supervisor_nama,salesman_id,sls_kode,sls_nama,ahass_id,ahass_code,ahass_name,employee_id,emp_kode,employee_nama,honda_id], function(err, result) {
                                            con.release();
                                            if (err) {
                                                console.log(err);
                                                res.send({ status: 400, message: 'Master user update failed' });
                                            } else {
                                                res.redirect('/MasterUser/Index?toast=' + 'edit');
                                            }
                                        });
                                    });
                    }
                }

        }





       

        
    };

    this.deleteMasterUser = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            con.query('DELETE FROM users WHERE id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.send({ status: 400, message: 'Failed to delete master user' });
                } else {
                    res.redirect('/MasterUser/Index?toast=' + 'delete');
                }
            });
        });
    };

    function detailMasterUser(req, res, next) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT u.id, u.name, u.username, u.email, u.phone_number, u.gender, u.birth_date, u.supervisor_nama, g.title as group_name,g.group_id, u.sls_nama, u.status_user, u.branch_name,u.ahass_name,u.honda_id FROM users u LEFT OUTER JOIN groups g ON u.group_id = g.group_id WHERE u.id ="' + id + '" ORDER BY modified_at desc', function(err, rows) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    for (i = 0; i < rows.length; i++) {

                        if (rows[i]["birth_date"] == "0000-00-00") {
                            rows[i]["birth_date"] = "-";
                        } else {
                            var birthdate = dateFormat(rows[i].birth_date, "yyyy-mm-dd");
                            rows[i]["birth_date"] = birthdate;
                        }

                        if (rows[i]["gender"] == null) {
                            rows[i]["gender"] = "-";
                        } else if (rows[i]["gender"] == "") {
                            rows[i]["gender"] = "-";
                        } else {
                            rows[i]["gender"] = rows[i].gender;
                        }

                        if (rows[i]["phone_number"] == null) {
                            rows[i]["phone_number"] = "-";
                        } else if (rows[i]["phone_number"] == "") {
                            rows[i]["phone_number"] = "-";
                        } else {
                            rows[i]["phone_number"] = rows[i].phone_number;
                        }

                        if (rows[i]["email"] == null) {
                            rows[i]["email"] = "-";
                        } else if (rows[i]["email"] == "") {
                            rows[i]["email"] = "-";
                        } else {
                            rows[i]["email"] = rows[i].email;
                        }
                    }
                    obj = JSON.parse(JSON.stringify(rows));
                    res.render('master_user/view', { obj: obj });
                }
            });
        });
    };
}
module.exports = new Todo();