import { Avatar, Dropdown, Empty, Menu, Popconfirm, message } from 'antd'
import React from 'react'
import { MoreOutlined } from '@ant-design/icons';
import GoalContext from '../../Providers/Goal';
import { useContext } from 'react';

const Teamstab = () => {
    const {teamsusers,handleClickAddTeam,handleRemove}=useContext(GoalContext)
    const menu = (
        <Menu>
          <Menu.Item key="1"
           onClick={handleRemove}>Remove</Menu.Item>
          {/* <Menu.Item key="2">Delete</Menu.Item> */}
        </Menu>
      );


      
      const confirm = (id) => {
        handleClickAddTeam(id)
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };
      

  return (
    <>
      
         <div>
        {
            teamsusers?.inteam?.length ==0?
            
            <>
        <div
         className='goal_types'>
        <Empty
         
         style={{
           margin: "0px 250px"
         }}
        description={
         <span>
             No Users Added
           
         </span>}/>
        </div>
       
             </>
            :
            <>
             <h4 className='m_b_5 m_t_1'> In this Team</h4>

{teamsusers?.inteam?.map((item)=>{
    return(
                  <div className='d_f j_c_s_b m_t_5 a_i_c g_10 goal_types'>
                         <div className='d_f g_10 a_i_c'>
      <Avatar>{item?.name}</Avatar>
          <div>
          <h6
             style={{
              fontWeight:900
            }}
          >{item?.name}</h6>
          <p>{item?.email_id}</p>
          </div>
        {/* <p>This is the Assigned Target page.</p> */}
         </div>
         <Dropdown overlay={ <Menu>
          <Menu.Item key="1"
           onClick={(e)=>handleRemove(item?._id)}>Remove</Menu.Item>
          {/* <Menu.Item key="2">Delete</Menu.Item> */}
        </Menu>} placement="bottomRight">
                    <MoreOutlined />
                    </Dropdown>
         
                   
 </div>
 )
})}
            </>
        
        }
           
       
         </div>
         
         


    
    <h4 className='m_t_30 m_b_5'>Not in this Team</h4>
    {
            teamsusers?.notteam?.map((item)=>{
                return(
                    <div className='d_f j_c_s_b m_t_5 a_i_c g_10 goal_types'>
                         <div className='d_f g_10 a_i_c'>
      <Avatar>{item?.name}</Avatar>
          <div>
          <h6
           style={{
             fontWeight:900
           }}>{item?.name}</h6>
          <p>{item?.email_id}</p>
          </div>
        {/* <p>This is the Assigned Target page.</p> */}
         </div>
         {
          item.parent_id ?
          <Popconfirm
          title="Add the User"
          description="Are You Sure Add the User,The User is Already in Another Team?"
          onConfirm={(e)=>confirm(item?._id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
               <p  className='c_primary'
              //  onClick={(e)=>handleClickAddTeam(item?._id)}
                style={{
                  cursor: 'pointer'
                }}>+ Add</p>
               </Popconfirm>
               :
               <Popconfirm
               title="Add the User"
               description="Are you sure  Add this User in Team?"
               onConfirm={(e)=>confirm(item?._id)}
               onCancel={cancel}
               okText="Yes"
               cancelText="No"
             >
                    <p  className='c_primary'
                   //  onClick={(e)=>handleClickAddTeam(item?._id)}
                     style={{
                       cursor: 'pointer'
                     }}>+ Add</p>
                    </Popconfirm>
         }
        
                   
 </div>)
            })
        }
  
    </>
  )
}

export default Teamstab