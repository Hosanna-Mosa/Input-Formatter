const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const  uploadExcelController  = require("../controllers/excelController");
const  previewExcelController   = require("../controllers/previewController");
const  importExcelController   = require("../controllers/importController");

router.post("/upload", upload.single("file"), uploadExcelController.uploadExcel);
router.post("/preview", upload.single("file"), previewExcelController.previewExcel);
router.post("/import", importExcelController.importExcel);


module.exports = router;
