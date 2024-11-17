// import React, { useContext } from "react";

// import ReactApexChart from "react-apexcharts";
// import InvoiceExpenceContext from "../../Providers/InvoiceExpence";




// const  TrafficBarChart = ({filter}) => {
//      const {expencegraph}=useContext(InvoiceExpenceContext)
//   const   series = [
//     {
//         name: 'Salary',
//          data:expencegraph?.data1
//     }, 
  
//   ];
//   // const  options = {
//   //   chart: {
//   //     type: "bar",
//   //     height: 200,
//   //     toolbar: {
//   //       show: false,
//   //     },
//   //   },
//   //   plotOptions: {
//   //     bar: {
//   //       horizontal: false,
//   // endingShape:'rounded',
//   // columnWidth: '5%',
//   // borderRadius: 5,         
//   //     },
//   //   },
//   //   colors:['#', '#77248B'],
//   // dataLabels: {
//   // enabled: false,
//   // },
//   // markers: {
//   // shape: "circle",
//   // },
//   // legend: {
//   // show: false,
//   // fontSize: '12px',
//   // labels: {
//   //   colors: '#000000',
    
//   //   },
//   // markers: {
//   //           width: 30,
//   //           height: 30,
//   //           strokeWidth: 0,
//   //           strokeColor: '#fff',
//   //           fillColors: undefined,
//   //           radius: 35,	
//   // }
//   // },
//   //   stroke: {
//   //       show: true,
//   //       width: 6,
//   //       colors: ['transparent']
//   //   },
//   //   grid: {
//   //       borderColor: 'rgba(252, 252, 252,0.2)',
//   //   },
//   //   xaxis: {
//   //       categories:expencegraph?.label1 ,
//   //       labels: {
//   //         style: {
//   //             colors: '#000',
//   //             fontSize: '13px',
//   //             fontFamily: 'Mulish',
//   //             fontWeight: 100,
//   //             cssClass: 'apexcharts-xaxis-label',
//   //             },		
//   //       },
//   //       axisBorder: {
//   //         show: false,
//   //        },
//   //       axisTicks: {
//   //         show: false,
//   //         borderType: 'solid',
//   //         color: '#78909C',
//   //         height: 6,
//   //         offsetX: 0,
//   //         offsetY: 0
//   //     },
//   //       crosshairs: {
//   //           show: false,
//   //       }
//   //     },
//   //     yaxis: {
//   //         labels: {
//   //             offsetX:-16,
//   //             formatter: function (value) {
//   //               if (value >= 1000) {
//   //                   return `₹ ${(value / 1000).toFixed(0)} k`;
//   //               }
//   //               return value;
//   //           },
//   //            style: {
//   //               colors: '#000',
//   //               fontSize: '13px',
//   //                fontFamily: 'Mulish',
//   //               fontWeight: 100,
//   //               cssClass: 'apexcharts-xaxis-label',
//   //           },
//   //       },
//   //     },
//   //     fill: {
//   //       opacity: 1,
//   //       colors:['var(--primary)', '#FFD125'],
//   //     },
//   //     tooltip: {
//   //       y: {
//   //         formatter: function (val) {
//   //           return "₹" + val 
//   //         }
//   //       }
//   //     },
//   //   responsive: [{
        
//   //       options: {
//   //           plotOptions: {
//   //               bar: {
//   //               columnWidth: '1%',
//   //               borderRadius: -1,
//   //               },
//   //           },
//   //           chart:{
//   //               height:250,
//   //           },
//   //           series: [
//   //               {
//   //                   name: 'Projects',
//   //                       data: [31, 40, 28,31, 40, 28,31, 40]
//   //               }, 
//   //               {
//   //                   name: 'Projects',
//   //                   data: [11, 32, 45,31, 40, 28,31, 40]
//   //               }, 
                
//   //           ],
//   //       }
//   //   }]
  
