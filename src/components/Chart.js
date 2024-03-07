import * as React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import DailyPieChart from './DailyPieChart';
import MonthlyPieChart from './MonthlyPieChart';
import { ResponsiveContainer } from 'recharts';

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
      const { date, time } = item._id;
      const formattedDate = `${date} ${time}`;
      return { label: formattedDate, value: item.count };
    });
  };

  const formatMonthlyData = (data) => {
    return data.map((item) => {
      return { label: item._id, value: item.count };
    });
  };

 

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

 

  if (dailyData.length === 0 && monthlyData.length === 0) {
    return (
      <Typography variant="h6">
        No Charts found.
      </Typography>
    );
  } 


  return (
    <div className="chart-container">
      <Typography variant="h4" gutterBottom>Daily URL Count</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <DailyPieChart data={dailyData} />
      </ResponsiveContainer>

      <Typography variant="h4" gutterBottom>Monthly URL Count</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <MonthlyPieChart data={monthlyData} />
      </ResponsiveContainer>
    </div>
  );
}
