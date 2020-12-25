const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

/* MIDDLE WARES */
app.use(cors()); /* Not sure */

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

/* OPEN DATA BASE CONNECTION */
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error(`Connection with mongoDB failed, error : ${error}`);
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection with mongoDB etablished.");
});

/* ROUTES */
const usersRouter = require("./routes/users.route");
const rootRouter = require("./routes/root.route");

app.use("/", rootRouter);
app.use("/users", usersRouter);

app.listen(port, (err) => {
  /* Manage error */
  console.log(`Listening to port ${port}`);
});
