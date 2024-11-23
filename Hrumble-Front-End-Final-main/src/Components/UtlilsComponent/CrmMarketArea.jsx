import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import InvoiceExpenceContext from "../../Providers/InvoiceExpence";



const  CrmMarketArea = () => {
     const {expenceothers}=useContext(InvoiceExpenceContext)
  
	 const   series = [
		{
			name: "Amount",
			data: expenceothers?.data2
		},             
	];
	const  options = {
		chart: {
			type: 'area',
			height: 250,
			group: 'social',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show:false,
		  tooltipHoverFormatter: function(val, opts) {
			return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
		  },
		  markers: {
			fillColors:['var(--primary)'],
			width: 3,
			height: 16,
			strokeWidth: 0,
			radius: 16
		  }
		},
		markers: {
		  size: [8,6],
		  strokeWidth: [4,5],
		  strokeColors: ['#fff'],
		  border:4,
		  radius: 4,
		  colors:['var(--primary)'],
		  hover: {
			size: 10,
		  }
		},
		xaxis: {
			categories:expenceothers?.data1,
			labels: {
			 style: {
				colors: '#3E4954',
				fontSize: '12px',
				 fontFamily: 'Mulish',
				fontWeight: 100,
				
			  },
			},
			axisBorder:{
				show: false,
			}
		  },
		  yaxis: {
			  labels: {
				  show: true,
				  align: 'right',
				  minWidth: 5,
				  offsetX:1,
				  style: {
					colors: '#666666',
					fontSize: '12px',
					 fontFamily: 'Mulish',
					fontWeight: 100,
					
				  },
			  },
		  },
		  fill: {
			colors:['#fff','var(--primary)'],
			type:'gradient',
			opacity: 1,
			gradient: {
				shade:'light',
				shadeIntensity: 1,
				colorStops: [ 
				  [
					{
					  offset: 0,
					  color: 'var(--primary)',
					  opacity: 0.4
					},
					{
					  offset: 0.6,
					  color: 'var(--primary)',
					  opacity: 0.25
					},
					{
					  offset: 100,
					  color: 'var(--primary)',
					  opacity: 0
					}
				  ],
				  [
					{
					  offset: 0,
					  color: 'var(--primary)',
					  opacity: .4
					},
					{
					  offset: 50,
					  color: 'var(--primary)',
					  opacity: 0.25
					},
					{
					  offset: 100,
					  color: '#fff',
					  opacity: 0
					}
				  ]
				]
	
		  },
		},
		colors:['var(--primary)','var(--primary)'],
		stroke:{
			curve : "straight",
			 width: 3,
		},
		grid: {
		  borderColor: '#e1dede',
		  strokeDashArray:8,
		  
			xaxis: {
				lines: {
				show: true,
				opacity: 0.5,
				}
			},
			yaxis: {

				formatter: function (value) {
					if (value >= 1000) {
						return `₹ ${(value / 1000).toFixed(0)}k`;
					}
					return `₹ ${value.toFixed(0)}k`
				},
				lines: {
				show: true,
				opacity: 0.5,
				}
			},
			row: {
				colors: undefined,
				opacity: 0.5
			},  
			column: {
				colors: undefined,
				opacity: 0.5
			},  
		},
		responsive: [{
			breakpoint: 1602,
			options: {
				markers: {
					 size: [6,6,4],
					 hover: {
						size: 7,
					  }
				},
				chart: {
					height: 230,
				},	
			},			
		 }]
	   
	  
	} 
    return (
        <div id="activity1">
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={250}
            />
        </div>
    );
  
}
export default CrmMarketArea;
