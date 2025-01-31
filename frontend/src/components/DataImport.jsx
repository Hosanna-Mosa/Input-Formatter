import React, { useState } from "react";
import axios from "axios";

const DataImport = ({ sheets, selectedSheet }) => {
  const [errors, setErrors] = useState([]);
  const [consoleError, setConsoleError] = useState("");

  const handleImport = async () => {
    setConsoleError("");
    console.log("🔹 Selected Sheet:", selectedSheet);
  console.log("🔹 Sending API Request:", {
    selectedSheet,
    data: sheets[selectedSheet],
  });

    if (!selectedSheet || !sheets[selectedSheet]) {
      console.log("❌ No selected sheet found");
      return;
    }
    
    console.log("✅ After if condition - Sending data to backend");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/excel/import",
        { 
          selectedSheet,
          data: sheets[selectedSheet],
        },
        { headers: { "Content-Type": "application/json" }}
      );

      if (response.data.errors && response.data.errors.length > 0) {
        setErrors(response.data.errors);
    } else {
        alert("Data imported successfully!");
        setErrors([]);
    }
    } catch (error) {
      console.error("❌ Import failed:", error);
      setConsoleError(error.response?.data?.message || "Unknown error occurred");
    }
  };

  return (
    <div>
      <button
        onClick={handleImport}
        style={{
          marginTop: "20px",
          background: "#28a745",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Import Data
      </button>

      {consoleError !== "" && (
        <div className="error-box">
          <h3>Errors:</h3>
          {consoleError}
        </div>
      )}

      {errors.length > 0 && (
        <div style={{ marginTop: "20px", background: "#ffc107", padding: "10px" }}>
          <h3>Import Errors:</h3>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>
                Row {err.row}: {err.error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataImport;

