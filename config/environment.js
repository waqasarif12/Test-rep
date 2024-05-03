const dotenv = require("dotenv").config();
const path = require("path");
const fs = require("fs");
const rfs = require("rotating-file-stream");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream("access.log", {
	interval: "1d",
	path: logDirectory,
});



// module.exports =
// 	eval(process.env.NODE_ENV) == undefined
// 		? development
// 		: eval(process.env.NODE_ENV);
