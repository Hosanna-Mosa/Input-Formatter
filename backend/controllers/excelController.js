const XLSX = require("xlsx");
const ExcelData = require("../models/ExcelData");

exports.uploadExcel = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    let errors = [];
    let validData = [];

    jsonData.forEach((row, index) => {
      if (!row.Name || !row.Amount || !row.Date) {
        errors.push({ row: index + 1, error: "Missing required fields" });
      } else if (isNaN(row.Amount) || row.Amount <= 0) {
        errors.push({ row: index + 1, error: "Amount must be a positive number" });
      } else {
        validData.push(row);
      }
    });

    if (validData.length > 0) {
      await ExcelData.insertMany(validData);
    }

    res.json({ success: true, errors });
  } catch (error) {
    res.status(500).json({ error: "File processing failed" });
  }
};
