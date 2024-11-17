import { Button, Card, DatePicker, Form, Input, Select } from 'antd'
import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';
import { CloseOutlined } from '@ant-design/icons';

import dayjs from "dayjs";


const EditExperienceInfo = () => {

  const { editExperienceInfo, employeeComplete ,employeeCompleteFetch, workExperinceData} = useContext(EmployeeContext);

  console.log("ssssseeeee",employeeComplete)

  const dateFormat = 'YYYY/MM/DD';
  
    let [form] = Form.useForm();

    const onFinish = (Values) => {
        console.log("values",Values)
        let sendData = [];
        Values?.items?.map((item) => {
            sendData?.push({
                ...item,
                employee_id:item?.employee_id ? item?.employee_id : employeeComplete?.basic?._id ,
            })
        })
        editExperienceInfo({workExperinceData:sendData},employeeComplete?._id)
    }

    useEffect(() => {
        console.log("ddddf",employeeComplete)
        let experienceDtata=[]
        workExperinceData?.map((item)=>{
            const dateRangeString = `${item?.joining_date} - ${item?.seperation_date}`;
            const [startDate, endDate] = dateRangeString.split(" - ").map(dateStr => dayjs(dateStr));
         experienceDtata.push({
            _id:item?._id,
            employee_id:item?.employee_id ? item?.employee_id : employeeComplete?.basic?._id ,
            designation:item.designation||item.designation||" ",
            company_name:item.company_name||item.company_name||" ",
            joining_date: startDate,
            seperation_date:  endDate,

            

         })
     })
        form.setFieldsValue({items:experienceDtata})
    },[workExperinceData])
    
  return (
    <div>
       <Form
    form={form}
    layout="vertical"
    onFinish={onFinish}>

         <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
             
            }}
          >
            {fields.map((field,index) => (
              <Card
              className="m_t_10 card"
                size="small"
                title={`Experience ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
              <div className="col_2 g_20">
              <Form.Item label="Designation" name={[field.name, 'designation']}>
                  <Input />
                </Form.Item>
                <Form.Item label="Company Name" name={[field.name, 'company_name']}>
                  <Input />
                </Form.Item>
              
              </div>
      
              <div className="col_2 g_20">
              <Form.Item label="Joining Date" name={[field.name, 'joining_date']}>
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item label="Separation Date" name={[field.name, 'seperation_date']}>
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item label="" name={[field.name, '_id']}>
                <Input type='hidden' />
                </Form.Item>
                <Form.Item label="" name={[field.name, 'employee_id']}>
                <Input type='hidden' />
                </Form.Item>
              </div>
              </Card>
            ))}

            <div className='p_t_15'>
            <Button type="dashed" onClick={ ()=> add()} block>
              + Add Experience
            </Button>
            </div>
          </div>
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
        <Button className="btn_cancel">Cancel</Button>
        <Button type="primary" className="btn" htmlType="submit">
          Save
        </Button> 
      </div>

       </Form> 
    </div>
  )
}

export default EditExperienceInfo
