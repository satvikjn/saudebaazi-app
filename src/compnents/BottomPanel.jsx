import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BottomPanel = ({mainData}) => {
  const barGraphData = (label) => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: label,
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const barGraphOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows charts to expand dynamically
    scales: {
      x: {
        ticks: { color: "#4B5563" },
      },
      y: {
        ticks: { color: "#4B5563" },
      },
    },
  };


  

  return (
    <div
      className="fixed bottom-0 left-0 bg-gray-100 p-4 overflow-hidden w-4/5"
    >
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="h-full w-full">
          <div className="h-full">
            <Bar data={barGraphData("Graph 1")} options={barGraphOptions} />
          </div>
        </div>
        <div className="h-full w-full">
          <div className="h-full">
            <Bar data={barGraphData("Graph 2")} options={barGraphOptions} />
          </div>
        </div>
        <div className="h-full w-full">
          <div className="h-full">
            <Bar data={barGraphData("Graph 3")} options={barGraphOptions} />
          </div>
        </div>
        <div className="h-full w-full">
          <div className="h-full">
            <Bar data={barGraphData("Graph 4")} options={barGraphOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
