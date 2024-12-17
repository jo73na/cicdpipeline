import { useState, useRef, useLayoutEffect, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Nav, Tab } from 'react-bootstrap';
import { Tag } from 'antd';

const EarningTab = [
	{ title: 'Day', type: 'day' },
	{ title: 'Week', type: 'week' },
	{ title: 'Month', type: 'month' },
	{ title: 'Year', type: 'year' },
  ];

const EarningChart = ({ Primarycolor, DetailHead, data, totalEarnings }) => {
  const earningRef = useRef();
  const chartWidth = useRef(null);
  const [width, setWidth] = useState(0);

  // Track data prop changes
  useEffect(() => {
    console.log("Profit Data:", data);
  }, [data]); // Log whenever data changes

  useLayoutEffect(() => {
    setWidth(chartWidth.current.offsetWidth);
  }, []);

  // Ensure data is always an array, even if it's undefined
  const profitData = Array.isArray(data) ? data : [];

  // Get the last 6 months dynamically
  const getLastSixMonths = () => {
    const months = [];
    const currentMonth = new Date().getMonth(); // Get the current month (0-11)
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12; // Wrap around for negative months
      months.push(new Date(2024, monthIndex).toLocaleString('default', { month: 'short' })); // Get short month name
    }
    return months;
  };

  const lastSixMonths = getLastSixMonths(); // Get the last 6 months

  const series = [
    {
      name: "Profit",
      data: profitData.slice(-5), // Only use the last 6 months data
    },
  ];

  const options = {
    chart: {
      type: 'area',
      height: 300,
      width: width + 55,
      offsetX: -45,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [Primarycolor || "#88a67e"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: 'straight',
      colors: [Primarycolor || "#88a67e"],
    },
    grid: {
      show: true,
      borderColor: '#eee',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      min: Math.min(...profitData.slice(-6)), // Min value based on the last 6 months data
      max: Math.max(...profitData.slice(-6)), // Max value based on the last 6 months data
      labels: {
        offsetX: 70,
      },
    },
    xaxis: {
      categories: lastSixMonths, // Display the last 6 months
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          fontSize: '16px',
        },
      },
    },
    fill: {
      opacity: 0.5,
      colors: Primarycolor || "#88a67e",
      type: 'gradient',
      gradient: {
        colorStops: [
          {
            offset: 0.6,
            color: Primarycolor || "#88a67e",
            opacity: .2,
          },
          {
            offset: 0.6,
            color: Primarycolor || "#88a67e",
            opacity: .15,
          },
          {
            offset: 100,
            color: 'white',
            opacity: 0,
          },
        ],
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return "$" + val + "";
        },
      },
    },
  };

  // Update series when the seriesType changes
  const dataSeries = (seriesType) => {
    let columnData = [];
    if (seriesType === "month") {
      // Dynamically use the profitData for the last 6 months
      columnData = profitData.slice(-6); // Use the last 6 months of profit data
    }
    earningRef.current.chart.ctx.updateSeries([
      {
        name: "Profit",
        data: columnData,
      },
    ]);
  };

  return (
    <div className="card-body px-0 overflow-hidden ">
      <h3>
        <Tag color={Primarycolor} style={{ fontSize: "16px", borderRadius: "5px" }}>
          {DetailHead}
        </Tag>
      </h3>
      <div className="total-earning">
        <h2 style={{ fontSize: "18px" }}>₹ {totalEarnings}</h2>
        <Tab.Container defaultActiveKey={'Month'}>
          <Nav as="ul" className="nav nav-pills mb-3 earning-tab earning-chart">
            {EarningTab.map((item, ind) => (
              <Nav.Item as="li" key={ind}>
                <Nav.Link as="button" eventKey={item.title}
                  onClick={() => dataSeries(item.type)}
                >
                  {item.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <div id="earningChart" ref={chartWidth}>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={250}
              ref={earningRef}
              width={width + 55}
            />
          </div>
        </Tab.Container>
      </div>
    </div>
  );
};

export default EarningChart;
