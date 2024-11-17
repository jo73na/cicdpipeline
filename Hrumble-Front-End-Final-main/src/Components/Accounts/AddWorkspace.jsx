import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import { useContext } from 'react'
import GoalContext from '../../Providers/Goal'

const AddWorkspace = () => {

     const [form]=Form.useForm()
     const {onFinishGoaltype,onCloseGoaltype,buttonLodainggoal}=useContext(GoalContext)

     const handlefinish =(values)=>{
        onFinishGoaltype(values,form)
     }
  return (
    
   <>
    <p>A Space represents teams, departments, or groups, each with its own Lists, workflows, and settings.</p>
       <Form form={form} layout="vertical" onFinish={handlefinish} className='applay_leave'>
    <div className='col_2 m_t_20'>
    <Form.Item
     
       name="workspace_name"
       label="Workspace Name"
    
       rules={[{ required: true, message: 'Please Enter Workspace Name' }]}
     >
 
          <Input
           style={{
             width:"280px"
           }}
           placeholder='e.g. Margetting,Engineering,HR'/>
        
    
     </Form.Item>
    </div>

    <div className='col_2 g_20'>
    <Form.Item
     
     name="workspace_description"
     label="Description (optional)"
  
    
   >

        <Input.TextArea
         style={{
           width:"280px"
         }}
         placeholder='Enter Description'/>
      
  
   </Form.Item>
   </div>
   <div
    className='col_2 g_20'>
         
   {/* <Form.Item
       name="assign_goal"
       label="Assign To"
       rules={[{ required: true, message: 'Please select Assign ' }]}
     >
       <Select
        placeholder="Please Select Team member"/>
     </Form.Item>
     <Form.Item
       name="duration"
       label="Duration"
       // rules={[{ required: true, message: 'Please select Assign ' }]}
     >
       <Select
        placeholder="Please Select Team member"/>
     </Form.Item>   */}
   </div>

     {/* <Form.Item
       name="startDate"
       label="Start Date"
       rules={[{ required: true, message: 'Please select Start Date' }]}
     >
       <DatePicker />
     </Form.Item> 

     <Form.Item
       name="endDate"
       label="End Date"
       rules={[{ required: true, message: 'Please select End Date' }]}
     >
       <DatePicker />
     </Form.Item>
    </div>

     <Form.Item
       name="reason"
       label="Reason"
       rules={[{ required: true, message: 'Please enter Reason' }]}
     >
       <Input.TextArea rows={4} />
     </Form.Item> */}

     <Form.Item>
     <div
     style={{
       margin: "10px",
       display: "flex",
       gap: "10px",
       justifyContent: "flex-end",
     }}
   >
     <button className="btn btn-danger btn-sm"
     onClick={onCloseGoaltype} >
       Cancel
     </button>
     <button
      type="primary"

       className="btn btn-primary btn-sm"
       htmlType="submit"
        loading={buttonLodainggoal}
     >
       Save
     </button>
   </div>
     </Form.Item>
   </Form>
   </>
  )
}

export default AddWorkspace