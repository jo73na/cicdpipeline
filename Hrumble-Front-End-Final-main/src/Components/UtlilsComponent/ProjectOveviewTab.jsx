import React,{useContext, useRef, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {Nav, Tab} from 'react-bootstrap';
import DashboardContext from "../../Providers/DashboardProvider";



const chartHeaderData = [
  { title: 'Week', type:'week'},
  // { title: 'Month', type:'month'},
  { title: 'Year', type:'year'},
  // { title: 'All', type:'all'},
];

const  ProjectOverviewChart = (props) =>{   


  function getCurrentWeekLabels() {
    // Get the current date
    const today = new Date();
    // Find the start of the current week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Adjust if the week starts on Sunday

    // Generate the labels for each day of the week
    const weekLabels = [];
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        // Format: DD + abbreviated weekday name
        const label = `${currentDay.getDate().toString().padStart(2, '0')}${currentDay.toLocaleString('en-us', { weekday: 'short' })}`;
        weekLabels.push(label);
    }

    return weekLabels;
}

     const [filter,setFilter]=useState("Week")
     const [lable,setLable]=useState(getCurrentWeekLabels())

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
          name: 'Client Submission',
          type: 'column',
          data:  
          Hrresults?.ClientSubmission ?.length>0 ?
          Hrresults.ClientSubmission[0]?.data:
             [0,0,0,0,0,0,0]
          
         
      },
      {
        name: 'Client Screen Reject',
        type: 'area',
        data:  
        Hrresults?.ClientScreenReject ?.length>0 ?
        Hrresults.ClientScreenReject[0]?.data:
        [0,0,0,0,0,0,0]
       
    },

    {
        name: 'Interview',
        type: 'column',
        data:  
        Hrresults?.Interview ?.length>0 ?
        Hrresults.Interview[0]?.data:
           [0,0,0,0,0,0,0]
        
       
    },
    {
        name: 'No Show',
        type: 'column',
        data: Hrresults?.L1noshow ?.length>0 ?
        Hrresults.L1noshow[0]?.data:
        [0,0,0,0,0,0,0]

    },
      
      {
        name: 'Joined',
        type: 'line',
        data:  Hrresults?.Joined ?.length>0 ?
        Hrresults.Joined[0]?.data:
        [0,0,0,0,0,0,0]
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
          zoom: {
            enabled: true, // Disable zooming
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
          columnWidth: '50%', // Set a fixed column width for all bars
          distributed: false, // Ensure equal distribution across all columns
          barHeight: '50%', // Consistent height for bars
          borderRadius: 6, // Adds a rounded edge to the bars
          borderRadiusApplication: 'end',
        },
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
      colors:["var(--primary)","#FF5E5E","var(--secondary)","#3AC977"],
      labels:  filter == "Week" ?
       lable :["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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

export default ProjectOverviewChart;