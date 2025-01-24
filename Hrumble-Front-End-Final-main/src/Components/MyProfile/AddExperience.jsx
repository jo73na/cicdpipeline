import { Button, Checkbox, DatePicker, Form, Input, Radio, Upload, message, InputNumber } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs';
// import { BASE } from '../../Utils/api'
import CookieUtil from '../../Utils/Cookies';
import { useParams } from 'react-router-dom';
 
const BASE = import.meta.env.VITE_BASE;
 
const AddExperience = ({id, onClose}) => {
 
    const {experinceData,addExper,addbuttonEmply,fetchExper, employeeLogindata,fetchEmploy, editEmployee,FetchEmployeeTable, addExperience} = useContext(EmployeeContext)
 
    console.log("experinceData",experinceData)
      const dateFormat = 'YYYY/MM/DD';
 
    const [form] = Form.useForm();
    const [jobType, setJobType] = useState("Full Time"); 
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isPaySlipChecked, setIsPaySlipChecked] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
 
      useEffect(() => {
          FetchEmployeeTable();
        }, []);
 
        const handleUploadChange = (info, fileType) => {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            // Assuming the server responds with { message: '...', url: '...' }
            const filePath = info.file.response.url;
            setUploadedFiles(prevState => ({ ...prevState, [fileType]: filePath }));
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        };
        
      
        const generateUploadProps = (fileType, defaultFileList) => ({
          action: `${BASE}test`,
          name: 'file',
          multiple: false,
          defaultFileList,
          onChange: info => handleUploadChange(info, fileType),
        });
        
      
        const onFinish = async values => {
          const experience = {
            designation: values.designation,
            company: values.company_name,
            startDate: values.joining_date?.format('YYYY-MM-DD'),
            endDate: values.seperation_date?.format('YYYY-MM-DD'),
            jobType: values.jobType,
            location: values.location,
            offer_letter: uploadedFiles.offerLetter, // Ensure this matches the backend
            separation_letter: uploadedFiles.separationLetter, // Ensure this matches the backend
            description: values.description,
            hike_letter: uploadedFiles.hikeLtter,
            pay_slip_01: uploadedFiles.paySlip1,
            pay_slip_02:uploadedFiles.paySlip2,
            pay_slip_03:uploadedFiles.paySlip3,
            internship_certificate: uploadedFiles.internshipCertificate,
            stipend: values.stipend,
            separation_reason: isCheckboxChecked ? values.separation_reason : undefined,
            payslip_reason: isPaySlipChecked ? values.payslip_reason : undefined,
          };
        
          try {
            const formData = new FormData();
            Object.keys(experience).forEach(key => {
              if (experience[key]) {
                formData.append(`experience[${key}]`, experience[key]);
              }
            });

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }
            
        
            
            let employeeId = CookieUtil.get("admin_id") ;
            formData.append('employee_id', id || employeeId);
        
            await addExperience(formData, id || employeeId);
            onClose();
            message.success('Experience added successfully!');
          } catch (error) {
            message.error('Failed to add experience');
          }
        };
        
 
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };
 
  const handlePaySlipChange = (e) => {
    setIsPaySlipChecked(e.target.checked);
  };
  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };
 

  useEffect(() => {
    console.log("valllllll",experinceData)
  },[experinceData])

  return (
    <div>
        <Form layout='vertical' onFinish={onFinish} form={form}>
            <div className='p_t_20'>
            <Form.Item
          label="Job Type"
          name="jobType"
          rules={[{ required: true, message: "Please select a job type!" }]}
        >
          <Radio.Group onChange={handleJobTypeChange}>
            <Radio value="Full Time">Full Time</Radio>
            <Radio value="Part Time">Part Time</Radio>
            <Radio value="Internship">Internship</Radio>
          </Radio.Group>
        </Form.Item>
            </div>
            <div>
                <Form.Item label="Company Name" name="company_name"
                rules={[
                  {
                    required:true,
                    message:"Enter Company Name"
                  }
                ]}>
                    <Input  className="employeeForm"placeholder='Enter Company Name' />
                </Form.Item>
            </div>
            <div className='col_2 g_20'>
                <Form.Item label="Designation" name="designation"
                rules={[
                  {
                    required:true,
                    message:"Enter Designation"
                  }
                ]}>
                    <Input className = " employeeForm"placeholder='Enter Designation' />
                </Form.Item>
                <Form.Item label="Location" name="location"
                rules={[
                  {
                    required:true,
                    message:"Enter Location"
                  }
                ]}>
                    <Input className = " employeeForm" placeholder='Enter Location' />
                </Form.Item>
            </div>
            <div className='col_2 g_20'>
                <Form.Item label="Date of Joining" name="joining_date" rules={[
              {
                required:true,
                message:"Enter Joining Date"
              }
            ]}>
                    <DatePicker placeholder='Select Date' format={dateFormat} />
                </Form.Item>
                <Form.Item label="Date of Separation" name="seperation_date"
                rules={[
                  {
                    required:true,
                    message:"Enter Seperation Date"
                  }
                ]}>
                    <DatePicker placeholder='Select Date' format={dateFormat} />
                </Form.Item>
            </div>
                        {/* Internship Specific Fields */}
        {jobType === "Internship" && (
          <>
          <div className='col_2 g_20'>
          <Form.Item
  label="Stipend"
  name="stipend"
  rules={[
    {
      required: true,
      message: "Stipend amount is required!",
    },
    {
      pattern: /^[1-9][0-9]{0,6}$/,
      message: "Enter a valid stipend amount (1-7 digits, no leading zeros).",
    },
  ]}
>
  <InputNumber
    className="employeeForm"
    placeholder="Enter Stipend Amount"
    maxLength={9} // Prevent typing beyond 7 digits
    formatter={(value) =>
      value
        ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Add commas for thousands
        : ""
    }
    parser={(value) => value.replace(/₹\s?|,/g, "")} // Strip formatting for backend
    min={1} // Ensure the number entered is positive
    max={99999999} // Limit to a maximum of 7 digits
    style={{ width: "55%" }} // Consistent input width
  />
</Form.Item>



            <Form.Item
              label="Internship Certificate"
              name="internship_certificate"
              className = " employeeForm"
              placeholder =" Internship Certificate"
              rules={[{ required: false, message: "Upload internship certificate!" }]}
            >
              <Upload {...generateUploadProps("internshipCertificate")}>
                <label className='employeeForm'>
                  + Upload <span>(Supported format .PDF, .PNG, .JPG)</span>
                </label>
              </Upload>
            </Form.Item>
            </div>
          </>
        )}

          {jobType !== 'Internship'&& (
            <>
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input className = " employeeForm" placeholder='Offer Letter' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="offer_letter"
                rules={[
                    {
                        required:true,
                        message:"Missing Offer Letter"
                    }
                ]}>
                    <Upload {...generateUploadProps('offerLetter', [])}>
                  <>
                 
                   
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                 
                   
                  </></Upload>
 
                </Form.Item>
            </div>
            <div className='d_f f_w_w g_20'>
     
      {
      isCheckboxChecked ? <div>
      </div>
 
     :
 
    <div className='d_f f_w_w g_20'>
      <div>
      <Form.Item>
        <Input className = " employeeForm" placeholder='Separation Letter' disabled={true} />
      </Form.Item>
      </div>
      <div>
      <Form.Item
      label=""
      name="separation_letter"
      rules={[
        {
          required:true,
          message:"Missing Seperation letter"
        }
      ]}
    >
     <Upload {...generateUploadProps('separationLetter', [])}>
      <>
        <label className='zive-personal-upload-label'>
          + Upload
          <span className='d_n_sm zive-personal-upload-supported'>
            (Supported format .PDF, .PNG, .JPG)
          </span>
        </label>
      </>
    </Upload>
    </Form.Item>
    </div>
     </div>
      }
    </div>
 
    {
      isPaySlipChecked ? <div> </div>
 
      :
 
      <div>
        <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input className = " employeeForm" placeholder='PaySlip 1' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="pay_slip_01"
                >
                    <Upload {...generateUploadProps('paySlip1', [])}>
                  <>
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>
 
                </Form.Item>
            </div>
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input className = " employeeForm" placeholder='PaySlip 2' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="pay_slip_02"
                >
                   <Upload {...generateUploadProps('paySlip2', [])}>
                  <>
 
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>
 
                </Form.Item>
            </div>
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input className = " employeeForm" placeholder='PaySlip 3' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="pay_slip_03"
                >
                   <Upload {...generateUploadProps('paySlip3', [])}>
                  <>
 
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>
 
                </Form.Item>
            </div>
      </div>
    }
           
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input className = " employeeForm" placeholder='Hike Letter' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="hike_letter"
                >
                    <Upload {...generateUploadProps('hikeLtter', [])}>
                  <>
 
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>
 
                </Form.Item>
            </div>
            <div className='col_1'>
    <Form.Item>
        <Checkbox onChange={e => setIsCheckboxChecked(e.target.checked)} checked={isCheckboxChecked}>
            Separation Letter
        </Checkbox>
    </Form.Item>
    <Form.Item name="separation_reason" label="Reason if separation letter is not available">
        <Input
            className="employeeForm"
            placeholder='Enter reason'
            disabled={!isCheckboxChecked} // Disable the field if the checkbox is unchecked
        />
    </Form.Item>
</div>
<div className='col_1'>
    <Form.Item>
        <Checkbox onChange={e => setIsPaySlipChecked(e.target.checked)} checked={isPaySlipChecked}>
            PaySlip
        </Checkbox>
    </Form.Item>
    <Form.Item name="payslip_reason" label="Reason if PaySlip is not available">
        <Input
            className="employeeForm"
            placeholder='Enter reason'
            disabled={!isPaySlipChecked} // Disable the field if the checkbox is unchecked
        />
    </Form.Item>
</div>

            </>
          )
}
            <div className='zive-profile-button d_f g_20 j_c_c_sm'>
                <Button className='btn_cancel'   onClick={() => {
    form.resetFields(); // Resets all form fields to their initial values
    onClose(); // Executes the existing onClose function to close the form/modal
  }} >Cancel</Button>
                <Button className='btn' type='primary' htmlType='submit' loading={addbuttonEmply}>Save</Button>
            </div>
           
      </Form>
    </div>
  )
}
 
export default AddExperience