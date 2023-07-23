






import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:6060/api/dashboard');
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

  const { totalURLs, totalClicks, uniqueDomains } = dashboardData;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p className="dashboard-info">
        <span className="dashboard-info-icon">🔗</span>
        <span className="dashboard-info-value">Total URLs: {totalURLs}</span>
      </p>
      <p className="dashboard-info">
        <span className="dashboard-info-icon">👆</span>
        <span className="dashboard-info-value">Total Clicks: {totalClicks}</span>
      </p>
      <div className="dashboard-unique-domains">
        <p className="dashboard-unique-domains-title">Unique Domains:</p>
        <ul className="dashboard-unique-domains-list">
          {uniqueDomains.map((domain, index) => (
            <li key={index} className="dashboard-unique-domains-item">
              {domain}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

