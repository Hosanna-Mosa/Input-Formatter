const mongoose = require("mongoose");

const ExcelDataSchema = new mongoose.Schema({
  Name: String,
  Amount: Number,
  Date: String,
  Verified: String,
});

module.exports = mongoose.model("ExcelData", ExcelDataSchema);
