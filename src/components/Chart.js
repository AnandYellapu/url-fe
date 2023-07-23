import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:6060/api/chart');
        const { dailyURLs, monthlyURLs } = response.data;
        setDailyData(formatDailyData(dailyURLs));
        setMonthlyData(monthlyURLs);
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
      return { date: formattedDate, count: item.count };
    });
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="chart-container">
      <h2 className="chart-title">Daily URL Count</h2>
      <LineChart className="line-chart" width={350} height={350} data={dailyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>

      <h2 className="chart-title">Monthly URL Count</h2>
      <LineChart className="line-chart" width={350} height={350} data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Chart;