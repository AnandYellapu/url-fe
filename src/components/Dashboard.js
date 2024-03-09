import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import { RingLoader } from 'react-spinners';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        setError('Server Error');
      }
      setIsLoading(false);
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
        <RingLoader color="#36D7B7" loading={isLoading} size={35} />
      </div>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error" className="error-message">Error: {error}</Typography>;
  }

  const { totalURLs, totalCopyCounts } = dashboardData;

  return (
    <div className="dashboard">
      <Typography variant="h2" className="dashboard-title">Dashboard</Typography>
      <div className="dashboard-info">
        <span className="dashboard-info-icon">🔗</span>
        <Typography variant="body1" className="dashboard-info-text">Total URLs: {totalURLs}</Typography>
      </div>
      <div className="dashboard-info">
        <span className="dashboard-info-icon">📋</span>
        <Typography variant="body1" className="dashboard-info-text">Total Click Counts: {totalCopyCounts}</Typography>
      </div>
      <Button variant="contained" onClick={handleRefresh} className="refresh-button">Refresh</Button>
      
      {/* Data Visualization */}
      <div className="data-visualization">
        <Typography variant="h4" gutterBottom className="visualization-title">Data Visualization</Typography>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: totalURLs, label: 'Total URLs' },
                { id: 1, value: totalCopyCounts, label: 'Total Click Counts' },
              ],
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
};

export default Dashboard;
