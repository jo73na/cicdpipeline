
import ReactApexChart from "react-apexcharts";
import DashboardContext from "../../../Providers/DashboardProvider";
import { useContext } from "react";


const  options = {
    chart: {
      type: "bar",
      height: 120,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        orizontal: false,
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
    colors:['#222B40', '#FFFFFF'],
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
            width: 35,
            height: 20,
            strokeWidth: 20,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 8,	
        }
    },
    stroke: {
        show: true,
        width:9,
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
        categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY',],
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
            offsetX:-16,
           style: {
              colors: 'Black',
              fontSize: '13px',
               fontFamily: 'poppins',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
          },
      },
    },
  
} 


const  ExpensesBarChart = () => {

  const {companybar,clientData,invoicechart,count,ClientSelectDatas} = useContext(DashboardContext);
 
    
  const   series = [
    {
        name: 'Expsense ',
        data: invoicechart?.data1
    }, 
    // {
        // [50, 90, 90,90,90,90],
    //   name: 'Cycling',
    //   data: [50, 60, 55,75,25,30]
    // }, 
];

    return (
        <div id="chartBar" className="chartBar">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={130}
            />
        </div>
    );
  
}
export default ExpensesBarChart;
