import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import * as XLSX from "xlsx";
import "./FileUpload.css";

const FileUpload = ({ onFileUpload }) => {
  const [errors, setErrors] = useState([]);
  const [consoleError, setConsoleError] = useState("");

  // const handleFileUpload = (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   setConsoleError("");

  //   if (file.size > 2 * 1024 * 1024) {
  //     alert("File size exceeds 2MB limit!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   axios
  //     .post("http://localhost:8000/api/excel/upload", formData)
  //     .then((response) => {
  //       setErrors(response.data.errors || []);
  //       alert("File uploaded successfully!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
        
  //       // setConsoleError(error.response.data.message);

  //       // console.log("Fine");

  //       // alert("Their is an error !!");
  //     });
  // };

  return (
    <div className="upload-container">
      <Dropzone onDrop={onFileUpload} accept=".xlsx">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop a file here, or click to select one</p>
          </div>
          
        )}
      </Dropzone>

      {consoleError !== "" && (
        <div className="error-box">
          <h3>Errors:</h3>
          {consoleError}
        </div>
      )}

      {/* {errors.length > 0 && (
        <div className="error-box">
          <h3>Errors:</h3>
            <ul>
              {errors.map((err, idx) => (
                <li key={idx}>{`Row ${err.row}: ${err.error}`}</li>
              ))}
            </ul>
          
        </div>
      )} */}
    </div>
  );
};

export default FileUpload;
