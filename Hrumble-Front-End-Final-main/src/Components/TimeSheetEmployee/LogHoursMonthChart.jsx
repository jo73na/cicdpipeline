import { createRoot } from 'react-dom/client';


import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, Inject } from '@syncfusion/ej2-react-charts';
import { useContext } from 'react';
import FaqContext from '../../Providers/Faq';
import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from "@syncfusion/ej2-react-layouts";
export let data1 = [
   
    { x: 'Yours', y: 20, r: '60', text: 'Yours' },
    { x: 'Total', y: 180, r: '80',  text: 'Total' },

];
const LogHoursMonthchart = () => {
    const{ ChartData } = useContext(FaqContext);
     
    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    const segmentColors = ['green', '#4CAF50'];


    const pointColorMapping = (point, series, palette) => {
    
        return segmentColors[point.index % segmentColors.length];
    };
    const onPointRender = (args) => {
        if (args.point.x =="Total") {
            args.fill = '#757B48';
        }
        else {
             console.log("args",args)
            args.fill = '#E3E4D2';
        }
    };
    return (<div className='control-pane'>
            <div className='control-section'>
            <DashboardLayoutComponent
                 id="edit_dashboard" columns={1}   >
                          <AccumulationChartComponent id='pie-chart'
                 style={{height:"200px", width:"400px",}} 
                 pointRender={onPointRender} legendSettings={{ visible: true, reverse: true }} enableSmartLabels={true} title='' enableBorderOnMouseMove={false} enableAnimation={true} load={load.bind(this)} tooltip={{ enable: true, format: '<b>${point.x}</b><br/>Log Hours: <b>${point.text} </b>' }}
                                     palette={pointColorMapping}
                                     >
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]}/>
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={ChartData?.month} xName='x' yName='y' innerRadius='80%' tooltipMappingName='r' dataLabel={{ visible: true, position: Browser.isDevice ? 'Inside' : 'Outside', name: 'text', enableRotation: true, font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' } }} radius='r'/>
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </DashboardLayoutComponent>
            </div>
        </div>);
};
export default LogHoursMonthchart;