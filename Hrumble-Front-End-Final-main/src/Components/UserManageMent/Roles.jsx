import { Card,Menu, Tabs, Drawer, Button, Input, Tree } from 'antd'
import React, { useState, useEffect, useContext } from 'react'

// import UserTable from './UserTable';
// import DefaultPermissions from './DefaultPermissions';
import { useNavigate } from 'react-router-dom';
import DefaultPermissions from './DefaultPermission';
import UserManagementContext from '../../Providers/UserMangement';


// import AssignUser from './AssignUser';

import UserTable from './userTable';
import AssignUser from './AssignUser';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import EditAssign from './EditAssign';


const RolesInUsers = ({ setActiveKey }) => {
 const [active,setActive]=useState("")
 const {setDepartmentDrawer,handleCloseEdit,setUserDrawerOpen,handelOpenEdit, openEditDrawer,userDrawerOpen,fetchRollList,RollList,fetchMenuClick,rollUsers,rollSingle}=useContext(UserManagementContext)
 const navigate=useNavigate()
  // Custom Variables Start Here ------------->

 console.log("rollSingle",rollSingle)
 console.log("rollUsers",rollUsers)
 console.log("RollList::::", RollList)

 
 const items = [];




  // Custom Variables Ends Here -------------->

  // Tabs data Starts here ------------------>

  const items1 = [
    {
      key: '1',
      label: `Users (${rollUsers?.length})`,
      children: <UserTable/>
     
    },
    {
      key: '2',
      label: 'Default Permissions',
      children: <DefaultPermissions />
    },
  ];

  // Tabs data Ends Here -------------------->    

  // Menu Variables and Functions Starts Here -------------->

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }




  const onDrawerClose = () => {
    setUserDrawerOpen(false);
  }

//   roleslist?.map((role, i) => {
//     items?.push(getItem(role?.name, role?._id));
//   });

  // Menu Variables and Functions Ends Here ----------------->

  // Custom Functions Starts Here -------------->

//   const handleButtonClick = () => {
//     navigate("/addrole");
//   };

//   const handleOnclickButton = () => {
//     navigate('/assignuser');
//   }

  const handleTabChange = (e) => {
    // Handle tab change
  }

  useEffect(() => {
    fetchRollList()
  }, []);
  useEffect(() => {
    setActive(RollList[0]?._id);
  }, [RollList]);

  const handleMenuClick = (e) => {
    setActive(e?.key)
    fetchMenuClick(e?.key)
   
    // api.getSingle(dispatch, [start, success, failure, "roleSingle"], "roles", e?.key, (err, res) => {

    // });
    // api.getAll(dispatch, [start, success, failure, "userRoleSingle"], "", { permission: e?.key }, (err, res) => {

    // });
  }

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setActive(selectedKeys[0])

    fetchMenuClick(selectedKeys[0])
  };


  

  const menuThree = (parent, menu) => {
    const filter = menu?.filter((e) => {
      return String(e?.parent_id||null) === String(parent) });
      console.log(filter,("filter"));
      const list = filter?.map((e) => {
        
       
    

          
          return {
          title: e?.name,
          key: e?._id,
          disabled: false,
          children:
          e.children?.length>0 ?
          menuThree(e?._id,e.children):
           menuThree(e?._id, menu)
          
           
   } })
        return list
        
     
    ;}
  const treeData = menuThree(null,RollList)


   const Assign=
    <div
     className='d_f g_10'>
      
        <p  type='primary' className='c_primary' style={{
     cursor:"pointer",
     fontSize:"13px",
     fontWeight:600
   }} onClick={() => setUserDrawerOpen(true)}>+ Assign User</p>
    </div>
  

  // Custom Functions Ends Here ----------------->
 console.log("hhhh",active)
  return (
    <>
      {/* Assign User Drawer */}
   
      <div className=''>
        <div className="d_f g_10  m_t_5 a_i_c j_c_s_b " >
          <div>
          <Input.Search
          className="input_search"
          allowClear
          placeholder="Search by User Name /ID"
          enterButton
          // onChange={handleChangeSearch}
          // value={searchjob}
        />
          </div>
          <div className ="d_f g_10">
          <button  className='btn btn-primary btn-sm' onClick={()=>navigate("/addrole")}>+ New Department</button>
         <button  className='btn btn-primary btn-sm' onClick={()=>navigate("/adddepartment")}>+ Add Child</button>
          </div>

        </div>
        <div className='d_f g_10 m_t_10 m-2'>
          {/* Menu Starts Here ------------> */}
          <div style={{
            flex: 1
          }}>
            {/* <Menu
              className='zive-usermanagement-role-menu'
               defaultSelectedKeys={["651eaa2222aab8b298b1014b"]}
              defaultOpenKeys={['sub1']}
              onClick={handleMenuClick}
              items={items}
            /> */}
             
       <Tree
        className="m_30"
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0']}
       onSelect={onSelect}
      treeData={treeData}
    />
          </div>
          {/* Menu Ends Here ---------------> */}
          <div style={{
            flex: 3
          }}>
            <Card className='zive-usermanagement-role-card1'>
              <div className='d-flex justify-content-between'>
                <label className='zive-usermanagement-role-label-admin'></label>
              </div>
              {/* Tabs Starts Here --------------> */}
              <Tabs className='w-100 m_t_10' defaultActiveKey="1" items={items1} onClick={handleTabChange} onChange={handleTabChange} tabBarExtraContent={Assign} />
              {/* Tabs Ends Here ----------------> */}
            </Card>
          </div>
        </div>
      </div>

      <Drawer
        title="Assign User"
        placement="right"
        closable={true}
        onClose={onDrawerClose}
        open={userDrawerOpen}
        width={750}
      >
         <AssignUser/>
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>
      <Drawer
        title="Edit Assign"
        placement="right"
        closable={true}
        onClose={handleCloseEdit}
        open={openEditDrawer}
        width={700}
      >
         <EditAssign/>
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>
    </>
  )
}

export default RolesInUsers;