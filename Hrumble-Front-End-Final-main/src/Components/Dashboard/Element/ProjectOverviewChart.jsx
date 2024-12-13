import React,{useRef, useState, useContext} from "react";
import ReactApexChart from "react-apexcharts";
import {Nav, Tab} from 'react-bootstrap';
import DashboardContext from "../../../Providers/DashboardProvider";

const chartHeaderData = [
  { title: 'Clients', type:'Clients'},
  { title: 'Projects', type:'Projects'},
  { title: 'Candidates', type:'Candidates'},
 
];

const  ProjectOverviewChart = (props) =>{   
  const {companybar,clientData,invoicechart,count,ClientSelectDatas} = useContext(DashboardContext);
    const chartRef = useRef();
    const  series = [
        {
            name: 'Candidates',
            type: 'column',
            data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100]
        }, {
            name: 'Company',
            type: 'area',
            data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42]
        }, {
            name: 'Contacts',
            type: 'line',
            data: [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35,20]
        }
    ]
      console.log("companybar:" ,companybar );
      console.log("ClientData:" ,clientData );
      console.log("count:" ,count?.createdAt );

      console.log("invoicechart:" ,invoicechart );
      console.log("ClientSelectDatas:" ,ClientSelectDatas );

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
                      color: '#3AC977',
                      opacity: 1
                    },
                    {
                      offset: 0.4,
                      color: '#3AC977',
                      opacity: .15
                    },
                    {
                      offset: 100,
                      color: '#3AC977',
                      opacity: 0
                    }
                ],
                [
                    {
                      offset: 0,
                      color: '#FF5E5E',
                      opacity: 1
                    },
                    {
                      offset: 100,
                      color: '#FF5E5E',
                      opacity: 1
                    }
                ],
            ],
            stops: [0, 100, 100, 100]
          }
      },
      colors:["var(--primary)","#3AC977","#FF5E5E"],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                return y.toFixed(0) + " points";
              }
              return y;          
            }
          }
      }
   }   

   const dataSeries = (seriesType) =>{   
      var columnData = [];
			var areaData = [];
			var lineData = [];
			switch(seriesType) {
          case "week":
            columnData = [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100];
            areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42];
            lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35,20];
					break;
          case "month":
            columnData = [20, 50, 80, 52, 10, 80, 50, 30, 90, 10, 60,85];
            areaData = [40, 25, 85, 45, 85, 25, 95, 65, 45, 45, 20,12];
            lineData = [65, 45, 25, 65, 45, 25, 75, 35, 65, 75, 15,65];
					break;
          case "year":
            columnData = [30, 20, 80, 52, 10, 90, 50, 30, 75, 20, 60,85];
            areaData = [40, 25, 40, 45, 85, 25, 50, 65, 45, 60, 20,12];
            lineData = [65, 45, 30, 65, 45, 25, 75, 40, 65, 50, 15,65];
					break;
			// case "all":
            // columnData = [20, 50, 80, 60, 10, 80, 50, 40, 85, 20, 60,85];
            // areaData = [40, 25, 30, 45, 85, 25, 95, 65, 50, 45, 20,12];
            // lineData = [65, 45, 25, 65, 45, 25, 30, 35, 65, 75, 15,65];
			// 		break;
          default:
            columnData = [75, 80, 72, 100, 50, 100, 80, 30, 95, 35, 75,100];
            areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42];
            lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 30, 35,20];
			}
			chartRef.current.chart.ctx.updateSeries([
          {
            name: "Candidates",
            type: 'column',
            data: columnData
          },{
            name: 'Company',
            type: 'area',
            data: areaData
          },{
            name: 'Contacts',
            type: 'line',
            data: lineData
          }
			]);
   }
    
    return (
      <>
          <Tab.Container defaultActiveKey={'Week'}>
            <div className="card-header border-0 pb-0 flex-wrap">
                <h4 className="heading mb-0">DataBase</h4>                
                  
            </div>
            <div className="card-body   p-0">                 
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
                        <h5 className="text-primary">{count?.totalCompany}</h5>
                        <span>Total Company</span>
                    </div>
                    <div className="pr-data">
                        <h5>{count?.totalConatcs}</h5>
                        <span>Total Contact</span>
                    </div>
                   
                </div>
            </div>
          </Tab.Container>
      </>
    );
  
}

