import { Button, Drawer, Input, Tabs } from 'antd'
import React, { useState } from 'react'

import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';

const { Search } = Input;

const index = () => {

  const [open, setOpen] = useState(false);
//  const [tabchange,settap] =useState("1")

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: '1',
      label: 'All Employees',
      children:<EmployeeTable table ={"AllEmployees"} />,
    },
    {
      key: '2',
      label: 'Billable',
      children:<EmployeeTable table ={"Billable"} />,
    },
    {
      key: '3',
      label: 'Non-Billable',
      children:<EmployeeTable table ={"NonBillable"} />,
    },
    {
      key: '4',
      label: 'Onboarding',
      children:<EmployeeTable table ={"Onboarding"} />,
    },
   
  ];

  return (
    <div>
      <Drawer
        title="Add Employee"
        placement="right"
        closable={false}
        size='large'
        onClose={onClose}
        open={open}
        
        height={50}
        width={700}
      >
        <AddEmployee onClose={onClose} />
      </Drawer>
      <label className='heading_text'>Employees</label>
      <div
      className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm p_t_5'>
      <Search className="input_search" allowClear placeholder="Search by Employee/ ID" enterButton 
       
      />
       <div className='d_f a_i_c'>
       <button type='primary' className='btn btn-primary btn-sm ' onClick={showDrawer}>+ Add Employee</button>
       </div>
      </div>   
      
      {/* <div className='col_2 p_t_20'>
      <div style={{height: 130, width:470}} className='card'>
            <PieChart />
      </div>
      <div style={{height: 130, width:470}} className='card'>
            <PieChart1 />
      </div>
      </div> */}
      <div className='tab m_t_10 m_b_10 responsive_table'>
        <Tabs items={items} defaultActiveKey="1"/>
      </div>
    </div>
  )
}

export default index
