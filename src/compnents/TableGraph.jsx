import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Button from "@mui/material/Button";

const TableGraph = ({ newTableData, mainData }) => {

    const [showTable, setShowTable] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);

    useEffect(() => {
        if (newTableData.newTable === "Stock") {
            const filteredChartData = filterDataStocks();
            setChartData(filteredChartData);

        }
        else if (newTableData.newTable === "Orders") {
            const filteredChartData = filterDataOrders();
            setChartData(filteredChartData);
        }
    }, [newTableData]);

    const filterDataStocks = () => {


        const { newTable, newSelectedSKU, newFromDate, newToDate } = newTableData;

        // Filter by SKU
        let filteredData = mainData.visits;
        console.log("Hi", mainData, filteredData);
        if (newSelectedSKU) {
            filteredData = filteredData.filter(item => item.SKU === newSelectedSKU);
        }
        console.log("SKU", mainData, filteredData);

        // Filter by date range
        if (newFromDate && newToDate) {
            filteredData = filteredData.filter(item => {
                const itemDate = new Date(item.Date);
                return itemDate >= new Date(newFromDate) && itemDate <= new Date(newToDate);
            });
        }
        console.log("Date", mainData, filteredData);

        // Filter by stock position less than 30
        filteredData = filteredData.filter(item => item["Stock Position (In KG)"] < 30);
        setFilteredTableData(filteredData);
        console.log("<30>", mainData, filteredData);

        // Count the number of lines for each RM
        const rmCount = filteredData.reduce((acc, item) => {
            acc[item.RM] = (acc[item.RM] || 0) + 1;
            return acc;
        }, {});

        // Convert the rmCount object to an array of objects for the chart
        const chartData = Object.entries(rmCount).map(([rm, count]) => ({
            RM: rm,
            Count: count
        }));

        const rmCounts = filteredData.reduce((acc, item) => {
            const { RM } = item;

            if (RM) {
                acc[RM] = (acc[RM] || 0) + 1;
            }

            return acc;
        }, {});

        // Convert object to list of objects
        const result = Object.entries(rmCounts).map(([RM, count]) => ({ RM, count }));

        console.log(result);
        return result;
    };

    const filterDataOrders = () => {

        const { newTable, newSelectedSKU, newFromDate, newToDate } = newTableData;

        // Filter by SKU
        let filteredData = mainData.orders;
        console.log(filteredData);
        if (newSelectedSKU) {
            filteredData = filteredData.filter(item => item.SKU === newSelectedSKU);
        }
        console.log("SKU", filteredData);

        // Filter by date range
        if (newFromDate && newToDate) {
            filteredData = filteredData.filter(item => {
                const itemDate = new Date(item.Date);
                return itemDate >= new Date(newFromDate) && itemDate <= new Date(newToDate);
            });
        }
        console.log("Date", filteredData);

        // Filter by total bags greater than 0
        filteredData = filteredData.filter(item => item["Total Bags"] > 0);
        setFilteredTableData(filteredData);
        console.log("<30>", filteredData);

        // Count the number of lines for each RM Name
        // const rmCount = filteredData.reduce((acc, item) => {
        //     acc[item["RM Name"]] = (acc[item["RM Name"]] || 0) + 1;
        //     return acc;
        // }, {});

        // // Convert the rmCount object to an array of objects for the chart
        // const chartData = Object.entries(rmCount).map(([rmName, count]) => ({
        //     RMName: rmName,
        //     Count: count
        // }));

        // const rmCounts = filteredData.reduce((acc, item) => {
        //     const { RMName } = item;

        //     if (RMName) {
        //         acc[RMName] = (acc[RMName] || 0) + 1;
        //     }

        //     return acc;
        // }, {});

        // // Convert object to list of objects
        // const result = Object.entries(rmCounts).map(([RMName, count]) => ({ RMName, count }));

        const rmCount = {};
        filteredData.forEach(order => {
            const rmName = order["RM Name"];
            if (rmCount[rmName]) {
              rmCount[rmName]++;
            } else {
              rmCount[rmName] = 1;
            }
          });

        console.log(rmCount);

        const result = Object.keys(rmCount).map(rm => ({
            RM: rm,
            count: rmCount[rm]
          }));
        return result;
    };





    return (
        <div className="flex-1 grid grid-cols-1 gap-4 text-black mt-[20vh] pt-12">
            <div className="p-4 bg-white rounded-lg shadow">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-4">{newTableData.newTable}</h2>
                    <div className="mb-4 border rounded p-4 bg-gray-100">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">RM Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Leads</th>
                                    <th className="border border-gray-300 px-4 py-2">Lead Conversion %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chartData.map((row, i) => (
                                    <tr key={i} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{row.RM}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.count}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.pv}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <h2 className="text-xl font-bold mt-10 mb-5">Graph</h2>
                <BarChart width={600} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="RM" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                    {/* <Bar dataKey="pv" fill="#82ca9d" /> */}
                </BarChart>
            </div>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowTable(!showTable)}
            >
                {showTable ? "Hide Data" : "Show Data"}
            </Button>
            {showTable && (
                <div style={{ maxHeight: '400px', overflow: 'auto', marginTop: '20px' }}>
                    <table className="w-full border-collapse border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-200" style={{ whiteSpace: 'nowrap', textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>
                                {
                                    Object.keys(filteredTableData[0]).map((key, index) => {
                                        return <th className="border border-gray-300 px-4 py-2" key={index}>{key}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTableData.map((item, index) => (
                                Object.values(item).map((value, index) => {
                                    return <td className="border border-gray-300 px-4 py-2" key={index}>{value}</td>
                                }
                                )))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TableGraph;