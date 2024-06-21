// Auth: Hakim
var report_login_harian = require("../../../controllers/web/report/report_login_harian");

module.exports = {
    configure: function (app) {
        app.route("/ReportLoginHarian/Index").get(report_login_harian.index);
        app.route("/ReportLoginHarian/ReportSubmit").post(report_login_harian.getDataLoginHarian);  
        // app.route("/ReportLoginHarian/Download").post(report_login_harian.submitReportLoginHarian);
    },
};
