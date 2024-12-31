import { useEffect, useState } from "react";
import axios from "axios";
// import { FaqApi } from '../../api';
import Context from "./index";
import CookieUtil from "../../Utils/Cookies";
// import { BASE_URL } from "../../Utils/api";
import { notification } from "antd";
// import LoadingContext from '../Loading';

const BASE_URL = import.meta.env.VITE_BASE_URL; 


const FAQProvider = (props) => {
  //   const {Loading,setLoading}=useContext(LoadingContext)
  const [startDatereport, setStartDate] = useState(new Date("2024-1-31"));
  const [lastDayOfMonth, setlastDayOfMonth] = useState();
  const [firstDayOfMonth, setfirstDayOfMonth] = useState();
  const [Loading, setLoading] = useState(false);
  const[report,setReport]=useState([])
  const[nonbillable,setNonBillable]=useState([])


  const [faq, setFaq] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [schedulerData, setSchedulerData] = useState([]);
  const [Request, setRequest] = useState([]);
  const [RequestNonBillable, setRequestNonBillable] = useState([]);
  const [schedulerAdminData, setSchedulerAdminData] = useState([]);
  const [AdminTimesheetData, setAdminTimesheetData] = useState([]);
  const [ChartData, setChartData] = useState([]);
  const [clients, setClients] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [projectsByClient, setProjectsByClient] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const role = CookieUtil.get("role");
  const token = CookieUtil.get("admin_token");

  const fethRequests = async () => {
    let api = `${BASE_URL}/events/fetchrequests`;
    try {
      await axios.get(api).then((resp) => {
        setRequest(resp.data.data);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const fethRequestNonBillable = async () => {
    const api = `${BASE_URL}/events/fetchrequestsnonbillable`;
    try {
      const response = await axios.get(api);
      // Ensure the response has data and check its structure
      const { data } = response || {};
      if (data?.data) {
        // Directly set the data without filtering out fields
        setRequestNonBillable(data.data);
      } else {
        console.error("No data found in the response");
      }
    } catch (error) {
      console.error("Error fetching non-billable requests:", error);
    }
  };

  const fetchattendance = async () => {
    const api = `${BASE_URL}/events/fetchattendance`;
    try {
      setLoading(true);
      const response = await axios.get(api);
      if (response.status === 200 && response.data?.data) {
        setAttendance(response.data.data);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error.response || error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  const DashboardEmployee = async () => {
    let token = CookieUtil.get("admin_id");
    let api = `${BASE_URL}/events/loghoursweek/`;
    let params = {
      emplyee_id: token,  
    };
    try {
      await axios.get(api, { params }).then((resp) => {
        setChartData(resp.data.data);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const epmloeescdular = async (query) => {
    let id = CookieUtil.get("admin_id");

    let params = {
      ...(query && { ...query }),
      employee_id: id,
    };
    setLoading(true);

    // Cleanup function to reset doubleClick state
    await axios.get(`${BASE_URL}/events`, { params }).then((res) => {
      setSchedulerData(res.data.data);
      setLoading(false);
    });
  };

  const epmloeescdularAdmin = async (query) => {
    setLoading(true);
    console.log("query", query);
    let params = {
      firstDayOfMonth,
      lastDayOfMonth,
      type: "Approved",
      ...query,
    };
    // Cleanup function to reset doubleClick state
    try {
      await axios
        .get(`${BASE_URL}/events/admintimesheet`, { params })
        .then((res) => {
          setSchedulerAdminData(res.data.data);
        });
      await axios.get(`${BASE_URL}/events/`, { params }).then((res) => {
        setAdminTimesheetData(res.data.data);
        setLoading(false);
      });

      await axios.get(`${BASE_URL}/employee/invoiceselect`).then((response) => {
        setEmployee(response.data.data);
      });
      await axios.get(`${BASE_URL}/employee/nonbillable`).then((response) => {
        setNonBillable(response.data.data);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getClients = async () => {
    // await axios.get(`${BASE_URL}/employee`).then((response) => {
    //     setEmployee(response.data.data);
    // })
    await axios
      .get(`${BASE_URL}/clients/getselect`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        }, 
      })
      .then((response) => {
        setClients(response.data.data);
      });
    await axios.get(`${BASE_URL}/projects`).then((response) => {
      setProjectsByClient(response.data.data);
    });
  };

  useEffect(() => {
    //  if(role == "SuperAdmin"){
    //     epmloeescdularAdmin()

    //  }
    if (role == "Employee") {
      epmloeescdular();
    }
    // DashboardEmployee()
  }, []);

  const handleChangeSelect = async (e, id) => {
    try {
      await axios
        .put(`${BASE_URL}/events/status/${id}`, { type: e })
        .then((res) => {
          notification.success({
            message: res?.data?.message,
            duration: 1,
          });
          fethRequests();
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleChangeSelectNonBillable = async (e, id) => {
    console.log("Select", id);
    try {
      await axios
        .put(`${BASE_URL}/events/nonbillable_status/${id}`, { type: e })
        .then((res) => {
          notification.success({
            message: res?.data?.message,
            duration: 1,
          }); 
          fethRequestNonBillable();
        });
    } catch (err) {
      console.log(err);
      notification.error({
        message: err?.response?.data?.message,
        duration: 1,
      });
      setLoading(false);
    }
  };


  const epmloeescdularNonbillable = async (query) => {
    setLoading(true);
    console.log("query", query);
    let params = {
      firstDayOfMonth,
      lastDayOfMonth,
      type: "Approved",
      ...query,
    };
    // Cleanup function to reset doubleClick state
    try {
      await axios
        .get(`${BASE_URL}/events/adminnonbillable`, { params })
        .then((res) => {
          setSchedulerAdminData(res.data.data);
        });
      await axios.get(`${BASE_URL}/events/nonbillablevents/`, { params }).then((res) => {
        setAdminTimesheetData(res.data.data);
        setLoading(false); 
      });

      // await axios.get(`${BASE_URL}/employee/invoiceselect`).then((response) => {
      //   setEmployee(response.data.data);
      // });
      await axios.get(`${BASE_URL}/employee/nonbillable`).then((response) => {
        setNonBillable(response.data.data);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Context.Provider
      value={{
        ...props,
        faq,
        epmloeescdular,
        schedulerData,
        setSchedulerData,
        setAdminTimesheetData,
        schedulerAdminData,
        epmloeescdularAdmin,
        AdminTimesheetData,
        ChartData,
        setProjectData,
        projectData,
        clients,
        getClients,
        projectsByClient,
        setProjectsByClient,
        setSchedulerAdminData,
        employee,
        Loading,
        DashboardEmployee,
        Request,
        handleChangeSelect,
        fethRequests,
        startDatereport,
        setStartDate,
        setlastDayOfMonth,
        setfirstDayOfMonth,
        lastDayOfMonth,
        firstDayOfMonth,
        fethRequestNonBillable,
        RequestNonBillable,
        handleChangeSelectNonBillable,
        report,
        setReport,
        nonbillable,
        epmloeescdularNonbillable,
        attendance,
        fetchattendance
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default FAQProvider;
