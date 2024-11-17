import React, { useEffect, useState} from 'react';
import axios from 'axios';
// import { FaqApi } from '../../api';
import Context from './index';
import { BASE_URL } from '../../Utils/api';
import CookieUtil from '../../Utils/Cookies';



const SettingProvider =(props) => {
    const [comapnyDetails, setComapnyDetails] = useState([]);
    const [openSettings, setOpenSettingsDrawer] = useState(false);
    const [openSettingsEdit, setOpenSettingsEditDrawer] = useState(false);
    const [Loading, setLoading] = useState(false);




    const token =CookieUtil.get("admin_token")


   const handleopenDrawer=()=>{
    setOpenSettingsDrawer(!openSettings)
   }

    // useEffect(() => {
    //     console.log('Component rendered');
    //     fetchEmploy();
    // },[]);

    return (
        <Context.Provider
            value={{
                ...props,
                handleopenDrawer,
                openSettings,
                
                Loading
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default SettingProvider;