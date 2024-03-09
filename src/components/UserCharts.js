import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import DailyPie from './DailyPie';
import MonthlyPieChart from './MonthlyPieChart';
import {RingLoader} from 'react-spinners';

const UserCharts = () => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/user-charts', {
        headers: { Authorization: `Bearer ${authToken}` },
      });


      const { dailyURLs, monthlyURLs } = response.data;

      if (!Array.isArray(dailyURLs) || !Array.isArray(monthlyURLs)) {
        throw new Error('Invalid response format');
      }

      const formattedDailyData = dailyURLs.map(item => ({
        label: item._id.date,
        value: item.count
      }));

      const formattedMonthlyData = monthlyURLs.map(item => ({
        label: formatMonthYearString(item._id),
        value: item.count
      }));

    

      setDailyData(formattedDailyData);
      setMonthlyData(formattedMonthlyData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Server Error: ' + error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);    //eslint-disable-line

  const formatMonthYearString = (dateString) => {

    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const monthName = new Date(`${year}-${month}-01`).toLocaleDateString('default', { month: 'long' });
    const formattedDate = `${monthName} ${year}`;
    return formattedDate;
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetchData(); // Now fetchData is accessible here
  };

  if (isLoading) {
    return <RingLoader color="#36D7B7" size={32} />;
  }

  if (error) {
    return (
      <div>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
        <Button variant="contained" onClick={handleRetry}>
          Retry
        </Button>
      </div>
    );
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
      <DailyPie data={dailyData} />

      <Typography variant="h4" gutterBottom>Monthly URL Count</Typography>
      <MonthlyPieChart data={monthlyData} />
    </div>
  );
};

export default UserCharts;