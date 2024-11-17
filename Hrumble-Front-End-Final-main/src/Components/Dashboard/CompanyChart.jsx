import React,{useContext, useRef, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {Nav, Tab} from 'react-bootstrap';
import DashboardContext from "../../Providers/DashboardProvider";





const  CompanyChart = (props) =>{   

   const {Hrresults,fetchSales,companybar}=useContext(DashboardContext)
    const [lable,setLable]=useState(["Sun","Mon","Thu","Wed","Thu","Fri","Sat"])
     const [filter,setFilter]=useState("Week")
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
          name: 'Company',
          type: 'column',
          data:  
          // Hrresults?.ClientSubmission ?.length>0 ?
          // Hrresults.ClientSubmission[0]?.data:
          companybar?.length>0 ?
          companybar[0]?.data:[]
      },
      
    //   {
    //     name: 'Joined',
    //     type: 'column',
    //     data: [75, 88, 77, 100, 0, 0, 0, 0, 0, 0, 0,0]
    // },
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
      labels:lable,
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

   const dataSeries = (seriesType) =>{   
      var columnData = [];
			var areaData = [];
			var lineData = [];
			switch(seriesType) {
          case "week":
            columnData = [1, 7, 5, 2, 50, 5,0 ];
            setLable(["Sun","Mon","Thu","Wed","Thu","Fri","Sat"])
          
					break;
          case "month":
            columnData = [5];
            setLable(["May"])
            
          
					break;
          case "year":
            columnData = [0, 0, 0, 0, 5, 0, , 0, 0, 0, 0,0];

            setLable(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"])
            
          
					break;
				  case "all":
            columnData = [20, 50, 80, 60, 10, 80, 50, 40, 85, 20, 60,85];
          
					break;
          default:
            columnData = [75, 80, 72, 100, 50, 100, 80, 30, 95, 35, 75,100];
        
			}
			chartRef.current.chart.ctx.updateSeries([
          {
            name: "Number of Projects",
            type: 'column',
            
            data: columnData
          },{
            name: 'Revenue',
            type: 'area',
            data: areaData
          },{
            name: 'Active Projects',
            type: 'line',
            data: lineData
          }
			]);
   }
    
    return (
      <>
            <div className=" overflow-hidden"> 
            <Tab.Container defaultActiveKey={'Week'}>
            <div className="card-header border-0 pb-0 flex-wrap">
                <h4 className="heading mb-0">Created Companies</h4>                
                <Nav as="ul" className="nav nav-pills mix-chart-tab"
							  onSelect={(key) => 
                  {
                    if(key == "Year"){
      setLable(
      ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] 
         
      )
      setFilter(key)
      fetchSales(key)
                    }
                    else{
                      setLable(
                        ["Sun","Mon","Thu","Wed","Thu","Fri","Sat"]
                           
                        )
                        setFilter(key)
                        fetchSales(key)
                    }
                    
                  
                 }}
							  defaultActiveKey={filter} 
                              
                 >     
                                      
                                      
                                      <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button"  type="button" eventKey="Week">Week</Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item as="li" className="nav-item" role="presentation">
                                     
                                        <Nav.Link as="button"  type="button" eventKey="Year">Year</Nav.Link>
                                      </Nav.Item>
                                     
                                      
								
									  <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button"  type="button" eventKey="Today">Today</Nav.Link>
                                      </Nav.Item>
									 
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
            </div>               
      </>
    );
  
}

export default CompanyChart;