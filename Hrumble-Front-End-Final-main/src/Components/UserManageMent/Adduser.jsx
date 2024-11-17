import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import {PlusOutlined,DeleteOutlined} from "@ant-design/icons"
import { useEffect } from 'react'
import { useContext } from 'react'

import { useForm } from 'antd/es/form/Form'
import CompanyContext from '../../Providers/Company'
import UserManagementContext from '../../Providers/UserMangement'


const AddUser = () => {
  const [form]=useForm()

 const {fetchroles,roles,handleSend}= useContext(UserManagementContext)
   useEffect(() => {
    fetchroles()
    
   }, [])
   
    const handleFinish=(values)=>{
       handleSend(values,form)
    }
  return( 
    <>
      <Form
       className='m_t_20'
       layout='vertical'
       onFinish={handleFinish}
        form={form}>
      <div>

         <div className='col_2 g_20 col_1_sm g_5_sm'>
         <Form.Item
                        label="Employee Name"
                        name= "name"
                        rules={[
                          { required: true, message: "Employee is Required" },
                        ]}
                      >
                        <Input/>
                      </Form.Item>
                      <Form.Item
                        label="Email ID"
                        name= "email_id"
                        rules={[
                          { required: true, message: "Email ID is Required" },
                        ]}
                      >
                        <Input type='email'/>
                      </Form.Item>
         

         </div>
         <div className='col_2 g_20 col_1_sm g_5_sm'>
         <Form.Item
                        label="Password"
                        name= "password"
                        rules={[
                          { required: true, message: "Password is Required" },
                        ]}
                      >
                        <Input.Password  placeholder='Password'/>
                      </Form.Item>
                      <Form.Item
                        label="Role"
                        name= "role"
                        rules={[
                          { required: true, message: "Role is Required" },
                        ]}
                      >
                          <Select options={roles} 
                         placeholder="Select Role"
                         style ={{
                          width: "240px"
                         }}
                         />
                       
                      </Form.Item>
         

         </div>
        {/* <Card className="zive-addjob-rating"> */}

      

        <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button className="btn btn-danger btn-sm" 
           onClick={()=>setUserDrawerOpen(false)}>
            Cancel
          </button>
          <button
           type="primary"  

            className="btn btn-sm btn-primary"
            htmlType="submit"
            // loading={loadingaddbutton}
          >
            Save
          </button>
        </div>

        {/* </Card> */}
      </div>
      </Form>
    </>
  )
}

export default AddUser