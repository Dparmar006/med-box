// app config
const express = require("express");
const { urlencoded } = require("body-parser");
const app = express();
let port = process.env.PORT;
require("dotenv").config();

console.log(process.env.PORT);

// db config
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("CONNECTED TO DB"));
db.on("error", () => console.error("ERROR: Can't connect to DB"));

app.use(urlencoded({ extended: false }));
app.use(express.json());

// routes
const medRoutes = require("./routes/meds");
app.use("/medicines", medRoutes);

// SERVER
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
