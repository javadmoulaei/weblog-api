const path = require("path");

const debug = require("debug")("weblog-project");
const express = require("express");
const bodyParser = require("body-parser");
const expressLayout = require("express-ejs-layouts");
const dotenv = require("dotenv");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");
const winston = require("./config/winston");

dotenv.config({ path: "./config/config.env" });

connectDB();
debug("Connected To Database");

require("./config/passport");

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("combined", { stream: winston.stream }));
  debug("Morgan Enabled");
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");
app.set("views", "views");

app.use(fileUpload());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes"));
app.use(require("./controllers/errors").get404);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
