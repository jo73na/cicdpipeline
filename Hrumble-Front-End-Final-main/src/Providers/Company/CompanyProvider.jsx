import{ useContext, useEffect, useState} from 'react';
import axios from 'axios';
// import { LeaveApi } from '../../api';
import Context from './index';
// import { BASE_URL } from '../../Utils/api';
import { notification } from 'antd';
import CookieUtil from '../../Utils/Cookies';
import LoadingContext from '../Loading';

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const CompanyProvider =(props) => {

    //  const {themefuction}=useContext(LoadingContext)
    const [company,setCompany] = useState([]);
    const [companySingle,setCompanySingle] = useState({});
    const [theme,settheme] = useState({});
    const [Loading,setLoading] = useState(false);
    const [openDrawer,setOpenDrawer] = useState(false);
    const [userList, setUserList] = useState([]);
    const [roles, setRoles] = useState([]);
    const [holidayleaves, setHolidayleaves] = useState([]);
 

    const token =CookieUtil.get("admin_token")
   

    const fetchCompany = async (year) => {

        const api=`${BASE_URL}/company`
         setLoading(true)
        try {
            await axios.get(api).then((resp) => {
                setCompany(resp.data.data);
         setLoading(false)

            });
        } catch (error) {
            console.log('error', error);
         setLoading(false)

        }
    };
    const fetchCompanySingle = async () => {

        const api=`${BASE_URL}/companysingle`
         setLoading(true)
        try {
            await axios.get(api,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                  setCompanySingle(resp.data.data);
               
               
         setLoading(false)

            });
        } catch (error) {
            console.log('error', error);
         setLoading(false)

        }
    };

    // const fetchtotalleaves = async () => {

    //     const api=`${BASE_URL}/leave/`
        
    //     try {
    //         await axios.get(api).then((resp) => {
    //             setTotalleaves(resp.data.data);
    //         });
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // };

  
  

 
    const handleSend= async(values,form)=>{
         let send ={
            ...values,
            company_id:companySingle?._id||null
         }
        const api=`${BASE_URL}/register`
        try {
            await axios.post(api,send).then((resp) => {
                notification.success({
                    message: "User Created",
                    duration:1,
                  });
                  setOpenDrawer(false)
                form.resetFields();
                
                  fetchuserList(companySingle?._id)
                 
                  
                // setLeave(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleAddComany= async(values,form,handleopenDrawerCompany)=>{
     
     const api=`${BASE_URL}/company`
     try {
         await axios.post(api,values).then((resp) => {
             notification.success({
                 message: "Company Created",
                 duration:1,
               });
             fetchCompany()
               
             form.resetFields();
             handleopenDrawerCompany()
             
              
               
             // setLeave(resp.data.data);
         });
     } catch (error) {
         console.log('error', error);
     }
 }

 

  

  


     const fetchuserList = async(id)=>{
        let apfetch =`${BASE_URL}/allRoles`
        let apfetchCompany =`${BASE_URL}/company/${id}`

        let params ={
            company_id:id
        }
        setLoading(true)
        try {
            await axios.get(apfetchCompany).then((resp) => {
                setCompanySingle(resp.data.data);
         

            });
            await axios.get(apfetch,{params}).then((resp) => {
                setUserList(resp.data.data);
         setLoading(false)

            });

        } catch (error) {
            console.log('error', error);
         setLoading(false)

        }

     }


     const fetchroles = async()=>{
        let apifetchRoles =`${BASE_URL}/roles/companyselect`
       

        
      
        try {
            await axios.get(apifetchRoles).then((resp) => {
                setRoles(resp.data.data);
         

            });
           

           

        } catch (error) {
            console.log('error', error);
         setLoading(false)

        }
     }


   const handleOpen=()=>{
    setOpenDrawer(!openDrawer)
   }
    // useEffect(() => {
    //     console.log('Component rendered');
    //     fetchLeave();
    // },[setLeave]);

   const handleSendEdit= async(values)=>{

    try {
        await axios
          .put(`${BASE_URL}/company/${companySingle?._id}`,values)
          .then((res) => {
            notification.success({
              message: res?.data?.message,
              duration: 1,
            });
            fetchCompanySingle();
          });
      } catch (err) {
        console.log(err);
        notification.error({
          message: err?.response?.data?.message,
          duration: 1,
        });
        setLoading(false);
      }
   }


   const handleSendThemColor= async(values,onCloseDrawer)=>{




    try {
        await axios
          .put(`${BASE_URL}/theme`,values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if needed
            },}
          )
          .then((res) => {
            // themefuction()
            onCloseDrawer()
            notification.success({
              message: res?.data?.message,
              duration: 1,
            });
            
          });
      } catch (err) {
        console.log(err);
        notification.error({
          message: err?.response?.data?.message,
          duration: 1,
        });
        setLoading(false);
      }
   }


   const handleinit = async (year) => {

    const api=`${BASE_URL}/theme`
     setLoading(true)
    try {
        await axios.get(api).then((resp) => {
            settheme(resp.data.data);
     setLoading(false)

        });
    } catch (error) {
        console.log('error', error);
     setLoading(false)

    }
};


    

    return (
        <Context.Provider
            value={{
                ...props,
                fetchCompany,
                Loading,
                company,
                userList,
                fetchuserList,
                companySingle,
                handleOpen,
                fetchroles,
                setRoles,
                roles,
                handleSend,
                fetchCompanySingle,
                handleSendEdit,
                handleSendThemColor,
                handleinit,
                theme,
                handleAddComany,
               
                openDrawer
               
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default CompanyProvider;
