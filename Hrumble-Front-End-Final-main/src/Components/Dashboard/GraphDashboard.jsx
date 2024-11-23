import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ButtonGroup, Button } from 'react-bootstrap';

function GoalCard({ chartdata = [], goals = [] }) {
  const [timeRange, setTimeRange] = useState('Week');
  const [filteredData, setFilteredData] = useState([]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  useEffect(() => {
    if (chartdata && chartdata.length > 0) {
      // Filter chart data based on selected time range
      const dataForTimeRange = chartdata.filter(item => item.duration === timeRange);
      setFilteredData(dataForTimeRange);
    }
  }, [chartdata, timeRange]);

  if (!goals.length || !filteredData.length) {
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
      categories: goals.map(goal => goal.goaltype_name),
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
    data: filteredData.map(data => {
      const { goaltype_name, assigned } = data;
      const actualValue = assigned.target;
      const targetValue = goals.find(goal => goal.goaltype_name === goaltype_name)?.assigned.target || 0;

      // Set the fill color based on the actual value compared to the target
      const fillColor = actualValue >= targetValue ? '#88a67e' : '#F8B940';

      return {
        x: goaltype_name,
        y: actualValue,
        goals: [{ name: 'Target', value: targetValue }],
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
