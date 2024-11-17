import { Button, Form, Input, Radio, Select } from 'antd'
import { Option } from 'antd/lib/mentions';
import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';

const AddEmployee = ({onClose}) => {

  const {fetchEmployFull,addEmployee} = useContext(EmployeeContext)


    const selectBefore = (
        <Select defaultValue="₹">
          <Option value="₹">₹</Option>
          <Option value="$">$</Option>
        </Select>
      );

      const [form] = Form.useForm();

      const onFinish = (Values) => {
        console.log("Addemployeee",Values)
        addEmployee(Values,onClose)
      }

    //   useEffect(() => {
        
    //   },[])

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
                <Select placeholder='Enter Department'
                 options={
                    [
                        {
                        label:"Development",
                        value:"Development"
                    },
                    {
                        label:"Sales & Marketing",
                        value:"Sales & Marketing"
                    },
                    {
                        label:"HR Department",
                        value:"HR Department"
                    },
                   
                
                ]
                 } />
            </Form.Item>
            <Form.Item label="Designation" name="designation">
                <Input placeholder='Enter Designation' />
            </Form.Item>
        </div>
        {/* <div className='col_2 g_30'>
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
        </div> */}
        {/* <div className='col_2 g_30'>
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
        </div> */}
        <div className='col_2 g_30'>
            <Form.Item label="Monthly CTC" name="monthly_ctc">
                <Input  placeholder='Enter Value' />
            </Form.Item>
            <Form.Item label="Yearly CTC" name="yearly_ctc">
                <Input  placeholder='Enter Value' />
            </Form.Item>
        </div>
        <div style={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "flex-end"
            }}>

            <button onClick={onClose} className="btn_cancel btn">Cancel</button>
            <button  className="btn btn-primary btn-sm" type="submit">Save</button>
        </div>
      </Form>
    </div>
  )
}

export default AddEmployee
