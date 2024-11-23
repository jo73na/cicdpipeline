import{ useEffect, useState} from 'react';
import axios from 'axios';
// import { FaqApi } from '../../api';
import Context from './index';
// import { BASE_URL } from '../../Utils/api';
import  dayjs  from 'dayjs';
import CookieUtil from '../../Utils/Cookies';

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const PBFProvider =(props) => {
    const [clients, setClients] = useState([]);
    const [clientJobs, setClientJob] = useState([]);
    const [attenenceReport, setattence] = useState([]);
    const [attenenceBillable, setattenceBillable] = useState([]);
    const [attenenceSingle, setattenceSingle] = useState({});
    const [pbfReport, setPbfReport] = useState([]);
    const [recriterReport, setRecriuterReport] = useState([]);
    const [recriuterChart, setRecriuterChart] = useState([]);
    const [clientSelect, setClientSelect] = useState([]);
    const [ownerSelect, setOwnersSelect] = useState([]);
    const [DatewiseDate, setDatewise] = useState([]);
    const [clientReports, setClientReport] = useState([]);
    const [loginTable, setloginTable] = useState([]);
    const [employeeSelect, setEmployeeSelect] = useState([]);
    const [teamSelect, setTeamSelect] = useState([]);
    const [filterdata,setFilterData] = useState({});
    const [DateSerach,setDateSearch] = useState(dayjs());
    const [EmployeeSearch,setEmpaloyeeSearch] = useState("");
    const [TeamSearch,setTeamSearch] = useState("");
    const [pbfLoading,setPbfLoading] = useState(false);
    const [clientLoading,setClientLoading] = useState(false);
    const [range, setRange] = useState("");
    const [customPopup, setCuatomPopup] = useState(false);
    const [opencalander, setOpenCalendar] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total:10 });
    const [paginationRecriuter, setPaginationRecriuter] = useState({ current: 1, pageSize: 10, total:10 });

  
    const login_id=CookieUtil.get("admin_id")
  const token = CookieUtil.get("admin_token");

    const [date, setdate] = useState("");

    const FectpfbReport = async (values) => {

        let api=`${BASE_URL}/clients/pbfreport`
        try {
            setPbfLoading(true)

           if(values){
             setFilterData({
                date:values?.startOfMonth,
                ...( values?.client_id && {client:values?.client_id}),
                ...( values?.candidate_owner && {candidate_owner:values?.candidate_owner}),
            
             })
            let params={
                ...values
            }
            await axios.get(api,{params}).then((resp) => {
                setPbfLoading(false)
                setPbfReport(resp.data.data);
            });
           }
           else{
            const startOfMonth = new Date();
            startOfMonth.setHours(0, 0, 0, 0);
            startOfMonth.setDate(1);
            
            const endOfMonth = new Date();
            endOfMonth.setHours(23, 59, 59, 999);
            endOfMonth.setMonth(startOfMonth.getMonth() + 1);
            endOfMonth.setDate(0);

            let params={
                startOfMonth,
                endOfMonth
            }
            await axios.get(api,{params}).then((resp) => {
                setPbfReport(resp.data.data);
            setPbfLoading(false)

            });
           }
        } catch (error) {
            console.log('error', error);
        }
    };
    const  fetchRecriuter= async (filter) => {
       

        let apiGet=`${BASE_URL}/clients/recriuterreport`
        let apiChart=`${BASE_URL}/recriuterChart`
        try {
            setPbfLoading(true)

          
            let params={
               
                time_frame:filter,
                range:range,
                date:date,
                page:pagination?.current,
                limit:pagination?.pageSize,
            }
            await axios.get(apiGet,{params}).then((resp) => {
                setPbfLoading(false)
                setRecriuterReport(resp.data.data.data);
                setPaginationRecriuter({
                    ...paginationRecriuter,
                    total:resp.data.data.total
               })
            });
            await axios.get(apiChart,{params}).then((resp) => {
                setPbfLoading(false)
                setRecriuterChart(resp.data.data);
            });
           
       
        } catch (error) {
            console.log('error', error);
        }
    };


    const fetchattenenceReport = async () => {

        let api=`${BASE_URL}/events/attenecehours`
        let apiBillable=`${BASE_URL}/events/billableattenence`
        try {
            // setClientLoading(true)
            await axios.get(api).then((resp) => {
                setattence(resp.data.data);
                // setClientLoading(false)
            });
            await axios.get(apiBillable).then((resp) => {
                setattenceBillable(resp.data.data);
                // setClientLoading(false)
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const fetchClients = async (filter) => {

        let api=`${BASE_URL}/clients/clientreport`
        let charttest = `${BASE_URL}/pbfClientChart`;

         let params ={
             time_frame:filter,
             range:range,
             date:date,
             page:pagination?.current,
             limit:pagination?.pageSize,
         }
         setPbfLoading(true)
        try {
            setClientLoading(true)
            await axios.get(api,{params}).then((resp) => {
                setClients(resp.data.data[0].data);
                setPagination({
                    ...pagination,
                    total:resp.data.data[0].metadata[0]?.total
               })
            });
            await axios
            .get(charttest,{params}, {
              headers: {
                Authorization: `Bearer ${token}`,
                // Other headers if needed
              },
            })
            .then((resp) => {
               console.log('resp',resp.data.data)
               setClientReport(resp.data.data)
              
               setClientLoading(false)

              // setWeekSubmission(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
            setClientLoading(false)

        }
    };
    const fetchClientWiseJob = async (id) => {

        let api=`${BASE_URL}/clients/clientwisejobreport/${id}`
        try {
            await axios.get(api).then((resp) => {
                setClientJob(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };
    const fetchAttenenceSingle = async (id,billable) => {

        let api=`${BASE_URL}/events/attenenceSingle/${id}`
        let apiBillable=`${BASE_URL}/events/attenenceBillableSingle/${id}`

         if(billable){
            try {
                await axios.get(apiBillable).then((resp) => {
                    setattenceSingle(resp.data.data);
                });
            } catch (error) {
                console.log('error', error);
            }
         }
         else{
            try {
                await axios.get(api).then((resp) => {
                    setattenceSingle(resp.data.data);
                });
            } catch (error) {
                console.log('error', error);
            }
         }
      
    };

 const fetchfilterSelect= async()=>{
    let apiClients=`${BASE_URL}/clients/getselect`
    let apiCandidateOwner=`${BASE_URL}/owner-select`
    try {
        await axios.get(apiClients).then((resp) => {
     
            setClientSelect(resp.data.data);
        });
        await axios.get(apiCandidateOwner).then((resp) => {
       
            setOwnersSelect(resp.data.data);
       });
    } catch (error) {
        console.log('error', error);
    }
      
 }

 const FetchDateClick= async(date)=>{
    let apiClients=`${BASE_URL}/events/fetchloggedOne/${attenenceSingle?._id}`
    
    try {
        await axios.get(apiClients,{
            params:{
                date
            }
        }).then((resp) => {
     
              setloginTable(resp.data.data)
        });
       
    } catch (error) {
        console.log('error', error);
    }
      
 }

  const handleClearFilter=()=>{
     setFilterData({})
     FectpfbReport()
  }

  const handleClickSerach=async()=>{
    fetchClients("Custom",range,date)
    setCuatomPopup(!customPopup)

 }



 const openCustompopup =()=>{
    setCuatomPopup(!customPopup)
     
 }  




  const handleopenCalandar =()=>{
     setOpenCalendar(!opencalander)
  }

  const FetchEmployee = async(employee,team,date)=>{
    let apiEmployee=`${BASE_URL}/employee/invoiceselect`
    let teams=`${BASE_URL}/team/teamselect`
    let Hrlogged=`${BASE_URL}/events/fetchDatewise`

     let params ={
         
     }
      if(employee){
         params.employee_id=employee||EmployeeSearch
      }
      if(date){
        params.date=date?date:DateSearch
     }
    try {
        await axios.get(apiEmployee).then((resp) => {
     
            setEmployeeSelect(resp.data.data);
        });
        await axios.get(teams).then((resp) => {
       
            setTeamSelect(resp.data.data);
       });
       await axios.get(Hrlogged,{params}).then((resp) => {
       
        setDatewise(resp.data.data);
   });
    } catch (error) {
        console.log('error', error);
    }
         
  }


    // useEffect(() => {
    //     console.log('Component rendered');
    //     fetchFaq();
    // },[setFaq]);


    const fetchstatus = async(filter)=>{
        let charttest = `${BASE_URL}/pbfClientChart`;
         let params ={
          timeframe: filter|| "Week",
          page:pagination?.current,
          limit:pagination?.pageSize,
          

         }
        await axios
        .get(charttest,{params}, {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        })
        .then((resp) => {
             console.log('resp',resp.data.data)
           setClientReport(resp.data.data[0]?.data)
           setPagination({
            ...pagination,
            total:resp.data.data[0].metadata[0]?.total
       })
          // setWeekSubmission(resp.data.data);
        });
       }

    return (
        <Context.Provider
            value={{
                ...props,
                fetchClients,
                clients,
                fetchClientWiseJob,
                clientJobs,
                FectpfbReport,
                pbfReport,
                clientSelect,
                ownerSelect,
                fetchfilterSelect,
                filterdata,
                handleClearFilter,
                pbfLoading,
                clientLoading,
                handleClickSerach,
                openCustompopup,
                range,
                customPopup,
                setRange,
                attenenceReport,
                fetchattenenceReport,
                setdate,
                handleopenCalandar,
                opencalander,
                attenenceSingle,
                fetchAttenenceSingle,
                FetchEmployee,
                DatewiseDate,
                employeeSelect,
                teamSelect,
                TeamSearch,
                DateSerach,
                EmployeeSearch,
                setTeamSearch,
                setEmpaloyeeSearch,
                setDateSearch,
                attenenceBillable,
                FetchDateClick,
                loginTable,
                fetchstatus,
                clientReports,
                pagination,
                setPagination,
                recriuterChart,
                recriterReport,
                fetchRecriuter
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default PBFProvider;
