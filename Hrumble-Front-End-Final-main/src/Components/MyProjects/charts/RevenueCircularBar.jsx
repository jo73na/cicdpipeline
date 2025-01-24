import ReactApexChart from "react-apexcharts";

const RevenueCircularBar =({chartheight})=>{
    const options = {
        series: [70],
        chart: {
          height: 350,
          type: 'radialBar',
        },
        
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%',
            },
          },
        },
        fill: {
            colors: ['#FF9012']
          },
        labels: ['Profit'],
      };
    
      return (
        <div className="w-full h-96">
          <ReactApexChart 
            options={options}
            series={options.series}
            type="radialBar"
            height={chartheight}
                      />
        </div>
      );
    };
  



export default RevenueCircularBar