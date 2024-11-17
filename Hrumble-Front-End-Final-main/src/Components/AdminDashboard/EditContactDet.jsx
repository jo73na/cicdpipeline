import { Button, Form, Input } from 'antd'
import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';

const EditContactDet = ({onClose2}) => {

  const { editPersonal, employeeComplete ,employeeCompleteFetch} = useContext(EmployeeContext);

  console.log("sssssaa",employeeComplete)

    let [form] = Form.useForm();

    const onFinish = (Values) => {
        console.log("values",Values)
        editPersonal(Values,employeeComplete?.basic?._id,onClose2)
    }

    useEffect(() => {
        form.setFieldsValue(employeeComplete?.basic)
    },[employeeComplete?.basic])
    
  return (
    <div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
      <label>Present Address</label>
        <div className='col_2 g_20'>
            <div>
            <Form.Item label="Flat/Door No" name="present_addr">
                <Input placeholder='Enter Flat/Door No' />
            </Form.Item>
            <Form.Item label="Bank Location" name="present_district">
                <Input placeholder='Enter Location' />
            </Form.Item>
            </div>
            <div>   
            <Form.Item label="State" name="present_state">
                <Input placeholder='Enter State' />
            </Form.Item>
            <Form.Item label="Pincode" name="present_zipcode">
                <Input placeholder='Enter Pincode' />
            </Form.Item>
            </div>
            </div>
            <label>Permanent Address</label>
            <div className='col_2 g_20'>
            <div>
            <Form.Item label="Flat/Door No" name="permanent_addr">
                <Input placeholder='Enter Flat/Door No' />
            </Form.Item>
            <Form.Item label="Bank Location" name="permanent_district">
                <Input placeholder='Enter Location' />
            </Form.Item>
            </div>
            <div>   
            <Form.Item label="State" name="permanent_state">
                <Input placeholder='Enter State' />
            </Form.Item>
            <Form.Item label="Pincode" name="permanent_zipcode">
                <Input placeholder='Enter Pincode' />
            </Form.Item>
            </div>
            </div>
        <div>
            <Button type='primary' htmlType='submit'>Submit</Button>
        </div>
        
      </Form>
    </div>
  )
}

export default EditContactDet
