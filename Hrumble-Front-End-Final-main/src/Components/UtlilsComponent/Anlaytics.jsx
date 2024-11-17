import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";


const  AnalyticsEarning =({ClientSubmissionCount})=> {

	//  const {ClientSubmissionCount}=useContext(DashboardContext)


	 const series =[{
		name: "Team",
		data: ClientSubmissionCount?.team?.length>0?ClientSubmissionCount?.team[0]?.data:[9,0,0,0,0,0,0,0,0,0,0,0]
	},
	{
		name: "Yours",
		data:ClientSubmissionCount?.yours?.length>0 ?ClientSubmissionCount?.yours[0]?.data:[5,0,0,0,0,0,0,0,0,0,0,0]
	}]
	 const options = {
		chart: {
			type: 'bar',
			height: 150,
			stacked: true,
			toolbar: {
				show: false,
			}
		},
		// legend: {
		// 	fontSize: '12px',
		// 	fontFamily: 'poppins',
		// 	labels: {
		// 	  colors:'#888888', 
		// 	}
		//   },
		plotOptions: {
			bar: {
				horizontal: !1,
				columnWidth: "25%",
				borderRadius: 5,
				endingShape: "rounded",
				startingShape: "rounded",
			}
		},
		labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

		
	
		colors:['var(--secondary)', 'var(--primary)', '#58bad7'],
		stroke: {
			width: 5,
			colors: ['#fff'],					
		},
		xaxis: {
			show: false,
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,	
				style: {
					colors: '#828282',
					fontSize: '14px',
					fontFamily: 'Poppins',
					fontWeight: 'light',
					cssClass: 'apexcharts-xaxis-label',
				},
			},
			crosshairs: {
				show: false,
			},					
		},
		yaxis: {
			show: false,					
			labels: {
				style: {
					colors: '#828282',
					fontSize: '14px',
					fontFamily: 'Poppins',
					fontWeight: 'light',
					cssClass: 'apexcharts-xaxis-label',
				},
			},					
		},
		grid: {
			show: !1,
			padding: {
				top: -40,
				bottom: -20,
				left: -10,
				right: -2
			}
		},
		toolbar: {
			enabled: false,
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false,					
		},
		fill: {
			opacity: 1
		},
		responsive: [{
			breakpoint: 1601,
			options: {
				plotOptions: {
					bar: {
						columnWidth: '60%',
					},
					
				},
			},
		}],				
	}





	
	  

		return (
			<div id="TotalEarning">
				<ReactApexChart
				  options={options}
				  series={series}
				  type="bar"
				  height={160} 
				  
				/>
			</div>
		);
	}


export default AnalyticsEarning;