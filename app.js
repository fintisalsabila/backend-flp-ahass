var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var acl = require("express-acl");
global.md5 = require("md5");
global.dateFormat = require("dateformat");

var login = require("./routes/api/login");


var web_login = require("./routes/web/index");

//master
var web_login = require("./routes/web/index");
var web_master_user = require("./routes/web/master/master_user");
var web_master_quiz = require("./routes/web/master/master_quiz");
var web_master_training = require("./routes/web/master/master_training");

//report
var web_report_login = require("./routes/web/report/report_login_harian");//hakim

var connection = require("./config/db");
var connection_prod = require("./config/db_prod");
var session = require("express-session");


global.uuidv1 = require("uuid/v1");
global.md5 = require("md5");

var app = express();
app.use(
  session({
    secret: "wikusama",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6 * 60 * 60 * 1000 },
  })
);

global.isAuthenticate = function (req, res, next) {
  console.log(req.session,'hakim')
  if (req.path == "/status") {
    return next();
  }
  if (req.path == "/maintenance") {
    return next();
  }
  if ((req.session && req.session.user) || req.path == "/login") {
    return next();
  }
  res.redirect("/login");
};
global.appRoot = __dirname;

var multer = require("multer");
var path = require("path");

var id_photo = uuidv1();

// untuk cloud
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    if (
      file.originalname.includes("xlsx") ||
      file.originalname.includes("xls")
    ) {
      callback(null, file.originalname);
    } else {
      var fileLast = file.originalname.substr(-3);
      if (fileLast.includes("jpg")) {
        var namefile = file.originalname.replace("jpg", "");
        var ext = ".jpg";
      } else if (fileLast.includes("png")) {
        var namefile = file.originalname.replace("png", "");
        var ext = ".png";
      } else if (fileLast.includes("mp4")) {
        var namefile = file.originalname.replace("mp4", "");
        var ext = ".mp4";
      } else if (fileLast.includes("pdf")) {
        var namefile = file.originalname.replace("pdf", "");
        var ext = ".pdf";
      } else if (fileLast.includes("doc")) {
        var namefile = file.originalname.replace("doc", "");
        var ext = ".doc";
      } else if (fileLast.includes("ppt")) {
        var namefile = file.originalname.replace("ppt", "");
        var ext = ".ppt";
      } else if (fileLast.includes("peg")) {
        var namefile = file.originalname.replace("jpeg", "");
        var ext = ".jpeg";
      } else if (fileLast.includes("ptx")) {
        var namefile = file.originalname.replace("pptx", "");
        var ext = ".pptx";
      } else if (fileLast.includes("ocx")) {
        var namefile = file.originalname.replace("docx", "");
        var ext = ".docx";
      } else {
        var namefile = "null";
      }

      if (namefile != "null") {
        var result = namefile.replace(/[^A-Z0-9]+/gi, "");
        callback(null, id_photo + "-" + result + ext);
      }
    }
  },
});

var xlsFilterUrl = ["/MasterCustomerProspect/AddSubmit"];

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    var xlsFilterUrlIndex = xlsFilterUrl.indexOf(req.originalUrl);
    if (xlsFilterUrlIndex >= 0) {
      if (
        ["xls", "xlsx"].indexOf(
          file.originalname.split(".")[file.originalname.split(".").length - 1]
        ) === -1
      ) {
        return callback(null, false);
      }
    }
    callback(null, true);
  },
}).any();

app.use(upload);

app.engine("ejs", require("ejs-locals"));
app.set("view engine", "ejs");
app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb", parameterLimit: 100000 }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 100000,
  })
);

var serveIndex = require("serve-index");
app.use(express.static(__dirname + "/views"));
app.use("/files", serveIndex(__dirname + "/uploads"));
app.use("/files", express.static(__dirname + "/uploads"));

connection.init();
connection_prod.init();



//autentikasi session & acl
app.use(isAuthenticate);

let configObject = {
  filename: "nacl.json",
  searchPath: "session.user.title",
};

let responseObject = {
  status: "Access Denied",
  message: "You are not authorized to access this resource",
};
acl.config(configObject, responseObject);
app.use(
  acl.authorize.unless({
    path: ["/login", "/views", "/logout", "/error404"],
  })
);

//data user
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// link root
app.use(function (req, res, next) {
  res.locals.link = req.protocol + "://" + req.get("host");
  next();
});

// link cloud buat download di obs
app.use(function (req, res, next) {
  res.locals.linkCloud =
    "https://obs-wanda.obs.ap-southeast-3.myhuaweicloud.com/";
  next();
});

login.configure(app);

//configure web backend
web_login.configure(app);
web_master_user.configure(app);
web_master_quiz.configure(app);
web_master_training.configure(app);

web_report_login.configure(app);


//obs huawei setting
global.OBS = require("huawei-obs");
global.client = new OBS({
  accessKey: "WO7HPUVDVSUKM8TQQECY",
  secretAccessKey: "ja2B4fuhfYw1tKXZBJoaiCosGci20i1uD9c4IzQV",
  endpoint: "obs.ap-southeast-3.myhuaweicloud.com",
  bucketName: "obs-wanda",
});

//base URL DMS API
global.baseHostDMS = "http://45.77.171.151/";
global.baseUrlDMS = "api-wahana/";

//base URL DMS API Prod
global.baseHostDMSProd = "http://119.8.172.66/";
global.baseUrlDMSProd = "api/dealer/";

//base URL intranet API
global.baseHostIntranet = "https://intranet.wahanaartha.com/";
global.baseUrlIntranet = "ws_webservices/";

//base URL wahana API
global.baseHostWahana = "https://api.wahanaartha.com/";
global.baseUrlWahana = "dms-api/api/v1/";

//base URL FLP Ahass
global.baseHostAhass = "http://119.8.172.66/api/";
global.baseUrlAhass = "ahass/";

//base URL FLP Ahass
global.baseHostAhassDev = "http://45.77.171.151/";
global.baseUrlAhassDev = "api-ahass/";

module.exports = app;
