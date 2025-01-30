const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { uploadExcel } = require("../controllers/excelController");

router.post("/upload", upload.single("file"), uploadExcel);

module.exports = router;
