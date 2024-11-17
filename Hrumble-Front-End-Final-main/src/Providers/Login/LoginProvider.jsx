import React, { useEffect, useState,memo} from 'react';
import axios from 'axios';

import Context from './index';
import { useNavigate } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies/'
import {notification} from"antd";
import { BASE_URL } from '../../Utils/api';


const LoginProvider = (props) => {


   const [Loading,setLoading]= useState(false) 
 
    const login=async(values,form) => {
        setLoading(true)

        let api=`${BASE_URL}/login`
        try {
            await axios.post(api,values).then( async(res) => {
                 
                //   notification.success({
                //     message:"Login successFully",
                //     duration: 1,
                //   });
                 CookieUtil.set("admin_token", res?.data?.token),
                 CookieUtil.set("is_admin", res?.data?.success),
                 CookieUtil.set("role", res?.data?.data?.admin_data?.role),
                 CookieUtil.set("admin_id", res?.data?.data?.admin_data?._id),
                 CookieUtil.set("admin", JSON.stringify(res?.data?.data?.admin_data))
                 CookieUtil.set("company", JSON.stringify(res?.data?.company))
               setLoading(false)
             setTimeout(() => {
                if( res?.data?.data?.admin_data?.role =="Vendor"){
            window.location.href=("/jobs")

                }
                else if(res?.data?.data?.admin_data?.role =="Client"){
            window.location.href=("/jobs")

                }
                else{
            window.location.href=("/")
                  
                }
                 
             }, 500); 
          
              
            
            });
        } catch (error) {
        
            notification.error({
                message: error.response?.data?.message?.split(":")[1],
                duration: 1,
              });
              setLoading(false)
            console.log('error', error);
        }
    };
    

   

    return (
        <Context.Provider
            value={{
                ...props,
                login,
                Loading,
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default LoginProvider;