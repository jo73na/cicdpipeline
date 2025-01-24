import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const HoursChart =()=>{

    const [chartData] = useState({
        series: [
          {
            name: 'Login Hour',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
          },
        ],
        options: {
          chart: {
            height: 100,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 6,
              borderRadiusApplication: 'end',
             
              dataLabels: {
                enabled: false,
                position: 'top', // top, center, bottom
              },
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: 'vertical', // "vertical" for vertical gradient
              gradientToColors: ['#02C2AE'], // End color of the gradient
              stops: [0, 100], // Defines gradient stops
            },
          },
          colors: ['#1e674d'],
          grid: {
            borderColor: "#eee",
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: false } },
          },
        //   dataLabels: {
        //     enabled: false,
        //     formatter: function (val) {
        //       return val + '%';
        //     },
        //     offsetY: -20,
        //     style: {
        //       fontSize: '12px',
        //       colors: ['#1e674d'],
        //     },
        //   },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            position: 'bottom',
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            // crosshairs: {
            //   fill: {
            //     type: 'gradient',
            //     gradient: {
            //       colorFrom: '#1e674d',
            //       colorTo: '#80f393',
            //       stops: [0, 100],
            //       opacityFrom: 0.4,
            //       opacityTo: 0.5,
            //     },
            //   },
            // },
            tooltip: {
                
              enabled: false,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + '%';
              },
            },
          },
          title: {
            text: 'Monthly Inflation in Argentina, 2002',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444',
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
    



export default HoursChart