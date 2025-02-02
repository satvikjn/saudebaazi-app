import React, { useState, useRef, useEffect } from 'react';
import SidePanelDashboard from "./compnents/SidePanelDashboard.jsx"
import BottomPanel from './compnents/BottomPanel.jsx';
import MainBoard from './compnents/MainBoard.jsx';
import axios from 'axios';

const App = () => {

  const [mainOrdersData, setMainOrdersData] = useState([]);
  const [mainVisistsData, setMainVisistsData] = useState([]);


  // Fetch data from Flask API when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/orders')
      .then((response) => {
        const rawData = response.data;

        // Convert the raw data to a string if it's not already a string
        const fixedData = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);

        // Replace NaN with null in the string
        const updatedData = fixedData.replace(/NaN/g, "null");

        // Parse the updated string to JSON
        setMainOrdersData(JSON.parse(updatedData))
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });

    axios.get('http://127.0.0.1:5000/visits')
      .then((response) => {
        const rawData = response.data;

        // Convert the raw data to a string if it's not already a string
        const fixedData = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);

        // Replace NaN with null in the string
        const updatedData = fixedData.replace(/NaN/g, "null");

        // Parse the updated string to JSON
        setMainVisistsData(JSON.parse(updatedData))
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);




  return (
    <div className='bg-white'>
      <MainBoard mainData={{"orders" : mainOrdersData, "visits" : mainVisistsData}} />
      <SidePanelDashboard mainData={{"orders" : mainOrdersData, "visits" : mainVisistsData}} />
      <BottomPanel mainData={{"orders" : mainOrdersData, "visits" : mainVisistsData}} />
    </div>
  );
};

export default App;
