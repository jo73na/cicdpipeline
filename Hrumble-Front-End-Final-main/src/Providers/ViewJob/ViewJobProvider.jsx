import { useState } from 'react';
import axios from 'axios';
import Context from './index';
import {notification} from 'antd'
// import { BASE_URL} from '../../Utils/api';
import CookieUtil from '../../Utils/Cookies';
import { Alert } from 'react-bootstrap';


const BASE_URL = import.meta.env.VITE_BASE_URL; 




const ViewJobProvider = (props) => {
    const [Loading, setLoading] = useState(false);
    const [jobSingle,setjobSingle]=useState({});
    const [locationData,setLocationData]=useState([])
    const [allCandidates,setAllcandidates]=useState([]);
    const [screening,setScreening]=useState([]);
    const [interview,setInterview]=useState([]);
    const [submission,setSubmission]=useState([]);
    const [viewjobCount,setViewJobCount]=useState([]);
    const [viewall,setViewJob]=useState([]);
    const [offered,setOffered]=useState([]);
    const [joined,setJoined]=useState([]);
    const [logsubmission,setLogsubmission]=useState([]);
    const [loginterview,setLoginterview]=useState([]);
    const [logoffered,setLogoffered]=useState([]);
    const [logjoined,setLogjoined]=useState([]);
    const [internalSubmission,setinternalsubmission]=useState([]);
    const [searchcandidates,setSearchcandidate]=useState("");
    const [viewCandidateDrawer,setViewCandidateDrawer]=useState(false);
    const [CandidateView,setCandidateView]=useState({});
    const [openAddCandidateDrawer,setOpenAddCandidateDrawer]=useState(false);
    const [openEditCandidateDrawer,setopenEditCandidateDrawer]=useState(false);
    const [modelLoading,setmodelLoading]=useState(false);
    const [viewInterviewDrawer,setViewInterviewDrawer]=useState(false);
    const [addbuttonCandidate,setAddButtonCandidate]=useState(false);
    const [editbuttonCandidate,setEditButtonCandidate]=useState(false);
    const [addbuttonInterview,setAddButtonInterview]=useState(false);

    const [addButtonCan,setAddButtonCan]=useState(false);
    const [editButtonJob,setEditButtonJob]=useState(false);
    const [editButtonCanEmploy,setEditButtonCanEmploy]=useState(false);

    const showEmployeModal = () => {
      setAddButtonCan(!addButtonCan)
    }

    const showEmployeModalEdit = () => {
      setEditButtonJob(!editButtonJob)
    }

    const showCandidateModalEdit = (id) => {
      setEditButtonCanEmploy(!editButtonCanEmploy)
      handleEditCandidateOpen(id)
      // console.log("can",values)
    }

    const [timeline,setTimeline]=useState([
        {
          color:"#FFA001"
        },
       ]);
       const [timelineinterview,setTimelineInterview]=useState([
         {
           color:"#FFA001"
         },
        ]);

    const token =CookieUtil.get("admin_token")

   

    const handleClickjobTable= async(id,refresh)=>{
       const jobsingleApi =`${BASE_URL}/job/${id}`
       const candidatesforjob=`${BASE_URL}/candidate`
      //  const candidatesforscreening=`${BASE_URL}/candidate/screening`
      //  const candidatesforsubmission=`${BASE_URL}/candidate/submission`
      //  const candidatesforinterview=`${BASE_URL}/candidate/interview`
      //  const candidatesforoffered=`${BASE_URL}/candidate/offered`
      //  const candidatesforjioned=`${BASE_URL}/candidate/joined`
      //  const candidatestotallogsubmission=`${BASE_URL}/candidate/logsubmission`
      //  const candidatestotalinternalsubmission=`${BASE_URL}/candidate/logsubmittedcount`
      //  const candidatestotalinterviewlog=`${BASE_URL}/candidate/loginterview`
      //  const candidatestotalofferedlog=`${BASE_URL}/candidate/logoffered`
      //  const candidatestotaljionedlog=`${BASE_URL}/candidate/logjoined`
       const candidateAllstatus=`${BASE_URL}/candidate/allstaus`
       const candidateView=`${BASE_URL}/candidate/viewjobcount`
       const params = {
        job_id: id,
      };
       try {
         setLoading(true)
   
           await axios.get(jobsingleApi).then((resp) => {
           
            setjobSingle(resp.data.data);
        
         });
         await axios.get(candidatesforjob,{params}).then((resp) => {
            setAllcandidates(resp.data.data);
         });

         await axios.get(candidateView,{params}).then((resp) => {
            setViewJobCount(resp.data.data)
            setLoading(false)
         }); 
         await axios.get(candidateAllstatus,{params}).then((resp) => {
            setViewJob(resp.data.data);

         }); 
         // await axios.get(candidatesforjioned,{params}).then((resp) => {
         //    setJoined(resp.data.data);
         // }); 
         // await axios.get(candidatestotallogsubmission,{params}).then((resp) => {
         //    setLogsubmission(resp.data.data);
         // });
         // await axios.get(candidatestotalinternalsubmission,{params}).then((resp) => {
         //    setinternalsubmission(resp.data.data);
         // });
         // await axios.get(candidatestotalinterviewlog,{params}).then((resp) => {
         //    setLoginterview(resp.data.data);
         // }); 
        
       
         // await axios.get(candidatestotalofferedlog,{params}).then((resp) => {
         //    setLogoffered(resp.data.data);
         // });
         // await axios.get(candidatestotaljionedlog,{params}).then((resp) => {
         //    setLogjoined(resp.data.data);
         //    setLoading(false);
         // });
         // await axios.get(candidatesforscreening,{params}).then((resp) => {
         //    setScreening(resp.data.data);
         // });
         // await axios.get(candidatesforsubmission,{params}).then((resp) => {
         //    setSubmission(resp.data.data);
         // });
         // await axios.get(candidatesforinterview,{params}).then((resp) => {
         //    setInterview(resp.data.data);
         // });
         // await axios.get(candidatesforoffered,{params}).then((resp) => {
         //    setOffered(resp.data.data);
         // }); 

       }
       catch (error) {
         console.log("error: " + error)
       }

    }

    const editJob= async(values,id)=>{
     
       const apiCreate=`${BASE_URL}/job/${id}`
        await axios.put(apiCreate,values,{
           headers: {
             Authorization: `Bearer ${token}`,
             // Other headers if needed
           },})
            .then((response)=>{
                if(response.status===200){
                   handleClickjobTable(id)
                   notification.success({
                     message: response?.data?.message,
                     duration:1,
                   });
                   showEmployeModalEdit()
                   
                }
               })
            .catch((err)=>console.log('error', err))
   }

  


    const handleopenCandidateDrawer= async(id)=>{
          setViewCandidateDrawer(!viewCandidateDrawer)
       const candidateSingle=`${BASE_URL}/candidate/single/${id}`
       const candidateTimeline=`${BASE_URL}/candidate/timeline/${id}`
       const candidateTimelineInterview=`${BASE_URL}/candidate/interviewtimeline/${id}`
       setmodelLoading(true)
        try{
             await axios.get(candidateSingle).then((res)=>{
                 setCandidateView(res.data.data)
                 setmodelLoading(false)

            })
            await axios.get(candidateTimeline).then((res)=>{
                  setTimeline(res.data.data)
                 setmodelLoading(false)
                  
                
            
           })
           await axios.get(candidateTimelineInterview).then((res)=>{
            setTimelineInterview(res.data.data)
           setmodelLoading(false)
            
          
      
     })
        }
        catch(err){
            console.error(err)
        }
        
          
    }

    const handleEditCandidateOpen= async(id)=>{
      // setViewCandidateDrawer(!viewCandidateDrawer)
   const candidateSingle=`${BASE_URL}/candidate/single/${id}`
   setmodelLoading(true)
    try{
         await axios.get(candidateSingle).then((res)=>{
             setCandidateView(res.data.data)
             setmodelLoading(false)      
 })
    }
    catch(err){
        console.error(err)
    }
          
}


    const handleOpenAddCandidateDrawer=()=>{
      setOpenAddCandidateDrawer(!openAddCandidateDrawer)
    }


const handleopenEditCandidate=()=>{
    setViewCandidateDrawer(!viewCandidateDrawer)
    setEditButtonCanEmploy(!editButtonCanEmploy)
}


const handleStatusEdit = async(values,id)=>{
  
    const currentTime = new Date();
    const options = {
      timeZone: 'Asia/Kolkata', // India Standard Time
      hour12: false, // 24-hour format
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const indianTime = currentTime.toLocaleString('en-IN', options);
      let EditStatus=`${BASE_URL}/candidate/status/${id}`

       let data ={ ...values,date:indianTime}
          try{
             
          let response = await axios.put(EditStatus,data,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },})
            
                if(response.data.data){
                 
                 
                    notification.success({
                      message:"Status Changed SuccessFully",
                      
                      duration:1,
               
                  })
                  handleInterviewClose()
                  handleClickjobTable(jobSingle?._id)
                  

                }
           
          
  } 
  catch(err){
  

   notification.error({
      message:"Already exists this Status",
      
      duration:1,
    });
  }}

  const AddInterView= async (id)=>{
   setViewInterviewDrawer(!viewInterviewDrawer)
   const candidateSingle=`${BASE_URL}/candidate/single/${id}`
   await axios.get(candidateSingle).then((res)=>{
      setCandidateView(res.data.data)
 })
  }
  const handleInterviewClose= async()=>{
   setViewInterviewDrawer(!viewInterviewDrawer)
    
  }

  const handleAddCandidate= async(values,form,setactive)=>{
   setAddButtonCandidate(true)
   const apiCreate=`${BASE_URL}/candidate`
   
    await axios.post(apiCreate,values,{
       headers: {
         Authorization: `Bearer ${token}`,
         // Other headers if needed
       },})
        .then( async(response)=>{
            if(response.status===201){

               notification.success({
                   message: response?.data?.message,
                   duration:1,
                 });
               handleClickjobTable(jobSingle?._id,true)
               setOpenAddCandidateDrawer(false)
               setAddButtonCandidate(false)
               await axios.put(`${apiCreate}/skill/${response.data.data._id}`,response.data.data)
             
               
              

               setactive("1")
               form.resetFields();


            }
            else{
               setAddButtonCandidate(false)
               
               
            }
           })  
        .catch((err)=>{
           console.log(err)
           setAddButtonCandidate(false)
           notification.error({
            message: err.response?.data?.message?.split(":")[1],
            duration:1,
          });

        }
        )
  }
 
  const handleEditCandidate= async(values,edit)=>{
   const apiCreate=`${BASE_URL}/candidate/${CandidateView?._id}`
    await axios.put(apiCreate,values,{
       headers: {
         Authorization: `Bearer ${token}`,
         // Other headers if needed
       },})
        .then( async(response)=>{
            if(response.status===200){
               notification.success({
                   message: response?.data?.message,
                   duration:1,
                 });
                 if(edit){
                 
                  handleopenCandidateDrawer(CandidateView?._id) 
                  
                 }
                 else{
                  setEditButtonCandidate(false)
                  showCandidateModalEdit(false)
                  handleClickjobTable(jobSingle?._id,true)
                 }
              

              

               
               // form.resetFields();


            }
            else{
              
               setEditButtonCandidate(false)
             
               notification.error("Something Went Wrong!");
               
            }
           })  
        .catch((err)=>{
           console.log(err)
           setEditButtonCandidate(false)
         
           notification.error("Something Went Wrong!");

        }
        )
  }
  
  const handleAddInterview= async(values,form)=>{
   const apiCreate=`${BASE_URL}/candidate/interview`
    await axios.post(apiCreate,values,{
       headers: {
         Authorization: `Bearer ${token}`,
         // Other headers if needed
       },})
        .then((response)=>{
            if(response.status===201){
               notification.success({
                   message: response?.data?.message,
                   duration:1,
                 });
               setAddButtonInterview(false)
               form.resetFields()
               setViewInterviewDrawer(false)
              
              


            }
            else{
               setAddButtonInterview(false)
               
               notification.error("Something Went Wrong!");
               
            }
           })  
        .catch((err)=>{
           console.log(err)
           setAddButtonInterview(false)
           
           notification.error("Something Went Wrong!");

        }
        )
  }

  const setFetchJobId= async(id)=>{
   const jobsingleApi =`${BASE_URL}/job/${id}`
  //  alert("hiii")
   try {
   
 
         await axios.get(jobsingleApi).then((resp) => {
         
          setjobSingle(resp.data.data);
      
       });
  }
  catch (err) {
   console.error(err);
  }
}

   

    return (
        <Context.Provider
            value={{
                ...props,
              
                jobSingle,
                logjoined,
                logoffered,
                loginterview,
                logsubmission,
                joined,
                editJob:editJob,
                submission,
                interview,
                offered,
                internalSubmission,
                screening,
                allCandidates,
                searchcandidates,
                viewCandidateDrawer,
                handleopenCandidateDrawer,
                handleopenEditCandidate,
                setViewCandidateDrawer,
                handleClickjobTable,
                handleOpenAddCandidateDrawer,
                setopenEditCandidateDrawer,
                handleStatusEdit,
                AddInterView,
                handleInterviewClose,
                setAddButtonCandidate,
                openAddCandidateDrawer,
                CandidateView,
             
                timeline,
                openEditCandidateDrawer,
                modelLoading,
                viewInterviewDrawer,
                handleAddCandidate,
                addbuttonCandidate,
                handleEditCandidate,
                handleAddInterview,
                addbuttonInterview,
                editbuttonCandidate,
                setFetchJobId,
                locationData,
                setLocationData,
                setEditButtonCanEmploy,
                editButtonCanEmploy,
                setEditButtonJob,
                editButtonJob,
                setAddButtonCan,
                showCandidateModalEdit,
                showEmployeModalEdit,
                showEmployeModal,
                addButtonCan,
                viewjobCount,
                Loading,
                viewall,
               
                timelineinterview
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default ViewJobProvider;