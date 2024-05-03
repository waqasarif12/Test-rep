require('dotenv').config()
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportSpotify = require("./config/passport-spotify-strategy");
const route = require("./routes/index");

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
 
  })
  .then(() => {
	console.log("connected")
  })
  .catch((error) => console.log(`did not connect`));
 
 
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(
	session({
		name: "spotifyclone",
		secret: "maxi",
		//Don't save the uninitialized session
		saveUninitialized: false,
		//Don't re-save the session if it is not modified
		resave: false,
		//Cookie Options
		cookie: {
			//Cookie Expiry Time - 100 Minutes
			maxAge: 1000 * 60 * 100,
		},
		//MongoStore is used to store the Session Cookies in the MongoDB
		
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use(customMiddleware.addMusic);
app.use(customMiddleware.createUploads);
app.use("/", route);

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(`Server is Up & Running Successfully on Port: ${PORT}`);
});
