import { Drawer, Tabs } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import Users from './users';
import RolesInUsers from './Roles';
import UserManagementContext from '../../Providers/UserMangement';
import AddUser from './Adduser';

// import RolesInUUsers from './Modules/RolesInUsers';
// import Users from './Modules/Users';
// import Api from '../../Utils/ApiService';


export default function UserManageMent() {

  // Redux Selector get
  const [activekey, setActiveKey] = useState("1");
   const {handleOpen,openDrawer}=useContext(UserManagementContext)
  // Custom Variables


  // Tabs function starts here -------------------->

  const items = [
    {
      key: '1',
      label: 'Users',
      children: <Users/>
    },
    {
      key: '2',
      label: 'Roles',
      children: <RolesInUsers />
    },
  ];

  const handleTabChange = (e) => {
    setActiveKey(e);
  };


  const Assign= <p  type='primary' className='c_primary' style={{
    cursor:"pointer",
    fontSize:"15px",
    marginRight:"10px",
    fontWeight:700
  }} onClick={handleOpen} >+ Add User</p>



  // Tabs function ends here ---------------------->

  return (
    <>

<div className='row'>
      <div className='col-12 mt-4'>
          <label className='heading_text'>User Management </label>
      </div>
      </div>
    
      
      

      <div className='card p_5 m_t_10'>
      <Tabs className="tAB_TABLE" items={items} activeKey={activekey} onChange={handleTabChange}
          tabBarExtraContent={Assign}
          />
      </div>


      <Drawer
        title="Add User"
        placement="right"
        closable={true}
        onClose={handleOpen}
        open={openDrawer}
        width={550}
      >
        <AddUser/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>

    </>
  );
}