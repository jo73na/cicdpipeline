import { useState} from 'react';
import axios from 'axios';
import Context from './index';
import CookieUtil from '../../Utils/Cookies/'
// import {notification} from"antd";
// import { BASE, BASE_URL } from '../../Utils/api';
import { useContext } from 'react';
import JobContext from '../JobProvider';
import ViewJobContext from '../ViewJob';
import { notification } from 'antd';

const BASE_URL = import.meta.env.VITE_BASE_URL; 
const BASE = import.meta.env.VITE_BASE;

const CandidateProvider = (props) => {
 const {fetchJob}=useContext(JobContext)
 const {setFetchJobId}=useContext(ViewJobContext)

   const[Allcandidates,setAllcandidates] =useState([]) 
   const[loadingAssign,setLoadinAssign] =useState(false) 
   const[candidatestotal,setCandidatesTotal] =useState([]) 
   const [candidateLoading,setLoading]= useState(false) 
   const [addpostmanbutton,setAddpostman]= useState(false) 
   const [candidateSingle,setCandidateSingle]= useState({}) 
   const [openDrawer,setOpenDrawer]= useState(false) 
   const [openAssign,setOpenAssign]= useState(false) 
   const [jsonData, setJsonData] = useState('');
   const [job_id,setJob_id]= useState(false) 
   const [jobsAssignTable,setJobsAssignTable]= useState([]) 
   const [assignEditCandidate,setAssignEditCandidate]= useState(false) 
   const [AllcandidatesSearch,setAllcandidateSearch]= useState({}) 
   const [skillSearch,setSkillSearch]= useState("") 
   const [openAddCandidateDrawer,setAddCandidateDrawer]= useState(false) 
   const [addimportbutton,setAddImportButtonCandidate]= useState(false)
   const [loadingaddbutton,setAddButtonCandidate]= useState(false) 
   const [addResumeButton,setaddResumeButton]= useState(false) 
   const [resumeDrawer,setopenresumeDrawer]= useState(false) 
   const [candidateOwner,setCandidateOwners]= useState([]) 
   const [searchCandidateOwner,setsearchCandidateOwner]= useState("") 
   const [openEmployeementDetilsDrawer,setOpenEmployementDetilsPopup]= useState(false) 
   const [openworkexperiencepopup,setworkexperiencePopup]= useState(false) 
   const [openEducationDrawer,setEducationDrawer]= useState(false) 
   const [openProjectDrawer,setProjectDrawer]= useState(false) 
   const [postmanDrawer,setpostmanOpen]= useState(false) 
   const [resumeid,setResumeId]= useState("") 
   const [skill, setSkill] = useState([]);
   const [openFilterDrawer, setopenFilterDrawer] = useState(false);

   const token =CookieUtil.get("admin_token")

 
   const Allcandidate= async(pagination)=>{
    
    let api=`${BASE_URL}/candidate/list`
    let apicanidate=`${BASE_URL}/candidate` 
    let apijobs=`${BASE_URL}/job`
    let skillapi=`${BASE_URL}/skills`

    let candidateOwnerApi=`${BASE_URL}/database-fetch`
   

     setLoading(true)
    try {


      let params={
         page:pagination.current,
         limit:pagination.pageSize,
        ...AllcandidatesSearch,
      }

        
        await axios.get(api,{params}).then((resp) => {
            setAllcandidates(resp.data.data);
            setLoading(false)
        }); 
        // await axios.get(apicanidate).then((resp) => {
        //     setCandidatesTotal(resp.data.data);
    
        // }); 
        // await axios.get(apijobs).then((resp) => {
        //     setJobsAssignTable(resp.data.data);

        // }); 
        await axios.get(skillapi).then((resp) => {
          setSkill(resp.data.data);
      
      });
        await axios.get(candidateOwnerApi).then((resp) => {
          setCandidateOwners(resp.data.data);

      }); 
    
    }
        catch (err) {
            console.error(err)
            setLoading(false)

        }
   }

   const handleOpenDrawer= async(id,callapi)=>{
    
     if(callapi) {
        let api=`${BASE_URL}/candidate`
        let params={
            candidateoriginal_id:id
        }
        try {
    
           
            await axios.get(api,{params}).then((resp) => {
                setCandidateSingle(resp.data.data);
                setOpenDrawer(!openDrawer)
            }); }
            catch (err) {
                console.error(err)
            }
     }
     setOpenDrawer(!openDrawer)
 
   }
   
    const handleOpenDrawerassign=async(id)=>{
   
        if(id){
            
            // setOpenDrawer(!openDrawer)
            setOpenAssign(!openAssign)

            handleViewCandidate(id)
            

        }
        // setOpenDrawer(!openDrawer)
        setOpenAssign(!openAssign)
       
    } 

 const handleClickEditAssign= async(id)=>{
 
  
   
     if(!id){
       return setAssignEditCandidate(!assignEditCandidate)
    

     }

    
     
     setJob_id(id)
     setFetchJobId(id)
     setOpenAssign(!openAssign)

     setAssignEditCandidate(!assignEditCandidate)

  

 }
 const handleAllcandidateSearch= async(e,pagination)=>{
      
    setAllcandidateSearch(e.target.value)
    let api=`${BASE_URL}/candidate/list`
   
    let params={
      page:pagination.current,
      limit:pagination.pageSize,
      name:e.target.value
    }
    await axios.get(api,{params}).then((resp) => {
      setAllcandidates(resp.data.data);
      setLoading(false)
  }); 



 }

 const handleopenDrawerforAdd=()=>{
      setAddCandidateDrawer(!openAddCandidateDrawer)
 }

 const handleSkillSearch=(e)=>{
    setSkillSearch(e.target.value)
 } 

 const handleAddCandidatepage= async(values,form,setactive)=>{
    setAddButtonCandidate(true)
    const apiCreate=`${BASE_URL}/candidate`
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
                setAddButtonCandidate(false)
                setAddCandidateDrawer(false)
                 Allcandidate()
                
                
                form.resetFields();
                fetchJob()
                if(setactive){
                    setactive("1")
                }
 
 
             }
             else{
                setAddButtonCandidate(false)
                notification.error({
                  message: response?.data?.message,
                  duration:1,
                });
                
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

   const handleAddimport= async(values,form)=>{
    setAddImportButtonCandidate(true)
    const apiCreate=`${BASE}excel`
    const apiCreate1=`${BASE}skillonly`
    const apiCreate2=`${BASE}location-only`

    try{
        await axios.post(apiCreate,values,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },})  .then( async(response)=>{
              if(response.status===200){
                 await Allcandidate()
                 notification.success({
                     message: "Imported successfully ",
                     duration:1,
                   });
                 setAddImportButtonCandidate(false)
                 setAddCandidateDrawer(false)
                 
                 
                 
                 form.resetFields();  
                
                 await axios.post(apiCreate1,values,{
                  headers: {
                    Authorization: `Bearer ${token}`,
                    // Other headers if needed
                  },})
                
                 await  axios.post(apiCreate2,values,{
                          headers: {
                            Authorization: `Bearer ${token}`,
                            // Other headers if needed
                          },})

                          fetchJob()
  
  
              }
              else{
                 setAddImportButtonCandidate(false)
                 notification.error({
                     message: "Something went wrong",
                     duration:1,
                   });
                 
                
                 
              }
             })  
        
                   
    }
   
         catch(err){
          
            setAddImportButtonCandidate(false)
            notification.error({
                message: "Something went wrong",
                duration:1,
              });
 
         }
         
   }
 

   
