//Auth : Lely
var connection = require("../../../config/db_prod");

function Todo() {
    var xlstojson = require("xls-to-json-lc");
    var xlsxtojson = require("xlsx-to-json-lc");
    this.selectMasterQuiz = function(req, res, next) {
        var id = req.query.id;
        var toast = req.query.toast;
        if (id != null) {
            detailMasterQuiz(req, res, next);
            return;
        }
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM master_quiz_questions order by created_at desc', function(err, rows) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    var datas = [];

                    rows.forEach(function(element, index) {
                        var periode = dateFormat(element.periode, "yyyy-mm-dd");
                        var created = dateFormat(element.created_at, "yyyy-mm-dd");
                        rows[index].periode = periode;
                        rows[index].created = created;
                        datas.push(rows[index]);
                    });

                    obj = datas;

                    if (toast != null) {
                        if (toast == 'add') {
                            res.render('master_quiz/index', { obj: obj, message: 'Add Data Success' });
                        } else if (toast == 'edit') {
                            res.render('master_quiz/index', { obj: obj, message: 'Update Data Success' });
                        } else if (toast == 'upload') {
                            res.render('master_quiz/index', { obj: obj, message: 'Upload Data Success' });
                        } else {
                            res.render('master_quiz/index', { obj: obj, message: 'Delete Data Success' });
                        }
                    } else {
                        res.render('master_quiz/index', { obj: obj, message: null });
                    }
                }
            });
        });
    };

    this.insertMasterQuiz = function(req, res) {
        var toast = req.query.toast;
        if (toast != null) {
            if (toast == 'error') {
                res.render('master_quiz/add', { message: 'File Tidak Sesuai (Harus file .xls/.xlsx)' });
            }
            if (toast == 'date_error') {
                res.render('master_quiz/add', { message: 'Pastikan Jumlah Tanggal Dan Data Sesuai (1 Hari = 5 pertanyaan)' });
            }
            if (toast == 'kosong') {
                res.render('master_quiz/add', { message: 'Nama, alamat, hp tidak boleh kosong' });
            }
            if (toast == 'question') {
                res.render('master_quiz/add', { message: 'Pertanyaan tidak boleh kosong (1 Hari = 5 Pertanyaan)' });
            }
            if (toast == 'option_a') {
                res.render('master_quiz/add', { message: 'Option A tidak boleh kosong' });
            }
            if (toast == 'option_b') {
                res.render('master_quiz/add', { message: 'Option B tidak boleh kosong' });
            }
            if (toast == 'option_c') {
                res.render('master_quiz/add', { message: 'Option C tidak boleh kosong' });
            }
            if (toast == 'option_d') {
                res.render('master_quiz/add', { message: 'Option D tidak boleh kosong' });
            }
            if (toast == 'answer') {
                res.render('master_quiz/add', { message: 'Jawaban tidak boleh kosong' });
            }
            if (toast == 'point') {
                res.render('master_quiz/add', { message: 'Poin tidak boleh kosong' });
            }
        } else {
            res.render('master_quiz/add', { message: null });
        }
    };

    this.submitInsertMasterQuiz = function(req, res) {


        var id = uuidv1();
        var detail = req.body.detail;
        // console.log(req.body);
        // return;
        connection.acquire(function(err, con) {
            var insertedData = [];
            var elements = detail;
            // console.log(elements);
            // return;
            var start = new Date(req.body.start);
            var end = new Date(req.body.end);
            var bonusPoin = req.body.bonuspoin;

            var timeDiff = Math.abs(end.getTime() - start.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var totalDays = diffDays + 1;
            var totalData = elements.length / 5;
            console.log(totalDays);
            console.log(totalData);
            // return;

            if (totalDays != totalData) {
                res.redirect('/MasterQuiz/Add?toast=' + 'date_error');
            } else {
                for (var i = 0; i < elements.length; i++) {
                    if (!elements[i].question) {
                        res.redirect('/MasterQuiz/Add?toast=' + 'question');
                        return;
                    }

                    if (!elements[i].option_a) {
                        res.redirect('/MasterQuiz/Add?toast=' + 'option_a');
                        return;
                    }

                    if (!elements[i].option_b) {
                        res.redirect('/MasterQuiz/Add?toast=' + 'option_b');
                        return;
                    }
                    if (!elements[i].option_c) {
                        res.redirect('/MasterQuiz/Add?toast=' + 'option_c');
                        return;
                    }
                    if (!elements[i].option_d) {
                        res.redirect('/MasterQuiz/Add?toast=' + 'option_d');
                        return;
                    }

                    if (!elements[i].answer) {
                        res.redirect('/MasterQuiz/Add?toast=' + 'answer');
                        return;
                    }

                    if (!elements[i].point) {
                        res.redirect('/MasterQuiz/Add?toast=' + 'point');
                        return;
                    }

                    if (i % 5 == 0 && i > 0) {
                        start.setDate(start.getDate() + 1);
                    }

                    elements[i].id = uuidv1();
                    elements[i].created = new Date();
                    elements[i].modified = new Date();
                    elements[i].created_by = req.session.user.id;
                    elements[i].modified_by = req.session.user.id;
                    elements[i].periode = new Date(start);
                    elements[i].bonus_poin = bonusPoin;

                    var temp = []
                    temp.push(elements[i].id);
                    temp.push(elements[i].question);
                    temp.push(elements[i].periode);
                    temp.push(elements[i].bonus_poin);
                    temp.push(elements[i].option_a);
                    temp.push(elements[i].option_b);
                    temp.push(elements[i].option_c);
                    temp.push(elements[i].option_d);
                    temp.push(elements[i].option_e);
                    temp.push(elements[i].answer);
                    temp.push(elements[i].point);
                    temp.push(elements[i].created);
                    temp.push(elements[i].modified);
                    temp.push(elements[i].created_by);
                    temp.push(elements[i].modified_by);
                    insertedData.push(temp);

                }
                // console.log(insertedData);
                // return;
                con.query("INSERT INTO master_quiz_questions (id, question, periode,bonus_poin, option_a, option_b, option_c, option_d, option_e, answer, poin, created_at, modified_at,created_by,modified_by ) VALUES ?", [insertedData], function(err, rows) {
                    con.release();
                    if (err) {
                        console.log(err);
                        res.json(err);
                    } else {
                        res.redirect('/MasterQuiz/Index?toast=' + 'add');
                    }
                });
            }

        });
    }

    function detailMasterQuiz(req, res, next) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('SELECT * from master_quiz_questions WHERE id =  "' + id + '"', function(err, rows) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    var datas = [];

                    rows.forEach(function(element, index) {
                        var periode = dateFormat(element.periode, "yyyy-mm-dd");

                        rows[index].periode = periode;
                        datas.push(rows[index]);
                    });

                    obj = datas;
                    res.render('master_quiz/view', { obj: obj });
                }
            });
        });
    };

    this.uploadMasterQuiz = function(req, res) {
        var toast = req.query.toast;
        if (toast != null) {
            if (toast == 'error') {
                res.render('master_quiz/upload', { message: 'File Tidak Sesuai (Harus file .xls/.xlsx)' });
            }
            if (toast == 'date_error') {
                res.render('master_quiz/upload', { message: 'Pastikan Jumlah Tanggal Dan Data Sesuai (1 Hari = 5 pertanyaan)' });
            }
            if (toast == 'kosong') {
                res.render('master_quiz/upload', { message: 'Nama, alamat, hp tidak boleh kosong' });
            }
            if (toast == 'question') {
                res.render('master_quiz/upload', { message: 'Pertanyaan tidak boleh kosong (1 Hari = 5 Pertanyaan)' });
            }
            if (toast == 'option_a') {
                res.render('master_quiz/upload', { message: 'Option A tidak boleh kosong' });
            }
            if (toast == 'option_b') {
                res.render('master_quiz/upload', { message: 'Option B tidak boleh kosong' });
            }
            if (toast == 'option_c') {
                res.render('master_quiz/upload', { message: 'Option C tidak boleh kosong' });
            }
            if (toast == 'option_d') {
                res.render('master_quiz/upload', { message: 'Option D tidak boleh kosong' });
            }
            if (toast == 'answer') {
                res.render('master_quiz/upload', { message: 'Jawaban tidak boleh kosong' });
            }
            if (toast == 'point') {
                res.render('master_quiz/upload', { message: 'Poin tidak boleh kosong' });
            }
        } else {
            res.render('master_quiz/upload', { message: null });
        }
    };

    this.submitUploadMasterQuiz = function(req, res) {
        var exceltojson;

        if ((!req.files && req.files.length == 0) && !req.file) {
            console.log({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        var size = req.files.length;
        if (req.files.length == 0) {
            res.redirect('/MasterQuiz/Add?toast=' + 'error');
        } else {
            if (req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            console.log(req.files[0].path);
            try {
                exceltojson({
                    input: req.files[0].path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders: true
                }, function(err, excelJson) {
                    if (err) {
                        return res.status(400);
                    }
                    connection.acquire(function(err, con) {
                        var insertedData = [];
                        var elements = excelJson;

                        var start = new Date(req.body.start);
                        var end = new Date(req.body.end);
                        var bonusPoin = req.body.bonuspoin;

                        var timeDiff = Math.abs(end.getTime() - start.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        var totalDays = diffDays + 1;
                        var totalData = elements.length / 5;
                        console.log(totalDays);
                        console.log(totalData);
                        // return;

                        if (totalDays != totalData) {
                            res.redirect('/MasterQuiz/Upload?toast=' + 'date_error');
                        } else {
                            for (var i = 0; i < elements.length; i++) {
                                if (!elements[i].question) {
                                    res.redirect('/MasterQuiz/Upload?toast=' + 'question');
                                    return;
                                }

                                if (!elements[i].option_a) {
                                    res.redirect('/MasterQuiz/Upload?toast=' + 'option_a');
                                    return;
                                }

                                if (!elements[i].option_b) {
                                    res.redirect('/MasterQuiz/Upload?toast=' + 'option_b');
                                    return;
                                }
                                if (!elements[i].option_c) {
                                    res.redirect('/MasterQuiz/Upload?toast=' + 'option_c');
                                    return;
                                }
                                if (!elements[i].option_d) {
                                    res.redirect('/MasterQuiz/Upload?toast=' + 'option_d');
                                    return;
                                }

                                if (!elements[i].answer) {
                                    res.redirect('/MasterQuiz/Upload?toast=' + 'answer');
                                    return;
                                }

                                if (!elements[i].point) {
                                    res.redirect('/MasterQuiz/Upload?toast=' + 'point');
                                    return;
                                }

                                if (i % 5 == 0 && i > 0) {
                                    start.setDate(start.getDate() + 1);
                                }

                                elements[i].id = uuidv1();
                                elements[i].created = new Date();
                                elements[i].modified = new Date();
                                elements[i].created_by = req.session.user.id;
                                elements[i].modified_by = req.session.user.id;
                                elements[i].periode = new Date(start);
                                elements[i].bonus_poin = req.body.bonuspoin;

                                var temp = []
                                temp.push(elements[i].id);
                                temp.push(elements[i].question);
                                temp.push(elements[i].periode);
                                temp.push(elements[i].bonus_poin);
                                temp.push(elements[i].option_a);
                                temp.push(elements[i].option_b);
                                temp.push(elements[i].option_c);
                                temp.push(elements[i].option_d);
                                temp.push(elements[i].option_e);
                                temp.push(elements[i].answer);
                                temp.push(elements[i].point);
                                temp.push(elements[i].created);
                                temp.push(elements[i].modified);
                                temp.push(elements[i].created_by);
                                temp.push(elements[i].modified_by);
                                insertedData.push(temp);

                            }
                            // console.log(insertedData);
                            // return;
                            con.query("INSERT INTO master_quiz_questions (id, question, periode, bonus_poin, option_a, option_b, option_c, option_d, option_e, answer, poin, created_at, modified_at,created_by,modified_by ) VALUES ?", [insertedData], function(err, rows) {
                                con.release();
                                if (err) {
                                    console.log(err);
                                    res.json(err);
                                } else {
                                    res.redirect('/MasterQuiz/Index?toast=' + 'upload');
                                }
                            });
                        }

                    });
                });
            } catch (e) {
                res.redirect('/MasterQuiz/Upload?toast=' + 'error');
            }
        }
    }

    this.editMasterQuiz = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM master_quiz_questions WHERE id = "' + id + '"', function(err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    var datas = [];

                    rows.forEach(function(element, index) {
                        var periode = dateFormat(element.periode, "yyyy-mm-dd");
                        rows[index].periode = periode;
                        datas.push(rows[index]);
                    });

                    obj = datas;
                    res.render('master_quiz/edit', { obj: obj });
                }
            });
        });
    };

    this.submitEditMasterQuiz = function(req, res) {

        var id = req.query.id;
        var question = req.body.question;
        var periode = req.body.periode;
        var option_a = req.body.option_a;
        var option_b = req.body.option_b;
        var option_c = req.body.option_c;
        var option_d = req.body.option_d;
        var option_e = req.body.option_e;
        var answer = req.body.answer;
        var point = req.body.point;
        var modified_at = new Date();
        var modi_by = req.session.user.id;

        connection.acquire(function(err, con) {
            con.query('UPDATE master_quiz_questions SET question = ?, periode =?, option_a = ?, option_b = ?,option_c = ?,option_d = ?, option_e = ?, answer = ?, poin = ?,modified_at = ?, modified_by = ? WHERE id = "' + id + '"', [question, periode, option_a, option_b, option_c, option_d, option_e, answer, point, modified_at, modi_by], function(err, result) {
                if (err) {
                    res.send({ status: 400, message: 'Master quiz update failed' });
                } else {
                    res.redirect('/MasterQuiz/Index?toast=' + 'edit');
                }
            });
        });
    };

    this.deleteMasterQuiz = function(req, res) {
        var id = req.query.id;
        connection.acquire(function(err, con) {
            con.query('DELETE FROM master_quiz_questions WHERE id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.redirect('/MasterQuiz/Index?toast=' + 'failedDelete');
                } else {
                    res.redirect('/MasterQuiz/Index?toast=' + 'delete');
                }
            });
        });
    };

}
module.exports = new Todo();