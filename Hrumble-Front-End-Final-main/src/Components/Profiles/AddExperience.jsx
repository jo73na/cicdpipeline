import { DatePicker, Form, Input, Radio, Upload, message } from 'antd'
import React, { useState } from 'react'

const AddExperience = () => {

  const [upload,setUpload]= useState("");
  const [fileList, setFileList] = useState([]);


    const props = {
        name: "file",
        multiple: false,
        action: "https://apiv1.technoladders.com/test",
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setUpload (info.file.originFileObj)
          }
          if (status === "done") {
            
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setUpload (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };
    
    
      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };

  return (
    <div>
        <Form layout='vertical'>
            <div className='p_t_20'>
                <Form.Item label="Job Type" name="job_type">
                    <Radio.Group>
                        <Radio value={1}>Full Time</Radio>
                        <Radio value={2}>Part Time</Radio>
                        <Radio value={3}>Internship</Radio>
                    </Radio.Group>
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Company Name" name="company_name">
                    <Input placeholder='Enter Company Name' />
                </Form.Item>
            </div>
            <div className='col_2 g_20'>
                <Form.Item label="Designation" name="designation">
                    <Input placeholder='Enter Designation' />
                </Form.Item>
                <Form.Item label="Location" name="location">
                    <Input placeholder='Enter Location' />
                </Form.Item>
            </div>
            <div className='col_2 g_20'>
                <Form.Item label="Date of Joining" name="date_of_joining">
                    <DatePicker placeholder='Select Date' />
                </Form.Item>
                <Form.Item label="Date of Separation" name="date_of_separation">
                    <DatePicker placeholder='Select Date' />
                </Form.Item>
            </div>
            <div className='col_3'>
                <Form.Item>
                    <Input placeholder='Offer Letter' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="offer_letter"
                rules={[
                    {
                        required:true
                    }
                ]}>
                    <Upload {...props}
                fileList={fileList}
                onChange={onChange}
                >
                  <>
                  {
                    fileList.length < 1 && 
                   <label> + Upload <span className='d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  }
                   
                  </></Upload>

                </Form.Item>
            </div>
            <div className='col_3'>
                <Form.Item>
                    <Input placeholder='Separation Letter' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="separation_letter"
                rules={[
                    {
                        required:true
                    }
                ]}>
                    <Upload {...props}
                fileList={fileList}
                onChange={onChange}
                >
                  <>
                  {
                    fileList.length < 1 && 
                   <label> + Upload <span className='d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  }
                   
                  </></Upload>

                </Form.Item>
            </div>
            <div className='col_3'>
                <Form.Item>
                    <Input placeholder='PaySlip 1' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="payslip1"
                rules={[
                    {
                        required:true
                    }
                ]}>
                    <Upload {...props}
                fileList={fileList}
                onChange={onChange}
                >
                  <>
                  {
                    fileList.length < 1 && 
                   <label> + Upload <span className='d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  }
                   
                  </></Upload>

                </Form.Item>
            </div>
            
      </Form>
    </div>
  )
}

export default AddExperience
