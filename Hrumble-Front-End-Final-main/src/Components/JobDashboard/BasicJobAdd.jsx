
import { Form, Input, Select } from 'antd';


 const BasicJobAdd = ({locationsdata, handleChangeSalary,options,onAddJobSubmit,form,handleJobtypeChange,jobType,handleopenDrawerJob,salaryType}) => {
    return(
           <>
        

         
               <div
         className='col_4 g_20'>
               <Form.Item label="Job ID"
             name="job_id"
              rules={[
                {
                  required: true,
                  message: "Please Enter Job ID!",
                },
              ]}>
             <Input
              
activeBorderColor="red"



             
           
              placeholder=' Enter Job ID'/>
            </Form.Item>
            <Form.Item label="Job Title"
             name="job_title"
              rules={[
                {
                  required: true,
                  message: "Please Enter Job Title!",
                },
                {
                  pattern: new RegExp(/^[a-zA-Z\s]+$/),
                  message: "field does not accept numbers",
                },
              ]}>
             <Input
             placeholder=" Enter Job Title"
             
              
             />
            </Form.Item>
            <Form.Item
                label="Job Type"
                name="job_type"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Job Type!",
                  },
                ]}
              >
                <Select placeholder="Select Job Type"
                
                showSearch
               allowClear
               options={[
                {
                 label:"Full Time",
                 value:"Full Time"
               },
               {
                label:"Contract",
                value:"Contract"
              },{
                label:"Contract to Hire",
                value:"Contract to Hire"
              },
              {
                label:"Vendor Hiring",
                value:"Vendor Hiring"
              },

              ]}
                  onChange={handleJobtypeChange}
                 >
                
                </Select>
            </Form.Item>

            <Form.Item label="Experience" className='h_10 h_100_sm'    rules={[
    {
      required: true,
      message: "Please Select Experience!",
    },
  ]}
  hasFeedback
  validateStatus={
    form.getFieldError("exp_from") 
      ? "error"
      : ""
  }>
           <div className="d_f a_i_c experience g_10 f_w_w_sm g_5_sm">
                <Form.Item name="exp_from"  >
                  <Select options={options}
                     />
                </Form.Item>
                <Form.Item>to</Form.Item>
                <Form.Item name="exp_to">
                  <Select options={options} defaultValue={0}/>
                </Form.Item>
              </div>
           </Form.Item>

         
         
        </div>
        <div
         className='col_4 g_20'>
              <Form.Item label="Work Location" name="job_location"
       rules={[
        {
          required: true,
          message: "Please Select Work Location!",
        },
      ]}>
                  <Select
                  
                  placeholder="Select Location"
                  showSearch
                  allowClear
                  optionFilterProp="children"
 filterOption={(input, option) =>
 (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
 }
 filterSort={(optionA, optionB) =>
 (optionA?.label ?? "")
 .toLowerCase()
 .localeCompare((optionB?.label ?? "").toLowerCase())
 }
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={locationsdata}
                />
              </Form.Item>
            <Form.Item label="Budget" name="salary"
                 
                 rules={[
                  {
                    required: true,
                    message: "Please Enter Client Budget!",
                  },
                ]}
                getValueFromEvent={(e) => {
                   console.log("ffff",e)
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
                }}
                >
              {jobType == "Full Time" ? (
                    <Input
                    addonAfter={
                      <p className="m_10">LPA</p>
                        
                   
                    }
                    
                    placeholder="1,00,000"  />
                  ) : (
                    <Input
                    
                      className='salary'
                      placeholder={salaryType=="Per Hour"? "1,000":"1,00,000"}
                      addonAfter={
                        <Select
                         defaultValue={salaryType}
                          style={{ width: 100 }}
                           onChange={handleChangeSalary}
                        >
                          <Option value="Monthly">Monthly</Option>
                          <Option value="Per Hour">Hourly</Option>
                        </Select>
                      }
                    />
                  )}
                </Form.Item>
                  {/* <Form.Item label="Joining Availability" name="joing_avaliability">
                <Select placeholder="Select Joining Availability"
                 allowClear
                  showSearch
                 optionFilterProp="children"
                 filterOption={(input, option) =>
                 (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
                 }
                 filterSort={(optionA, optionB) =>
                 (optionA?.label ?? "")
                 .toLowerCase()
                 .localeCompare((optionB?.label ?? "").toLowerCase())
                 }
                
                >
                  <Option value="Immediately" label="Immediately">
                    <Space>Immediate</Space>
                  </Option>
                  <Option value="Less Then 15 Days" label="Less Then 15 Days">
                    <Space>Less Then 15 Days</Space>
                  </Option>
                  <Option value="Less Then 30 Days" label="Less Then 30 Days">
                    <Space>Less Then 30 Days</Space>
                  </Option>
                  <Option value="More Then 30 Days" label="More Then 30 Days">
                    <Space>Custom</Space>
                  </Option>
                </Select>
              </Form.Item> */}


         
         
         
        </div>
        <div className='d_f j_c_f_e g_10 '
          
          >
            <button type="button" className='btn btn-danger btn-sm' onClick={handleopenDrawerJob}>
              Cancel
            </button>
            <button
            className='btn btn-primary btn-sm'
            
              type="submit"
              
            >
              Add Job Description
            </button>
          </div>
        	
           </>
    )
 }

  export default BasicJobAdd