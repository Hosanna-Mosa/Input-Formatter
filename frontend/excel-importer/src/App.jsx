import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div className="container">
      <h2>Excel File Importer</h2>
      <FileUpload setData={setData} />
      {data.length > 0 && <DataTable data={data} />}
    </div>
  );
};

export default App;
