const XLSX = require("xlsx");

// 🟢 Preview Excel File (Returns Data Without Saving)
module.exports.previewExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Validate file type
    const allowedMimeTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Please upload an Excel file (xlsx, xls).",
      });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    let sheetsData = {};

    workbook.SheetNames.forEach((sheetName) => {
      sheetsData[sheetName] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    });
    
    

    res.json({ success: true, sheets: sheetsData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing file",
    });
  }
};
