import React from "react";
//import "/DataTable.css";

const DataTable = ({ data }) => {
  return (
    <div className="table-container">
      <h3>Data Preview</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Name}</td>
              <td>{row.Amount}</td>
              <td>{row.Date}</td>
              <td>{row.Verified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
