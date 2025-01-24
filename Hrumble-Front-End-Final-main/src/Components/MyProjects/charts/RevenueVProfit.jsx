import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const RevenueProfit = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Revenue",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        name: "Profit",
        data: [12, 23, 34, 45, 56, 67, 78, 89, 99, 110, 120, 130],
      },
    ],
    options: {
      chart: {
        stacked: true, // Enables stacked bar chart
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          borderRadiusApplication: 'end',
          columnWidth: "50%",
        },
      },
      fill: {
        type: "gradient", // Applies gradient
        gradient: {
          shade: "light",
          type: "vertical", // Vertical gradient
          gradientToColors: ["#02C2AE", "#FFD700"], // Gradient end colors
          stops: [0, 100],
        },
      },
      colors: ["#1e674d", "#FF8F12"], // Colors for Revenue and Profit
      grid: {
        borderColor: "#eee",
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: false } },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          text: "Amount",
        },
        labels: {
          formatter: function (val) {
            return val + "M";
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "M";
          },
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={240}
        />
      </div>
    </div>
  );
};

export default RevenueProfit;
