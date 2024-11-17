import React,{useRef, useState,useContext} from "react";
import ReactApexChart from "react-apexcharts";
import { Tab} from 'react-bootstrap';
import DashboardContext from "../../Providers/DashboardProvider";







 const  EmployeeBarchart = (props) =>{   
  const {ChartData,}=useContext(DashboardContext )
    const chartRef = useRef();
    const  series = [
        {
            name: 'Logged Hours',
            type: 'column',
            data: []
            
        }, 
     
    ]
      
   const options = {
      chart: {
          height: 300,
          type: 'line',
          stacked: false,
          toolbar: {
            show: false,
          },
      },
      
      stroke: {
          width: [0, 1, 1],
          curve: 'straight',
          dashArray: [0, 0, 5]
      },
      legend: {
        fontSize: '13px',
        fontFamily: 'poppins',
        labels: {
          colors:'#888888', 
        }
      },
      plotOptions: {
          bar: {
              columnWidth: '18%',
              borderRadius:6	,
          }
      },
      fill: {            
          type : 'gradient',
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",              
            colorStops : [
              [
                  {
                    offset: 0,
                    color: 'var(--primary)',
                    opacity: 1
                  },
                  {
                    offset: 100,
                    color: 'var(--primary)',
                    opacity: 1
                  }
              ],
              [
                {
                  offset: 0,
                  color: '"#FF5E5E"',
                  opacity: 1
                },
                {
                  offset: 0.4,
                  color: '"#FF5E5E"',
                  opacity: .15
                },
                {
                  offset: 100,
                  color: '"#FF5E5E"',
                  opacity: 0
                }
            ],
              [
                {
                  offset: 0,
                  color: 'var(--secondary)',
                  opacity: 1
                },
                {
                  offset: 100,
                  color: 'var(--secondary)',
                  
                  opacity: 1
                }
            ],
            [
              {
                offset: 0,
                color: '#808080',
                opacity: 1
              },
              {
                offset: 100,
                color: '#808080',
                opacity: 1
              }
          ],
            
              [
                  {
                    offset: 0,
                    color: '#3AC977',
                    opacity: 1
                  },
                  {
                    offset: 100,
                    color: '#3AC977',
                    opacity: 1
                  }
              ],
          ],
            stops: [0, 100, 100, 100]
          }
      },
      colors:["var(--primary)","#FF5E5E","var(--secondary)","#808080","#3AC977"],
       
      labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      markers: {
          size: 0
      },
      xaxis: {
          type: 'month',
          labels: {
                style: {
                  fontSize: '13px',
                  colors:'#888888',
                },
          },
      },
      yaxis: {
          min: 0,
          tickAmount: 4,
          labels: {
                style: {
                  fontSize: '13px',
                  colors:'#888888',
                },
          },
      },
      tooltip: {
          shared: true,
          intersect: false,
          y: {
              formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) 
              }
              return y;          
            }
          }
      }
   }   


    
    return (
      <>
          <Tab.Container defaultActiveKey={'Week'}>
            
            <div className="card-body  p-0">                 
                <div id="overiewChart">       
                  <ReactApexChart
                    options={options}
                    series={series}
                    ref={chartRef}
                    type="line"
                    height={300}
                  />
                </div>                
                {/* <div className="ttl-project">
                    <div className="pr-data">
                        <h5>12,721</h5>
                        <span>Number of Projects</span>
                    </div>
                    <div className="pr-data">
                        <h5 className="text-primary">721</h5>
                        <span>Active Projects</span>
                    </div>
                    <div className="pr-data">
                        <h5>$2,50,523</h5>
                        <span>Revenue</span>
                    </div>
                    <div className="pr-data">
                        <h5 className="text-success">12,275h</h5>
                        <span>Working Hours</span>
                    </div>
                </div> */}
            </div>
          </Tab.Container>
      </>
    );
  
}

export default EmployeeBarchart;

