import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import TableGraph from "./TableGraph";

const MainBoard = ({ mainData }) => {
  const [selectedTable, setSelectedTable] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");

  const [newTableData, setNewTableData] = useState({
    newTable: "",
    newSelectedSKU: "",
    newFromDate: "",
    newToDate: "",
  });

  const updateState = () => {
    setNewTableData(
      {
        newTable: selectedTable,
        newSelectedSKU: selectedSKU,
        newFromDate: selectedFromDate,
        newToDate: selectedToDate,
      }
    );
  };

  const skus = [...new Set(mainData.visits.map(item => item.SKU))];
  const tables = ["Stock", "Orders"];

  const isSubmitDisabled = !selectedSKU || !selectedFromDate || !selectedToDate || !selectedTable;

  const showSelectedTable = (e) => {
    console.log("clicked")
    if (selectedTable) {
      setShowTable(true);
      updateState();
    }
  };

  return (
    <div className={`top-0 left-0 flex flex-col w-[80vw] mx-auto px-10 pt-5 ${showTable ? "pb-[50vh]" : "pb-[100vh]"}`}>
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
             filter: invert(1);
          }
        `}
      </style>

      {/* Filter Section */}
      <div className="fixed top-0 left-0 w-[80vw] p-4 bg-gray-100 flex flex-col gap-4 px-10 pt-5  ">
      <h1 className="text-xl font-bold mt-5 mb-5 text-black">Leads Data</h1>

        <div className="flex gap-4">
          <TextField type="date" className="w-1/4" label="From Date" InputLabelProps={{ shrink: true }} onChange={(e)=> setSelectedFromDate(e.target.value)}/>
          <TextField type="date" className="w-1/4" label="To Date" InputLabelProps={{ shrink: true }} onChange={(e)=> setSelectedToDate(e.target.value)} />
          <Select
            className="w-1/4"
            defaultValue=""
            onChange={(e) => setSelectedSKU(e.target.value)}
            displayEmpty>
            <MenuItem value="">Product Type</MenuItem>
            {skus.map((sku, index) => (
              <MenuItem key={index} value={sku}>{sku}</MenuItem>
            ))}
          </Select>
          <Select
            className="w-1/4"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Select Table</MenuItem>
            {tables.map((table, index) => (
              <MenuItem key={index} value={table}>{table}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" className="w-60" onClick={showSelectedTable} disabled={isSubmitDisabled}>
            Submit
          </Button>
        </div>
      </div>

      <div className="mt-4 px-4">
      {/* Tables with Graphs */}
      {showTable && (
        <TableGraph newTableData = {newTableData} mainData={mainData} />
      )}
      </div>
    </div>
  );
};


export default MainBoard;
