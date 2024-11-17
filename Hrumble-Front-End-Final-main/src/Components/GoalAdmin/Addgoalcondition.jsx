import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import { useContext } from 'react'
import GoalContext from '../../Providers/Goal'
import { useEffect } from 'react'

const Addgoalcondition = () => {

     const [form]=Form.useForm()
     const {fetchteamSelect,teamSelect,onFinishcondition,onClosesub,buttonLodaing,teamsingle,goalsingle}=useContext(GoalContext)


     useEffect(() => {
    

        form.setFieldsValue({
            parent_id:teamsingle?._id
           })
       fetchteamSelect()
      
    
     }, [teamsingle])


     const handlefinish =(values)=>{
        let send ={
            assigned:[{
                target:values?.target,
                parent:goalsingle?._id,
                duration:values?.duration
            }]
        }
        onFinishcondition(send,form)
     }
     
  return (
    <Form form={form} layout="vertical" onFinish={handlefinish} className='applay_leave'>
    <div className='col_1 m_t_20'>
    <Form.Item
     
     name="target" 
     label="Target"
     rules={[{ required: true, message: 'Please Enter Target' }]}
   >

        <Input
         style={{
           width:"280px"
         }}
         placeholder='Parent'
         options={teamSelect}/>
      
  
   </Form.Item>
    <Form.Item
     
       name="duration" 
       label="Duration"
       rules={[{ required: true, message: 'Please Select Duration' }]}
     >
 
          <Select
           style={{
             width:"280px"
           }}
           placeholder='Duration'
            options={[
             {
                value:"Daily",
                label: 'Daily',
             },
             {
                value:"Weekly",
                label: 'Weekly',
             },
              {
                value: 'Monthly',
                label: 'Monthly',
              },
              {
                value: 'Quarterly',
                label: 'Quarterly',
              },
             
            ]}
           
           />
        
    
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
     <Button className="btn_cancel"
     onClick={onClosesub} >
       Cancel
     </Button>
     <Button
      type="primary"

       className="btn"
       htmlType="submit"
        loading={buttonLodaing}
     >
       Save
     </Button>
   </div>
     </Form.Item>
   </Form>
  )
}

export default Addgoalcondition