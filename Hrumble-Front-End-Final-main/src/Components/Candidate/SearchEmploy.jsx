import { Button, Form, Input, Select, Switch } from 'antd'
import { Option } from 'antd/es/mentions'
import { MinusCircleOutlined, PlusOutlined , StarOutlined  } from '@ant-design/icons';

import React, { useState } from 'react'

const SearchEmploy = () => {

    const [selectedLabels, setSelectedLabels] = useState([]);

  // Function to handle label click
  const handleLabelClick = (label) => {
    // Toggle the selection state of the clicked label
    setSelectedLabels((prevSelectedLabels) => {
      if (prevSelectedLabels.includes(label)) {
        return prevSelectedLabels.filter((selectedLabel) => selectedLabel !== label);
      } else {
        return [...prevSelectedLabels, label];
      }
    });
  };

  // Labels with associated background colors
  const labelsWithColors = [
    { label: 'Label 1', color: '#ffffff' },
    { label: 'Label 2', color: '#ffffff' },
    { label: 'Label 3', color: '#ffffff' },
    // Add more labels as needed
  ];

  return (
    <div>
    
       <div  className='col_2'>
            <Form.Item label="Department and Role" name="role">
                <Input placeholder='Add Department/Role' />
            </Form.Item>
       </div>
       {/* <div className='col_2'>
            <Form.Item label="Industry" name="industry">
                <Input placeholder='Add Industry' />
            </Form.Item>
        </div> */}
        {/* <div>
            <Form.Item label="Company" name="company">
                <Input placeholder='Add Company name' />
            </Form.Item>
        </div> */}
        <div className='col_2'>
           <Form.Item label="Company" name="organization">
        <Input placeholder='Add Company name' />

           </Form.Item>
           
        </div>
        {/* <Select defaultValue="entire" bordered={false}>
                <Option value='entire'>Search in Current company</Option>
        </Select> */}
        {/* <Form.List name="candidateskills">
          {(fields, { add, remove }) => (
            <>
              {fields.length < 1 && (
            <Form.Item>
                <Button
                    type="primary"
                    className="btn_cancel w_30_p"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                >
                    Add Exclude Company
                </Button>
            </Form.Item>
                )}

            {fields.map(({ name }) => (
            <div key={name} className="lable_center">
                <div
                    style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "-15px",
                    gap: "50px",
                    }}
                >
                <div className="p_t_20">
                <Form.Item label="Company" name={[name, "company"]}>
                    <Input placeholder="Add Company name" />
                </Form.Item>
                </div>

            <MinusCircleOutlined 
              style={{ marginTop: "-30px", paddingTop:"45px" }}
              onClick={() => remove(name)}
            />
          </div>
        </div>
      ))}
    </>
  )}
        </Form.List> */}

        <div className='col_2'>
           <Form.Item label ="Designation" name="designation" >
           <Input placeholder='Add Designation' />
           </Form.Item>
        </div>
      
        {/* <Select defaultValue="entire" bordered={false}>
                <Option value='entire'>Search in Current designation</Option>
        </Select> */}
       <div className='col_2'>
       <Form.Item label="Notice Period/ Availability of joining" name="notice period">
            <Select >
                <Option value='any'>Any</Option>
                <Option value='0days'>0-15 days</Option>
                <Option value='1mon'>1 Month</Option>
                <Option value='2mon'>2 Month</Option>
                <Option value='3mon'>3 Month</Option>
            </Select>
        </Form.Item>
       </div>
   



    {/* <div>
      <h2>Selectable Labels</h2> */}
      {/* <div>
        {labelsWithColors.map((item) => (
          <span
            key={item.label}
            onClick={() => handleLabelClick(item.label)}
            style={{
              padding: '8px',
              margin: '4px',
              cursor: 'pointer',
              backgroundColor: selectedLabels.includes(item.label) ? '#d9d9d9' : item.color,
              color: '#303030',
              border: '1px solid #d9d9d9',
              borderRadius: '14px',
            }}
          >
            {item.label}
          </span>
        ))}
      </div> */}
      {/* <div>
        <h3>Selected Labels:</h3>
        <ul>
          {selectedLabels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div> */}
    {/* </div> */}

    </div>
  )
}

export default SearchEmploy
