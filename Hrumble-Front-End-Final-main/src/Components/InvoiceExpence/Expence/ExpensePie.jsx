import React from "react";

import { Browser } from "@syncfusion/ej2-base";
import {
  DashboardLayoutComponent,
 
} from "@syncfusion/ej2-react-layouts";

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
  Inject,
} from "@syncfusion/ej2-react-charts";
import { useContext } from "react";
import InvoiceExpenceContext from "../../../Providers/InvoiceExpence";
import { Empty, Select } from "antd";
import styled from "styled-components";

const ExpensePie = () => {
  const { expencePie } = useContext(InvoiceExpenceContext);
  // const expencePie =[]
  const load = (args) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast");
  };
  const onPointRender = (args) => {
    if (args.point.x == "Total") {
      args.fill = "#757B48";
    }
    if (args.point.x == "Others") {
      args.fill = "rgba(83, 179, 239, 1.0)";
    }
    if (args.point.x == "Salary") {
      args.fill = "#002244";
    }
  };
  const legendSettings = { position: "Bottom", alignment: "Near" };

    return expencePie?.length > 0 ? (
      <ChartSection>
         <div className="d_f j_c_s_b p_10">
              <p
                className="card_header p_15"
                style={
                  {
                    // position:"absolute",
                    // top:"30px",
                  }
                }
              >
                Invoice Summary
              </p>
              <Select
                placeholder="Last Year"
                style={{
                  width: "120px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              />
            </div>

            <DashboardLayoutComponent
              id="edit"
              row={0}
              col={0}
              sizeX={1}
              sizeY={1}
              style={
                {
                  // position: "absolute",
                  // top: "80px",
                  // left: "-38px",
                }
              }
            >
              <AccumulationChartComponent
                legendSettings={legendSettings}
                style={{ height: "270px", width: "350px", margin: "auto",display:"flex" }}
                id="pie-chart4"
                enableSmartLabels={true}
                title=""
                enableBorderOnMouseMove={false}
                enableAnimation={true}
                load={load.bind(this)}
                tooltip={{
                  enable: true,
                  format: "<b>${point.x}</b><br/>  ₹ <b>${point.y} </b>",
                }}
                pointRender={onPointRender}
              >
                <Inject
                  services={[
                    AccumulationLegend,
                    PieSeries,
                    AccumulationDataLabel,
                    AccumulationTooltip,
                  ]}
                />
                <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective
                    dataSource={expencePie}
                    xName="x"
                    yName="y"
                    // width="80%"
                    innerRadius="20%"
                    tooltipMappingName="r"
                    dataLabel={{
                      visible: true,
                      position: Browser.isDevice ? "Inside" : "Outside",
                      name: "text",
                      enableRotation: true,
                      font: { fontWeight: "600" },
                      connectorStyle: { length: "20px", type: "Curve" },
                    }}
                    radius="r"
                  />
                </AccumulationSeriesCollectionDirective>
              </AccumulationChartComponent>
            </DashboardLayoutComponent>
         
      </ChartSection>
    ) : (
      <Empty
        style={{
          margin: "100px auto",
        }}
        description={<span>No Invoice Data...</span>}
      />
    );
};
export default ExpensePie;


const ChartSection = styled.section`
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    height: 100%;
#edit {
    height: auto !important;
    width: auto !important;
    display: flex;
    margin: auto;
}
#pie-chart4_svg {
    height: auto !important;
}
#pie-chart4_border {
    width: 100% !important;
}






`;