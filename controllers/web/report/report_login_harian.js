var connection = require("../../../config/db_prod");
var request = require("request");

var axios = require("axios");
// const urlExists = require("url-exists");
// const ExcelJS = require("exceljs");
const { json } = require("body-parser");

function Todo() {
    const config = {
        headers: { Authorization: "Bearer 71D55F9957524" },
    };

    async function fetchBranchAll() {
        var response = await axios.get(
        baseHostDMS + baseUrlDMS + "api_branch_all.php",
        config
        );
        var data = response.data.data;
        return data;
    }

    this.index = async function (req, res) {
        var dataBranch = await fetchBranchAll();
        res.render("report/report_login_harian/index", {
            objBranch: dataBranch,
            message: null,
        });
    };

    async function getQuery(branch_code, tgl_awal, tgl_akhir) {
        return new Promise(async function (resolve, reject) {
            var whereBranch = "";
            if (branch_code != "all") {
                whereBranch = ' AND u.ahass_code = "' + branch_code + '"';
            }
            connection.acquire(function (err, con) {
                var queryGetData = 'SELECT u.id, u.username, u.honda_id, u.`name`, u.ahass_code, u.ahass_name, ll.last_login FROM users u LEFT JOIN logs_login ll ON u.id = ll.user_id WHERE SUBSTR(ll.last_login, 1, 10) BETWEEN "'+ tgl_awal +'" AND "'+ tgl_akhir +'"' + whereBranch + ' GROUP BY u.username, ll.last_login ORDER BY ahass_name ASC';
                con.query(queryGetData, async function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                });
                con.release();
            })
        })
    }

    //merge data
    function mergeFilterObj(data) {
        var output = [];
        data.forEach(function (item) {
            var existing = output.filter(function (v, i) {
                return v.honda_id == item.honda_id;
            });
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].last_login = output[existingIndex].last_login.concat(item.last_login);
            } else {
                if (typeof item.last_login == "string") item.last_login = [item.last_login];
                output.push(item);
            }
        });
        return output;
    }

    this.getDataLoginHarian = async function (req, res, next) {
        var branch_body = req.body.branch;
        const branch = branch_body.split("|");
        var branch_code = branch[1];
        var tahun = req.body.tahun;
        var bulan = req.body.bulan;
        var total_days = new Date(tahun, bulan, 0).getDate();

        if (bulan.length < 2) {
            bulan = "0" + bulan;
        }

        let tgl_awal = tahun + '-' + bulan + '-01';
        let tgl_akhir = tahun + '-' + bulan + '-' + total_days;

        let getData = await getQuery(branch_code, tgl_awal, tgl_akhir)

        var login_data = [];
        getData.forEach((v) => {
            let d = v.last_login;
            let getTgl = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            let time = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
            login_data.push({
                branch_code: v.ahass_code,
                branch_name: v.ahass_name,
                nama: v.name,
                honda_id: v.honda_id,
                last_login: getTgl + "|" + time,
            });
        });

        var obj = mergeFilterObj(login_data);

        res.json({
            message: "sukses",
            total_days: total_days,
            bulan: bulan,
            tahun: tahun,
            data: obj,
        });
    };
}

module.exports = new Todo();
