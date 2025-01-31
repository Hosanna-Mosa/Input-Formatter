import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./FileUpload";

const DataPreview = ({ onPreviewComplete , onSheetSelect }) => {
  const [sheets, setSheets] = useState({});
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [consoleError, setConsoleError] = useState("");

  const handleFileUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    setConsoleError("");

    if (file.size > 2 * 1024 * 1024) {
          alert("File size exceeds 2MB limit!");
          return;
        }

    try {
      const response = await axios.post("http://localhost:8000/api/excel/preview", formData);
      setSheets(response.data.sheets);
      onPreviewComplete(response.data.sheets);
      const firstSheet = Object.keys(response.data.sheets)[0]; // Auto-select first sheet
      setSelectedSheet(firstSheet);
      onSheetSelect(firstSheet);

      console.log("✅ Sheets Data:", response.data.sheets);
    console.log("✅ Auto-selected Sheet:", firstSheet);
    } catch (error) {
      console.error("Preview failed:", error);
      setConsoleError(error.response.data.message);
    }
  };


  const handleDeleteRow = (sheetName, rowIndex) => {
    const updatedSheets = { ...sheets };
    updatedSheets[sheetName] = updatedSheets[sheetName].filter((_, index) => index !== rowIndex);
    setSheets(updatedSheets);
    onPreviewComplete(updatedSheets); // Update data in parent
  };

  return (
    <div>
      <h2>Excel Data Preview</h2>
      <FileUpload onFileUpload={handleFileUpload} />

      {consoleError !== "" && (
        <div className="error-box">
          <h3>Errors:</h3>
          {consoleError}
        </div>
      )}

      {Object.keys(sheets).length > 0 && (
        <>
          <h3>Select Sheet:</h3>
          <select onChange={(e) => setSelectedSheet(e.target.value)} value={selectedSheet}>
            {Object.keys(sheets).map((sheetName) => (
              <option key={sheetName} value={sheetName}>
                {sheetName}
              </option>
            ))}
          </select>

          {selectedSheet && sheets[selectedSheet] && (
            <table border="1">
              <thead>
                <tr>
                  {Object.keys(sheets[selectedSheet][0] || {}).map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sheets[selectedSheet].map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} style={{color:"black"}}>{cell}</td>
                    ))}
                    <td>
                      <button
                        onClick={() => handleDeleteRow(selectedSheet, rowIndex)}
                        style={{ background: "red", color: "white", border: "none", padding: "5px", cursor: "pointer" }}
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      
    </div>
  );
};

export default DataPreview;
