import React, { useState , useEffect } from "react";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
import DataPreview from "./components/DataPreview";
import DataImport from "./components/DataImport";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [sheets, setSheets] = useState({});
  const [selectedSheet, setSelectedSheet] = useState(null);
  useEffect(() => {
    console.log("📌 App.js - Selected Sheet:", selectedSheet);
  }, [selectedSheet]);

  return (
    <div className="container">
      <DataPreview onPreviewComplete={setSheets} onSheetSelect={setSelectedSheet} />
      <DataImport sheets={sheets} selectedSheet={selectedSheet} />
    </div>
  );
};

export default App;
