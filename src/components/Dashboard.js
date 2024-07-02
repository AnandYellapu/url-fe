// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import axios from 'axios';
// import { Typography, Button } from '@mui/material';
// import { RingLoader } from 'react-spinners';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = React.useState({});
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
//         setDashboardData(response.data);
//       } catch (error) {
//         setError('Server Error');
//       }
//       setIsLoading(false);
//     };

//     fetchDashboardData();
//   }, []);

//   const handleRefresh = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
//       setDashboardData(response.data);
//     } catch (error) {
//       setError('Server Error');
//     }
//     setIsLoading(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="loader-container">
//         <RingLoader color="#36D7B7" loading={isLoading} size={35} />
//       </div>
//     );
//   }

//   if (error) {
//     return <Typography variant="h6" color="error" className="error-message">Error: {error}</Typography>;
//   }

//   const { totalURLs, totalCopyCounts } = dashboardData;

//   return (
//     <div className="dashboard">
//       <Typography variant="h2" className="dashboard-title">Dashboard</Typography>
//       <div className="dashboard-info">
//         <span className="dashboard-info-icon">🔗</span>
//         <Typography variant="body1" className="dashboard-info-text">Total URLs: {totalURLs}</Typography>
//       </div>
//       <div className="dashboard-info">
//         <span className="dashboard-info-icon">📋</span>
//         <Typography variant="body1" className="dashboard-info-text">Total Click Counts: {totalCopyCounts}</Typography>
//       </div>
//       <Button variant="contained" onClick={handleRefresh} className="refresh-button">Refresh</Button>
      
//       {/* Data Visualization */}
//       <div className="data-visualization">
//         <Typography variant="h4" gutterBottom className="visualization-title">Data Visualization</Typography>
//         <PieChart
//           series={[
//             {
//               data: [
//                 { id: 0, value: totalURLs, label: 'Total URLs' },
//                 { id: 1, value: totalCopyCounts, label: 'Total Click Counts' },
//               ],
//               highlightScope: { faded: 'global', highlighted: 'item' },
//               faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
//             },
//           ]}
//           height={300}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;








import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { Typography, Button, Snackbar, Alert, Grid, Card, CardContent } from '@mui/material';
import { RingLoader } from 'react-spinners';
import { LineChart } from '@mui/x-charts/LineChart';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/dashboard');
      setDashboardData(response.data);
      setSuccess(true);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDashboardData();

    const intervalId = setInterval(fetchDashboardData, 60000); // Auto-refresh every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    await fetchDashboardData();
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

  const { totalURLs, totalCopyCounts, urlTrends = [], clickTrends = [] } = dashboardData;

  return (
    <div className="dashboard">
      <Typography variant="h2" className="dashboard-title">Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total URLs
              </Typography>
              <Typography variant="h2">
                {totalURLs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Click Counts
              </Typography>
              <Typography variant="h2">
                {totalCopyCounts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleRefresh} className="refresh-button">Refresh</Button>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <div className="trend-visualization">
            <Typography variant="h4" gutterBottom className="visualization-title">URL Trends</Typography>
            {urlTrends.length > 0 ? (
              <LineChart
                data={[
                  {
                    id: 'url-trends',
                    data: urlTrends.map((point, index) => ({ x: index, y: point })),
                  },
                ]}
                xAxis={{ title: 'Time' }}
                yAxis={{ title: 'Total URLs' }}
                height={300}
              />
            ) : (
              <Typography variant="body1">No URL trend data available.</Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="trend-visualization">
            <Typography variant="h4" gutterBottom className="visualization-title">Click Trends</Typography>
            {clickTrends.length > 0 ? (
              <LineChart
                data={[
                  {
                    id: 'click-trends',
                    data: clickTrends.map((point, index) => ({ x: index, y: point })),
                  },
                ]}
                xAxis={{ title: 'Time' }}
                yAxis={{ title: 'Total Click Counts' }}
                height={300}
              />
            ) : (
              <Typography variant="body1">No click trend data available.</Typography>
            )}
          </div>
        </Grid>
      </Grid>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Data refreshed successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