export default ProjectOverviewChart;




// import React,{useContext, useRef, useState} from "react";
// import ReactApexChart from "react-apexcharts";
// import {Nav, Tab} from 'react-bootstrap';
// import DashboardContext from "../../Providers/DashboardProvider";
 
 
 
// const chartHeaderData = [
//   { title: 'Week', type:'week'},
//   // { title: 'Month', type:'month'},
//   { title: 'Year', type:'year'},
//   // { title: 'All', type:'all'},
// ];
 
// const  ProjectOverviewChart = (props) =>{  
 
 
//   function getCurrentWeekLabels() {
//     // Get the current date
//     const today = new Date();
//     // Find the start of the current week (Monday)
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Adjust if the week starts on Sunday
 
//     // Generate the labels for each day of the week
//     const weekLabels = [];
//     for (let i = 0; i < 7; i++) {
//         const currentDay = new Date(startOfWeek);
//         currentDay.setDate(startOfWeek.getDate() + i);
//         // Format: DD + abbreviated weekday name
//         const label = `${currentDay.getDate().toString().padStart(2, '0')}${currentDay.toLocaleString('en-us', { weekday: 'short' })}`;
//         weekLabels.push(label);
//     }
 
//     return weekLabels;
// }
 
//      const [filter,setFilter]=useState("Week")
//      const [lable,setLable]=useState(getCurrentWeekLabels())
 
//    const {Hrresults,fetchstatus}=useContext(DashboardContext)
//     const chartRef = useRef();
//     const  series = [
//         // {
//         //     name: 'Over All Submissions',
//         //     type: 'column',
//         //     data:
//         //     //  Hrresults?.OverAllsubmission ?.length>0 ?
//         //     //  Hrresults.OverAllsubmission[0]?.data:
//         //      [3,2,0,0,0,0,0]
//         // },
//         {
//           name: 'Client Submission',
//           type: 'column',
//           data:  
//           Hrresults?.ClientSubmission ?.length>0 ?
//           Hrresults.ClientSubmission[0]?.data:
//              [0,0,0,0,0,0,0]
         
         
//       },
//       {
//         name: 'Client Screen Reject',
//         type: 'area',
//         data:  
//         Hrresults?.ClientScreenReject ?.length>0 ?
//         Hrresults.ClientScreenReject[0]?.data:
//         [0,0,0,0,0,0,0]
       
//     },
 
//     {
//         name: 'Interview',
//         type: 'column',
//         data:  
//         Hrresults?.Interview ?.length>0 ?
//         Hrresults.Interview[0]?.data:
//            [0,0,0,0,0,0,0]
       
       
//     },
//     {
//         name: 'No Show',
//         type: 'column',
//         data: Hrresults?.L1noshow ?.length>0 ?
//         Hrresults.L1noshow[0]?.data:
//         [0,0,0,0,0,0,0]
 
//     },
     
//       {
//         name: 'Joined',
//         type: 'line',
//         data:  Hrresults?.Joined ?.length>0 ?
//         Hrresults.Joined[0]?.data:
//         [0,0,0,0,0,0,0]
//     },
//     ]
     
//    const options = {
//       chart: {
//           height: 300,
//           type: 'line',
//           stacked: false,
//           toolbar: {
//             show: false,
//           },
//           zoom: {
//             enabled: true, // Disable zooming
//           },
//       },
     
