import{ useEffect, useState} from 'react';
import axios from 'axios';
// import { FaqApi } from '../../api';
import Context from './index';
// import { BASE, BASE_URL } from '../../Utils/api';
import { notification } from 'antd';
import CookieUtil from '../../Utils/Cookies';

const BASE_URL = import.meta.env.VITE_BASE_URL; 
const BASE = import.meta.env.VITE_BASE;


const SalesandMargettingProvider =(props) => {
    const [account, setAccount] = useState([]);
    const [List, setList] = useState([]);
    const [Listdata, setListdata] = useState([]);
    const [ContactListdata, setContactList] = useState([]);
    const [accountSingle, setAccountSingle] = useState({});
    const [contactSingle, setContactSingle] = useState({});
    const [jsonData, setJsonData] = useState("");
    const [contactData, setcontactData] = useState("");
    const [contact_id, setcontact_id] = useState("");
    const [clientJobs, setClientJob] = useState([]);
    const [AddCompanyDrawer, setAddCompanyDrawer] = useState(false);
    const [listopen, setListopen] = useState(false);
    const [contactListDrawer, setcontactListlinkDrawer] = useState(false);
    const [addpostmanbutton,setAddaccountButton ] = useState(false);
    const [addListbutton,setAddtListButton ] = useState(false);
    const [accountLinkDrawer,setaccountlinkDrawer ] = useState(false);
    const [contactLinkDrawer,setcontactlinkDrawer ] = useState(false);
    const [AddContactDrawer, setAddContactDrawer] = useState(false);
    const [EditContactDrawer, setEditContactDrawer] = useState(false);
    const [ViewContactDrawer, setViewContactDrawer] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [clientSelect, setClientSelect] = useState([]);
    const [addimportbutton, setAddImportButtonContact] = useState(false);
    const [ownerSelect, setOwnersSelect] = useState([]);
    const [filterdata,setFilterData] = useState({});
    const [openImport,setOpenImport] = useState(false);
    const [Loading,setLoading] = useState(false);
    const [Location,setLocations] = useState([]);
    const [buttonloadingcontact,setButtonloadingcontact] = useState(false);
    const [buttonloadingaccount,setButtonloadingaccont] = useState(false);
    const[selectAccount,setAccountSelect]=useState([])
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total:10 });
    const [paginationcontact, setPaginationcontact] = useState({ current: 1, pageSize: 10, total:10 });
    const role = CookieUtil.get("role");
    const token = CookieUtil.get("admin_token");


    const fethContacts = async () => {

        let api=`${BASE_URL}/contact`
        let params ={
          page:paginationcontact.current,
          limit:paginationcontact.pageSize
        }
        try {
            setLoading(true)

         
            await axios.get(api,{params}).then((resp) => {
                setContacts(resp.data.data.data);
              
            setPaginationcontact({...paginationcontact,total:resp.data.data.total});

                setLoading(false)

            });
           }
         
         catch (error) {
            console.log('error', error);
            setLoading(false)

        }
    };

    const fethContactList = async (id) => {

      let api=`${BASE_URL}/contact/contactlist`
      let params ={
        list_id:id
      }
      try {
          setLoading(true)
          await axios.get(api,{params}).then((resp) => {
              setContactList(resp.data.data);
              setLoading(false)
          });
         }
      
       catch (error) {
          console.log('error', error);
          setLoading(false)

      }
  };

    const fetchList = async () => {

      let api=`${BASE_URL}/account/getlist`
    
      try {
          // setLoading(true)
          await axios.get(api,).then((resp) => {
            setListdata(resp.data.data);
              setLoading(false)

          });
         }
       
       catch (error) {
          console.log('error', error);
          setLoading(false)

      }
  };

    const fetchListselect = async () => {

      let api=`${BASE_URL}/account/getlistSelect`
      
      try {
       

       
          await axios.get(api,).then((resp) => {
              setList(resp.data.data);
       

              setLoading(false)

          });
         }
       
       catch (error) {
          console.log('error', error);
          setLoading(false)

      }
  };

    const locationapi= async()=>{
      let api=`${BASE_URL}/location/getselect`
      try {
          await axios.get(api,).then((resp) => {
            setLocations(resp.data.data);
              

          });
         }
       
       catch (error) {
          console.log('error', error);
         

      }
    }
    const fethaccountContacts = async (id) => {

      let api=`${BASE_URL}/contact`


      let params={
        account_id:id,
        page:paginationcontact.current,
        limit:paginationcontact.pageSize
      }

      try {
          setLoading(true)

       
          await axios.get(api,{params}).then((resp) => {
              setContacts(resp.data.data.data);
            setPaginationcontact({...paginationcontact,total:resp.data.data.total});

              setLoading(false)

          });
         }
       
       catch (error) {
          console.log('error', error);
          setLoading(false)

      }
  };

  const handleListAdd = async(values)=>{
  
  const apipostman=`${BASE_URL}/account/listadd`
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
              
                setList("")
     fetchListselect()
           }
           else{
            setAddaccountButton(false)

              notification.error({
                message: response?.data?.message,
                duration:1,
              });
              
           }
          })  
       .catch((err)=>{
          console.log(err)
          setAddaccountButton(false)
          notification.error({
            message: err.response?.data?.message,
            duration:1,
          });

       }
       )

   }
   const handleListSave = async(values)=>{
  
    const apipostman=`${BASE_URL}/account/listadd`
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
                
                  setList("")
       fetchListselect()
                  
             }
             else{
              setAddaccountButton(false)
  
                notification.error({
                  message: response?.data?.message,
                  duration:1,
                });
                
             }
            })  
         .catch((err)=>{
            console.log(err)
            setAddaccountButton(false)
            notification.error({
              message: err.response?.data?.message,
              duration:1,
            });
  
         }
         )
  
     }
  const sendAccount = async(values)=>{
    setAddaccountButton(true)
  const apipostman=`${BASE_URL}/account/accountadd`
  await axios.post(apipostman,values?.account,{
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
                setaccountlinkDrawer(!accountLinkDrawer)
     setJsonData("")
     fethAccounts()
                
     setAddaccountButton(false)
             
              
              
            


           }
           else{
            setAddaccountButton(false)

              notification.error({
                message: response?.data?.message,
                duration:1,
              });
              
           }
          })  
       .catch((err)=>{
          console.log(err)
          setAddaccountButton(false)
          notification.error({
            message: err.response?.data?.message,
            duration:1,
          });

       }
       )

   }
   const sendContact = async(values,id)=>{
    setAddaccountButton(true)
     
  const apipostman=`${BASE_URL}/account/contactadd`
  await axios.post(apipostman,{...values,account_id:id},{
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
                setcontactlinkDrawer(!contactLinkDrawer)
     setcontactData("")
     fethaccountContacts(id)         
     setAddaccountButton(false)
             
              
              
            


           }
           else{
            setAddaccountButton(false)

              notification.error({
                message: response?.data?.message,
                duration:1,
              });
              
           }
          })  
       .catch((err)=>{
          console.log(err)
          setAddaccountButton(false)
          notification.error({
            message: err.response?.data?.message,
            duration:1,
          });

       }
       )

   }

   const sendContactList = async(values,id)=>{
    setAddtListButton(true)
     
  const apipostdata=`${BASE_URL}/account/contactListAdd`
  await axios.post(apipostdata,{...values,account_id:id},{
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
                setcontactListlinkDrawer(!contactListDrawer)
     setcontactData("")
     fethaccountContacts(id)         
     setAddtListButton(false)
             
              
              
            


           }
           else{
            setAddtListButton(false)

              notification.error({
                message: response?.data?.message,
                duration:1,
              });
              
           }
          })  
       .catch((err)=>{
          console.log(err)
          setAddaccountButton(false)
          notification.error({
            message: err.response?.data?.message,
            duration:1,
          });

       }
       )

   }

    const fethAccounts = async () => {
      let params ={
        page:pagination.current,
        limit:pagination.pageSize
      }

      let api=`${BASE_URL}/account`
      try {
          setLoading(true)
       
       
          await axios.get(api,{params}).then((resp) => {
            setAccount(resp.data.data);
            setPagination({...pagination,total:resp.data.data.total});

              setLoading(false)

          });
         }
       
       catch (error) {
          console.log('error', error);
          setLoading(false)

      }
  };

  const handleAddimport= async(values,form)=>{
    setAddImportButtonContact(true)
    const apiCreate=`${BASE}leads`
    

    try{
        await axios.post(apiCreate,values,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },})  .then( async(response)=>{
              if(response.status===200){
                 await fethContacts()
                 notification.success({
                     message: "Imported successfully ",
                     duration:1,
                   });
                 setAddImportButtonContact(false)
                //  setAddCandidateDrawer(false)
                 
                 
                 
                 form.resetFields();  
                
              
  
  
              }
              else{
                setAddImportButtonContact(false)
                 notification.error({
                     message: "Something went wrong",
                     duration:1,
                   });
                 
                
                 
              }
             })  
        
                   
    }
   
         catch(err){
          
          setAddImportButtonContact(false)
            notification.error({
                message: "Something went wrong",
                duration:1,
              });
 
         }
         
   }


  const handleFinishaccount = async (values,form) => {

    let apiadd =`${BASE_URL}/account/`
   try {
     setButtonloadingaccont(true)
     await axios
       .post(apiadd, values,{
           headers: {
             Authorization: `Bearer ${token}`,
             // Other headers if needed
           },
         })
       .then((res) => {
         notification.success({
           message: res?.data?.message,
           duration: 1,
         });
   form.resetFields()
         
   setButtonloadingaccont(false)
     AddCompanyPopup()
         fethAccounts();
       });
   } catch (err) {
     console.log(err);
     setButtonloadingaccont(false)
     notification.error({
       message: err.response?.data?.message?.split(":")[1],
       duration:1,
     });
     
   }
 };



  




   const AddCompanyPopup=()=>{
    setAddCompanyDrawer(!AddCompanyDrawer)
   }
   const AddContactPopup=()=>{
    setAddContactDrawer(!AddContactDrawer)
   }
   const EditContactPopup=()=>{
    setEditContactDrawer(!EditContactDrawer)
   }
   const ViewContactPopup=()=>{
    setViewContactDrawer(!ViewContactDrawer)
   }


   const handleFinishcontact = async (values,form) => {

     let apiadd =`${BASE_URL}/contact/`
    try {
      setButtonloadingcontact(true)
      await axios
        .post(apiadd, values,{
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },
          })
        .then((res) => {
          notification.success({
            message: res?.data?.message,
            duration: 1,
          });
    form.resetFields()
          
      setButtonloadingcontact(false)
      AddContactPopup()
          fethContacts();
        });
    } catch (err) {
      console.log(err);
      setButtonloadingcontact(false)
      notification.error({
        message: err.response?.data?.message?.split(":")[1],
        duration:1,
      });
      
    }
  };
  const handleFinishaccountContact = async (values,form,id) => {

    let apiadd =`${BASE_URL}/contact/`
   try {
     setButtonloadingcontact(true)
     await axios
       .post(apiadd, values,{
           headers: {
             Authorization: `Bearer ${token}`,
             // Other headers if needed
           },
         })
       .then((res) => {
         notification.success({
           message: res?.data?.message,
           duration: 1,
         });
   form.resetFields()
         
     setButtonloadingcontact(false)
     AddContactPopup()
     fethaccountContacts(id);
       });
   } catch (err) {
     console.log(err);
     setButtonloadingcontact(false)
     notification.error({
       message: err.response?.data?.message?.split(":")[1],
       duration:1,
     });
     
   }
 };
 const handleEditaccountContact = async (values,form,id) => {

  let apiedit =`${BASE_URL}/contact/${contactSingle?._id}`
 try {
   setButtonloadingcontact(true)
   await axios
     .put(apiedit, values,{
         headers: {
           Authorization: `Bearer ${token}`,
           // Other headers if needed
         },
       })
     .then((res) => {
       notification.success({
         message: res?.data?.message,
         duration: 1,
       });
 form.resetFields()
       
   setButtonloadingcontact(false)
   EditContactPopup()
   fethaccountContacts(id);
     });
 } catch (err) {
   console.log(err);
   setButtonloadingcontact(false)
   notification.error({
     message: err.response?.data?.message?.split(":")[1],
     duration:1,
   });
   
 }
};

