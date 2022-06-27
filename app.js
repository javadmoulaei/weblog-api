const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errors");
const { setHeaders } = require("./middleware/headers");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(setHeaders);

app.use(fileUpload());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
