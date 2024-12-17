import ReactApexChart from "react-apexcharts";
import { useContext } from 'react';
import DashboardContext from '../../../Providers/DashboardProvider';

const options = {
    chart: {
        type: "bar",
        height: 120,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '100%',
            endingShape: "rounded",
            borderRadius: 6,            
        },
    },
    states: {
        hover: {
            filter: 'none',
        }
    },
    colors: ['#FFFFFF', '#222B40'],
    dataLabels: {
        enabled: false,
        offsetY: -30
    },
    legend: {
        show: false,
        fontSize: '12px',
        labels: {
            colors: '#000000',                  
        },
        markers: {
            width: 20,
            height: 20,
            strokeWidth: 10,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 6,    
        }
    },
    stroke: {
        show: true,
        width: 9,
        curve: 'smooth',
        lineCap: 'round',
        colors: ['transparent']
    },
    grid: {
        show: false,
        xaxis: {
            lines: {
                show: false,
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        },                
    },
    xaxis: {
        categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], // Full year (12 months)
        labels: {
            show: false,
            style: {
                colors: '#A5AAB4',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'poppins',
                cssClass: 'apexcharts-xaxis-label',
            },
        },
        crosshairs: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: false,
            offsetX: -16,
            style: {
                colors: '#000000',
                fontSize: '13px',
                fontFamily: 'poppins',
                fontWeight: 100,
                cssClass: 'apexcharts-xaxis-label',
            },
        },
    },
};

const RevenueChart = () => {
    const { invoicechart } = useContext(DashboardContext);
    console.log("Revenue Data:", invoicechart);

    const data1 = invoicechart?.data1 || [];  // Ensure safe access to data1

    // Update the series dynamically using the data1
    const series = [
        {
            name: 'Revenue',
            data: data1.slice(0, 12),  // Assuming data1 has 12 months of data
        }, 
    ];

    return (
        <div id="expensesChart" className="chartBar">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={130}
            />
        </div>
    );
};

export default RevenueChart;