//       stroke: {
//           width: [0, 1, 1],
//           curve: 'straight',
//           dashArray: [0, 0, 0,0,5]
//       },
//       legend: {
//         fontSize: '13px',
//         fontFamily: 'poppins',
//         labels: {
//           colors:'#888888',
//         }
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: '50%', // Set a fixed column width for all bars
//           distributed: false, // Ensure equal distribution across all columns
//           barHeight: '50%', // Consistent height for bars
//           borderRadius: 6, // Adds a rounded edge to the bars
//           borderRadiusApplication: 'end',
//         },
//       },
//       fill: {            
//           type : 'gradient',
//           gradient: {
//             inverseColors: false,
//             shade: 'light',
//             type: "vertical",              
//             colorStops : [
//                 [
//                     {
//                       offset: 0,
//                       color: 'var(--primary)',
//                       opacity: 1
//                     },
//                     {
//                       offset: 100,
//                       color: 'var(--primary)',
//                       opacity: 1
//                     }
//                 ],
//                 [
//                   {
//                     offset: 0,
//                     color: '"#FF5E5E"',
//                     opacity: 1
//                   },
//                   {
//                     offset: 0.4,
//                     color: '"#FF5E5E"',
//                     opacity: .15
//                   },
//                   {
//                     offset: 100,
//                     color: '"#FF5E5E"',
//                     opacity: 0
//                   }
//               ],
//                 [
//                   {
//                     offset: 0,
//                     color: 'var(--secondary)',
//                     opacity: 1
//                   },
//                   {
//                     offset: 100,
//                     color: 'var(--secondary)',
                   
//                     opacity: 1
//                   }
//               ],
             
//                 [
//                     {
//                       offset: 0,
//                       color: '#3AC977',
//                       opacity: 1
//                     },
//                     {
//                       offset: 100,
//                       color: '#3AC977',
//                       opacity: 1
//                     }
//                 ],
//             ],
//             stops: [0, 100, 100, 100]
//           }
//       },
//       colors:["var(--primary)","#FF5E5E","var(--secondary)","#3AC977"],
//       labels:  filter == "Week" ?
//        lable :["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       markers: {
//           size: 0
//       },
//       xaxis: {
//           type: 'week',
//           labels: {
//                 style: {
//                   fontSize: '13px',
//                   colors:'#888888',
//                 },
//           },
//       },
//       yaxis: {
//           min: 0,
//           tickAmount: 4,
//           labels: {
//                 style: {
//                   fontSize: '13px',
//                   colors:'#888888',
//                 },
//           },
//       },
//       tooltip: {
//           shared: true,
//           intersect: false,
//           y: {
//               formatter: function (y) {
//               if (typeof y !== "undefined") {
//                 return y.toFixed(0);
//               }
//               return y;          
//             }
//           }
//       }
//    }  
 
 
   
//     return (
//       <>
//           <Tab.Container defaultActiveKey={filter}
//            onSelect={(key)=>
//             {
//                  setFilter(key)
             
//            fetchstatus(key)
//             }
         
//           }
 
//            >
//             <div className="card-header border-0 pb-0 flex-wrap">
//                 <h4 className="heading mb-0"></h4>                
//                   <Nav as="ul" className="nav nav-pills mix-chart-tab">
//                       {chartHeaderData.map((item, index)=>(
//                         <Nav.Item as="li" className="nav-item" key={index}>
//                             <Nav.Link  eventKey={item.title}
                           
//                             >{item.title}</Nav.Link>
//                         </Nav.Item>
//                       ))}
//                   </Nav>
//             </div>
//             <div className="card-body  p-0">                
//                 <div id="overiewChart">      
//                   <ReactApexChart
//                     options={options}
//                     series={series}
//                     ref={chartRef}
//                     type="line"
//                     height={300}
//                   />
//                 </div>                
//                 {/* <div className="ttl-project">
//                     <div className="pr-data">
//                         <h5>12,721</h5>
//                         <span>Number of Projects</span>
//                     </div>
//                     <div className="pr-data">
//                         <h5 className="text-primary">721</h5>
//                         <span>Active Projects</span>
//                     </div>
//                     <div className="pr-data">
//                         <h5>$2,50,523</h5>
//                         <span>Revenue</span>
//                     </div>
//                     <div className="pr-data">
//                         <h5 className="text-success">12,275h</h5>
//                         <span>Working Hours</span>
//                     </div>
//                 </div> */}
//             </div>
//           </Tab.Container>
//       </>
//     );
 
// }
 
// export default ProjectOverviewChart;


