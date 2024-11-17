import { Badge, Dropdown, Empty, Menu, Popconfirm, Progress, message } from 'antd'
import React from 'react'
import {DollarOutlined,TrophyOutlined,HomeOutlined, FireOutlined,HeatMapOutlined,RiseOutlined,SlackOutlined,ContactsOutlined, MoreOutlined, TeamOutlined,UserSwitchOutlined } from '@ant-design/icons';
import { useContext } from 'react';

import GoalContext from '../../Providers/Goal';



const AssignedTarget = () => {
    const {setuser_id,goalTypes,handleopencodnition,goalsingle}=useContext(GoalContext)
     console.log("goalTypes",goalTypes)

     const twoColors = {
      '0%': '#108ee9',
      '100%': '#87d068',
    };
    const menu = (
        <Menu>
          <Menu.Item key="1">Edit</Menu.Item>
          <Menu.Item key="2">Delete</Menu.Item>
        </Menu>
      );

      const confirm = (id) => {
        setuser_id(id)
        handleopencodnition()
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };

      function calculatePercentage(part, total) {
        return (part / total) * 100;
    }
 

    const color = ["#ffb800","#42cdff","#52fb6a","#f555ff","#FF6600" ]
 const backround = ["#ffeec3","#d1f3ff","#ceffd5","#fccaff","#ffeec3"]
 const icon =[
   <UserSwitchOutlined/>,
   <TrophyOutlined />,
   // <HomeOutlined />,
   <DollarOutlined />,
   // <ContactsOutlined />,
   <RiseOutlined/>,
    <SlackOutlined />,

 ]
    
  return (
    <>
    <h6 className='m_b_5'
      style={{
        fontWeight:900
      }}> Assigned Goal Types</h6>
    {

    goalTypes?.senddata?.length == 0 ? 
    
   
        <div
        className='goal_types'>
       <Empty
        
        style={{
          margin: "0px 250px"
        }}
       description={
        <span>
            {/* No Goal Type Added */}
          
        </span>}/>
       </div> :
    <div className ="col_3 g_15 m_b_10">
   
    {goalTypes?.senddata
?.map((item,i)=>
 {
  
    
    if(i >3){
       
     
       
       return <div className ="card"
      style={{
       padding:"1.5rem",
   position:"relative",

      }}>
  <div className ="card-body"
 
  >
  <div className ="d_f a_i_c g_10 m_t_10">
  <span className ="dash-widget-icon bg-1"
  style={{
   backgroundColor: backround[i]
  }}>
   
  <i className ="fas fa-dollar-sign"
   style={{
      color:color[i]
   }}
   >
    {icon[i]}
  
  </i>
  </span>
  <div className ="dash-count">
  <div style={{
   fontSize: "15px",
   fontWeight: 600
  }}>{item?.goaltype_name}</div>
  <div className ="dash-counts">
  <p
  style={{
   color:"greay",
   fontWeight:900,
   fontSize:"15px "
  }}>Goal : {item.target} </p>
  </div>
  </div>
  <p className='c_primary'
    style={{
      position:"absolute",
      top:"10px",
      right:"5px",
      cursor:"pointer"
     }} onClick={(e)=>handleClickmanualy(item?.goaltype_name,item?._id,item?.target)}>+ Add Manualy</p>
  </div>
  <div className ="progress progress-sm mt-3">
  <Progress
       percent={calculatePercentage(item.count,item.target)}
       showInfo={true}
       strokeColor={color[i]}
       status="active"
       format={(percent) => `${percent} Days`}
      />
  </div>
  <p className ="text-muted mt-3 mb-0"><span className ="c_primary"><FireOutlined className='bg-1'/>{calculatePercentage(item.count,item.target)}%</span> Completed:{item.count} Remaining:{item.target-item.count} </p>
  </div>
  </div>

    }
    else{
      
      

     return( 
     <Badge.Ribbon text={item.duration}>
      <div className ="card"
      style={{
       padding:"1.5rem"
      }}>
  <div className ="card-body"
  >
  <div className ="d_f a_i_c g_10 m_t_10">
  <span className ="dash-widget-icon bg-1"
  
  style={{
   backgroundColor:backround[i] 
  }}
  >
   
  <i className ="fas fa-dollar-sign"
   style={{
      color:color[i]
   }}>
    {icon[i]}
  </i>
  </span>
  <div className ="dash-count">
  <div style={{
   fontSize: "13px",
   fontWeight: 600
  }}>{item?.goaltype_name}</div>
  <div className ="dash-counts">
  <p
  style={{
   color:"greay",
   fontWeight:900,
   fontSize:"13px "
  }}>Goal : {item.target} </p>
  </div>
  </div>
  </div>
  <div className ="progress progress-sm mt-3">
  <Progress
       percent={calculatePercentage(item.count,item.target)}
       showInfo={true}
       strokeColor={`${color[i]}`}
       status="active"
       format={(percent) => `${percent} Days`}
      />
  </div>
  <p className ="text-muted mt-3 mb-0"><span className ="c_primary"><FireOutlined className='bg-1'/>{calculatePercentage(item.count,item.target)}%</span> Completed:{item.count} Remaining:{item.target-item.count} </p>
  </div>
  </div>
  </Badge.Ribbon>)
    }
   
    
   


  
      
      

   
     
    })}
    </div>}
    {/* <div className ="col_3 g_10 p_10">
    {goalTypes?.senddata
?.map((item)=>
 {
   return(
    
    <Badge.Ribbon text={item.duration}>
    <div className ="card"
    style={{
     padding:"1.5rem"
    }}>
<div className ="card-body"
>
<div className ="d_f a_i_c g_10 m_t_10">
<span className ="dash-widget-icon bg-1"
style={{
 backgroundColor: "#ffeec3"
}}>
 
<i className ="fas fa-dollar-sign">
<UserSwitchOutlined/>
</i>
</span>
<div className ="dash-count">
<div style={{
 fontSize: "15px",
 fontWeight: 600
}}>{item?.goaltype_name}</div>
<div className ="dash-counts">
<p
style={{
 color:"greay",
 fontWeight:900,
 fontSize:"15px "
}}>Goal : {item.target} </p>
</div>
</div>
</div>
<div className ="progress progress-sm mt-3">
<Progress
     percent={calculatePercentage(item.count,item.target)}
     showInfo={true}
     strokeColor={"#ffb800"}
     status="active"
     format={(percent) => `${percent} Days`}
    />
</div>
<p className ="text-muted mt-3 mb-0"><span className ="c_primary"><FireOutlined className='bg-1'/>{calculatePercentage(item.count,item.target)}%</span> Submissions:{item.target} Remaining:{item.target-item.count} </p>
</div>
</div>
</Badge.Ribbon>


  
      
      

   )
     
    })}
    </div> */}
 
   
  
      {/* <div className='d_f j_c_s_b a_i_c g_10 goal_types'>
         <div>
         <h1>Submissions</h1>
        <p>Target : <span style={{
             fontWeight: 'bold',
        }}>5</span> Duration :
        <span style={{
             fontWeight: 'bold',
        }}>1 month</span> </p>
         </div>
         <Dropdown overlay={menu} placement="bottomRight">
                    <MoreOutlined />
                    </Dropdown>
         


    </div> */}
    <h6 className='m_t_20 m_b_5'
      style={{
        fontWeight:900
      }}
    >Not Assigned Goal Types</h6>
    {
        goalTypes?.notmatch?.length == 0 ? 
        <div
        className='goal_types'>
       <Empty
        
        style={{
          margin: "0px 250px"
        }}
       description={
        <span>
            {/* No Goal Type Added */}
          
        </span>}/>
       </div> :
        goalTypes?.notmatch?.map((item)=>{
           return(
            <div className='d_f j_c_s_b a_i_c m_t_5 g_10 goal_types'>
            <div>
            <h5
              style={{
                fontWeight:900
              }}
            >{item?.goaltype_name}</h5>
           {/* <p>This is the Assigned Target page.</p> */}
            </div>
            <Popconfirm
       title="Add the Goal Type"
       description="Are you sure  Add this Goal Type in User?"
       onConfirm={(e)=>confirm(item?._id)}
       onCancel={cancel}
       okText="Yes"
       cancelText="No"
     >
         <p
            
            style={{
               cursor:"pointer"
           }} > + Add</p>
     </Popconfirm>
          
            
   
   
       </div>
           )
        })
    }
    
    </>
  )
}

export default AssignedTarget