const handleSendList = async (values) => {

  let apiedit =`${BASE_URL}/account/listsave/${contact_id}`
 try {
  //  setButtonloadingcontact(true)
   await axios
     .put(apiedit, values,{
         headers: {
           Authorization: `Bearer ${token}`,
           // Other headers if needed
         },
       })
     .then((res) => {
       notification.success({
         message: res?.data?.message,
         duration: 1,
       });
//  form.resetFields()
       
  //  setButtonloadingcontact(false)
   handleopenModel()
  //  EditContactPopup()
  //  fethaccountContacts(id);
     });
 } catch (err) {
   console.log(err);
  
   notification.error({
     message: err.response?.data?.message?.split(":")[1],
     duration:1,
   });
   
 }
};

  const handleSelect=async(e,status)=>{
    let statusChangapi=`${BASE_URL}/account/status/${e}`
    try{
         await axios.put(statusChangapi, {company_stage:status})
                    .then((res)=>{
                        notification.success({
                            message: res?.data?.message,
                            duration:1,
                          });
                          fethAccounts()
                    })
    }
    catch (e) {
        console.log("e",e)
    }
  }


   const AccountSelect =async()=>{
    let api=`${BASE_URL}/account/getselect`


   

    try {
      

     
        await axios.get(api,).then((resp) => {
          setAccountSelect(resp.data.data);
            

        });
       }
     
     catch (error) {
        console.log('error', error);
       

    }
   }

 
  const ftechAccountSingle = async(id)=>{
    let api=`${BASE_URL}/account/${id}`


   

    try {
      

     
        await axios.get(api,).then((resp) => {
          setAccountSingle(resp.data.data);
            

        });
       }
     
     catch (error) {
        console.log('error', error);
       

    }
  }
  const handleViewContact = async(id)=>{
    let api=`${BASE_URL}/contact/${id}`


   

    try {
      

     
        await axios.get(api,).then((resp) => {
          setContactSingle(resp.data.data);
          ViewContactPopup()
            

        });
       }
     
     catch (error) {
        console.log('error', error);
       

    }
  }





   const OpenImportDrawer =()=>{
     setOpenImport(!openImport)
   } 


   const handleopenModel =()=>{
    setListopen(!listopen)
  }

   const sendColumn = async(values)=>{
    let api=`${BASE_URL}/space/columnAdd/`
    try {
    
       await axios
         .post(api, values,{
             headers: {
               Authorization: `Bearer ${token}`,
               // Other headers if needed
             },
           })
         .then((res) => {
           notification.success({
             message: res?.data?.message,
             duration: 1,
           });
    
      
         });
     } catch (err) {
       console.log(err);
      
       notification.error({
         message: err.response?.data?.message?.split(":")[1],
         duration:1,
       });
       
     }
   }
   const sendTasks = async(values)=>{
    let api=`${BASE_URL}/space/taskAdd/`
    try {
    
       await axios
         .post(api, values,{
             headers: {
               Authorization: `Bearer ${token}`,
               // Other headers if needed
             },
           })
         .then((res) => {
           notification.success({
             message: res?.data?.message,
             duration: 1,
           });
    
      
         });
     } catch (err) {
       console.log(err);
      
       notification.error({
         message: err.response?.data?.message?.split(":")[1],
         duration:1,
       });
       
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
               
              
                handleopenModel,
                listopen,
                handleFinishcontact,
                AddCompanyPopup,
                contacts,
                fethContacts,
                AddCompanyDrawer,
                buttonloadingcontact,
                AddContactPopup,
                AddContactDrawer,
                openImport,
                OpenImportDrawer,
                fethAccounts,
                handleFinishaccount,
                buttonloadingaccount,
                account,
                fethaccountContacts,
                handleFinishaccountContact,
                locationapi,
                Location,
                Loading,
                handleSelect,
                selectAccount,
                AccountSelect,
                handleAddimport,
                addimportbutton,
             
                setAddImportButtonContact,
                pagination,
                setPagination,
                accountSingle,
                ftechAccountSingle,
                ViewContactPopup,
                ViewContactDrawer,
                handleViewContact,
                contactSingle,
                sendAccount,
                addpostmanbutton,
                setJsonData,
                jsonData,
                setaccountlinkDrawer,
                accountLinkDrawer,
                contactData,
                setcontactData,
                contactLinkDrawer,
                setcontactlinkDrawer,
                sendContact,
                setPaginationcontact,
                paginationcontact,
                EditContactDrawer,
                EditContactPopup,
                handleEditaccountContact,
                setcontactListlinkDrawer,
                contactListDrawer,
                sendContactList,
                addListbutton,
                List,
                fetchListselect,
                handleListAdd,
                handleListSave,
                handleSendList,
                setcontact_id,
                fetchList,
                Listdata,
                fethContactList,
                ContactListdata,
                sendColumn,
                sendTasks,
             
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default SalesandMargettingProvider;
