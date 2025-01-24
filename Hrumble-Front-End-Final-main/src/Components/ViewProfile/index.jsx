// import React, { Children } from 'react';
// import {Row, Col, Card, Button,Tabs, Image} from 'antd';
// import ProfileOverview from './Tab/ProfileOverview';
// import ActiveJobs from './Tab/ActiveJobs';
// import LeaveInfo from './Tab/LeaveInfo';
// import LogHours from './Tab/LogHours';

// const onChange =(key)=>{
//     console.log(key)
// }

// const items =[
//     {
//         key:'1',
//         label: <span style={{fontSize:"12px", color:"var(--primary)"}}>OVERVIEW</span>,
//         children: <ProfileOverview/>
        
//     },
//     // {
//     //     key:'2',
//     //     label: <span style={{fontSize:"12px", color:"black"}}>TASKS</span>,
//     //     children: <ActiveJobs/>
//     // },
//     // {
//     //     key:'3',
//     //     label: <span style={{fontSize:"12px", color:"black"}}>LEAVEINFO</span>,
//     //     children: <LeaveInfo/>
//     // },
//     // {
//     //     key:'4',
//     //     label: <span style={{fontSize:"12px", color:"black"}}>LOGHOURS</span>,
//     //     children: <LogHours/>
//     // },
// ]

// const ViewProfile =()=>{


//     return(
//         <>
//         <h3>Profile </h3>
//       <Tabs defaultActiveKey='1' items={items} onChange={onChange} style={{height:"500px", overflowY:"auto"}}></Tabs>
       
//         </>
//     );

// }


// export default ViewProfile;


import React, {useState, useEffect} from 'react';
import { useLocation, useParams , useNavigate,} from 'react-router-dom';
import { Tabs } from 'antd';
import ProfileOverview from './Tab/ProfileOverview';
import ActiveJobs from './Tab/ActiveJobs';
import LeaveInfo from './Tab/LeaveInfo';
import LogHours from './Tab/LogHours';
import CookieUtil from '../../Utils/Cookies';
import { ArrowLeft } from 'lucide-react';
import {Button} from 'antd';
const onChange = (key) => {
  console.log(`Selected Tab: ${key}`);
};

const ViewProfile = () => {
  const { id } = useParams(); // Get the "id" parameter from the URL
  const location = useLocation();
  const navigate = useNavigate();
  let role = CookieUtil.get("role");

  const items = [
    {
      key: '1',
      label: <span style={{ fontSize: "12px", color: "var(--primary)" }}>OVERVIEW</span>,
      children: <ProfileOverview /> // Pass the ID as a prop
    },
    // {
    //   key: '2',
    //   label: <span style={{ fontSize: "12px", color: "var(--primary)" }}>TASKS</span>,
    //   children: <ActiveJobs profileId={id} />
    // },
    // {
    //   key: '3',
    //   label: <span style={{ fontSize: "12px", color: "var(--primary)" }}>LEAVE INFO</span>,
    //   children: <LeaveInfo profileId={id} />
    // },
    // {
    //   key: '4',
    //   label: <span style={{ fontSize: "12px", color: "var(--primary)" }}>LOG HOURS</span>,
    //   children: <LogHours profileId={id} />
    // }
  ];
    const handleBackClick = () => {
      if (role === "SuperAdmin" || role === "Admin") {
        navigate("/infopage");
      } else {
        navigate("/dashboard");
      }
    };


  return (
    <>
   
      
      <div className="mb-4 d-flex">
      <Button 
    color='black'
      type="link"
      onClick={handleBackClick}
      className="flex items-center text-gray-600 hover:text-gray-900"
      icon={<ArrowLeft className="mr-1" size={20}  style={{color:"black", alignContent:'center', justifyContent:'center'}}/>}
    >
    </Button>
      <h3 style={{ marginBottom: "16px" }}>
        Profile
      </h3>
   
  </div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{ height: "500px", overflowY: "auto" }}
      />
    </>
  );
};

export default ViewProfile;