//    useEffect(() => {
//     Allcandidate(true);
// }, []);

 const handleEditResume=(id)=>{
    setopenresumeDrawer(true)
    setResumeId(id)
 }

 const handleEditresumeOnly=(values,form,id)=>{
     setaddResumeButton(true)
    console.log("gg",id)
     let verifyid;
     if(id){
      verifyid = id
     }
     else{
      verifyid = resumeid
     }
    const apiCreate=`${BASE_URL}/candidate/resume/${verifyid}`
    axios.put(apiCreate,values,{
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },})
         .then((response)=>{
             if(response.status===200){
              console.log("response",response)
                notification.success({
                    message: "Updated successfully ",
                    duration:1,
                  });
                setaddResumeButton(false)

                 if(id){
    
                     
                  return  handleViewCandidate(verifyid),
                
                  form.resetFields();

                 }
                 else{
                  
                  setopenresumeDrawer(false)
                  return  handleViewCandidate(verifyid),
                  
                form.resetFields();

                 }
                
                
              
 
 
             }
             else{

                setaddResumeButton(false)
                notification.error({
                    message: "Something went wrong",
                    duration:1,
                  });
                
               
                
             }
            })  
         .catch((err)=>{
            console.log(err)
            setaddResumeButton(false)
            notification.error({
                message: "Something went wrong",
                duration:1,
              });
 
         }
         )
   }

   const handleDateChange=(e)=>{
    setsearchCandidateOwner(e)
   }

   const handleViewCandidate= async(id)=>{
    console.log("llll",id)
     let apicandidateView=`${BASE_URL}/candidate`
     setLoading(true)
     try {
 
 
       let params={
        candidateoriginal_id:id
       }
 
         
         await axios.get(apicandidateView,{params}).then((resp) => {
             setCandidateSingle(resp.data.data);
             setLoading(false)
         }); 
         // await axios.get(apicanidate).then((resp) => {
         //     setCandidatesTotal(resp.data.data);
     
         // }); 
       
     }
         catch (err) {
             console.error(err)
             setLoading(false)
 
         }

   }

   const handleClickEmployementDetail=()=>{
      setOpenEmployementDetilsPopup(true)
   }
   const handleClickWorkExperience=()=>{
    setworkexperiencePopup(true)
   }
   const handleClickEducation=()=>{
    setEducationDrawer(!openEducationDrawer)
   }
   const handleClickProject=()=>{
    setProjectDrawer(!openProjectDrawer)
   }
   const handleSubmitProject= async(values)=>{
    let apiEditProject=`${BASE_URL}/candidate/edit/${candidateSingle[0]._id}`
       
    try {
      await axios.put(apiEditProject, values).then((resp) => {
        if (resp) {
          notification.success({
            message: `Updated Successfully`,
            duration: 1,
          });
         setProjectDrawer(false)
         handleViewCandidate(resp.data.data.candidateoriginal_id)

        }
      });
    } catch (error) {
      console.log("error", error);
    }
   }
   const handleEditEducation= async(values)=>{
    let apiEditProject=`${BASE_URL}/candidate/edit/${candidateSingle[0]._id}`
       
    try {
      await axios.put(apiEditProject, values).then((resp) => {
        if (resp) {
          notification.success({
            message: `Updated Successfully`,
            duration: 1,
          });
         setEducationDrawer(false)
         handleViewCandidate(resp.data.data.candidateoriginal_id)

        }
      });
    } catch (error) {
      console.log("error", error);
    }
   }
   const handleSubmitWorkExperinece= async(values)=>{
    let apiEditProject=`${BASE_URL}/candidate/edit/${candidateSingle[0]._id}`
       
    try {
      await axios.put(apiEditProject, values).then((resp) => {
        if (resp) {
          notification.success({
            message: `Updated Successfully`,
            duration: 1,
          });
         setworkexperiencePopup(false)
         handleViewCandidate(resp.data.data.candidateoriginal_id)

        }
      });
    } catch (error) {
      console.log("error", error);
    }
   }
   const handleEditEmployeeDetail= async(values)=>{
    let apiEditProject=`${BASE_URL}/candidate/edit/${candidateSingle[0]._id}`
       
    try {
      await axios.put(apiEditProject, values).then((resp) => {
        if (resp) {
          notification.success({
            message: `Updated Successfully`,
            duration: 1,
          });
         setOpenEmployementDetilsPopup(false)
         handleViewCandidate(resp.data.data.candidateoriginal_id)

        }
      });
    } catch (error) {
      console.log("error", error);
    }
   }

   const AssignJobFetch= async()=>{
    let jobapi=`${BASE_URL}/job/assignjob`
    try {
      let params={
        status:"opened"
      }
      await axios.get(jobapi,{params}).then((resp) => {
        if (resp) {
      
            setJobsAssignTable(resp.data.data)
        }
      });
    } catch (error) {
      console.log("error", error);
    }
   }

   const handleLogcreate=(values)=>{
    let logcreate=`${BASE_URL}/candidate/logcreate`
     setLoadinAssign(true)
     axios.post(logcreate,values,{
      headers: {
        Authorization: `Bearer ${token}`,
        // Other headers if needed
      },})
          .then((res)=>{
            if(res){
     setLoadinAssign(false)

              notification.success({
                message: `Assigned Successfully`,
                duration: 1,
              });

              handleViewCandidate(candidateSingle[0]?.candidateoriginal_id?._id)
              // setOpenAssign(!openAssign);
              setAssignEditCandidate(!assignEditCandidate);
              
            }
          })
          .catch((err)=>{
     setLoadinAssign(false)

     notification.error({
      message: err.response?.data?.message?.split(":")[1],
      duration:1,
    });
          })
   }

   const handleSearch=async(values)=>{
    console.log("values",values);
    let api=`${BASE_URL}/candidate/list`

    setLoading(true)
    try {
      setAllcandidateSearch(values)

      let params={
         page:1,
         limit:10,
         ...values
      }

        
        await axios.get(api,{params}).then((resp) => {
            setAllcandidates(resp.data.data);
            
            setopenFilterDrawer(false)
            setLoading(false)
        }); 
        // await axios.get(apicanidate).then((resp) => {
        //     setCandidatesTotal(resp.data.data);
    
        // }); 
        // await axios.get(apijobs).then((resp) => {
        //     setJobsAssignTable(resp.data.data);

        // }); 
       
    
    }
        catch (err) {
            console.error(err)
            setLoading(false)

        }
   }

   const handleopenfilterDrawer=()=>{
     setopenFilterDrawer(!openFilterDrawer)
   }

    const postmanOpen =()=>{
      setpostmanOpen(!postmanDrawer)
    }

     const sendpostman = async(values)=>{
      setAddpostman(true)
    const apipostman=`${BASE}sendData`
    await axios.post(apipostman,values,{
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
      setpostmanOpen(!postmanDrawer)
       setJsonData("")
                  
                  setAddpostman(false)
               
                
                
              
 
 
             }
             else{
              setAddpostman(false)

                notification.error({
                  message: response?.data?.message,
                  duration:1,
                });
                
             }
            })  
         .catch((err)=>{
            console.log(err)
            setAddpostman(false)
            notification.error({
              message: err.response?.data?.message,
              duration:1,
            });
 
         }
         )

     }

     const handleapplayCandidatepage= async(values,form,setactive)=>{
      setAddButtonCandidate(true)
      const apiCreate=`${BASE_URL}/candidate/applay`
      await axios.post(apiCreate,values,)
           .then((response)=>{
               if(response.status===201){
                  notification.success({
                      message: "Applied Successfully",
                      duration:1,
                    });
                  setAddButtonCandidate(false)
                  setAddCandidateDrawer(false)
                   Allcandidate()
                  
                  
                  form.resetFields();
                  fetchJob()
                  if(setactive){
                      setactive("1")
                  }
   
   
               }
               else{
                  setAddButtonCandidate(false)
                  notification.error({
                    message: response?.data?.message,
                    duration:1,
                  });
                  
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
    return (
        <Context.Provider
            value={{
                ...props,
                setLoading,
                Allcandidates,
                candidateLoading,
                candidateSingle,
                openDrawer,
                openAssign,
                job_id,
                jobsAssignTable,
                assignEditCandidate,
                AllcandidatesSearch,
                openAddCandidateDrawer,
                skillSearch,
                handleopenDrawerforAdd,
                handleOpenDrawerassign,
                handleOpenDrawer,
                handleClickEditAssign,
                handleAllcandidateSearch,
                handleSkillSearch,
                handleAddCandidatepage,
                loadingaddbutton,
                candidatestotal,
                Allcandidate,
                addimportbutton,
                handleAddimport,
                setAddImportButtonCandidate,
                handleEditResume,
                resumeDrawer,
                setopenresumeDrawer,
                addResumeButton,
                handleEditresumeOnly,
                candidateOwner,
                handleDateChange,
                searchCandidateOwner,
                handleViewCandidate,
                openEmployeementDetilsDrawer,
                handleClickEmployementDetail,
                setOpenEmployementDetilsPopup,
                handleClickWorkExperience,
                openworkexperiencepopup,
                setworkexperiencePopup,
                openEducationDrawer,
                setEducationDrawer,
                handleClickEducation,
                setProjectDrawer,
                handleClickProject,
                openProjectDrawer,
                handleSubmitProject,
                handleEditEducation,
                handleSubmitWorkExperinece,
                handleEditEmployeeDetail,
                skill,
                AssignJobFetch,
                handleLogcreate,
                setOpenAssign,
                handleSearch,
                openFilterDrawer,
                handleopenfilterDrawer,
                setopenFilterDrawer,
                setAllcandidates,
                setLoadinAssign,
                loadingAssign,
                postmanOpen,
                postmanDrawer,
                sendpostman,
                addpostmanbutton,
                jsonData,
                setJsonData,
                handleapplayCandidatepage
                
            

            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default CandidateProvider;