import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useContext } from 'react'
import DashboardContext from '../../Providers/DashboardProvider'
import { useEffect } from 'react'

const Addmanualy = () => {

     const {manualbutton,handleCancel,manualadd,editGoal}=useContext(DashboardContext)
     console.log("manualadd",manualadd)
    const [form]=useForm()
   


      useEffect(() => {
        
        form.setFieldsValue(manualadd)

      }, [manualadd])
      
  return (
    <div>
    <Form layout='vertical' onFinish={editGoal} form={form}
   
    >
      <Form.Item
      label="" name="_id">
         <Input  type='hidden' />
     </Form.Item>
     <Form.Item
      label="Goal" name="goaltype_name">
         <Input  disabled/>
     </Form.Item>
     <Form.Item
      label="Target" name="Target">
         <Input  disabled/>
     </Form.Item>
     <Form.Item
      label="Acheived" name="count">
         <Input/>
     </Form.Item>
   
   
        
    <div
      style={{
        margin: "10px",
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
      }}
    >
      <Button className="btn_cancel" onClick={handleCancel}>
        Cancel
      </Button>
      <Button
       type="primary"  

        className="btn"
        htmlType="submit"
         loading={manualbutton}
      
      >
        Save
      </Button>
    </div>
        </Form>
</div>
  )
}

export default Addmanualy