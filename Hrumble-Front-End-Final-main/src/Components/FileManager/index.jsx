import { Input, Menu, Tabs } from 'antd'
import React, { useState } from 'react'
import { TeamOutlined , AccountBookOutlined , IdcardOutlined , FileTextOutlined } from '@ant-design/icons';
import EmployeeDocuments from './EmployeeDocuments';
import Accounts from './Accounts';
import TimeSheet from './TimeSheet';
import Sow from './Sow';

const FileManager = () => {

  const[key,setKey]=useState("1")

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
 
 
const items=[
    getItem("Employee Documents","1",<TeamOutlined />),
    getItem("Accounts","2",<AccountBookOutlined />),
    getItem("Timesheet","3",<IdcardOutlined />),
    getItem("SOW","4",<FileTextOutlined />),
]

const handleMenuClick=(e)=>{
  console.log("e",e)
  setKey(e?.key)
}

  return (
    <div>
      <label className='heading_text'>File Manager</label>
      <div className=''>
    <div className='d_f g_10 m_t_10 m-2'>
          {/* Menu Starts Here ------------> */}
          <div style={{
            flex: 1
          }}>
            <Menu
              className='card'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              onClick={handleMenuClick}
              items={items}
            />
          </div>
          {/* Menu Ends Here ---------------> */}
          <div className="card p_10" style={{
            flex: 3
          }}>
              {
                key =="1" ?
              <>
               
                <EmployeeDocuments />
                </>
                :
                key =="2"?
                <Accounts/>
                :
                key =="3" ?
                <TimeSheet /> : 
                <Sow />
              }
          </div>
        </div>
    </div>
    </div>
  )
}

export default FileManager
