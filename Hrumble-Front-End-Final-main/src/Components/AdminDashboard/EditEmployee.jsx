import { Button, Form, Input, Radio, Select } from 'antd'
import { Option } from 'antd/lib/mentions';
import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';

const EditEmployee = ({onClose}) => {

  const {fetchEmploy,editEmployee,fetchsingle,employeesingle} = useContext(EmployeeContext)


  console.log("fetchEmployuuuuuu",employeesingle)

    const selectBefore = (
        <Select defaultValue="₹">
          <Option value="₹">₹</Option>
          <Option value="$">$</Option>
        </Select>
      );

      const [form] = Form.useForm();

      const onFinish = (Values) => {
        console.log("editEmployee",Values)
        editEmployee(Values,onClose)
      }

      useEffect(() => {
        console.log("employeesingle-----------------",employeesingle)
        form.setFieldsValue(employeesingle)
      },[employeesingle])

  return (
    <div className='p_t_15'>
      <Form layout='vertical' onFinish={onFinish} form={form}>
        <div className='col_5'>
            <Form.Item label="Employee ID" name="employee_id">
                <Input placeholder='Enter ID' />
            </Form.Item>
        </div>
        <div className='col_2 g_30'>
        <Form.Item label="First Name" name="firstname">
            <Input placeholder='Enter First Name' />
        </Form.Item>
        <Form.Item label="Last Name" name="lastname">
            <Input placeholder='Enter Last Name' />
        </Form.Item>
        </div>
        <div className='col_2 g_30'>
            <Form.Item label="Email" name="email">
                <Input placeholder='Eg:abc@gamil.com' />
            </Form.Item>
            <Form.Item label="Password" name="passwordHash">
                <Input.Password placeholder='Enter Password' />
            </Form.Item>
        </div>
        <div className='col_2 g_30'>
            <Form.Item label="Department" name="department">
                <Select placeholder='Enter Department' />
            </Form.Item>
            <Form.Item label="Designation" name="designation">
                <Input placeholder='Enter Designation' />
            </Form.Item>
        </div>
        <div className='col_2 g_30'>
            <Form.Item label="Reporting Person" name="reportingperson">
                <Select placeholder='Enter Reporting Person' />
            </Form.Item>
            <Form.Item label="Job Type" name="job_type">
                <Radio.Group>
                    <Radio value="Part Time">Part Time</Radio>
                    <Radio value="Full Time">Full Time</Radio>
                    <Radio value="Contract">Contract</Radio>
                </Radio.Group>
            </Form.Item>
        </div>
        <div className='col_2 g_30'>
            <Form.Item label="Salary Type" name="salary_type">
            <Radio.Group>
                    <Radio value="Billable">Billable</Radio>
                    <Radio value="Non Billable">Non-Billable</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Billing Type" name="billing_type">
                <Radio.Group>
                    <Radio value="Hourly">Hourly</Radio>
                    <Radio value="Fixed">Fixed</Radio>
                </Radio.Group>
            </Form.Item>
        </div>
        <div className='col_2 g_30'>
            <Form.Item label="Monthly CTC" name="monthly_ctc">
                <Input addonBefore={selectBefore} placeholder='Enter Value' />
            </Form.Item>
            <Form.Item label="Yearly CTC" name="yearly_ctc">
                <Input addonBefore={selectBefore} placeholder='Enter Value' />
            </Form.Item>
        </div>
        <div style={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "flex-end"
            }}>

            <Button className="btn_cancel">Cancel</Button>
            <button type='primary' className="btn btn-primary" htmlType="submit">Save</button>
        </div>
      </Form>
    </div>
  )
}

export default EditEmployee
