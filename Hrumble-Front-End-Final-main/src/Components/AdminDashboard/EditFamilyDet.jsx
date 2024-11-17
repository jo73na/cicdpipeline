import { Button, Card, Form, Input, Select } from 'antd'
import React, { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';
import { CloseOutlined } from '@ant-design/icons';

const EditFamilyDet = () => {

  const { editPersonal, employeeComplete ,employeeCompleteFetch} = useContext(EmployeeContext);

  console.log("ssssseeeee",employeeComplete)

    let [form] = Form.useForm();

    const onFinish = (Values) => {
        console.log("values",Values)
        editPersonal({familyDetails:Values?.items},employeeComplete?.basic?._id)
    }

    useEffect(() => {
        form.setFieldsValue({items:employeeComplete?.basic?.familyDetails})
    },[employeeComplete?.basic?.familyDetails])
    
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
            {fields.map((field) => (
              <Card
              className="m_t_10 card"
                size="small"
                title={`Family Info ${field.name + 1}`}
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
              <Form.Item label="Relationship" name={[field.name, 'relationship']}>
                  <Input />
                </Form.Item>
                <Form.Item label="Relationship Name" name={[field.name, 'name']}>
                  <Input />
                </Form.Item>
              
              </div>
      
              <div className="col_2 g_20">
              <Form.Item label="Occupation" name={[field.name, 'occupation']}>
                  <Input />
                </Form.Item>
                <Form.Item label="Phone Number" name={[field.name, 'phone_no']}>
                  <Input />
                </Form.Item>
              </div>
              </Card>
            ))}

            <div className='p_t_15'>
            <Button type="dashed" onClick={() => add()} block>
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

export default EditFamilyDet