// <Nav as="ul" className="nav nav-pills mix-chart-tab">
//                       {chartHeaderData.map((item, index)=>(
//                         <Nav.Item as="li" className="nav-item" key={index}>
//                             <Nav.Link  eventKey={item.title}
//                               onClick={()=>dataSeries(item.type)}
//                             >{item.title}</Nav.Link>
//                         </Nav.Item>
//                       ))}
//                   </Nav>


// import React, { useRef, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import { Tab } from 'react-bootstrap';

// const chartTabs = [
//   { title: 'Number of Clients', type: 'Clients' },
//   { title: 'Active Projects', type: 'Projects' },
//   { title: 'Number of Candidates', type: 'Candidates' },
// ];

// const ProjectOverviewChart = (props) => {
//   const chartRef = useRef();

//   // Initial data setup
//   const [seriesData, setSeriesData] = useState([
//     {
//       name: 'Number of Clients',
//       type: 'column',
//       data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75, 100]
//     },
//     {
//       name: 'Active Projects',
//       type: 'area',
//       data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50, 42]
//     },
//     {
//       name: 'Number of Candidates',
//       type: 'line',
//       data: [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35, 20]
//     }
//   ]);

//   const [summaryData, setSummaryData] = useState({
//     Clients: '12,721',
//     Projects: '721',
//     Candidates: '2,50,523'
//   });

