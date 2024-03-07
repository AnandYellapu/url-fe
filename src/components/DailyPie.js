// // // DailyPieChart.js
// // import React from 'react';
// // import { PieChart } from '@mui/x-charts/PieChart';

// // const DailyPie = ({ data }) => {
// //   return (
// //     <div style={{ width: '100%', height: '300px' }}>
// //       <PieChart
// //         series={[
// //           {
// //             data,
// //             innerRadius: 30,
// //             outerRadius: 100,
// //             paddingAngle: 5,
// //             cornerRadius: 5,
// //             startAngle: -90,
// //             endAngle: 180,
// //             cx: '50%',
// //             cy: '50%', // Center the chart horizontally and vertically
// //           }
// //         ]}
// //         style={{ width: '100%', height: '100%' }}
// //       />
// //     </div>
// //   );
// // };

// // export default DailyPie;






// // DailyPieChart.js
// import { PieChart, Pie, Cell, Legend } from 'recharts';

// const DailyPie = ({ data }) => {
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

//   return (
//     <div style={{ width: '100%', height: '300px' }}>
//       <PieChart width={400} height={300}>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="label"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Legend verticalAlign="bottom" height={36} />
//       </PieChart>
//     </div>
//   );
// };

// export default DailyPie;








import React from 'react';
import { PieChart } from '@mui/x-charts';

const DailyPie = ({ data }) => {
  // Generate colors for each data item
  const colors = ['#ff5722', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];

  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <PieChart
        series={[
          {
            data,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 180,
            cx: '50%',
            cy: '50%', // Center the chart horizontally and vertically
          }
        ]}
        style={{ width: '100%', height: '100%' }}
      />
      {/* Custom Legend */}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
            <div style={{ width: 10, height: 10, backgroundColor: colors[index], marginRight: 5 }}></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPie;
