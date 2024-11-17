import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import {PlusOutlined,DeleteOutlined} from "@ant-design/icons"
import { useEffect } from 'react'
import { useContext } from 'react'
import UserManagementContext from '../../Providers/UserMangement'
import { useForm } from 'antd/es/form/Form'


const AssignUser = () => {
  const [form]=useForm()

 const {setUserDrawerOpen,FetchSelectUsers, reportmanagers,selectRoles,handleFinishAssign}=useContext(UserManagementContext)
   useEffect(() => {
     FetchSelectUsers()
     form.setFieldsValue({
      employees:[{}]
     })
   }, [])
   
    const handleFinish=(values)=>{
      handleFinishAssign(values,form)
    }
  return( 
    <>
      <Form
       className='m_t_20'
       layout='vertical'
       onFinish={handleFinish}
        form={form}>
      <div>
        {/* <Card className="zive-addjob-rating"> */}

        <Form.List name="employees"  className="m_t_40 ">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name }) => (
                <>
               
                  <div
                   className='d_f a_i_c g_10'
                  >
                    <div className="input_skill d_f g_20">
                      <Form.Item
                        label="Employee Name"
                        name={[name, "employee_id"]}
                        rules={[
                          { required: true, message: "Employee is Required" },
                        ]}
                      >
                        <Select options={selectRoles} 
                         placeholder="Select Employee"
                         style ={{
                          width: "200px"
                         }}/>
                      </Form.Item>
                      <Form.Item
                        label="Report Manager"
                        name={[name, "report_manager"]}
                        rules={[
                          { required: true, message: " Report Manager is Required" },
                        ]}
                      >
                        <Select options={reportmanagers}
                        placeholder="Select a Report Manager" 
                         style ={{
                          width: "200px"
                         }}/>
                      </Form.Item>
                      <Form.Item
                        label="Cc"
                        name={[name, "cc"]}
                        rules={[
                          { required: true, message: " Report Manager is Required" },
                        ]}
                      >
                        <Select options={reportmanagers}
                         mode='multiple'
                        placeholder="Select a Report Manager" 
                         style ={{
                          width: "200px"
                         }}/>
                      </Form.Item>
                    </div>
                  
                    <DeleteOutlined  style ={{
                       cursor:"pointer"
                    }} onClick={() => remove(name)} />
                  </div>
               
               
                </>
             
              ))}
               <Form.Item>
                <p
                 
                  className="c_primary"
                  onClick={() => add()}
               
                  icon={<PlusOutlined />}
                >
                
               <PlusOutlined />  Another User
                </p>
              </Form.Item>
               
                
            </>
          )}
        </Form.List>

        <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button className="btn_cancel" 
           onClick={()=>setUserDrawerOpen(false)}>
            Cancel
          </Button>
          <Button
           type="primary"  

            className="btn"
            htmlType="submit"
            // loading={loadingaddbutton}
          >
            Save
          </Button>
        </div>

        {/* </Card> */}
      </div>
      </Form>
    </>
  )
}

export default AssignUser