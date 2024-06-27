// const connection = require('../../../config/db_prod');

// function MasterTraining() {
//     // Function to retrieve all master training data
//     this.selectMasterTraining = function(req, res) {
//         connection.acquire(function(err, con) {
//             if (err) {
//                 console.error('Error acquiring database connection:', err);
//                 return res.status(500).send('Internal Server Error');
//             }

//             const query = 'SELECT * FROM master_training';
//             con.query(query, function(err, results) {
//                 con.release();
//                 if (err) {
//                     console.error('Error executing query:', err);
//                     return res.status(500).send('Failed to retrieve data');
//                 }
//                 res.render('master_training/index', { data: results });
//             });
//         });
//     };

//     // Function to render the add master training form
//     this.insertMasterTraining = function(req, res) {
//         res.render('master_training/add');
//     };

//     // Function to handle submission of new master training data
//     this.submitInsertMasterTraining = function(req, res) {
//         const data = {
//             trainingName: req.body.trainingName,
//             participant: req.body.participant,
//             trainingStartDate: req.body.trainingStartDate,
//             trainingEndDate: req.body.trainingEndDate,
//             modul: req.body.modul
//         };

//         connection.acquire(function(err, con) {
//             if (err) {
//                 console.error('Error acquiring database connection:', err);
//                 return res.status(500).send('Internal Server Error');
//             }

//             con.query('INSERT INTO master_training SET ?', data, function(err, results) {
//                 con.release();
//                 if (err) {
//                     console.error('Error executing query:', err);
//                     return res.status(500).send('Failed to insert data');
//                 }
//                 res.redirect('/MasterTraining/Index');
//             });
//         });
//     };

//     // Function to render the edit master training form
//     this.editMasterTraining = function(req, res) {
//         const id = req.query.id;
//         connection.acquire(function(err, con) {
//             if (err) {
//                 console.error('Error acquiring database connection:', err);
//                 return res.status(500).send('Internal Server Error');
//             }

//             con.query('SELECT * FROM master_training WHERE IdTraining = ?', [id], function(err, result) {
//                 con.release();
//                 if (err) {
//                     console.error('Error executing query:', err);
//                     return res.status(500).send('Failed to retrieve data');
//                 }
//                 res.render('master_training/edit', { data: result[0] });
//             });
//         });
//     };

//     // Function to handle submission of edited master training data
//     this.submitEditMasterTraining = function(req, res) {
//         const id = req.body.IdTraining;
//         const data = {
//             trainingName: req.body.trainingName,
//             participant: req.body.participant,
//             trainingStartDate: req.body.trainingStartDate,
//             trainingEndDate: req.body.trainingEndDate,
//             modul: req.body.modul
//         };

//         connection.acquire(function(err, con) {
//             if (err) {
//                 console.error('Error acquiring database connection:', err);
//                 return res.status(500).send('Internal Server Error');
//             }

//             con.query('UPDATE master_training SET ? WHERE IdTraining = ?', [data, id], function(err, results) {
//                 con.release();
//                 if (err) {
//                     console.error('Error executing query:', err);
//                     return res.status(500).send('Failed to update data');
//                 }
//                 res.redirect('/MasterTraining/Index');
//             });
//         });
//     };

//     // Function to handle deletion of master training data
//     this.deleteMasterTraining = function(req, res) {
//         const id = req.query.id;
//         connection.acquire(function(err, con) {
//             if (err) {
//                 console.error('Error acquiring database connection:', err);
//                 return res.status(500).send('Internal Server Error');
//             }

//             con.query('DELETE FROM master_training WHERE IdTraining = ?', [id], function(err, results) {
//                 con.release();
//                 if (err) {
//                     console.error('Error executing query:', err);
//                     return res.status(500).send('Failed to delete data');
//                 }
//                 res.redirect('/MasterTraining/Index');
//             });
//         });
//     };
// }

// module.exports = new MasterTraining();
