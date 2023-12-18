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

        const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/user-charts', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const { dailyURLs, monthlyURLs } = response.data;
        setDailyData(formatDailyData(dailyURLs));
        setMonthlyData(monthlyURLs);
        setIsLoading(false);
        console.log(formatDailyData)
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





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// const UserCharts = () => {
//   const [dailyData, setDailyData] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const authToken = localStorage.getItem('authToken');

//         const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/user-charts', {
//           headers: { Authorization: `Bearer ${authToken}` },
//         });

//         const { dailyURLs, monthlyURLs } = response.data;
//         setDailyData(formatDailyData(dailyURLs));
//         setMonthlyData(monthlyURLs);
//         setIsLoading(false);
//       } catch (error) {
//         setError('Server Error');
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatDailyData = (data) => {
//     return data.map((item) => {
//       const { date, time } = item._id;
//       const formattedDate = `${date} ${time}`;
//       return { date: formattedDate, count: item.count };
//     });
//   };

//   if (isLoading) {
//     return <div className="loader">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="chart-container">
//       <h2 className="chart-title">Daily URL Count</h2>
//       <BarChart className="bar-chart" width={350} height={350} data={dailyData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="count" fill="#82ca9d" />
//       </BarChart>

//       <h2 className="chart-title">Monthly URL Count</h2>
//       <BarChart className="bar-chart" width={350} height={350} data={monthlyData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="count" fill="#8884d8" />
//       </BarChart>

//       {/* Additional Charts */}
//       <h2 className="chart-title">Line Chart</h2>
//       <LineChart className="line-chart" width={350} height={350} data={dailyData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="count" stroke="#82ca9d" />
//       </LineChart>

//       <h2 className="chart-title">Pie Chart</h2>
//       <PieChart width={350} height={350}>
//         <Pie data={monthlyData} dataKey="count" nameKey="month" fill="#8884d8">
//           {monthlyData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// };

// export default UserCharts;



// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   ReferenceLine,
// //   Brush,
// // } from 'recharts';

// // const UserCharts = () => {
// //   const [dailyData, setDailyData] = useState([]);
// //   const [monthlyData, setMonthlyData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const authToken = localStorage.getItem('authToken');
// //         const response = await axios.get('https://url-shortener-ax8r.onrender.com/api/urls/user-charts', {
// //           headers: { Authorization: `Bearer ${authToken}` },
// //         });

// //         const { dailyURLs, monthlyURLs } = response.data;
// //         setDailyData(formatDailyData(dailyURLs));
// //         setMonthlyData(monthlyURLs);
// //         setIsLoading(false);
// //       } catch (error) {
// //         setError('Error fetching data. Please try again.');
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const formatDailyData = (data) => {
// //     return data.map((item) => {
// //       const { date, time } = item._id;
// //       const formattedDate = `${date} ${time}`;
// //       return { date: formattedDate, count: item.count };
// //     });
// //   };

// //   if (isLoading) {
// //     return <div className="loader">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="error">{error}</div>;
// //   }

// //   return (
// //     <div className="chart-container">
// //       <h2 className="chart-title">Daily URL Count</h2>
// //       <ResponsiveContainer width="100%" height={350}>
// //         <BarChart data={dailyData}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="date" />
// //           <YAxis />
// //           <Tooltip />
// //           <Legend />
// //           <ReferenceLine y={10} stroke="red" label="Threshold" />
// //           <Bar dataKey="count" fill="#82ca9d" />
// //         </BarChart>
// //       </ResponsiveContainer>

// //       <h2 className="chart-title">Monthly URL Count</h2>
// //       <ResponsiveContainer width="100%" height={350}>
// //         <BarChart data={monthlyData}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="_id" />
// //           <YAxis />
// //           <Tooltip />
// //           <Legend />
// //           <Brush dataKey="_id" height={30} stroke="#8884d8" />
// //           <Bar dataKey="count" fill="#8884d8" />
// //         </BarChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // };

// // export default UserCharts;
