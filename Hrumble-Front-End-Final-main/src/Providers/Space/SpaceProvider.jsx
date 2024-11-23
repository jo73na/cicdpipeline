import{ useEffect, useState} from 'react';
import axios from 'axios';
// import { FaqApi } from '../../api';
import Context from './index';
// import { BASE_URL } from '../../Utils/api';
import  dayjs  from 'dayjs';
import CookieUtil from '../../Utils/Cookies';
import { notification } from 'antd';

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const SpaceProvider =(props) => {
    const [spaces, setSpaces] = useState([]);
    const [spaceList, setList] = useState([]);
    const [ListSingle, setListSingle] = useState({});
    const [ListColumn, setListColumn] = useState([]);
    const [columnselect, setColumSelect] = useState([]);
    const [spaceSelect, setSpaceSelect] = useState([]);

    const [clients, setClients] = useState([]);
    const [clientJobs, setClientJob] = useState([]);
    const [attenenceReport, setattence] = useState([]);
    const [attenenceBillable, setattenceBillable] = useState([]);
    const [attenenceSingle, setattenceSingle] = useState({});
    const [clientSelect, setClientSelect] = useState([]);
    const [ownerSelect, setOwnersSelect] = useState([]);
    const [DatewiseDate, setDatewise] = useState([]);
    const [employeeSelect, setEmployeeSelect] = useState([]);
    const [teamSelect, setTeamSelect] = useState([]);
    const [filterdata,setFilterData] = useState({});
    const [DateSerach,setDateSearch] = useState(dayjs());
    const [EmployeeSearch,setEmpaloyeeSearch] = useState("");
    const [TeamSearch,setTeamSearch] = useState("");
    const [Loading,setLoading] = useState(false);
    const [clientLoading,setClientLoading] = useState(false);
    const [range, setRange] = useState("");
    const [customPopup, setCuatomPopup] = useState(false);
    const [LoadingAddSpace,setLoadingAddSpace] = useState(false);
    const [opencalander, setOpenCalendar] = useState(false);
  

    const [date, setdate] = useState("");
    const token =CookieUtil.get("admin_token")


    const FetchSpace = async (values) => {

        let api=`${BASE_URL}/space`
        try {
            setLoading(true)

            await axios.get(api).then((resp) => {
                
                setSpaces(resp.data.data);
            setLoading(false)

            });
        } catch (error) {
            console.log('error', error);
            setLoading(false)

        }
    };
    const fetchUsers = async (values) => {

        let api=`${BASE_URL}/spaceselect`
        try {
            // setLoading(true)

            await axios.get(api).then((resp) => {
                
                setSpaceSelect(resp.data.data);
            setLoading(false)

            });
        } catch (error) {
            console.log('error', error);
            setLoading(false)

        }
    };
    const FetchList = async (id) => {

        let api=`${BASE_URL}/space/list`
        let params ={
            space_id:id
        }
        try {
            setLoading(true)

            await axios.get(api,{params}).then((resp) => {
                
                setList(resp.data.data);
            setLoading(false)

            });
        } catch (error) {
            console.log('error', error);
            setLoading(false)

        }
    };

    const viewTask = async (id) => {

        let api=`${BASE_URL}/space/viewTask/${id}`
       
        try {
            setLoading(true)

            await axios.get(api,{params}).then((resp) => {
                
                setViewTask(resp.data.data);
            setLoading(false)

            });
        } catch (error) {
            console.log('error', error);
            setLoading(false)

        }
    };

    const fetchListSingle = async (id) => {

        let api=`${BASE_URL}/space/list/${id}`
        let apiselect=`${BASE_URL}/space/columnselect/${id}`
       
        try {
            setLoading(true)

            await axios.get(api).then((resp) => {
                
                 setListSingle(resp.data.data.check);
                setListColumn(resp.data.data.data)
            setLoading(false)

            });
            await axios.get(apiselect).then((resp) => {
                
                // setListSingle(resp.data.data);
                setColumSelect(resp.data.data)
            setLoading(false)

            });
        } catch (error) {
            console.log('error', error);
            setLoading(false)

        }
    };

    const StatusChange= async(id,values,list_id)=>{
        console.log("values",values)
        const api=`${BASE_URL}/space/taskstatus/${id}`
        try {
            setLoading(true)
            await axios.put(api,values,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });  
                   
                   fetchListSingle(list_id)
            setLoading(false)

               
            });
        } catch (error) {
          

        }
    }


    const ViewTask = async () => {

        let api=`${BASE_URL}/clients/clientreport`
        try {
            setClientLoading(true)
            await axios.get(api).then((resp) => {
                setClients(resp.data.data);
                setClientLoading(false)
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleAddSpace= async(values,closeModal)=>{
        console.log("values",values)
        const api=`${BASE_URL}/space`
        try {
            setLoadingAddSpace(true)
            await axios.post(api,values,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });  
                   setLoadingAddSpace(false)
                   FetchSpace()
                  closeModal()
            });
        } catch (error) {
            console.log('error', error);
            setLoadingAddSpace(false)

        }
    }

    const handleAddList= async(values,closeModal,id)=>{
        console.log("values",values)
        const api=`${BASE_URL}/space/list`
        try {
            setLoadingAddSpace(true)
            await axios.post(api,values,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });  
                   setLoadingAddSpace(false)
                   FetchList(id)
                  closeModal()
            });
        } catch (error) {
            console.log('error', error);
            setLoadingAddSpace(false)

        }
    }


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

    const fetchClients = async () => {

        let api=`${BASE_URL}/clients/clientreport`
        try {
            setClientLoading(true)
            await axios.get(api).then((resp) => {
                setClients(resp.data.data);
                setClientLoading(false)
            });
        } catch (error) {
            console.log('error', error);
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

    return (
        <Context.Provider
            value={{
                ...props,
                FetchSpace,
                Loading,
                handleAddSpace,
                spaces,
                LoadingAddSpace,
                spaceList,
                FetchList,
                handleAddList,
                fetchListSingle,
                ListSingle,
                fetchUsers,
                spaceSelect,
                ListColumn,
                StatusChange,
                columnselect,
                viewTask,
            
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default SpaceProvider;
