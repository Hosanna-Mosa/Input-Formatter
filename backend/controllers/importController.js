const ExcelData = require("../models/ExcelData");

// 🟢 Import Valid Data to MongoDB
module.exports.importExcel = async (req, res) => {
  try {
    console.log("🔹 Request Received:");
    const { selectedSheet, data } = req.body;
    console.log(selectedSheet);
    console.log(data);
    
    console.log("🟡 error Data Before Insertion:");
    if (!data || data.length === 0) {
       res.status(400).json({
        success: false,
        message:"No data provided for import",
      });

    }
    console.log("🟡 error Data after Insertion:");
    let errors = [];
    let validData = [];
    
    data.forEach((row, index) => {
      if (!row.Name || !row.Amount || !row.Date) {
        errors.push({ row: index + 1, error: `Missing field at Row - ${index}, SheetName - ${selectedSheet}` });
      } else if (isNaN(row.Amount) || row.Amount <= 0) {
        errors.push({ row: index + 1, error: `Amount must be postive at Row - ${index}, Sheet - ${selectedSheet}` });
      } else {
        validData.push(row);
      }
    });

    console.log("🟡 Valid Data Before Insertion:", validData);
    console.log("🟡 error Data Before Insertion:", errors);

    if (validData.length > 0) {
      await ExcelData.insertMany(validData);
      console.log("✅ Data Successfully Inserted into MongoDB");
    } else {
      console.log("⚠️ No Valid Data to Insert");
    };

    res.json({ success: true, message: "Import successful", errors });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:"Data import failed",
    });
  }
  
};

// const ExcelData = require("../models/ExcelData");
// const validationConfig = require("../config/validationConfig");

// const isValidDate = (dateStr, allowPreviousMonth) => {
//   const inputDate = new Date(dateStr);
//   const currentDate = new Date();
  
//   if (!allowPreviousMonth) {
//     return inputDate.getMonth() === currentDate.getMonth() && inputDate.getFullYear() === currentDate.getFullYear();
//   }
//   return true; // Allow previous month dates
// };

// // 🟢 Import Data with Dynamic Validation
// exports.importExcel = async (req, res) => {
//   try {
//     const { selectedSheet, data } = req.body;

//     console.log(data);
    
//     if (!data || data.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message:`Validation rules not found for sheet: ${selectedSheet}`,
//       });
//     }

//     if (!validationConfig.sheets[selectedSheet]) {
//       return res.status(400).json({
//               success: false,
//               message:`Validation rules not found for sheet: ${selectedSheet}`,
//             });
//     }

//     const sheetConfig = validationConfig.sheets[selectedSheet];
//     let errors = [];
//     let validData = [];

//     data.forEach((row, index) => {
//       let mappedRow = {};
//       let rowErrors = [];

//       Object.entries(sheetConfig.columns).forEach(([excelColumn, dbColumn]) => {
//         mappedRow[dbColumn] = row[excelColumn];
//       });

//       // Validation Rules
//       if (!sheetConfig.validation.optionalFields.includes("Name") && !mappedRow.Name) {
//         rowErrors.push("Missing Name");
//       }
//       if (!sheetConfig.validation.optionalFields.includes("Amount") && (!mappedRow.Amount || (!sheetConfig.validation.allowZeroAmount && mappedRow.Amount <= 0))) {
//         rowErrors.push("Invalid Amount");
//       }
//       if (mappedRow.Date && !isValidDate(mappedRow.Date, sheetConfig.validation.allowPreviousMonth)) {
//         rowErrors.push("Invalid Date");
//       }

//       if (rowErrors.length > 0) {
//         errors.push({ row: index + 1, sheet: selectedSheet, errors: rowErrors });
//       } else {
//         validData.push(mappedRow);
//       }
//     });

//     if (validData.length > 0) {
//       await ExcelData.insertMany(validData);
//       console.log("✅ Data Successfully Inserted into MongoDB");
//     }

//     res.json({ success: true, message: "Import successful", errors });
//   } catch (error) {
//     res.status(500).json({
//             success: false,
//             message:"Data import failed",
//           });
//   }
// };
