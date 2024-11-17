import React,{useContext, useRef, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {Nav, Tab} from 'react-bootstrap';

import PBFContext from "../../Providers/PBFReports";
import { CSVLink } from "react-csv";



const chartHeaderData = [
  { title: 'Week', type:'week'},
  { title: 'Month', type:'month'},
  { title: 'Year', type:'year'},
  { title: 'Custom', type:'custom'},
  // { title: 'All', type:'all'},
];

const  RecriuterChart = ({csvlink,text,openCustompopup,chartlabel,chart1,chart2,chart3,chart4,chart5,filter,setFilter}) =>{   

      console.log("text",text)
 
     const [lable,setLable]=useState(["Sun","Mon","Thu","Wed","Thu","Fri","Sat"])

   const {recriuterChart,fetchstatus,range,date}=useContext(PBFContext)
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
    //     {
    //       name: 'Total Positions',
    //       type: 'column',
    //       data: 
    //       filter == "Week" ?
    //       chart1
    //       :
    //       filter == "Month" ?
    //       [10,1,0,0,0,]
    //       :
    //       filter == "Custom" ?
    //       [2,1,0,0,0,]


    //       :
    //       [5,1,0,0,0,]
          

          
         
    //   },
        {
          name: 'Client Submission',
          type: 'column',
          data: recriuterChart.ClientSubmission
          
         
      },
      {
        name: 'Client Screen Reject',
        type: 'area',
        data: recriuterChart?.ClientScreenReject
       
    },

    {
        name: 'Interview',
        type: 'column',
        data:  recriuterChart?.Interview
        
       
    },
  
      
      {
        name: 'Joined',
        type: 'line',
        data: recriuterChart?.Joined
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
            stops: [100,0, 100, 100]
          }
      },
      colors:["var(--primary)","#FF5E5E","var(--secondary)","#3AC977"],
      labels:  recriuterChart?.label,
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
                 if(key == "Custom"){
                    openCustompopup()
                 setFilter(key)

                 }
                 else{
                 setFilter(key)
                     
                 }
              
        //    fetchstatus(key)
            }
          
          }

           >
            <div className="card-header border-0 pb-0 flex-wrap">
                <h4 className="heading mb-0">
                     {text}</h4>  

                   <div className="d_f g_10 ">
                   <CSVLink {...csvlink} className="btn btn-primary light btn-sm "><i className="fa-solid fa-file-excel" /> Export Report </CSVLink>                             

                   <Nav as="ul" className="nav nav-pills mix-chart-tab">
                      {chartHeaderData.map((item, index)=>(
                        <Nav.Item as="li" className="nav-item" key={index}>
                            <Nav.Link  eventKey={item.title}
                            
                            >{item.title}</Nav.Link>
                        </Nav.Item>
                      ))}
                  </Nav>
                   </div>
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

export default RecriuterChart;