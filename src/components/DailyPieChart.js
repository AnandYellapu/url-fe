import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function DailyPieChart({ data }) {
  return (
    <div style={{ width: '100%', height: '300px' }}>
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
    </div>
  );
}
