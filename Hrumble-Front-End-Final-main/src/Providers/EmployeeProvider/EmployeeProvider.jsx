import React, { useEffect, useState} from 'react';
import axios from 'axios';
// import { FaqApi } from '../../api';
import Context from './index';
import { BASE, BASE_URL } from '../../Utils/api';
import CookieUtil from '../../Utils/Cookies';
import { notification } from 'antd';


const EmployeeProvider =(props) => {
    const [interview, setInterview] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [personalDet, setPersonalDet] = useState([]);
    const [educationDet, setEducationDet] = useState([]);
    const [openaddEmply,setOpenaddEmply]=useState(false);
    const [addbuttonEmply,setAddButton]=useState(false);
    const [employeeid,setEmployeeId]=useState([]);
    const [defaultfilelist,setdefaultfilelist] = useState([{}]);
    const [aadharfile,setAadharfile] = useState([{}]);
    const [employeeLogindata, setEmployeeLoginData]=useState([]);
    const [experienceSingle, setExperiSingle] = useState({});
    const [editDrawer, setEditDrawer] = useState(false);
    const [employeesingle, setEmployeeSingle] = useState({})
    const [employeeComplete, setEmployeeComplete] = useState({})
    const [workExperinceData, setWorkExperinceData]=useState([]);
    const [experinceData, setExperinceData]=useState([]);
    const [educationExperiData, setEduExper]=useState([]);
    const [adminLoginData,setAdminLoginData]=useState([]);
    const [bankDetailEmp,setBankDetail]=useState([]);
    const [documentsEmp,setDocuments]=useState([]);
    const [EducationEmp,setEducation]=useState({});
    const [personalEmp,setPersonalEmp]=useState([]);
    const [Onboarding,setOnboarding]=useState([]);
    const [allEmployee,setAllEmployee]=useState([]);
    const [billableEmployee,setBillableEmployee]=useState([]);
    const [nonBillableEmployee,setNonBillableEmployee]=useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen4, setIsModalOpen4] = useState(false);

    const [isModalOpen5, setIsModalOpen5] = useState(false);
    const [isModalOpen6, setIsModalOpen6] = useState(false);
    const [isModalOpen7, setIsModalOpen7] = useState(false);
    const [isModalOpen8, setIsModalOpen8] = useState(false);

    const[editTimeline,setEditTimeline] = useState(false);

    const handleEditJob = (item) => {
      setEditTimeline(item)
      setIsModalOpen7(true)
    }

    let employId = "652525f480739f4a1e24c7c6"
    
    const token =CookieUtil.get("admin_token")

    const fetchEmploy = async (id) => {


        let employeeapi = `${BASE_URL}/employee`
        let employeebyIdApi = `${BASE_URL}/employee/complete/${id}`


        try {
            setLoading(true)
          
            await axios.get(employeeapi).then((resp) => {
                setPersonalDet(resp.data.data);
            });
            await axios.get(employeeapi,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                    setPersonalDet(resp.data.data)
                   
            });
            await axios.get(employeeapi).then((resp) => {
                setEducationDet(resp.data.data);
            }); 
           
            await axios.get(employeebyIdApi).then((resp) => {
                setEmployeeLoginData(resp.data.data);
                console.log("fffff",resp.data.data)
                setdefaultfilelist( 
                    [
                        {
                      uid: "1",
                      name: resp.data.data?.basic?.display_profile_file?.fieldname,
                      status: "done", // Set the status to 'done' for default files
                      url: `${BASE}${resp.data.data?.basic?.display_profile_file?.destination}${resp.data.data?.basic?.aadhar_file?.originalname}`, // Set the URL of the default file
                        }
                    ],
                 )
                 setLoading(false)
            });
            await axios.get(experienceapi).then((resp) => {
              console.log("ExperinceData",setExperinceData)
              setExperinceData(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

  //   const fetchExper = async (id) => {

  //     let experienceapi = `${BASE_URL}/work-experience/${id}`


  //     try {
  //         setLoading(true)
        
  //         await axios.get(experienceapi).then((resp) => {
  //           console.log("ExperinceData",setExperinceData)
  //           setExperinceData(resp.data.data);
  //           // setExperiSingle(resp.data.data)
  //           setLoading(false)
  //         });
          
  //     } catch (error) {
  //         console.log('error', error);

  //     }
  // }; 

  const employeeCompleteFetch = async (id) => {

    console.log("completeId----->",id)

    let employeeComplete = `${BASE_URL}/employee/complete/${id}`

    let params = {
      employee_id: id,
    };


    let experienceapi = `${BASE_URL}/work-experience`


    try {
        setLoading(true)

        await axios.get(employeeComplete).then((resp) => {
          console.log("resp.data.data",setEmployeeComplete)
          setEmployeeComplete(resp.data.data)
          setExperiSingle()
          
        });

        await axios.get(experienceapi,{params}).then((resp) => {
          console.log("ExperinceData",setWorkExperinceData)
          setWorkExperinceData(resp.data.data);

        });

        setLoading(false)
        
    } catch (error) {
        console.log('error', error);

    }
}; 

  const fetchsingle = async (id) => {

    console.log("idddnnnnnnn",id)
    let employeebyIdApi = `${BASE_URL}/employee/${id}`

    try {
        setLoading(true)
      
        await axios.get(employeebyIdApi,{params:{projtype:"edit"}}).then((resp) => {
          console.log("resp.data.data",setEmployeeSingle)
          setEmployeeSingle(resp.data.data)
          setLoading(false)
        });
        
        
    } catch (error) {
        console.log('error', error);

    }
}; 

const FetchEmployeeTable = async () => {

  let employeeApi = `${BASE_URL}/employee`
  
  try {
      setLoading(true)
    
      await axios.get(employeeApi).then((resp) => {
        console.log("resp.data.data",setExperinceData)
        setEmployeeLoginData(resp.data.data)
        
      });
      setLoading(false)
      
  } catch (error) {
      console.log('error', error);
  }
}; 


  const fetchEmployFull = async (id) => {

    console.log("getID----->",id)

    let employeeApi = `${BASE_URL}/employee`
    let employeebyIdApi = `${BASE_URL}/employee/${id}`
    
    try {
        setLoading(true)
      
        await axios.get(employeeApi).then((resp) => {
          console.log("resp.data.data",setExperinceData)
          setEmployeeLoginData(resp.data.data)
        });  

        await axios.get(employeebyIdApi).then((resp) => {
          console.log("resp.data.data",setAdminLoginData)
          setAdminLoginData(resp.data.data)
          
        });
        setLoading(false)
        
    } catch (error) {
        console.log('error', error);
    }
}; 

    const addEmployee=(values,onClose,form)=>{
       
        const apiCreate=`${BASE_URL}/employee`

        axios.post(apiCreate,values,{
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
                    
                    setAddButton(false)
                    setOpenaddEmply(!openaddEmply)
                    fetchEmployFull()
                    form.resetFields();
                    onClose();

                 }
                 else{
                    setAddButton(false)
                    notification.error({
                      message: response?.data?.message?.split(":")[1],
                      duration:1,
                    });
                    onClose();

                    
                 }
                })  
             .catch((err)=>{
                console.log(err)
                setAddButton(false)
                notification.error({
                  message: err.response?.data?.message?.split(":")[1],
                  duration:1,
                });
                onClose();

             }
             )
    }

    const addExper =(values,id)=>{
       console.log("valuesssssss",values)
      const apiCreate=`${BASE_URL}/work-experience`

      axios.post(apiCreate,values,{
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
                  setAddButton(false)
                  setOpenaddEmply(!openaddEmply)
                  fetchEducation(id)
                  // form.resetFields();
               }
               else{
                  setAddButton(false)
                  notification.error("Something Went Wrong!");
                  
               }
              })  
           .catch((err)=>{
              console.log(err)
              setAddButton(false)
              notification.error("Something Went Wrong!");

           }
           )
  }

  const fetchExperienceAll = async(id) => {

    let param = {
      employee_id: id,
    };


    let experienceapi = `${BASE_URL}/work-experience`

    try {
        setLoading(true)

        await axios.get(experienceapi,{params:param}).then((resp) => {
          console.log("resp.data.data",resp)
          setEduExper(resp.data.data)
          
        });
        setLoading(false)
        
    } catch (error) {
        console.log('error', error);
        setLoading(false)
    }

  }

  const editExperienceInfo = async(values,id) => {

    let experienceapi = `${BASE_URL}/work-experience/workInfo`

    axios
          .put(
            experienceapi,
            values, // include the values directly in the request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
                // Other headers if needed
              },
            
            }
          )
          .then((response) => {
            if (response.status === 200) {
              notification.success({
                message: response?.data?.message,
                duration: 1,
              });
              // employeeCompleteFetch();
              setOpenaddEmply(!openaddEmply)
            }
          })
          .catch((err) => console.log("error", err));
      };

  const handleOpenEditDrawer = async (id) => {
    console.log("id--", id);
    let apigetClient = `${BASE_URL}/work-experience/${id}`;
    setEditDrawer(!editDrawer);

      try {
        setLoading(true)
        await axios.get(apigetClient).then((resp) => {
          console.log("editdata",apigetClient)
          setExperiSingle(resp.data?.data);
          setLoading(false)
        });
      } catch (error) {
        console.log("error", error);
      }
    
  };

  const handleOpenDeleteDrawer = async (id) => {
    console.log("id--", id);
    let apigetClient = `${BASE_URL}/work-experience/${id}`;
    setEditDrawer(!editDrawer);

      try {
        setLoading(true)
        await axios.delete(apigetClient).then((resp) => {
          console.log("editdata",apigetClient)
          fetchEducation(EducationEmp?._id)
        });
        setLoading(false)
      } catch (error) {
        console.log("error", error);
        setLoading(false)
      }
    
  };

  const deleteEmployee = async (id) => {
    console.log("id--", id);
    let apideleteEmployee = `${BASE_URL}/employee/${id}`;

      try {
        setLoading(true)
        await axios.delete(apideleteEmployee).then((resp) => {
          console.log("deletedata",apideleteEmployee)
          setOpenaddEmply(!openaddEmply)
          fetchEmployFull()
          setLoading(false)
        });
        
      } catch (error) {
        console.log("error", error);
        setLoading(false)
      }
    
  };

    const editEmployee = (values,id) => {
      console.log("id",id)
        let params = {
          edittype: "edit"
        };
      
        const apiCreate = `${BASE_URL}/employee/${id}`;
      
        axios
          .put(
            apiCreate,
            values, // include the values directly in the request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
                // Other headers if needed
              },
              params: params, // include the params in the params property
            }
          )
          .then((response) => {
            if (response.status === 200) {
              notification.success({
                message: response?.data?.message,
                duration: 1,
              });
              onClose();
              handleClickjobTable();
              setOpenaddEmply(!openaddEmply)
            }
          })
          .catch((err) => console.log("error", err));
      };

      const editPersonal = (values,id,onClose,onClose2) => {
        let params = {
          edittype: "personal"
        };
      
        const apiCreate = `${BASE_URL}/employee/${id}`;
      
        axios
          .put(
            apiCreate,
            values, // include the values directly in the request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
                // Other headers if needed
              },
              params: params, // include the params in the params property
            }
          )
          .then((response) => {
            if (response.status === 200) {
              notification.success({
                message: response?.data?.message,
                duration: 1,
              });
              fetchEmployFull(id);
              setOpenaddEmply(!openaddEmply)
              onClose();
              onClose2();
            }
          })
          .catch((err) => console.log("error", err));
      };

    const editExper = (values) => {

      console.log("id", employId);
    
      const apiCreate = `${BASE_URL}/work-experience/${experienceSingle?._id}`;
    
      axios
        .put(
          apiCreate,
          values, // include the values directly in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            notification.success({
              message: response?.data?.message,
              duration: 1,
            });
            fetchEducation(EducationEmp?._id)
            setOpenaddEmply(!openaddEmply)
          }
        })
        .catch((err) => console.log("error", err));
    };

    const handleChangestatus= async(e,record)=>{
      let statusChangapi=`${BASE_URL}/employee/${record.action}`
      try{
           await axios.put(statusChangapi, {user_status:e})
                      .then((res)=>{
                          notification.success({
                              message: res?.data?.message,
                              duration:1,
                            });
                            fetchEmployFull()
                      })
      }
      catch (e) {
          console.log("e",e)
      }
    }

    const fetchBankDetails = async(id) => {

    let apiEmployeeBank = `${BASE_URL}/employee/${id}`;

    try {
        setLoading(true)
      
        await axios.get(apiEmployeeBank,{params:{projtype:"bank"}}).then((resp) => {
          console.log("resp.data.data",setBankDetail)
          setBankDetail(resp.data.data)
          setLoading(false)
        });
        
        
    } catch (error) {
        console.log('error', error);

    }

  }

  const fetchDocuments = async(id) => {

    let apiEmployeeDocument = `${BASE_URL}/employee/${id}`;

    try {
        setLoading(true)
      
        await axios.get(apiEmployeeDocument,{params:{projtype:"bgv"}}).then((resp) => {
          console.log("bgv",resp.data.data)
          setDocuments(resp.data.data)
          setLoading(false)
        });
        
        
    } catch (error) {
        console.log('error', error);

    }

  }

  const fetchEducation = async(id) => {

    console.log("dddddddd",id)

    let apiEmployeeBank = `${BASE_URL}/employee/${id}`;

    let params = {
      employee_id: id,
    };


    let experienceapi = `${BASE_URL}/work-experience`

    try {
        setLoading(true)
      
        await axios.get(apiEmployeeBank,{params:{projtype:"education"}}).then((resp) => {
          console.log("resp.data.data",resp)
          setEducation(resp.data.data)
          
        });

        await axios.get(experienceapi,{params}).then((resp) => {
          console.log("resp.data.data",resp)
          setEduExper(resp.data.data)
          
        });
        setLoading(false)
        
    } catch (error) {
        console.log('error', error);
        setLoading(false)
    }

  }

  const fetchPersonalDetail = async(id) => {

    console.log("personalid--------------",id)

    let apiEmployeePersonal = `${BASE_URL}/employee/${id}`;

    try {
        setLoading(true)
      
        await axios.get(apiEmployeePersonal,{params:{projtype:"personal"}}).then((resp) => {
          console.log("resp.data.data",setPersonalEmp)
          setPersonalEmp(resp.data.data)
          setLoading(false)
        });
        
        
    } catch (error) {
        console.log('error', error);
        setLoading(false)
    }

  }

  const handleClickjobTable= async(id)=>{
    const jobsingleApi =`${BASE_URL}/employee/${id}`
    const allEmployee=`${BASE_URL}/employee/allemployeeStatus`
    const billableEmployee=`${BASE_URL}/employee/billableStatus`
    const employeeOnboarding=`${BASE_URL}/employee/onboardingstatus`
    const nonBillableEmployee=`${BASE_URL}/employee/nonBillableStatus`
    const candidatesforinterview=`${BASE_URL}/candidate/interview`
    const candidatesforoffered=`${BASE_URL}/candidate/offered`
    const candidatesforjioned=`${BASE_URL}/candidate/joined`

    try {

     setLoading(true);
        await axios.get(allEmployee).then((resp) => {
         console.log("jobsinglee",resp)
         setAllEmployee(resp.data.data);
         setLoading(false);
      });
      await axios.get(employeeOnboarding).then((resp) => {
        setOnboarding(resp.data.data);
      }); 
      await axios.get(billableEmployee).then((resp) => {
        setBillableEmployee(resp.data.data);
      }); 
      await axios.get(nonBillableEmployee).then((resp) => {
        setNonBillableEmployee(resp.data.data);
      }); 


    }
    catch (error) {
      console.log("error: " + error)
    }

 }


    return (
        <Context.Provider
            value={{
                ...props,
                interview,
                personalDet,
                educationDet,
                addbuttonEmply,
                openaddEmply,
                setOpenaddEmply,
                defaultfilelist,
                experinceData,
                employeesingle,
                aadharfile,
                setAddButton, 
                setEducation,
                addEmployee,
                addExper,
                editDrawer,
                editExper,
                fetchEmployFull,
                deleteEmployee,
                fetchBankDetails,
                fetchDocuments,
                fetchEducation,
                setDocuments,
                fetchPersonalDetail,
                fetchExperienceAll,
                EducationEmp,
                experienceSingle,
                adminLoginData,
                bankDetailEmp,
                documentsEmp,
                personalEmp,
                educationExperiData,
                handleOpenEditDrawer,
                handleOpenDeleteDrawer,
                fetchsingle,
                employeeComplete,
                editEmployee:editEmployee,
                editPersonal:editPersonal,
                employId,
                FetchEmployeeTable,
                employeeLogindata,
                workExperinceData,
                Onboarding,
                allEmployee,
                billableEmployee,
                nonBillableEmployee,
                isModalOpen,
                isModalOpen1,
                isModalOpen2,
                isModalOpen3,
                isModalOpen4,
                isModalOpen5,
                isModalOpen6,
                isModalOpen7,
                isModalOpen8,
                editTimeline,
                setIsModalOpen,
                setIsModalOpen1,
                setIsModalOpen2,
                setIsModalOpen3,
                setIsModalOpen4,
                setIsModalOpen5,
                setIsModalOpen6,
                setIsModalOpen7,
                setIsModalOpen8,
                handleEditJob,
                handleChangestatus,
                fetchEmploy,
                handleClickjobTable,
                employeeCompleteFetch,
                editExperienceInfo,
                // fetchExper,
            
                Loading
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default EmployeeProvider;