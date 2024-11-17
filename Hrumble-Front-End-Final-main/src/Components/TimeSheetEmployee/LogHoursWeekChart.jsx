import { ResponsivePie } from '@nivo/pie'
import { useContext } from 'react'
import JobContext from '../../Providers/JobProvider';
import FaqContext from '../../Providers/Faq';



const LogHoursWeekchart = () => {

    const{ ChartData } = useContext(FaqContext);
    console.log("chartData",ChartData)
    console.log("chartData",ChartData?.week?.yourscount[0]?.totalLoggedHours?.split(":")[0]||0)
  
    const convertToMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
      };



    const data =[
    {
      "id": "Total",
      "label": `Total :(${ChartData?.week?.total||0})`,
      "value": ( 40 || 1),
      "color": "hsl(178, 70%, 50%)"
    },
    {
    
      "id": "Yours",
      "label": `Yours :(${ChartData?.week?.yourscount[0]?.totalLoggedHours||0})`,
      "value": Number(ChartData?.week?.yourscount[0]?.totalLoggedHours?.split(":")[0]||0),
      "color": "hsl(309, 70%, 50%)"
    },
  ]
  
     return( 
            
     <>
     <ResponsivePie 
        data={data}
        margin={{ top: 10, right: 150, bottom: 0, left: 40 }}
       
        
        startAngle={-180}
        innerRadius={0.58}
        padAngle={2}
        cornerRadius={5}
        fit={false}
        activeInnerRadiusOffset={1.5}
        activeOuterRadiusOffset={1}
        colors={['#639a29', '#757B48']}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0.2'
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={true}
        arcLabelsRadiusOffset={0.25}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'dot',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 2,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'OpenJobs'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'ClosedJobs'
                },
                id: 'dot'
            },
        ]}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 140,
                translateY: 0,
                itemWidth: 90,
                itemHeight: 14,
                itemsSpacing: 6,
                symbolSize: 16,
                itemDirection: 'left-to-right'
            }
        ]}
    />
     </>
   
    
     )
    }

export default LogHoursWeekchart