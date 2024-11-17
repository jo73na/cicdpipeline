import { useContext } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  Highlight,
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import InvoiceExpenceContext from "../../../Providers/InvoiceExpence";
import InvoicePie from "./InvoicePie";
import { Empty } from "antd";
import styled from "styled-components";
 
const InvoiceGrap = () => {
  const { expencegraph, expencePie } = useContext(InvoiceExpenceContext);
  console.log("expencePie", expencegraph);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
 
  const startDate = new Date(currentYear, 0, 1); // January 1st of the current year
  const endDate = new Date(currentYear, 11, 31); // December 31st of the current year
 
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const endMonth = endDate.toLocaleString("default", { month: "short" });
 
  const dateRange = `${startMonth} ${currentYear} - ${endMonth} ${currentYear}`;
 
  const onChartLoad = (args) => {
    // let chart = document.getElementById('charts5');
    // chart.setAttribute('title', '');
  };
  const load = (args) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast");
  };
 
  const legendSettings = { position: "Top" };
  return (
<ChartSection>
<div className="m_t_10 m_b_10 d_f j_c_s_b card_1_align" style={{}}>
<div
          className="card card_1"
          style={{
            borderRadius: "10px",
            width: "69%",
          }}
>
<p className="card_header p_15">Invoice Data</p>
<p className="card_header_para m_l_10 m_t_1">({dateRange})</p>
          {expencegraph &&
          expencegraph?.data1 &&
          expencegraph?.data1.length > 0 &&
          expencegraph?.data2 &&
          expencegraph?.data2.length > 0 ? (
<ChartComponent
              style={{ height: "280px", width: "100%" }}
              id="charts5"
              load={load.bind(this)}
              primaryXAxis={{
                valueType: "Category",
                majorTickLines: { width: 0 },
                minorTickLines: { width: 3 },
                interval: 1,
                majorGridLines: { width: 0 },
              }}
              primaryYAxis={{
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
                title: "",
              }}
              legendSettings={legendSettings}
              chartArea={{ border: { width: 0 } }}
              enableSideBySidePlacement={false}
              title=""
              tooltip={{ enable: true, shared: true }}
              width={Browser.isDevice ? "100%" : "100%"}
              loaded={onChartLoad.bind(this)}
>
<Inject
                services={[ColumnSeries, DataLabel, Category, Tooltip, Legend]}
              />
<SeriesCollectionDirective>
<SeriesDirective
                  columnSpacing={2}
                  dataSource={expencegraph?.data1}
                  xName="x"
                  width={2}
                  yName="y"
                  name="Salary"
                  type="Column"
                  columnWidth={0.9}
                  fill="#002244"
                  legendShape="Rectangle"
                  cornerRadius={{
                    bottomLeft: Browser.isDevice ? 10 : 0,
                    bottomRight: Browser.isDevice ? 10 : 0,
                    topLeft: Browser.isDevice ? 10 : 10,
                    topRight: Browser.isDevice ? 10 : 10,
                  }}
                />
 
                <SeriesDirective
                  cornerRadius={{
                    bottomLeft: Browser.isDevice ? 10 : 0,
                    bottomRight: Browser.isDevice ? 10 : 0,
                    topLeft: Browser.isDevice ? 10 : 10,
                    topRight: Browser.isDevice ? 10 : 10,
                  }}
                  fill="rgba(83, 179, 239, 1.0)"
                  legendShape="Rectangle"
                  columnSpacing={2}
                  dataSource={expencegraph?.data2}
                  xName="x"
                  width={2}
                  yName="y"
                  name="Others"
                  type="Column"
                  columnWidth={0.9}
                />
</SeriesCollectionDirective>
</ChartComponent>
          ) : (
<Empty
              style={{
                margin: "29px auto",
              }}
              description={<span>No Invoices.....</span>}
            />
          )}
</div>
        {/* <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width:0  } }} primaryYAxis={{ title: '',  majorTickLines: { width: 0 }, labelFormat: '₹{value}', lineStyle: { width: 0 }, maximum: 500000, interval: 100000 }} chartArea={{ border: { width: 0 } }} load={load.bind(this)} tooltip={{ enable: true, header: "<b>${point.tooltip}</b>", shared: true }} width={Browser.isDevice ? '100%' : '75%'} title='Expense In Salary' loaded={loaded.bind(this)}>
<Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel, Highlight]}/>
<SeriesCollectionDirective>
<SeriesDirective dataSource={expencegraph?.data1} 
                    // width={20} 
                cornerRadius={{ bottomLeft: Browser.isDevice ? 10 : 0, bottomRight: Browser.isDevice ? 10 : 0, topLeft: Browser.isDevice ? 10 : 10, topRight: Browser.isDevice ? 10 : 10}}
                 fill ="#757B48" tooltipMappingName='toolTipMappingName' xName='x' columnSpacing={0.1} columnWidth={2} yName='y' name='Salary' type='Column'/>
                {/* <SeriesDirective   fill ="#E3E4D2" dataSource={expencegraph?.data2} tooltipMappingName='toolTipMappingName' xName='x' columnSpacing={0.1} yName='y' name='Others' type='Column'/> */}
 
        {/* </SeriesCollectionDirective>
</ChartComponent> */}
<div
          className="card card_1"
          style={{
            width: "30%",
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
>
<InvoicePie />
</div>
</div>
</ChartSection>
  );
};
 
export default InvoiceGrap;
 
 
const ChartSection = styled.section`
  @media screen and (max-width: 1200px) {
    .card_1_align {
      flex-direction: column;
      gap: 15px;
    } .card_1 {
      width: 100% !important;
    }
  }
`;