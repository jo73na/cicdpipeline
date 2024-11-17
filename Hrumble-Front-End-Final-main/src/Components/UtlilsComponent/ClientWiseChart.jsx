import React,{useContext, useRef, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {Nav, Tab} from 'react-bootstrap';
import DashboardContext from "../../Providers/DashboardProvider";



const chartHeaderData = [
  { title: 'Week', type:'week'},
  { title: 'Month', type:'month'},
  { title: 'Year', type:'year'},
  { title: 'Custom', type:'custom'},
  // { title: 'All', type:'all'},
];

const  ClientwiseReport = ({chartlabel,chart1,chart2,chart3,chart4,chart5,filter,setFilter}) =>{   

     

     const [lable,setLable]=useState(["Sun","Mon","Thu","Wed","Thu","Fri","Sat"])

   const {Hrresults,fetchstatus}=useContext(DashboardContext)
    const chartRef = useRef();
    const  series = [
        // {
        //     name: 'Over All Submissions',
        //     type: 'column',
        //     data:
        //     //  Hrresults?.OverAllsubmission ?.length>0 ?
        //     //  Hrresults.OverAllsubmission[0]?.data:
        //      [3,2,0,0,0,0,0]
        // },
        {
          name: 'Total Positions',
          type: 'column',
          data: 
          filter == "Week" ?
          chart1
          :
          filter == "Month" ?
          [10,1,0,0,0,]
          :
          filter == "Custom" ?
          [2,1,0,0,0,]


          :
          [5,1,0,0,0,]
          

          
         
      },
        {
          name: 'Client Submission',
          type: 'area',
          data:   filter == "Week" ?
          chart2
          :
          filter == "Month" ?
          [2,1,0,0,0]
          :
          filter == "Custom" ?
          [1,1,0,0,0,] :
          [4,1,0,0,0]
          
         
      },
      {
        name: 'Client Screen Reject',
        type: 'area',
        data:  chart3
       
    },

    {
        name: 'Interview',
        type: 'column',
        data:  chart4
        
       
    },
  
      
      {
        name: 'Joined',
        type: 'line',
        data: chart5
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
          dashArray: [0, 0, 0,0,5]
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
                    color:"var(--primary)",
                    opacity: 1
                  },
                  {
                    offset: 0.4,
                    color: "var(--primary)",
                    opacity: .15
                  },
                  {
                    offset: 100,
                    color:"var(--primary)",
                    opacity: 0
                  }
              ],
                [
                  {
                    offset: 0,
                    color: "#FF5E5E",
                    opacity: 1
                  },
                  {
                    offset: 0.4,
                    color: "#FF5E5E",
                    opacity: .15
                  },
                  {
                    offset: 100,
                    color: "#FF5E5E",
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
      colors:["var(--primary)","var(--primary)","#FF5E5E","var(--secondary)","#3AC977"],
      labels:  filter == "Week" ?
    
      chartlabel :chartlabel,
      markers: {
          size: 0
      },
      xaxis: {
          type: 'week',
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
                return y.toFixed(0);
              }
              return y;          
            }
          }
      }
   }   

 
    
    return (
      <>
          <Tab.Container defaultActiveKey={filter}
           onSelect={(key)=>
            {
                 setFilter(key)
              
           fetchstatus(key)
            }
          
          }

           >
            <div className="card-header border-0 pb-0 flex-wrap">
                <h4 className="heading mb-0"></h4>                
                  <Nav as="ul" className="nav nav-pills mix-chart-tab">
                      {chartHeaderData.map((item, index)=>(
                        <Nav.Item as="li" className="nav-item" key={index}>
                            <Nav.Link  eventKey={item.title}
                            
                            >{item.title}</Nav.Link>
                        </Nav.Item>
                      ))}
                  </Nav>
            </div>
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

export default ClientwiseReport;