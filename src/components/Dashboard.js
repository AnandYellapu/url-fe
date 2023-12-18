import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const { totalURLs, totalCopyCounts } = dashboardData;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p className="dashboard-info">
        <span className="dashboard-info-icon">🔗</span>
        <span className="dashboard-info-value">Total URLs: {totalURLs}</span>
      </p>
      <p className="dashboard-info">
        <span className="dashboard-info-icon">📋</span>
        <span className="dashboard-info-value">Total Click Counts: {totalCopyCounts}</span>
      </p>
    </div>
  );
};

export default Dashboard;




