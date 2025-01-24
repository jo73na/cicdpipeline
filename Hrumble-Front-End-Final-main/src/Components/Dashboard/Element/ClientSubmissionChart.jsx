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
import CookieUtil from "../../../Utils/Cookies";

const EarningTab = [
  { title: "Week", type: "week" },
  { title: "Month", type: "month" },
  { title: "Year", type: "year" },
];

const EarningChart = ({ Primarycolor, DetailHead }) => {
  const { Hrresults } = useContext(DashboardContext);
  const earningRef = useRef();
  const chartWidth = useRef(null);

  const [width, setWidth] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const [xAxisCategories, setXAxisCategories] = useState([]);
  const [totalSubmissionCount, setTotalSubmissionCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [maxCount, setMaxCount] = useState(0);

  const role = CookieUtil.get("role");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useLayoutEffect(() => {
    const updateWidth = () => {
      setWidth(chartWidth.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const date = new Date();
    const options = { month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/submissionCount`);
        const data = response.data.data;
        const targetData = role === "SuperAdmin" ? data.team : data.yours;

        let categories = [];
        let chartValues = [];
        let totalCount = 0;
        let calculatedMaxCount = 0;

        switch (selectedPeriod) {
          case "week":
            categories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const weeklyData = Array(7).fill(0);
            targetData.weekly.forEach((item) => {
              weeklyData[item._id - 1] = item.count;
            });
            chartValues = weeklyData;
            totalCount = weeklyData.reduce((acc, val) => acc + val, 0);
            calculatedMaxCount = Math.max(...weeklyData);
            break;

          case "month":
            categories = ["Week1", "Week2", "Week3", "Week4"];
            const monthlyData = targetData.monthly;
            const weeklyCounts = [0, 0, 0, 0];
            monthlyData.forEach((item) => {
              const day = item._id;
              const count = item.count;
              if (day >= 1 && day <= 7) weeklyCounts[0] += count;
              else if (day >= 8 && day <= 14) weeklyCounts[1] += count;
              else if (day >= 15 && day <= 21) weeklyCounts[2] += count;
              else if (day >= 22 && day <= 31) weeklyCounts[3] += count;
            });
            chartValues = weeklyCounts;
            totalCount = weeklyCounts.reduce((acc, val) => acc + val, 0);
            calculatedMaxCount = Math.max(...weeklyCounts);
            break;

          case "year":
            categories = [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            const yearlyData = Array(12).fill(0);
            targetData.yearly.forEach((item) => {
              yearlyData[item._id - 1] = item.count;
            });
            chartValues = yearlyData;
            totalCount = yearlyData.reduce((acc, val) => acc + val, 0);
            calculatedMaxCount = Math.max(...yearlyData);
            break;

          default:
            break;
        }

        setXAxisCategories(categories);
        setChartData(chartValues);
        setTotalSubmissionCount(totalCount);
        setMaxCount(calculatedMaxCount);
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
      toolbar: { show: false },
      zoom: { enabled: false },
      stacked: true
    },
    colors: [Primarycolor || "#88a67e"],
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    markers: {
      size: 3,
      colors: [Primarycolor || "#88a67e"],
      strokeColors: Primarycolor || "#88a67e",
      strokeWidth: 2,
      hover: {
        size: 5,
        sizeOffset: 2,
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9,
        },
      },
    },
    grid: {
      borderColor: "#eee",
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    yaxis: {
      show: true,
      labels: { style: { fontSize: "12px" } },
      min: 0,
      max: maxCount + Math.ceil(maxCount * 0.1),
    },
    xaxis: {
      categories: xAxisCategories,
      labels: { style: { fontSize: "12px" } },
    },
    fill: {
      type: "solid",
      colors: ["#B0C4A5"], // A lighter shade of the primary color
    },

    tooltip: {
      y: { formatter: (val) => val },
    },
  };

  const series = [
    {
      name: "Submissions",
      data: chartData,
    },
  ];

  return (
    <div className="card-body px-0 overflow-hidden">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{marginLeft:"15px"}}>
          <Tag color={Primarycolor}>{DetailHead}</Tag>
        </h3>
        <h3>
          <Tag color={Primarycolor}>{currentDate}</Tag>
        </h3>
      </div>
      <div className="total-earning">
        <h2 style={{ fontSize: "16px" }}>Total Submission: {totalSubmissionCount}</h2>
        <Tab.Container defaultActiveKey={"year"}>
          <Nav className="nav nav-pills mb-3 earning-tab earning-chart">
            {EarningTab.map((item, ind) => (
              <Nav.Item as="li" key={ind}>
                <Nav.Link  as="button"
                  eventKey={item.type} onClick={() => setSelectedPeriod(item.type)}>
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
              height={260}
              width="100%" 
            />
          </div>
        </Tab.Container>
      </div>
    </div>
  );
};

export default EarningChart;
