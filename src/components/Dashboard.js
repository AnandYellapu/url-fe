// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Typography, Button } from '@mui/material';
// // import { RingLoader } from 'react-spinners';
// // import { VictoryPie } from 'victory';

// // const Dashboard = () => {
// //   const [dashboardData, setDashboardData] = useState({});
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
// //         setDashboardData(response.data);
// //         setIsLoading(false);
// //       } catch (error) {
// //         setError('Server Error');
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchDashboardData();
// //   }, []);

// //   const handleRefresh = async () => {
// //     setIsLoading(true);
// //     setError(null);
// //     try {
// //       const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
// //       setDashboardData(response.data);
// //     } catch (error) {
// //       setError('Server Error');
// //     }
// //     setIsLoading(false);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="loader-container">
// //         <RingLoader color="#3f51b5" loading={isLoading} size={100} />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return <Typography variant="h6" color="error">Error: {error}</Typography>;
// //   }

// //   const { totalURLs, totalCopyCounts } = dashboardData;

// //   return (
// //     <div className="dashboard">
// //       <Typography variant="h2">Dashboard</Typography>
// //       <div className="dashboard-info">
// //         <span className="dashboard-info-icon">🔗</span>
// //         <Typography variant="body1">Total URLs: {totalURLs}</Typography>
// //       </div>
// //       <div className="dashboard-info">
// //         <span className="dashboard-info-icon">📋</span>
// //         <Typography variant="body1">Total Click Counts: {totalCopyCounts}</Typography>
// //       </div>
// //       <Button variant="contained" onClick={handleRefresh}>Refresh</Button>
      
// //       {/* Data Visualization */}
// //       <div className="data-visualization">
// //         <Typography variant="h4" gutterBottom>Data Visualization</Typography>
// //         <VictoryPie
// //           data={[
// //             { x: "Total URLs", y: totalURLs },
// //             { x: "Total Click Counts", y: totalCopyCounts }
// //           ]}
// //           colorScale={["#3f51b5", "#f50057"]}
// //           width={300}
// //           height={200}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import { RingLoader } from 'react-spinners';
import { LineChart } from '@mui/x-charts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Server Error');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      setError('Server Error');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <RingLoader color="#3f51b5" loading={isLoading} size={100} />
      </div>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  const { totalURLs, totalCopyCounts } = dashboardData;

  return (
    <div className="dashboard">
      <Typography variant="h2">Dashboard</Typography>
      <div className="dashboard-info">
        <span className="dashboard-info-icon">🔗</span>
        <Typography variant="body1">Total URLs: {totalURLs}</Typography>
      </div>
      <div className="dashboard-info">
        <span className="dashboard-info-icon">📋</span>
        <Typography variant="body1">Total Click Counts: {totalCopyCounts}</Typography>
      </div>
      <Button variant="contained" onClick={handleRefresh}>Refresh</Button>
      
      {/* Data Visualization */}
      <div className="data-visualization">
        <Typography variant="h4" gutterBottom>Data Visualization</Typography>
        <LineChart
          width={500}
          height={300}
          series={[
            { data: [totalURLs], label: 'Total URLs' },
            { data: [totalCopyCounts], label: 'Total Click Counts' },
          ]}
          xAxis={[{ scaleType: 'point', data: ['Total URLs', 'Total Click Counts'] }]}
        />
      </div>
    </div>
  );
};

export default Dashboard;