//   // } 


  
// const options = {
//   chart: {
//       height: 300,
//       type: 'line',
//       stacked: false,
//       toolbar: {
//         show: false,
//       },
//   },
  
//   stroke: {
//       width: [1, 1, 1],
//       curve: 'straight',
//       dashArray: [1]
//   },
//   legend: {
//     fontSize: '13px',
//     fontFamily: 'Mulish',
//     labels: {
//       colors:'#888888', 
//     }
//   },
//   plotOptions: {
//       bar: {
//           columnWidth: '10%',
//           borderRadius:6	,
//       }
//   },
//   fill: {            
//       type : 'gradient',
//       gradient: {
//         inverseColors: false,
//         shade: 'light',
//         type: "vertical",              
//         colorStops : [
//             [
//                 {
//                   offset: 0,
//                   color: 'var(--primary)',
//                   opacity: 1
//                 },
//                 {
//                   offset: 100,
//                   color: 'var(--primary)',
//                   opacity: 1
//                 }
//             ],
          
        
//         ],
//         stops: [100, 100, 100, 100]
//       }
//   },
//   colors:["var(--primary)"],
//   labels:expencegraph?.label1,
//   markers: {
//       size: 0
//   },
//   xaxis: {
//       type: 'week',
//       labels: {
//             style: {
//               fontSize: '13px',
//               colors:'#888888',
//             },
//       },
//   },
//   yaxis: {
//       min: 0,
//       tickAmount: 4,
//       labels: {
//             style: {
//               fontSize: '13px',
//               colors:'#888888',
//             },
//       },
//   },
//   tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//           formatter: function (y) {
//           if (typeof y !== "undefined") {
//             return y.toFixed(0);
//           }
//           return y;          
//         }
//       }
//   }
// }   

  
//     return (
//         <div id="overiewChart">
//             <ReactApexChart
//                 options={options}
//                 series={series}
//                 type="column"
//                 height={300}
//             />
//         </div>
//     );
  
// }
// export default TrafficBarChart;

import React,{useRef, useState,useContext} from "react";
import ReactApexChart from "react-apexcharts";
import {Nav, Tab} from 'react-bootstrap';

import { DatePicker,Select } from 'antd'

import InvoiceExpenceContext from "../../Providers/InvoiceExpence";

 





const  TrafficBarChart = (props) =>{   
     const {expencegraph}=useContext(InvoiceExpenceContext)

    const chartRef = useRef();
    const  series = [
        {
            name: 'Salary',
            type: 'column',
            data: expencegraph?.data1
            
        } ,
        {
          name: 'Tax Amount',
          type: 'column',
          data: expencegraph?.data2
          
      } 
      ]
      
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
          dashArray: [0, 0, 0,0,5]
      },
      legend: {
        fontSize: '12px',
        fontFamily: 'Mulish',
        labels: {
          colors:'#888888', 
        }
      },
      plotOptions: {
          bar: {
              columnWidth: '10%',
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
                    color: 'var(--color-primary)',
                    opacity: 1
                  },
                  {
                    offset: 100,
                    color: 'var(--color-primary)',
                    opacity: 1
                  }
              ],
              [
                {
                  offset: 0,
                  color: '#f7b940',
                  opacity: 1
                },
                {
                  offset: 100,
                  color: '#f7b940',
                  opacity: 1
                }
            ],
         
          ],
            stops: [100, 100, 100, 100]
          }
      },
      colors:["var(--color-primary)","#f7b940"],
       
      labels:expencegraph?.label1,
      markers: {
          size: 0
      },
      xaxis: {
         
          labels: {
                style: {
                  fontSize: '12px',
                  colors:'#888888',
                  marginLeft: '10px',
                },
          },
      },
      yaxis: {
          min: 0,
          tickAmount: 4,
          labels: {
                style: {
                  fontSize: '12px',
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
            
         
      </>
    );
  
}

export default TrafficBarChart;
