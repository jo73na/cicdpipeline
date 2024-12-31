import React, { useRef, useState, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { Nav, Tab } from 'react-bootstrap';
import DashboardContext from "../../../Providers/DashboardProvider";
import moment from 'moment'; // You can use date-fns or moment.js for date manipulation

const chartHeaderData = [
  { title: 'Clients', type: 'Clients' },
  { title: 'Projects', type: 'Projects' },
  { title: 'Candidates', type: 'Candidates' },
];

const ProjectOverviewChart = (props) => {
  const { count } = useContext(DashboardContext);
  const chartRef = useRef();

  const [selectedPeriod, setSelectedPeriod] = useState('week'); // State to track selected period


  // Function to aggregate data based on the selected period (week, month, year)
  const aggregateDataByPeriod = (data, period) => {
    const groupedData = Array(12).fill(0); // Initialize counts for 12 months
  
    // Ensure data is an array and filter out invalid entries
    if (!Array.isArray(data)) {
      console.warn("Data is not an array:", data);
      return groupedData;
    }
  
    const validData = data.filter((item) => {
      if (!item?.date) {
        console.warn("Missing or invalid date:", item);
        return false;
      }
      return true;
    });
  
    validData.forEach((item) => {
      const date = moment(item.date, "YYYY-MM-DD", true); // Strict parsing
      if (!date.isValid()) {
        console.warn("Invalid date format:", item.date);
        return; // Skip invalid dates
      }
  
      const currentYear = moment().year();
      if (date.year() !== currentYear) return; // Only consider the current year
  
      if (period === 'month') {
        const monthIndex = date.month(); // 0 = January, 11 = December
        groupedData[monthIndex] += 1;
      }
    });
  
    console.log("Grouped Data:", groupedData);
    return groupedData;
  };

  // Function to return the series data for the chart
  const dataSeries = () => {
    const columnData = aggregateDataByMonth(count?.candidateCountsByMonth || []);
    const areaData = aggregateDataByMonth(count?.companyCountsByMonth || []);
    const lineData = aggregateDataByMonth(count?.contactCountsByMonth || []);


    return [
        {
            name: "Candidates",
            type: 'column',
            data: columnData,
        },
        {
            name: 'Company',
            type: 'area',
            data: areaData,
        },
        {
            name: 'Contacts',
            type: 'line',
            data: lineData,
        }
    ];
};

// Helper function to transform month-wise data into a structured format
const aggregateDataByMonth = (data) => {
    const months = Array(12).fill(0); // Initialize an array for all months

    data.forEach(item => {
        const yearMonth = item._id.yearMonth; // Get the year-month (e.g., "2024-06")
        const [year, month] = yearMonth.split('-'); // Split into year and month
        const monthIndex = parseInt(month, 10) - 1; // Convert month to 0-based index
        if (monthIndex >= 0 && monthIndex < 12) {
            months[monthIndex] = item.count; // Set the count for the respective month
        }
    });

    return months; // Return the array of counts for each month (0-based index)
};


  // Function to generate labels for the x-axis (Months)
  const generateLabels = () => {
    return Array.from({ length: 12 }, (_, i) => moment().month(i).format('MMM')); // ["Jan", "Feb", ...]
  };

  const xAxisLabels = generateLabels();

  // Get the series data based on the selected period
  const series = dataSeries(selectedPeriod);

  const options = {
    chart: {
      height: props.height,
      type: 'line',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 1, 1],
      curve: 'straight',
      dashArray: [0, 0, 5],
    },
    legend: {
      fontSize: '13px',
      fontFamily: 'poppins',
      labels: {
        colors: '#888888',
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '18%',
        borderRadius: 6,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        colorStops: [
          [
            { offset: 0, color: 'var(--primary)', opacity: 1 },
            { offset: 100, color: 'var(--primary)', opacity: 1 },
          ],
          [
            { offset: 0, color: '#3AC977', opacity: 1 },
            { offset: 0.4, color: '#3AC977', opacity: .15 },
            { offset: 100, color: '#3AC977', opacity: 0 },
          ],
          [
            { offset: 0, color: '#FF5E5E', opacity: 1 },
            { offset: 100, color: '#FF5E5E', opacity: 1 },
          ],
        ],
        stops: [0, 100, 100, 100],
      },
    },
    colors: ["var(--primary)", "#3AC977", "#FF5E5E"],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    markers: {
      size: 0,
    },
    xaxis: {
      categories: xAxisLabels, // Months as X-axis labels
      labels: {
        style: {
          fontSize: '13px',
          colors: '#888888',
        },
      },
    },
    yaxis: {
      min: 0,// Automatically adjust scale
      labels: {
        style: {
          fontSize: '13px',
          colors: '#888888',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };

  return (
    <>
      <Tab.Container defaultActiveKey={'Week'}>
        <div className="card-header border-0 pb-0 flex-wrap">
          <h4 className="heading mb-0">DataBase</h4>
        </div>
        <div className="card-body p-0">
          <div id="overiewChart">
            <ReactApexChart
              options={options}
              series={series}
              ref={chartRef}
              type="line"
              height={props.height}
            />
          </div>
          <div className="ttl-project">
            <div className="pr-data">
              <h5>{count?.totalCandidates}</h5>
              <span>Total Candidates</span>
            </div>
            <div className="pr-data">
              <h5 className="text-primary">{count?.totalCompany || 0}</h5>
              <span>Total Company</span>
            </div>
            <div className="pr-data">
              <h5>{count?.totalContacts || 0}</h5>
              <span>Total Contact</span>
            </div>
          </div>
        </div>
      </Tab.Container>
    </>
  );
}

export default ProjectOverviewChart;
