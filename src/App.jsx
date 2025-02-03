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

    fetchFromWorkingAPI("https://saudebaaz-app.onrender.com", "http://127.0.0.1:5000");
    
  }, []);


  const fetchFromWorkingAPI = async (api1, api2) => {
    const fetchWithTimeout = (url, timeout = 5000) => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`Timeout: ${url} took longer than ${timeout}ms`));
        }, timeout);

        axios.get(url + '/orders')
            .then(response => {
                clearTimeout(timer);
                console.log(response.data);
            })
            .catch(error => {
                reject(new Error(`Fetch error from ${url}: ${error.message}`));
            });
        
        axios.get(url + '/orders')
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

        axios.get(url + '/visits')
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
      });
    };

    try {
      const result = await Promise.race([
        fetchWithTimeout(api1),
        fetchWithTimeout(api2)
      ]);
      console.log("✅ Data fetched successfully:", result);
      console.log(result)
      return result;
    } catch (error) {
      console.error("❌ Both APIs failed. Error:", error.message);

      console.log("🔍 Checking individual API responses...");
      try {
        const api1Response = await fetchWithTimeout(api1);
        console.log(`✅ ${api1} responded successfully.`);
        return api1Response;
      } catch (err1) {
        console.error(`❌ ${api1} failed:`, err1.message);
      }

      try {
        const api2Response = await fetchWithTimeout(api2);
        console.log(`✅ ${api2} responded successfully.`);
        return api2Response;
      } catch (err2) {
        console.error(`❌ ${api2} failed:`, err2.message);
      }

      return null;
    }
  };



  return (
    <div className='bg-white'>
      <MainBoard mainData={{ "orders": mainOrdersData, "visits": mainVisistsData }} />
      <SidePanelDashboard mainData={{ "orders": mainOrdersData, "visits": mainVisistsData }} />
      <BottomPanel mainData={{ "orders": mainOrdersData, "visits": mainVisistsData }} />
    </div>
  );
};

export default App;
