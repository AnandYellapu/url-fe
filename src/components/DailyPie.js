import React from 'react';
import { PieChart } from '@mui/x-charts';
import { Tooltip } from '@mui/material';

const DailyPie = ({ data, className }) => {
  const chartWidth = 300; // Initial width of the chart, adjust as needed
  const minWidthForRotation = 400; // Minimum width at which labels should be rotated

  const labelRotation = chartWidth < minWidthForRotation ? -45 : 0;

  return (
    <div className={className} style={{ width: '100%', height: '300px', position: 'relative' }}>
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
          },
        ]}
        style={{ width: '100%', height: '100%' }}
        label={({ value }) => value}
        labelPosition={chartWidth < minWidthForRotation ? 'inside' : 'outside'}
        labelRotation={labelRotation}
      >
        <Tooltip
          position="right"
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                  {payload[0].payload.label}: {payload[0].value}
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </div>
  );
};

export default DailyPie;
