import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { FaqApi } from '../../api';
import Context from "./index";
// import { BASE_URL } from "../../Utils/api";
import CookieUtil from "../../Utils/Cookies";
import { notification } from "antd";
// import LoadingContext from '../Loading';

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const DashboardProvider = (props) => {
  // const {Loading,setLoading}=useContext(LoadingContext)

  const [faq, setFaq] = useState([]);
  const [interview, setInterview] = useState([]);
  const [count, setCount] = useState({});
  const [clientSubmissionCount, setCleintsubmsiionCount] = useState([]);
  const [job, setJob] = useState([]);
  const [Ccdata, setCcData] = useState([]);
  const [goal, setgoal] = useState([]);
  const [Todata, setTodata] = useState([]);
  const [ChartData, setChartData] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [Opengoal, setOpenGoal] = useState(false);
  const [manualbutton, setmanualbutton] = useState(false);
  const [Hrresults, setHrresults] = useState(false);
  const [manualadd, setmanualadd] = useState({});
  const [companybar, setcompanyBar] = useState([]);

  const [weekSubmission, setWeekSubmission] = useState({});
  const [Hrdatepicker, setHRDatepicker] = useState([]);
  const [hrselect, sethrSelect] = useState("");
  const [clientselect, setclientSelect] = useState("");
  const [clientpicker, setclientPicker] = useState([]);
  const [invoicechart, setInvoicechart] = useState([]);
  const [databasePicker, setDataBasepicker] = useState("");

  const [HrSelectData, setHRSelectDatas] = useState([]);
  const [ClientSelectDatas, setClientSelectDatas] = useState([]);
  const [HrTimesheet, setHrTimeSheet] = useState([]);
  const [mailsendbutton, setmailsendButtom] = useState(false);
  const [HRdata, setHRdata] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [loghHoursMonth, setloghoursMonthtData] = useState([]);
  const [monthemployee, setMonthEmployee] = useState(new Date());

  const token = CookieUtil.get("admin_token");
  const role = CookieUtil.get("role");



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

  const fetchDashboard = async () => {
    let dashboardapi = `${BASE_URL}/clientSubmissionCount`;
    let HRapi = `${BASE_URL}/HR/Month`;
    let HRapiTimesheet = `${BASE_URL}/events/hr_timesheet`;
    let ClientDataapi = `${BASE_URL}/Clientreport/Month`;
    let Recruiterapi = `${BASE_URL}/owner-select`;
    let Clientapi = `${BASE_URL}/clients/getselect`;
    let Countapi = `${BASE_URL}/counts`;
    // let interview = `${BASE_URL}/candidate/schedule`;
    let LoghoursMonth = `${BASE_URL}/events/loghoursmonth`;
    let DatabaseAdded = `${BASE_URL}/DatabaseAdded/Month`;
    let charttest = `${BASE_URL}/chart/test`;
    let Goal = `${BASE_URL}/team/Dashboard`;
    let InvoiceExpense = `${BASE_URL}/invoiceChart`;
    let params = {
       admin_id: token,
    };
   
    setLoading(true);

    if (role === "SuperAdmin") {
      try {
        const hrResponse = await axios.get(HRapi);
        setHRdata(hrResponse.data.data);
        setLoading(false);


        const clientResponse = await axios.get(ClientDataapi);
        setClientData(clientResponse.data.data);
        const HRdatas = await axios.get(Recruiterapi);
        setHRSelectDatas(HRdatas.data.data);
        const Clientdatas = await axios.get(Clientapi);
        setClientSelectDatas(Clientdatas.data.data);
        const InvoicechartData = await axios.get(InvoiceExpense);
        setInvoicechart(InvoicechartData.data.data)
            
        const Countdata = await axios.get(Countapi);
        setCount(Countdata.data.data)

        const loghoursdatas = await axios.get(LoghoursMonth);
        setloghoursMonthtData(loghoursdatas.data.data);
        await axios.get(DatabaseAdded).then((resp) => {
          setWeekSubmission(resp.data.data);
          setLoading(false);

        });
        // await axios.get(interview).then((resp) => {
        //   setInterview(resp.data.data);
        //   setLoading(false);
        // });

        await axios
        .get(dashboardapi, {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        })
        .then((resp) => {
          setWeekSubmission(resp.data.data);
        });

        

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors and set loading state accordingly
        setLoading(false);
      }
    } else {
      try {
        await axios
          .get(dashboardapi, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          })
          .then((resp) => {
             console.log("dddd",resp.data.data)
            setCleintsubmsiionCount(resp.data.data);
          });

          const clientWise = await axios.get(ClientDataapi,{params:{recruiter:true}});
        setClientData(clientWise.data.data);
          await axios
          .get(charttest,{params:{timeframe:"Week",}}, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          })
          .then((resp) => {
             setHrresults(resp.data.data)
            // setWeekSubmission(resp.data.data);
          });
          await axios
          .get(Goal, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          })
          .then((resp) => {
            setgoal(resp.data.data);
          });
        await axios
          .get(HRapiTimesheet, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          })
          .then((resp) => {
            setHrTimeSheet(resp.data.data);
          setLoading(false);

          });

        // await axios.get(interview).then((resp) => {
        //   setInterview(resp.data.data);
        //   setLoading(false);
        // });
      } catch (err) {
        setLoading(false);
      }
    }
  };


   const fetchstatus = async(filter)=>{
    let charttest = `${BASE_URL}/chart/test`;
     let params ={
      timeframe: filter
     }
    await axios
    .get(charttest,{params}, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Other headers if needed
      },
    })
    .then((resp) => {
       setHrresults(resp.data.data)
      // setWeekSubmission(resp.data.data);
    });
   }

   const interviewferch =async(date)=>{
    let interview = `${BASE_URL}/candidate/schedule`;
     let params ={ date}
     try{
      await axios.get(interview,{params}).then((resp) => {
        setInterview(resp.data.data);
        setLoading(false);
      });
     }
     catch (err) {
      setLoading(false);
    }
      

     
   }

  const handleClientChange = async (e) => {
    let ClientDataapi;
    let params = {
      ...(clientselect && { clientselect: clientselect }),
    };
    setclientPicker(e);
    if (e?.length > 0) {
      const timeDifference = e[1]?.$d?.getTime() - e[0]?.$d?.getTime();


      // Convert milliseconds to days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      
      ClientDataapi = `${BASE_URL}/Clientreport/Week`;
      params.startOfWeek = e[0]?.format("YYYY-MM-DD");
      params.endOfWeek = e[1]?.format("YYYY-MM-DD");
      params.no_of_days = parseInt(daysDifference < 1? 1: daysDifference)


    } else {
      ClientDataapi = `${BASE_URL}/Clientreport/Month`;
    }

    try {
      await axios.get(ClientDataapi, { params }).then((resp) => {
        console.log("clientData", resp);
        setClientData(resp.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlechangeClientSelect = async (e) => {
    let ClientDataapi;
    setclientSelect(e);
    let params = {
      ...(e && { clientselect: e }),
    };
    if (clientpicker?.length > 0) {
      const timeDifference = clientpicker[1]?.$d?.getTime() - clientpicker[0]?.$d?.getTime();


      // Convert milliseconds to days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      console.log('daysDifference',daysDifference)
      ClientDataapi = `${BASE_URL}/Clientreport/Week`;
      params.startOfWeek = clientpicker[0]?.$d;
      params.endOfWeek = clientpicker[1]?.$d;
      params.no_of_days = parseInt(daysDifference < 1? 1: daysDifference)

    } else {
      ClientDataapi = `${BASE_URL}/Clientreport/Month`;
    }

    try {
      await axios.get(ClientDataapi, { params }).then((resp) => {
        console.log("clientData", resp);
        setClientData(resp.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleHRChange = async (e) => {
    let HRDataapi;
    setHRDatepicker(e);

    let params = {
      ...(hrselect && { hr: hrselect }),
    };
    if (e && e.length > 0) {
      const timeDifference = e[1]?.$d?.getTime() - e[0]?.$d?.getTime();


      // Convert milliseconds to days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      console.log('daysDifference',daysDifference)
      setHRDatepicker(e);
      HRDataapi = `${BASE_URL}/HR/Week`;
      params.startOfWeek = e[0]?.format("YYYY-MM-DD");
      params.endOfWeek = e[1]?.format("YYYY-MM-DD");
      params.no_of_days = parseInt(daysDifference < 1? 1: daysDifference)
    } else {
      HRDataapi = `${BASE_URL}/HR/Month`;
    }
    try {
      await axios.get(HRDataapi, { params }).then((resp) => {
        console.log("clientData", resp);
        setHRdata(resp.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlechangeHRSelect = async (e) => {
    let HRDataapi;
    sethrSelect(e);
    let params = {
      hr: e,
    };
    if (Hrdatepicker && Hrdatepicker?.length > 0) {
      let timeDifference =  Hrdatepicker[1]?.$d?.getTime() -  Hrdatepicker[0]?.$d?.getTime();


      // Convert milliseconds to days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
     
      HRDataapi = `${BASE_URL}/HR/Week`;
      params.startOfWeek = Hrdatepicker[0]?.$d;
      params.endOfWeek = Hrdatepicker[1]?.$d;
      params.no_of_days = parseInt(daysDifference < 1? 1: daysDifference)



    } else {
      HRDataapi = `${BASE_URL}/HR/Month`;
    }
    try {
      await axios.get(HRDataapi, { params }).then((resp) => {
        console.log("clientData", resp);
        setHRdata(resp.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFinsihSend = async (values, form, setopenDrawer) => {
    let apiSend = `${BASE_URL}/events/mailsend`;
    // let HRapiTimesheet = `${BASE_URL}/events/hr_timesheet`;

    try {
      setmailsendButtom(true);

      await axios
        .post(apiSend, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        })
        .then(async (response) => {
          if (response.status === 201) {
            notification.success({
              message: "Report Sent Successfull",
              duration: 1,
            });
            form.resetFields();
            setopenDrawer(false);
            await axios
              .get(HRapiTimesheet, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },
              })
              .then((resp) => {
                setHrTimeSheet(resp.data.data);
              });

            setmailsendButtom(false);

            // form.resetFields();
          } else {
            setmailsendButtom(false);

            notification.error({
              message: response?.data?.message,
              duration: 1,
            });
          }
        });
    } catch (error) {
      console.log("error", error);
      setmailsendButtom(false);
    }
  };
  const SendLogginDetails = async (values) => {
    
    let HRapiTimesheet = `${BASE_URL}/events/sendloggedData`;

    try {
      // setmailsendButtom(true);

      await axios
        .post(HRapiTimesheet, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        })
        .then(async (response) => {
           console.log("response",response) 
        })
    } catch (error) {
      console.log("error", error);
      setmailsendButtom(false);
    }
  };

  const handleinit = async () => {
    let apiTo = `${BASE_URL}/To-select/`;
    let apiCC = `${BASE_URL}/Ccselect/`;
    try {
      const ToResponse = await axios.get(apiTo);
      setTodata(ToResponse.data.data);

      const CcResponse = await axios.get(apiCC);
      setCcData(CcResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors and set loading state accordingly
      setLoading(false);
    }
  };

  const handleDateChange = async (e) => {
    console.log("yyyy", e?.$d);
    setMonthEmployee(new Date(e?.$d));
    const dateObject = new Date(e.$d);

    // Get year, month, and day from the parsed date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const day = dateObject.getDate();

    // Calculate the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);

    // Calculate the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    console.log("firsdaymonth", firstDayOfMonth);
    console.log("firsdaymonth", lastDayOfMonth);
    let LoghoursMonth = `${BASE_URL}/events/loghoursmonth`;
    let params = {
      firstDayOfMonth,
      lastDayOfMonth,
    };

    try {
      const loghoursdatas = await axios.get(LoghoursMonth, { params });
      setloghoursMonthtData(loghoursdatas.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handledatabaseChange = async (e) => {
    let HRDataapi;
    setDataBasepicker(e);

    let params = {};
    if (e && e.length > 0) {
      const timeDifference = e[1]?.$d?.getTime() - e[0]?.$d?.getTime();


      // Convert milliseconds to days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      console.log('daysDifference',daysDifference)
      setHRDatepicker(e);
      HRDataapi = `${BASE_URL}/DatabaseAdded/Week`;
      params.startOfWeek = e[0]?.format("YYYY-MM-DD");
      params.endOfWeek = e[1]?.format("YYYY-MM-DD");
      params.no_of_days = parseInt(daysDifference < 1? 1: daysDifference)

    } else {
      HRDataapi = `${BASE_URL}/DatabaseAdded/Month`;
    }

    try {
      await axios.get(HRDataapi, { params }).then((resp) => {
        setWeekSubmission(resp.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

   const handleCancel =()=>{
    setOpenGoal(!Opengoal)
   }
   const handleClickmanualy =(name,id,target)=>{
  
     setmanualadd({
       _id:id,
       goaltype_name:name,
       target:target
     })
     handleCancel()
   }


   const editGoal = (values) => {
   
  
    const apiupadte = `${BASE_URL}/team/editgoaltype/${values?._id}`;
    let Goal = `${BASE_URL}/team/Dashboard`;
     setmanualbutton(true)

    axios
      .put(
        apiupadte,
        values, // include the values directly in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
          // include the params in the params property
        }
      )
      .then( async(response) => {
        if (response.status === 200) {
          notification.success({
            message: response?.data?.message,
            duration: 1,
          });
          await axios
          .get(Goal, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          })
          .then((resp) => {
            setgoal(resp.data.data);
             handleCancel()
     setmanualbutton(false)

          });


         
        }
      })
      .catch((err) => console.log("error", err));
     setmanualbutton(false)

  };

   const fetchSales = async(filter)=>{
    let salescompany = `${BASE_URL}/account/getcompanys`;
      let params ={
        filter: filter,
      }
    try{
       
     await axios.get(salescompany,{params}).then((resp) => {
       setcompanyBar(resp.data.data);
       setLoading(false);
     });
    }
    catch (err) {
     setLoading(false);
   }
   }

  return (
    <Context.Provider
      value={{
        ...props,
        faq,
        interview,
        job,
        weekSubmission,
        HRdata,
        clientData,
        handleClientChange,
        handleHRChange,
        fetchDashboard,
        HrSelectData,
        handleFinsihSend,
        mailsendbutton,
        HrTimesheet,
        goal,
        handlechangeHRSelect,
        ClientSelectDatas,
        handlechangeClientSelect,
        handleinit,
        Ccdata,
        Todata,
        loghHoursMonth,
        handleDateChange,
        monthemployee,
        handledatabaseChange,
        Opengoal,
        handleCancel,
        handleClickmanualy,
        manualadd,
        Loading,
        editGoal,
        manualbutton,
        interviewferch,
        Hrresults,
        clientSubmissionCount,
        DashboardEmployee,
        ChartData,
        fetchSales,
        companybar,
        fetchstatus,
        count,
        invoicechart,
        SendLogginDetails,
        
      
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default DashboardProvider;
