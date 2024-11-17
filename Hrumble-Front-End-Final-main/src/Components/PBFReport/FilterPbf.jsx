import React from 'react'
import {  Button, Drawer, Form, Input, DatePicker, Select } from 'antd';
import { useEffect } from 'react';
import { useContext } from 'react';
import PBFContext from '../../Providers/PBFReports';
const FilterPbf = ({handleFilterApply,handleDrawerClose,}) => {
    const {fetchfilterSelect,clientSelect,ownerSelect}=useContext(PBFContext)
    const [form] = Form.useForm();
 console.log("clientSelect",ownerSelect)

  useEffect(() => {
     fetchfilterSelect()
  }, [])
  
  return (
    <Form 
    
     layout='vertical'
    form={form} onFinish={handleFilterApply}>

    <div className='col_1 m_t_10 range_picker'>
    <Form.Item name="date" label="Date Range">
      <DatePicker.RangePicker />
    </Form.Item>
    </div>
     <div className='col_1 m_t_1'>
     <Form.Item name="candidateOwner" label="Candidate Owner">
       <Select
       allowClear
        options={ownerSelect}/>
    </Form.Item>
     </div>
    <div className='col_1 m_t_1'>
    <Form.Item name="client" label="Client">
    <Select
       allowClear
     
       placeholder="Select Client"
        options={clientSelect}/>
    </Form.Item>
    </div>
  
    {/* Add more filter fields as needed */}
    <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <Button className="btn_cancel" onClick={handleDrawerClose}>Cancel</Button>
        <Button type="primary" className="btn" htmlType="submit">
          Apply
        </Button> 
      </div>
  </Form>
  )
}

export default FilterPbf