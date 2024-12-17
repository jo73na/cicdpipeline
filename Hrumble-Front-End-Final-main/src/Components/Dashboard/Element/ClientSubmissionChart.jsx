import {
    useState,
    useRef,
    useContext,
    useLayoutEffect,
    useEffect,
  } from "react";
  
  import ReactApexChart from "react-apexcharts";
  
  import { Nav, Tab } from "react-bootstrap";
  
  import { Tag } from "antd";
  
  import DashboardContext from "../../../Providers/DashboardProvider";
  
  import axios from "axios";
  
  import { dataBinding } from "@syncfusion/ej2-react-schedule";
  
  const EarningTab = [
    { title: "Day", type: "day" },
  
    { title: "Week", type: "week" },
  
    { title: "Month", type: "month" },
  
    { title: "Year", type: "year" },
  ];
  import CookieUtil from '../../../Utils/Cookies';
  
  const EarningChart = ({ Primarycolor, DetailHead }) => {
    const { Hrresults } = useContext(DashboardContext);
    const earningRef = useRef();
    const chartWidth = useRef(null);
  
    const [width, setWidth] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState("day");
    const [xAxisCategories, setXAxisCategories] = useState([]);
    const [totalSubmissionCount, setTotalSubmissionCount] = useState(0);
  
    const role = CookieUtil.get("role");
    const BASE_URL = import.meta.env.VITE_BASE_URL;
  
    useLayoutEffect(() => {
      setWidth(chartWidth.current.offsetWidth);
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/submissionCount`);
          const data = response.data.data;
          console.log("MMMMMMMMMMM:", data)
          const targetData = role === "SuperAdmin" ? data.team : data.yours;
  
          let categories = [];
          let chartValues = [];
  
          switch (selectedPeriod) {
            case "day":
                categories = [
                    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
                    "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
                    "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
                  ];
              chartValues = targetData.daily.map((item) => item.count);
              break;
            case "week":
              categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
              chartValues = targetData.weekly.map((item) => item.count);
              break;
            case "month":
              categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              chartValues = targetData.monthly.map((item) => item.count);
              break;
            case "year":
                categories = targetData.yearly.map((item) => item._id);
              chartValues = targetData.yearly.map((item) => item.count);
              break;
            default:
              categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              chartValues = targetData.weekly.map((item) => item.count);
          }
  
          setXAxisCategories(categories);
          setChartData(chartValues);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [selectedPeriod, role]);
  
    const options = {
      chart: {
        type: "area",
        height: 300,
        width: width + 55,
        offsetX: -45,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors: [Primarycolor || "#88a67e"],
      dataLabels: { enabled: false },
      legend: { show: false },
      stroke: {
        show: true,
        width: 2,
        curve: "straight",
        colors: [Primarycolor || "#88a67e"],
      },
      grid: {
        show: true,
        borderColor: "#eee",
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
      },
      yaxis: {
        show: true,
        tickAmount: 4,
        min: 0,
        max: 10,
        labels: { offsetX: 50 },
      },
      xaxis: {
        categories: xAxisCategories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: true,
          style: { fontSize: "16px" },
        },
      },
      fill: {
        opacity: 0.5,
        colors: Primarycolor || "#88a67e",
        type: "gradient",
        gradient: {
          colorStops: [
            { offset: 0.6, color: Primarycolor || "#88a67e", opacity: 0.2 },
            { offset: 0.6, color: Primarycolor || "#88a67e", opacity: 0.15 },
            { offset: 100, color: "white", opacity: 0 },
          ],
        },
      },
      tooltip: {
        enabled: true,
        style: { fontSize: "12px" },
        y: { formatter: (val) => val },
      },
    };
  
    const series = [
      {
        name: "Submission",
        data: chartData.length > 0 ? chartData : [700, 650, 680, 600, 700, 610, 710, 620],
      },
    ];
  
    return (
      <div className="card-body px-0 overflow-hidden">
        <h3>
          <Tag
            color={Primarycolor}
            style={{ fontSize: "16px", borderRadius: "5px" }}
          >
            {DetailHead}
          </Tag>
        </h3>
        <div className="total-earning">
          <h2 style={{ fontSize: "18px" }}>Total Submission {totalSubmissionCount}</h2>
          <Tab.Container defaultActiveKey={"Day"}>
            <Nav as="ul" className="nav nav-pills mb-3 earning-tab earning-chart">
              {EarningTab.map((item, ind) => (
                <Nav.Item as="li" key={ind}>
                  <Nav.Link
                    as="button"
                    eventKey={item.title}
                    onClick={() => setSelectedPeriod(item.type)}
                  >
                    {item.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <div id="earningChart" ref={chartWidth}>
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={250}
                ref={earningRef}
                width={width + 55}
              />
            </div>
          </Tab.Container>
        </div>
      </div>
    );
  };
  
  export default EarningChart;
  