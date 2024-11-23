

import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ButtonGroup, Button } from 'react-bootstrap';

const sampleData = {
  Week: [
    { x: 'Interview', y: 4, goals: [{ name: 'Target', value: 5 }] },
    { x: 'Onboarded', y: 5, goals: [{ name: 'Target', value: 7 }] },
    { x: 'Trained', y: 8, goals: [{ name: 'Target', value: 8 }] }
  ],
  Month: [
    { x: 'Interview', y: 15, goals: [{ name: 'Target', value: 12 }] },
    { x: 'Onboarded', y: 19, goals: [{ name: 'Target', value: 16 }] },
    { x: 'Trained', y: 18, goals: [{ name: 'Target', value: 20 }] }
  ],
  Year: [
    { x: 'Interview', y: 22, goals: [{ name: 'Target', value: 25 }] },
    { x: 'Onboarded', y: 35, goals: [{ name: 'Target', value: 40 }] },
    { x: 'Trained', y: 42, goals: [{ name: 'Target', value: 45 }] }
  ]
};

function GoalCard({ chartdata = [], goals = [] }) {
  const [timeRange, setTimeRange] = useState('Week');

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (!goals.length || !sampleData[timeRange]) {
    return <div>No data available for the selected range</div>;
  }

  // Chart options
  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        borderRadius: 14,
        borderRadiusApplication: 'end',
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => {
        const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;
        return goals && goals.length ? `${val} / ${goals[0].value}` : val;
      }
    },
    xaxis: {
      title: { text: 'Values', style: { fontSize: '16px', fontWeight: 'bold' } }
    },
    yaxis: {
      categories: goals,
      title: { text: 'Goals', style: { fontSize: '16px', fontWeight: 'bold' }, offsetX: 8 },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value} points`
      }
    }
  };

  // Series data based on the selected time range
  const series = [{
    name: `${timeRange} Data`,
    data: sampleData[timeRange].map(data => {
      const { y: actualValue, goals } = data;
      const targetValue = goals[0]?.value || 0; // Use optional chaining

      // Set the fill color based on the actual value compared to the target
      const fillColor = actualValue >= targetValue ? '#88a67e' : '#F8B940';

      return {
        x: data.x,
        y: actualValue,
        goals,
        fillColor
      };
    })
  }];

  // Update the options to include the fill colors
  options.fill = {
    colors: series[0].data.map(data => data.fillColor),
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <ButtonGroup>
          {['Week', 'Month', 'Year'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'outline-primary'}
              onClick={() => handleTimeRangeChange(range)}
              aria-pressed={timeRange === range}
            >
              {range}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <Chart
        options={options}
        series={series}
        type="bar"
        height={Math.max(300, Math.min(goals.length * 40, 500))} // Maximum height of 500px
      />
    </div>
  );
}

export default GoalCard;
