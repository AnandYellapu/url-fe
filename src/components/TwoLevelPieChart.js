// TwoLevelPieChart.js
import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const TwoLevelPieChart = ({ data }) => {
  return (
    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 80,
          data,
        },
        {
          innerRadius: 100,
          outerRadius: 120,
          data,
        },
      ]}
      width={400}
      height={300}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
};

export default TwoLevelPieChart;
