const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const excelRoutes = require("./routes/excelRoutes");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));  // Increase JSON size limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDB();

app.use("/api/excel", excelRoutes);

const PORT = 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
