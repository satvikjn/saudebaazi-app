import React, { useRef, useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const SidePanelDashboard = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: width - 20, // Account for padding
          height: height
        });
      }
    };

    // Initial measurement
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Sample data
  const lineData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
  ];

  const barData = [
    { name: 'A', value: 600 },
    { name: 'B', value: 400 },
    { name: 'C', value: 300 },
    { name: 'D', value: 200 },
  ];

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
  ];

  const areaData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Calculate dimensions for each chart
  const chartWidth = dimensions.width * 0.9; // 90% of container width
  const chartHeight = (dimensions.height / 4) * 0.8; // 80% of quarter height
  const pieRadius = Math.min(chartWidth, chartHeight) / 3;

  return (
    <div className="fixed top-0 right-0 w-1/5 h-screen bg-gray-100 " ref={containerRef}>
      <div className="h-full grid grid-rows-4 gap-4 p-4">
        {/* Line Chart */}
        <div className="bg-gray-50 rounded-lg p-2 flex flex-col">
          <h3 className="text-xs font-medium text-gray-700 mb-1">Revenue Trend</h3>
          <div className="flex-grow flex items-center justify-center">
            {dimensions.width > 0 && (
              <LineChart width={chartWidth} height={chartHeight} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-50 rounded-lg p-2 flex flex-col">
          <h3 className="text-xs font-medium text-gray-700 mb-1">Sales by Category</h3>
          <div className="flex-grow flex items-center justify-center">
            {dimensions.width > 0 && (
              <BarChart width={chartWidth} height={chartHeight} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-50 rounded-lg p-2 flex flex-col">
          <h3 className="text-xs font-medium text-gray-700 mb-1">Distribution</h3>
          <div className="flex-grow flex items-center justify-center">
            {dimensions.width > 0 && (
              <PieChart width={chartWidth} height={chartHeight}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={pieRadius}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-gray-50 rounded-lg p-2 flex flex-col">
          <h3 className="text-xs font-medium text-gray-700 mb-1">Growth Metrics</h3>
          <div className="flex-grow flex items-center justify-center">
            {dimensions.width > 0 && (
              <AreaChart width={chartWidth} height={chartHeight} data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
              </AreaChart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanelDashboard;