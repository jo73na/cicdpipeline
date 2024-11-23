import{ useEffect, useState} from 'react';
import axios from 'axios';
// import { LeaveApi } from '../../api';
import Context from './index';
// import { BASE_URL } from '../../Utils/api';
import { notification } from 'antd';
import CookieUtil from '../../../Utils/Cookies';
// import { BASE_URL } from '../../../Utils/api';

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const ProjectProvider =(props) => {
    const [projects, setProjects] = useState([]);
    const [projectSingle, setProjectSingle] = useState({});
    const [totalleaves, setTotalleaves] = useState([]);
    const [requestleaves, setRequestleaves] = useState([]);
    const [holidayleaves, setHolidayleaves] = useState([]);
    const [location, setLocation] = useState([]);


    const token =CookieUtil.get("admin_token")
   

    const fetchLeave = async (year) => {

        const api=`${BASE_URL}/leave/working/${year}`
        
        try {
            await axios.get(api).then((resp) => {
                setLeave(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };


    const fetchProjects = async (year) => {

        const api=`${BASE_URL}/constructionproject/`
        
        try {
            await axios.get(api).then((resp) => {
                setProjects(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };


    const fetchProjectSingle = async (id) => {

        const api=`${BASE_URL}/constructionproject/`
        
        try {
            await axios.get(api).then((resp) => {
                setProjects(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };
    const fetchlocation = async (year) => {

        const api=`${BASE_URL}/location/select`
        
        try {
            await axios.get(api).then((resp) => {
                setLocation(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const fetchtotalleaves = async () => {

        const api=`${BASE_URL}/leave/`
        
        try {
            await axios.get(api).then((resp) => {
                setTotalleaves(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const fetchavailableLeaves = async () => {

        const api=`${BASE_URL}/leave/`
        
        try {
            await axios.get(api).then((resp) => {
                setTotalleaves(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };
    const fetchrequestleaves = async () => {

        const api=`${BASE_URL}/leave/leaverequest`
        
        try {
            await axios.get(api,{headers: {
                Authorization: `Bearer ${token}`,
                // Other headers if needed
            }}).then((resp) => {
                setRequestleaves(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const fetchHolidayleaves = async () => {

        const api=`${BASE_URL}/leave/hoiliday`
        
        try {
            await axios.get(api,{headers: {
                Authorization: `Bearer ${token}`,
                // Other headers if needed
            }}).then((resp) => {
                setHolidayleaves(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const AddworkingDays= async(values)=>{
        const api=`${BASE_URL}/leave/working/${values?.year}`
        try {
            await axios.post(api,values).then((resp) => {
                setLeave(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    }

    const AddHoliday= async(values)=>{
        const api=`${BASE_URL}/leave/publicholidays`
        try {
            await axios.post(api,values).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });
                  fetchHolidayleaves()
                  
                // setLeave(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    }

    const AddLeaves= async(values)=>{
        const api=`${BASE_URL}/leave/`
        try {
            await axios.post(api,values).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });   
                // setLeave(resp.data.data);
            });
        } catch (error) {
            console.log('error', error);
        }
    }

    const Addleaverequest= async(values)=>{
        console.log("values",values)
        const api=`${BASE_URL}/leave/leaverequest`
        try {
            await axios.post(api,values,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });  
                  fetchrequestleaves()
            });
        } catch (error) {
            console.log('error', error);
        }
    }



    const handleChangeStatus= async(id,e)=>{
       
        const api=`${BASE_URL}/leave/status/${id}`
        let senddata={
            status:e
        }
        try {
            await axios.put(api,senddata,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });   
                  fetchrequestleaves()
            });
        } catch (error) {
            
   notification.error({
    message:"Already Approved ",
    
    duration:1,
  }); 
        }
    }

    const handleAddProject= async(values)=>{
        console.log("values",values)
        const api=`${BASE_URL}/constructionproject/`
        try {
            await axios.post(api,values,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  // Other headers if needed
                },}).then((resp) => {
                notification.success({
                    message: resp?.data?.message,
                    duration:1,
                  });  
                  fetchProjects()
            });
        } catch (error) {
            console.log('error', error);
        }
    }




    // useEffect(() => {
    //     console.log('Component rendered');
    //     fetchLeave();
    // },[setLeave]);

    return (
        <Context.Provider
            value={{
                ...props,
                fetchLeave,
                AddworkingDays,
                handleAddProject,
                projects,
                fetchtotalleaves,
                totalleaves,
                AddHoliday,
                AddLeaves,
                fetchavailableLeaves,
                Addleaverequest,
                fetchrequestleaves,
                requestleaves,
                handleChangeStatus,
                fetchHolidayleaves,
                holidayleaves,
                fetchProjects,
                fetchlocation,
                fetchProjectSingle,
                projectSingle,
                setProjectSingle,
                location
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default ProjectProvider;
