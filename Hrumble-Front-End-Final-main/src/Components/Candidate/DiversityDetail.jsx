import { Checkbox, Form, Input, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import  { useState } from 'react'

const DiversityDetails = ({selectedLabels,setSelectedLabels}) => {


  // Function to handle label click
  const handleLabelClick = (label) => { 
    // Toggle the selection state of the clicked label
    setSelectedLabels(label)
    
  };

  // Labels with associated background colors
  const labelsWithColors = [
    { label: 'All Candidates', color: '#ffffff',value:"All" },
    { label: 'Male Candidates', color: '#ffffff',value:"Male" },
    { label: 'Female Candidates ', color: '#ffffff',value:"Female" },
  ];

  return (
    <div>
       
        <div>
          <label className='search-antd-head'>Diversity Details</label>
          <Form.Item label="Gender" name="gender" className='p_t_10'>
            <div className='p_t_10'>
                {labelsWithColors.map((item) => (
                <span
                    key={item.label}
                    onClick={() => handleLabelClick(item.value)}
                    style={{
                    padding: '8px',
                    margin: '4px',
                    cursor: 'pointer',
                    backgroundColor: selectedLabels ==item.value ? '#deeff7' : item.color,
                    color: '#303030',
                    border: '1px solid #6ea4db',
                    borderRadius: '14px',
                    }}
                >
                    {item.label}
                </span>
                ))}
            </div>
            </Form.Item>
        </div>
        {/* <Form.Item> */}
            <Checkbox className='p_t_15'>Person with disabilities only</Checkbox>
        {/* </Form.Item> */}
        <div className='d-flex gap-3 pt-3'>
            <div>
            <Form.Item label="Candidate Age" name="minAge">
                <Input placeholder='Min age' />
            </Form.Item>
            
            </div>
                <label className='pt-3'>to</label>
            <div>
            
            <Form.Item label=" " name="maxAge">
                <Input placeholder='Max age' />
            </Form.Item>
            </div>
            <label className='pt-3'>Years</label>
        </div>

        <div className=''>
         {/* <label className='search-antd-head' >Work Details</label> */}
         <div className='d_f f_w_w g_20 p_t_10'>
            <div>
                <Form.Item label="Showing Candidates Seeking" name="empStatus">
                    <Select defaultValue="any">
                        <Option value=''>Any</Option>
                        <Option value='Full time'>Full Time</Option>
                        <Option value='Part time'>Part Time</Option>
                        <Option value='Contract'>Contarct</Option>
                    </Select>
                </Form.Item>
            </div>
            <div>
                {/* <Form.Item label=" " name=" ">
                    <Select defaultValue="any">
                        <Option value='any'>Any</Option>
                        <Option value='fulltime'>Full Time</Option>
                        <Option value='parttime'>Part Time</Option>
                    </Select>
                </Form.Item> */}
            </div>
         </div>
        </div>
        
     
    </div>
  )
}

export default DiversityDetails
