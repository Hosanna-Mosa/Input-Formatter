const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const excelRoutes = require("./routes/excelRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/excel", excelRoutes);

module.exports = app;
