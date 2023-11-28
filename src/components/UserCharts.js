import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const UserCharts = () => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.get('http://localhost:6060/api/urls/user-charts', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const { dailyURLs, monthlyURLs } = response.data;
        setDailyData(formatDailyData(dailyURLs));
        setMonthlyData(monthlyURLs);
        setIsLoading(false);
      } catch (error) {
        setError('Server Error');
        setIsLoading(false);
      }
    };

    fetchData(); // Include fetchData as a dependency to avoid potential issues
  }, []); // An empty dependency array ensures that useEffect runs only once when the component mounts

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
      <BarChart className="bar-chart" width={350} height={350} data={dailyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>

      <h2 className="chart-title">Monthly URL Count</h2>
      <BarChart className="bar-chart" width={350} height={350} data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default UserCharts;
