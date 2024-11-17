import { Button, Form, Select } from 'antd'

import { useEffect } from 'react'
import { useContext } from 'react'
import UserManagementContext from '../../Providers/UserMangement'
import { useForm } from 'antd/es/form/Form'


const EditAssign = () => {
  const [form]=useForm()

 const {handleFinishAssignEdit,editbutton,assignEdit,setUserDrawerOpen,FetchSelectUsers, reportmanagers,selectRoles,handleFinishAssign}=useContext(UserManagementContext)
   useEffect(() => {
     FetchSelectUsers()
     
      
  
   }, [])
   useEffect(() => {
    let reportManagerEmail =[]
    let CCEmail =[]
     if (assignEdit && assignEdit.reportmanager && assignEdit.reportmanager?.length > 0) {
        assignEdit.reportmanager?.map((item)=>{
          reportManagerEmail.push(
             item.email_address?.address
          ) 
        }) ;
    }
    if (assignEdit && assignEdit.cc && assignEdit.cc?.length > 0) {
      assignEdit.cc?.map((item)=>{
        CCEmail.push(
           item.email_address?.address
        ) 
      }) ;
  }
  
    form.setFieldsValue({
        employee_id:assignEdit?._id,
        report_manager:reportManagerEmail,
        cc:CCEmail
     })
         
   

   }, [assignEdit])
   
    const handleFinish=(values)=>{
        handleFinishAssignEdit(values)
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

         <div className='col_3 g_20'>
         <Form.Item
                        label="Employee Name"
                        name= "employee_id"
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
                        name= "report_manager"
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
                      <Form.Item
                        label="Cc"
                        name= "cc"
                      
                      >
                        <Select options={reportmanagers}
                        placeholder="Select a Cc" 
                        mode='multiple'

                         style ={{
                          width: "200px"
                         }}/>
                      </Form.Item>
         </div>

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
             loading={editbutton}
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

export default EditAssign