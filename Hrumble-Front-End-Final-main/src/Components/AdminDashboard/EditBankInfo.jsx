import { Button, Form, Input } from 'antd'
import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';

const EditPersonalInfo = ({onClose2}) => {

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
        <div className='col_2 g_20'>
            <div>
            <Form.Item label="Name as in Bank" name="name_as_in_bank">
                <Input placeholder='Enter Name as in Bank' />
            </Form.Item>
            <Form.Item label="Bank Name" name="bank_name">
                <Input placeholder='Enter Bank Name' />
            </Form.Item>
            <Form.Item label="Bank Account No" name="account_num">
                <Input placeholder='Enter Bank Account No' />
            </Form.Item>
            <Form.Item label="Branch Name" name="branch_name">
                <Input placeholder='Enter Branch Name' />
            </Form.Item>
            </div>
            <div>
            <Form.Item label="IFSC Code" name="ifsc_code">
                <Input placeholder='Enter IFSC Code' />
            </Form.Item>
            <Form.Item label="Branch Address" name="branch_addr">
                <Input placeholder='Enter Branch Address' />
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

export default EditPersonalInfo
