import React from "react";
import { AgGridReact } from "ag-grid-react";
export default function Grid({ data, dataColumns }) {
  return (
    <div
      className="ag-theme-alpine"
      style={{ marginTop: "5px", marginBottom: "5px", height: 200 }}
    >
      <AgGridReact
        rowData={data ? data : ""}
        columnDefs={dataColumns}
        overlayNoRowsTemplate="No Participants"
        // domLayout="autoHeight"
      ></AgGridReact>
    </div>
  );
}