//   const options = {
//     chart: {
//       height: props.height,
//       type: 'line',
//       stacked: false,
//       toolbar: {
//         show: false,
//       },
//     },
//     stroke: {
//       width: [0, 1, 1],
//       curve: 'straight',
//       dashArray: [0, 0, 5]
//     },
//     legend: {
//       fontSize: '13px',
//       fontFamily: 'poppins',
//       labels: {
//         colors: '#888888',
//       }
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: '18%',
//         borderRadius: 6,
//       }
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         inverseColors: false,
//         shade: 'light',
//         type: "vertical",
//         colorStops: [
//           [
//             {
//               offset: 0,
//               color: 'var(--primary)',
//               opacity: 1
//             },
//             {
//               offset: 100,
//               color: 'var(--primary)',
//               opacity: 1
//             }
//           ],
//           [
//             {
//               offset: 0,
//               color: '#3AC977',
//               opacity: 1
//             },
//             {
//               offset: 0.4,
//               color: '#3AC977',
//               opacity: .15
//             },
//             {
//               offset: 100,
//               color: '#3AC977',
//               opacity: 0
//             }
//           ],
//           [
//             {
//               offset: 0,
//               color: '#FF5E5E',
//               opacity: 1
//             },
//             {
//               offset: 100,
//               color: '#FF5E5E',
//               opacity: 1
//             }
//           ],
//         ],
//         stops: [0, 100, 100, 100]
//       }
//     },
//     colors: ["var(--primary)", "#3AC977", "#FF5E5E"],
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     markers: {
//       size: 0
//     },
//     xaxis: {
//       type: 'month',
//       labels: {
//         style: {
//           fontSize: '13px',
//           colors: '#888888',
//         },
//       },
//     },
//     yaxis: {
//       min: 0,
//       tickAmount: 4,
//       labels: {
//         style: {
//           fontSize: '13px',
//           colors: '#888888',
//         },
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//         formatter: function (y) {
//           if (typeof y !== "undefined") {
//             return y.toFixed(0) + " points";
//           }
//           return y;
//         }
//       }
//     }
//   };

//   // Switch data according to the selected tab
//   const dataSeries = (type) => {
//     let columnData = [];
//     let areaData = [];
//     let lineData = [];

//     switch (type) {
//       case "Clients":
//         columnData = [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75, 100];
//         areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50, 42];
//         lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35, 20];
//         setSummaryData({
//           Clients: '12,721',
//           Projects: '721',
//           Candidates: '2,50,523'
//         });
//         break;
//       case "Projects":
//         columnData = [20, 50, 80, 52, 10, 80, 50, 30, 90, 10, 60, 85];
//         areaData = [40, 25, 85, 45, 85, 25, 95, 65, 45, 45, 20, 12];
//         lineData = [65, 45, 25, 65, 45, 25, 75, 35, 65, 75, 15, 65];
//         setSummaryData({
//           Clients: '12,721',
//           Projects: '1,150',
//           Candidates: '2,60,500'
//         });
//         break;
//       case "Candidates":
//         columnData = [30, 20, 80, 52, 10, 90, 50, 30, 75, 20, 60, 85];
//         areaData = [40, 25, 40, 45, 85, 25, 50, 65, 45, 60, 20, 12];
//         lineData = [65, 45, 30, 65, 45, 25, 75, 40, 65, 50, 15, 65];
//         setSummaryData({
//           Clients: '10,500',
//           Projects: '850',
//           Candidates: '2,45,000'
//         });
//         break;
//       default:
//         columnData = [75, 80, 72, 100, 50, 100, 80, 30, 95, 35, 75, 100];
//         areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50, 42];
//         lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 30, 35, 20];
//         setSummaryData({
//           Clients: '12,721',
//           Projects: '721',
//           Candidates: '2,50,523'
//         });
//     }

//     setSeriesData([
//       { name: "Number of Clients", type: 'column', data: columnData },
//       { name: 'Active Projects', type: 'area', data: areaData },
//       { name: 'Number of Candidates', type: 'line', data: lineData }
//     ]);
//   };

//   return (
//     <>
//       <div className="card-body p-0">
//         <div id="overiewChart">
//           <ReactApexChart
//             options={options}
//             series={seriesData}
//             ref={chartRef}
//             type="line"
//             height={props.height}
//           />
//         </div>

//         {/* Tabs for Summary Data */}
//         <div className="ttl-project">
//           <Tab.Container defaultActiveKey="Clients">
//             <div className="nav nav-pills mix-chart-tab">
//               {chartTabs.map((item, index) => (
//                 <Tab.Pane eventKey={item.type} key={index}>
//                   <div
//                     className="nav-item"
//                     onClick={() => dataSeries(item.type)}
//                   >
//                     {item.title}
//                   </div>
//                 </Tab.Pane>
//               ))}
//             </div>

//             <div className="tab-content">
//               {Object.keys(summaryData).map((key, index) => (
//                 <Tab.Pane eventKey={key} key={index}>
//                   <div className="pr-data">
//                     <h5>{summaryData[key]}</h5>
//                     <span>{key}</span>
//                   </div>
//                 </Tab.Pane>
//               ))}
//             </div>
//           </Tab.Container>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectOverviewChart;


// import React, { useRef, useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const ProjectOverviewChart = (props) => {   
//     const chartRef = useRef();
//     const [activeTab, setActiveTab] = useState('Clients');

//     const series = {
//         Clients: [
//             {
//                 name: 'Number of Clients',
//                 type: 'column',
//                 data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75, 100]
//             }, {
//                 name: 'Active Projects',
//                 type: 'area',
//                 data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50, 42]
//             }, {
//                 name: 'Number Of Candidates',
//                 type: 'line',
//                 data: [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35, 20]
//             }
//         ],
//         Projects: [
//             {
//                 name: 'Number of Clients',
//                 type: 'column',
//                 data: [20, 50, 80, 52, 10, 80, 50, 30, 90, 10, 60, 85]
//             }, {
//                 name: 'Active Projects',
//                 type: 'area',
//                 data: [40, 25, 85, 45, 85, 25, 95, 65, 45, 45, 20, 12]
//             }, {
//                 name: 'Number Of Candidates',
//                 type: 'line',
//                 data: [65, 45, 25, 65, 45, 25, 75, 35, 65, 75, 15, 65]
//             }
//         ],
//         Candidates: [
//             {
//                 name: 'Number of Clients',
//                 type: 'column',
//                 data: [30, 20, 80, 52, 10, 90, 50, 30, 75, 20, 60, 85]
//             }, {
//                 name: 'Active Projects',
//                 type: 'area',
//                 data: [40, 25, 40, 45, 85, 25, 50, 65, 45, 60, 20, 12]
//             }, {
//                 name: 'Number Of Candidates',
//                 type: 'line',
//                 data: [65, 45, 30, 65, 45, 25, 75, 40, 65, 50, 15, 65]
//             }
//         ]
//     };
      
//     const options = {
//         chart: {
//             height: props.height,
//             type: 'line',
//             stacked: false,
//             toolbar: {
//                 show: false,
//             },
//         },
        
//         stroke: {
//             width: [0, 1, 1],
//             curve: 'straight',
//             dashArray: [0, 0, 5]
//         },
//         legend: {
//             fontSize: '13px',
//             fontFamily: 'poppins',
//             labels: {
//                 colors:'#888888', 
//             }
//         },
//         plotOptions: {
//             bar: {
//                 columnWidth: '18%',
//                 borderRadius: 6,
//             }
//         },
//         fill: {            
//             type: 'gradient',
//             gradient: {
//                 inverseColors: false,
//                 shade: 'light',
//                 type: "vertical",              
//                 colorStops: [
//                     [
//                         {
//                             offset: 0,
//                             color: 'var(--primary)',
//                             opacity: 1
//                         },
//                         {
//                             offset: 100,
//                             color: 'var(--primary)',
//                             opacity: 1
//                         }
//                     ],
//                     [
//                         {
//                             offset: 0,
//                             color: '#3AC977',
//                             opacity: 1
//                         },
//                         {
//                             offset: 0.4,
//                             color: '#3AC977',
//                             opacity: .15
//                         },
//                         {
//                             offset: 100,
//                             color: '#3AC977',
//                             opacity: 0
//                         }
//                     ],
//                     [
//                         {
//                             offset: 0,
//                             color: '#FF5E5E',
//                             opacity: 1
//                         },
//                         {
//                             offset: 100,
//                             color: '#FF5E5E',
//                             opacity: 1
//                         }
//                     ],
//                 ],
//                 stops: [0, 100, 100, 100]
//             }
//         },
//         colors: ["var(--primary)","#3AC977","#FF5E5E"],
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         markers: {
//             size: 0
//         },
//         xaxis: {
//             type: 'month',
//             labels: {
//                 style: {
//                     fontSize: '13px',
//                     colors:'#888888',
//                 },
//             },
//         },
//         yaxis: {
//             min: 0,
//             tickAmount: 4,
//             labels: {
//                 style: {
//                     fontSize: '13px',
//                     colors:'#888888',
//                 },
//             },
//         },
//         tooltip: {
//             shared: true,
//             intersect: false,
//             y: {
//                 formatter: function (y) {
//                     if (typeof y !== "undefined") {
//                         return y.toFixed(0) + " points";
//                     }
//                     return y;          
//                 }
//             }
//         }
//     };

//     return (
//         <div className="project-overview-chart">
//             <div className="card-header border-0 pb-0 flex-wrap">
//                 <h4 className="heading mb-0">DataBase</h4>                
//                 <div className="chart-tabs flex space-x-4 mb-4">
//                     {['Clients', 'Projects', 'Candidates'].map((tab) => (
//                         <div 
//                             key={tab}
//                             className={`cursor-pointer px-4 py-2 rounded ${
//                                 activeTab === tab 
//                                     ? 'bg-primary text-white' 
//                                     : 'bg-gray-200 text-gray-700'
//                             }`}
//                             onClick={() => setActiveTab(tab)}
//                         >
//                             {tab}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="card-body p-0">                 
//                 <div id="overiewChart">       
//                     <ReactApexChart
//                         options={options}
//                         series={series[activeTab]}
//                         type="line"
//                         height={props.height}
//                     />
//                 </div>                
//                 <div className="ttl-project flex justify-between px-4 py-2">
//                     <div className="pr-data">
//                         <h5>12,721</h5>
//                         <span>Number of Clients</span>
//                     </div>
//                     <div className="pr-data">
//                         <h5 className="text-primary">721</h5>
//                         <span>Active Projects</span>
//                     </div>
//                     <div className="pr-data">
//                         <h5>2,50,523</h5>
//                         <span>Number of Candidates</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProjectOverviewChart;