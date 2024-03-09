import * as React from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import DailyPieChart from './DailyPieChart';
import MonthlyPieChart from './MonthlyPieChart';
import { RingLoader } from 'react-spinners';

export default function Chart() {
  const [dailyData, setDailyData] = React.useState([]);
  const [monthlyData, setMonthlyData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/chart');
        const { dailyURLs, monthlyURLs } = response.data;
        setDailyData(formatDailyData(dailyURLs));
        setMonthlyData(formatMonthlyData(monthlyURLs));
        setIsLoading(false);
      } catch (error) {
        setError('Server Error');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDailyData = (data) => {
    return data.map((item) => {
      const { date } = item._id; // Removed time from the label
      return { label: date, value: item.count };
    });
  };

  const formatMonthlyData = (data) => {
    return data.map((item) => {
      return { label: item._id, value: item.count };
    });
  };

  if (isLoading) {
    return <RingLoader color="#36D7B7" loading={isLoading} size={35} className="loader" />;
  }

  if (error) {
    return <Typography variant="h6" color="error" className="error-message">Error: {error}</Typography>;
  }

  if (dailyData.length === 0 && monthlyData.length === 0) {
    return (
      <Typography variant="h6" className="no-charts-message">
        No Charts found.
      </Typography>
    );
  }

  return (
    <div className="chart-container">
      <Typography variant="h4" gutterBottom className="chart-title">Daily URL Count</Typography>
      <div style={{ width: '100%', height: 450 }}>
        <DailyPieChart data={dailyData} />
      </div>

      <Typography variant="h4" gutterBottom className="chart-title">Monthly URL Count</Typography>
      <div style={{ width: '100%', height: 450 }}>
        <MonthlyPieChart data={monthlyData} />
      </div>
    </div>
  );
}
