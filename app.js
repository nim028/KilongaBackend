const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const passport = require("passport");
const authRoute = require("./routers/authRoute");
const webRoute = require("./routers/webRoutes");
const { migration } = require("./migrations/migration");
const { relation } = require("./migrations/association");
const path = require("path");
require("./middlewares/passport");

//port api 
const port = process.env.port || 9000;

const app = express();

//header json
app.use(express.json());

//form encoded
app.use(express.urlencoded({ extended: true }));

//bande passant
app.use(cors());

//file static
app.use(express.static(path.join(__dirname, "/public")));

//logger
app.use(logger("dev"));

//file upload
app.use(fileUpload());

//passport
app.use(passport.initialize());

//routes
app.use("/api", authRoute);
app.use("/api", passport.authenticate("jwt", { session: false }), webRoute);

//association
relation();

//migration
migration(app, port, 0);
