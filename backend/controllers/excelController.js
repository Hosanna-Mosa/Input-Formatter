
const XLSX = require("xlsx");
const ExcelData = require("../models/ExcelData"); // Adjust the path to your model

module.exports.uploadExcel = async (req, res) => {
  console.log("uploadExcel function called");

  if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "No file Uploaded !!",
      });
  }

  // Validate file type
  const allowedMimeTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Invalid file type. Please upload an Excel file (xlsx, xls).",
      });
  }

  try {
    console.log("Reading Excel file...");
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return res
        .status(400)
        .json({
            success: false,
            message:"No sheets found in the Excel file",
          });
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (!jsonData || jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message:"No data found in the sheet",
      });
    }
 
    let errors = [];
    let validData = [];

    jsonData.forEach((row, index) => {
      if (!row.Name || !row.Amount || !row.Date) {
        errors.push({ row: index + 1, error: "Missing required fields" });
      } else if (isNaN(row.Amount) || row.Amount <= 0) {
        errors.push({
          row: index + 1,
          error: "Amount must be a positive number",
        });
      } else {
        validData.push(row);
      }
    });

    if (validData.length > 0) {
      console.log("Inserting valid data into the database...");
      await ExcelData.insertMany(validData);
    }

    res.json({ success: true, errors });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message:"File processing failed",
      });
  }
};
