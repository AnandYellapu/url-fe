import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function MonthlyPieChart({ data }) {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            data,
          },
        ]}
        height={300}
      />
    </div>
  );
}






