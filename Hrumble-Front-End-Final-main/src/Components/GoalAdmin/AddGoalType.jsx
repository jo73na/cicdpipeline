import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import { useContext } from 'react'
import GoalContext from '../../Providers/Goal'

const AddGoalType = () => {

     const [form]=Form.useForm()
     const {onFinishGoaltype,onCloseGoaltype,buttonLodainggoal}=useContext(GoalContext)

     const handlefinish =(values)=>{
        onFinishGoaltype(values,form)
     }
  return (
    <Form form={form} layout="vertical" onFinish={handlefinish} className='applay_leave'>
    <div className='col_2 m_t_20'>
    <Form.Item
     
       name="goaltype_name" 
       label="Goal Type"
       rules={[{ required: true, message: 'Please Enter Goal Type' }]}
     >
 
          <Input
           style={{
             width:"280px"
           }}
           placeholder='Goal Type'/>
        
    
     </Form.Item>
    </div>

    <div className='col_1 g_20'>
    {/* <Form.List name="candidateskills"
     >
     {(fields, { add, remove }) => (
       <>
         {fields.map(({ name }) => (
           <>
              <div className="lable_center">
             <div
               style={{
                 display: "flex",
                 flexWrap: "wrap",
                 gap:"20px",
                 marginTop: "-12px"
               
                 

                 
               }}
             >
               <div className="input_skill">
                 <Form.Item
                   label="Select Goal Type"
                   name={[name, "goal type"]}
                   rules={[
                     { required: true, message: "Goal Type is required" },
                   ]}
                 >
                  <Select
                   placeholder="Select Goal Type"
                   style={{
                       width:"280px"
                   }}
                   options={[{
                        label:"Submissions",
                        value:"Submissions"
                   },
                   {
                       label:"Selections",
                       value:"Selections"
                  },
                  {
                   label:"Onboard",
                   value:"Onboard"
              },
              {
               label:"Revenue",
               value:"Revenue"
          },  
              
               
               
               
               ]}
                   />
                 </Form.Item>
               </div>
               <div>
                 <Form.Item label="Target">
                   <Input
                    placeholder='Enter Target'
                     style={{
                       width:"200px"
                   }}/>
                 </Form.Item>
               </div>

            
               <DeleteOutlined style={{marginTop:"0px"}} onClick={() => remove(name)} />
             </div>
           </div>
          
           </>
        
         ))}
         
           
            <p className='c_primary'
             style={{
               cursor:"pointer",
               marginTop:"-30px"
             }}
             onClick={()=>add()}>  + Add Another Goal Type</p> 
          
          
           
       </>
     )}
   </Form.List> */}
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
     <button type='button' className="btn btn-danger btn-sm"
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
  )
}

export default AddGoalType