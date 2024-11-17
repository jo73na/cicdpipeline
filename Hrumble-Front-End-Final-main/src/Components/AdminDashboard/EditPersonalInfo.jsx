import { Button, Form, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';

const EditPersonalInfo = ({onClose}) => {

  const { editPersonal, employeeComplete ,employeeCompleteFetch} = useContext(EmployeeContext);

  console.log("sssssaa",employeeComplete)

    let [form] = Form.useForm();

    const onFinish = (Values) => {
        console.log("values",Values)
        editPersonal(Values,employeeComplete?.basic?._id,onClose)
    }

    useEffect(() => {
        form.setFieldsValue(employeeComplete?.basic)
    },[employeeComplete?.basic])
    
  return (
    <div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <div className='col_2 g_20'>
            <div>
            <Form.Item label="Martial Status" name="marital_status">
                <Input placeholder='Enter Martial status' />
            </Form.Item>
            <Form.Item label="Blood Group" name="blood_group">
                <Input placeholder='Enter Blood Group' />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
                <Input placeholder='Enter Gender' />
            </Form.Item>
            <Form.Item label="Aadhar Number" name="aadhar_num">
                <Input placeholder='Enter Aadhar Number' />
            </Form.Item>
            </div>
            <div>
            <Form.Item label="Pan Number" name="pan_num">
                <Input placeholder='Enter Pan Number' />
            </Form.Item>
            <Form.Item label="UAN Number" name="uan_num">
                <Input placeholder='Enter UAN Number' />
            </Form.Item>
            <Form.Item label="ESIC Number" name="esic_num">
                <Input placeholder='Enter ESIC Number' />
            </Form.Item>
            </div>
        </div>
        <div className='d_f j_c_c'>
            <Button type='primary' htmlType='submit'>Submit</Button>
        </div>
        
      </Form>
    </div>
  )
}

export default EditPersonalInfo
