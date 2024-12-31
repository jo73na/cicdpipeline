import { useContext, useRef, useLayoutEffect, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import DashboardContext from "../../../Providers/DashboardProvider";
import { Tag } from "antd";
import { Nav, Tab } from "react-bootstrap";

const EarningTab = [
  { title: "Quarter 1", type: "Q1" },
  { title: "Quarter 2", type: "Q2" },
  { title: "Quarter 3", type: "Q3" },
];

const EarningChart = ({ Primarycolor, DetailHead }) => {
  const { earningchart } = useContext(DashboardContext); // Fetch data from context
  const chartWidth = useRef(null);
  const [width, setWidth] = useState(0);
  const [activeQuarter, setActiveQuarter] = useState("Q1");
  const [series, setSeries] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [currentDate, setCurrentDate] = useState("");


  useLayoutEffect(() => {
    setWidth(chartWidth.current.offsetWidth);
  }, []);

    useEffect(() => {
      const date = new Date();
      const options = { year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      setCurrentDate(formattedDate);
    }, []);

  // Map months to their respective quarters
  const quarters = {
    Q1: ["Jan", "Feb", "Mar", "Apr"],
    Q2: ["May", "Jun", "Jul", "Aug"],
    Q3: ["Sep", "Oct", "Nov", "Dec"],
  };

  // Filter and calculate data for the active quarter
  const getQuarterData = (quarter) => {
    const monthsInQuarter = quarters[quarter];
    const data = earningchart?.earningsByMonth?.filter((entry) =>
      monthsInQuarter.includes(entry.month)
    );
    return data || [];
  };

  const calculateTotalEarnings = (quarter) => {
    const quarterData = getQuarterData(quarter);
    return quarterData.reduce((sum, month) => sum + month.totalEarnings, 0);
  };

  const updateChartData = () => {
    const quarterData = getQuarterData(activeQuarter);
    const data = quarterData.map((month) => month.totalEarnings);
    const categories = quarterData.map((month) => month.month);
    setSeries([{ name: "Earnings", data }]);
    return categories;
  };

  useLayoutEffect(() => {
    const categories = updateChartData();
    setTotalEarnings(calculateTotalEarnings(activeQuarter));
  }, [activeQuarter, earningchart]);

  const options = {
    chart: {
      type: "area",
      height: '100%',
      toolbar: { show: false },
      zoom: { enabled: false },
      offsetY: 20, 
      offsetx: -80, 
    },
    colors: [Primarycolor || "#88a67e"],
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      padding: {
        left: 0, // Ensure no padding on the left
        right: 0,
      },
    },
    xaxis: {
      categories: getQuarterData(activeQuarter).map((month) => month.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `₹${val}`, // Format the label
        offsetX: 10,
        offsetY: -10, // Offset the label horizontally
        floating: true,
        show: false, // Ensure labels float above the grid and strokes
      },
      tickAmount: 2, // Maintain consistent spacing
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        stops: [0, 100],
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val}`,
      },
    },
  };

  return (
    <div className="card-body px-0 overflow-hidden">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>
        <Tag color={Primarycolor} >
          {DetailHead}
        </Tag>
      </h3> <h3>
          <Tag color={Primarycolor}>{currentDate}</Tag>
        </h3>
        </div>
      <div className="total-earning mt-3">
        {/* Display total earnings for the active quarter */}
        <h2 style={{ fontSize: "14px", marginBottom: "10px" }}>
          Total Earnings: ₹ {totalEarnings}
        </h2>
        <Tab.Container defaultActiveKey="Q1">
          <Nav as="ul" className="nav nav-pills earning-tab earning-chart">
            {EarningTab.map((item, index) => (
              <Nav.Item as="li" key={index} >
                <Nav.Link
                  as="button"
                  eventKey={item.type}
                  onClick={() => setActiveQuarter(item.type)}
                  style={{ fontSize: "12px"}}
                >
                  {item.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <div ref={chartWidth}>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={225}
              width={width + 2 }
            />
          </div>
        </Tab.Container>
      </div>
    </div>
  );
};

export default EarningChart;
