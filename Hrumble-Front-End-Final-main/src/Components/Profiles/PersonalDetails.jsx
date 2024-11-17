import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Space, Upload, message } from 'antd'
import { Option } from 'antd/es/mentions'
import Dragger from 'antd/es/upload/Dragger'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import EmployeeContext from '../../Providers/EmployeeProvider';

const PersonalDetails = () => {

  const {personalDet,editEmployee,addbuttonEmply,openaddEmply,setOpenaddEmply,setAddButton,employeeLogindata}=useContext(EmployeeContext)
  console.log("personalDet",employeeLogindata)
  
  const [form] = Form.useForm();

  const[upload,setUpload]=useState("")
  const[upload1,setUpload1]=useState("")
  const[upload2,setUpload2]=useState("")
  const[upload3,setUpload3]=useState("")
  const[upload4,setUpload4]=useState("")



  const onFinish = (Values) => {
  var formdata = new FormData();
    
  formdata.append("edittype",Values["personal"]);
  formdata.append("employee_id", Values["employee_id"]||"");
  formdata.append("firstname", Values["firstname"]);
  formdata.append("lastname", Values["lastname"]);
  formdata.append("mobile",Values["mobile"]);
  formdata.append("email",Values["email"]);
  formdata.append("dob",Values["dob"]);
  formdata.append("gender",Values["gender"]);
  formdata.append("blood_group",Values["blood_group"]);
  formdata.append("marital_status",Values["marital_status"]);
  formdata.append("display_profile_file",upload)
  formdata.append("aadhar_file",upload1)
  formdata.append("pan_file",upload2)


  

  let emergencyContacts = Values["emergencyContacts"];  

  emergencyContacts.forEach((item, index) => {
          for (const key in item) {
            formdata.append(`emergencyContacts[${index}][${key}]`, item[key]);
          }
        });

   let familyDetails = Values["familyDetails"];  

        familyDetails.forEach((item, index) => {
          for (const key in item) {
            formdata.append(`familyDetails[${index}][${key}]`, item[key]);
          }
        });

  console.log("fff",formdata)
  editEmployee(formdata)
  }

  // file upload function starts here

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

  const props2 = {
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
          setUpload1 (info.file.originFileObj)
      }
      if (status === "done") {
        

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload1 (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props3 = {
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
          setUpload2 (info.file.originFileObj)
      }
      if (status === "done") {
        

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload2 (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props4 = {
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
          setUpload3 (info.file.originFileObj)
      }
      if (status === "done") {
        

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload3 (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props5 = {
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
          setUpload4 (info.file.originFileObj)
      }
      if (status === "done") {
        

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload4 (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  var formdata = new FormData();

  // file upload function ends here
  
  useEffect (() => {
     form.setFieldsValue(employeeLogindata?.basic)
  },[employeeLogindata])

  return (
    <div className='p_10'>
      <Form layout='vertical' onFinish={onFinish} form={form}>
        <label className='card_header'>Basic Info</label>
        <p className='zive-onboarding-para'>Add your basic information here.</p>
        <div className='col_5 col_1_sm p_t_15'>
        <Form.Item label="Employee ID" name="employee_id">
            <Input placeholder='001' />
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_1_sm g_5_sm'>
            <Form.Item label="First Name" name="firstname">
                <Input />
            </Form.Item>
            <Form.Item label="Last Name" name="lastname">
                <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="mobile">
                <Input />
            </Form.Item>
        </div>
        <div className='col_4 g_20 col_1_sm g_5_sm'>
            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>
            <Form.Item label="DOB" name="dob">
                <Input />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
                <Radio.Group>
                    <Radio value={1}>Male</Radio>
                    <Radio value={2}>Female</Radio>
                </Radio.Group>
            </Form.Item>
        </div>
        <div className='col_4 g_20 col_1_sm g_5_sm'>
            <Form.Item label="Blood Group" name="blood_group">
                <Input />
            </Form.Item>
            <Form.Item label="Maritial Status" name="marital_status">
                <Radio.Group>
                    <Radio value={1}>Married</Radio>
                    <Radio value={2}>Unmarried</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item> </Form.Item>
        </div>
        <div className='col_4 col_1_sm g_5_sm'>
        <Form.Item label="Profile Picture" name="display_profile_file"
        rules={[
            {
              required: true,
              message: 'Please Upload Resume!',
            },
          ]}
        >
        <Dragger className='d_f f_w_w' {...props}>
            <UploadOutlined className='zive-project-uploadicon'/>
            <p className="ant-upload-text">Drag Your file here or <span className="browse">Browse</span></p>
            <p className="ant-upload-hint">
                Support format .PDF,.PNG,.JPG
            </p>
        </Dragger>
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="Aadhar Number" name="aadhar_num">
            <Input placeholder='Enter Aadhar Number' />
        </Form.Item>
        <Form.Item label=" ">
        <Upload className='zive-personalDetails-upload' name='aadhar_file' {...props2}>
            + Upload <span className='zive-personalDetails-support d_n_sm '>(Supported format .PDF, .PNG, .JPG) </span>
        </Upload>
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="Pan Number" name="pan_num">
            <Input placeholder='Enter Pan Number' />
        </Form.Item>
        <Form.Item label=" ">
        <Upload className='zive-personalDetails-upload' name='pan_file' {...props3}>
            + Upload <span className='zive-personalDetails-support d_n_sm'>(Supported format .PDF, .PNG, .JPG) </span>
        </Upload>
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="ESIC Number" name="esic_num">
            <Input placeholder='Enter ESIC Number' />
        </Form.Item>
        <Form.Item label=" ">
        <Upload className='zive-personalDetails-upload'>
            + Upload <span className='zive-personalDetails-support d_n_sm'>(Supported format .PDF, .PNG, .JPG) </span>
        </Upload>
        </Form.Item>
        </div>
        <div className='col_4 g_20 col_2_md col_2_sm g_5_sm'>
        <Form.Item label="UAN Number" name="uan_num">
            <Input placeholder='Enter UAN Number' />
        </Form.Item>
        <Form.Item label=" ">
        <Upload className='zive-personalDetails-upload'>
            + Upload <span className='zive-personalDetails-support d_n_sm'>(Supported format .PDF, .PNG, .JPG) </span>
        </Upload>
        </Form.Item>
        </div>

        <hr className='zive-hr-line' />

        <div className='p_t_15'>
            <label className='card_header'>Contact Info</label>
            <p className='zive-onboarding-para d_f f_w_w'>Add your address,emergency contact & family info here.</p>
            <div className='col_2 p_t_15'>
                <label className='zive-personalDetails-addressH'>Present Address</label>
                <label className='zive-personalDetails-addressH'>Permanent Address <Checkbox className='zive-personalDetails-addressCh'>Check if both the address are same</Checkbox></label>
            </div>
            <div className='col_2 g_20 p_t_15 col_1_sm g_5_sm'>
            <Form.Item label="Add Address Line 1" name="present_addr" className='zive-onboarding-addressIn'>
                <Input placeholder='Door No, Apartment, Building, Floor etc.'/>
            </Form.Item>
            <Form.Item label="Add Address Line 2" name="permanent_addr" className='zive-onboarding-addressIn'>
                <Input placeholder='Door No, Apartment, Building, Floor etc.' />
            </Form.Item>
            </div>
            <div className='col_4 g_20 col_1_sm g_5_sm'>
                <Form.Item label="Country" name="present_country">
                    <Select>
                        <Option>India</Option>
                        <Option>US</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="State/Province" name="present_state">
                    <Select>
                        <Option>TamilNadu</Option>
                        <Option>Mumbai</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className='col_4 g_20 col_1_sm g_5_sm'>
                <Form.Item label="City" name="present_district">
                    <Select>
                        <Option>Chennai</Option>
                        <Option>Bangalore</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Zip/Postal Code" name="present_zipcode">
                    <Select>
                        <Option>600018</Option>
                        <Option>641015</Option>
                    </Select>
                </Form.Item>
            </div>
        </div>
        
        <hr className='zive-hr-line' />

        <div className='p_t_15'>
            <label className='card_header'>Emergency Contact</label>
            <p className='zive-onboarding-para'>Add your address,emergency contact & family info here.</p>
        </div>

        <div className="col_1 p_t_20 col_1_sm">

            <Form.List name="emergencyContacts" label="Contact">
    {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Space
          
          key={key}
        >
          <div className='d_f f_w_w g_80 g_5_sm'>
          <Form.Item
            {...restField}
            label="Relationship"
            name={[name, 'relationship']}
            rules={[
              {
                required: true,
                message: 'Missing  name',
              },
            ]}
          >
            <Input placeholder=" Relationship" />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Name"
            name={[name, 'name']}
           
          >
            <Input placeholder='Enter Name' />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Phone Number"
            name={[name, 'phone_no']}
           
          >
            <Input placeholder='Enter Number'  />
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
          </div>
        </Space>
      ))}
      <Form.Item>
       <div className="col_3">
       <Button className="btn_cancel w_40_p" type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
           Add Emergency Contact
        </Button>
       </div>
      </Form.Item>
    </>
  )}
</Form.List>
        </div>

      <hr className='zive-hr-line' />

      <div>
        <div className='p_t_15'>
          <label className='card_header'>Family Details</label>
          <p className='zive-onboarding-para'>Add your address,emergency contact & family info here.</p>
        </div>
        <div className="col_1 p_t_20 col_1_sm">

            <Form.List name="familyDetails" label="Contact">
    {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Space
          
          key={key}
        >
          <div className='d_f f_w_w g_80 g_5_sm'>
          <Form.Item
            {...restField}
            label="Relationship"
            name={[name, 'relationship']}
            rules={[
              {
                required: true,
                message: 'Missing  name',
              },
            ]}
          >
            <Input placeholder=" Relationship" />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Name"
            name={[name, 'name']}
           
          >
            <Input placeholder='Enter Name'  />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Occupation"
            name={[name, 'occupation']}
            
          >
            <Input placeholder="Enter Occupation" />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Phone Number"
            name={[name, 'phone_no']}
           
          >
            <Input placeholder='Enter Number' />
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
          </div>
        </Space>
      ))}
      <Form.Item>
       <div className="col_3">
       <Button className="btn_cancel w_40_p" type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
           Add Family Details
        </Button>
       </div>
      </Form.Item>
    </>
  )}
  </Form.List>
        </div>
      </div>
      <div className='zive-profile-button j_c_c_sm'>
        <Button className='btn' type='primary' htmlType='submit' loading={addbuttonEmply}>Save & Next</Button>
      </div>
      </Form>
    </div>
  )
}

export default PersonalDetails