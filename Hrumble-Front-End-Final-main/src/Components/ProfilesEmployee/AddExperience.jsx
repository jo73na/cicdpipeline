import { Button, Checkbox, DatePicker, Form, Input, Radio, Upload, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs';
import { BASE } from '../../Utils/api'
import CookieUtil from '../../Utils/Cookies';
import { useParams } from 'react-router-dom';

const AddExperience = () => {

    const {experinceData,addExper,addbuttonEmply,fetchExper} = useContext(EmployeeContext)

    console.log("experinceData",experinceData)

      const dateFormat = 'YYYY/MM/DD';

    const [form] = Form.useForm();

    const[offerupload,setOfferUpload]=useState("")
    const[seperationupload,setSeperationUpload]=useState("")
    const[payslip1upload,setPaySlip1Upload]=useState("")
    const[payslip2upload,setPaySlip2Upload]=useState("")
    const[payslip3upload,setPaySlip3Upload]=useState("")
    const[hikeupload,setHikeUpload]=useState("")

  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [fileList4, setFileList4] = useState([]);
  const [fileList5, setFileList5] = useState([]);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isPaySlipChecked, setIsPaySlipChecked] = useState(false);

  const resumename = (data) => {
    const match = data?.match(/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);
  
    // Check if there is a match and extract the desired parts
    if (match) {
      const numericPart = match[1]; // "17024865174681702377542774"
      const alphanumericPart = match[2]; // "naukri_sowmyak[4y_11m].docx"
      
      console.log('Numeric Part:', numericPart);
      console.log('Alphanumeric Part:', alphanumericPart);
      
      // Return the alphanumeric part if needed
      return alphanumericPart;
    } else {
      console.log("No match found.");
      return null;
    }
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  }; 

  const handlePaySlipChange = (e) => {
    setIsPaySlipChecked(e.target.checked);
  }; 

  const getValidationRules = () => {
    return 
  };


  let offerfile = [
    {
      uid: "1",
      name: resumename(experinceData?.offer_letter),
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${experinceData?.offer_letter}`, // Set the URL of the default file
      // resumeName: resumename(experinceData?.offer_letter)
    },
  ]; 

  let seperationfile = [
    {
      uid: "2",
      name: experinceData?.seperation_letter,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${experinceData?.seperation_letter}`, // Set the URL of the default file
    },
  ]; 
 
  let payslip1file = [
    {
      uid: "3",
      name: experinceData?.pay_slip_01,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${experinceData?.pay_slip_01}`, // Set the URL of the default file
    },
  ]; 

  let payslip2file = [
    {
      uid: "4",
      name: experinceData?.pay_slip_02,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${experinceData?.pay_slip_02}`, // Set the URL of the default file
    },
  ]; 

  let payslip3file = [
    {
      uid: "5",
      name: experinceData?.pay_slip_03,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${experinceData?.pay_slip_03}`, // Set the URL of the default file
    },
  ]; 

  let hikefile = [
    {
      uid: "6",
      name: experinceData?.hike_letter,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${experinceData?.hike_letter}`, // Set the URL of the default file
    },
  ];

  let params = useParams(); 

  const onFinish = (Values) => {

    let formdata = new FormData()

    console.log("vvvvvvvv",Values["seperation_reason"]);
    formdata.append("jobType",Values["jobType"]);
    formdata.append("company_name",Values["company_name"]);
    formdata.append("designation",Values["designation"]);
    formdata.append("location",Values["location"]);
    formdata.append("joining_date",Values["joining_date"]);
    formdata.append("seperation_date",Values["seperation_date"]);
    offerupload && formdata.append("offer_letter",offerupload);
    seperationupload && formdata.append("seperation_letter",seperationupload);
    payslip1upload && formdata.append("pay_slip_01",payslip1upload);
    payslip2upload && formdata.append("pay_slip_02",payslip2upload);
    payslip3upload && formdata.append("pay_slip_03",payslip3upload);
    hikeupload && formdata.append("hike_letter",hikeupload);
    formdata.append("seperation_reason",Values["seperation_reason"]);
    formdata.append("payslip_reason",Values["payslip_reason"]);

    console.log("vallll",Values)

    let role = CookieUtil.get("role")

        let id = CookieUtil.get("admin_id")

        if(role=="Employee"){
          formdata.append("employee_id",id);
        }
        else{
          id=params?.id
          formdata.append("employee_id",params?.id);
        }
   
    addExper(formdata,id)

  }

  useEffect(() => {
    console.log("valllllll",experinceData)
  },[experinceData])


  const props = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: offerfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setOfferUpload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setOfferUpload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

    const props1 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: seperationfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setSeperationUpload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setSeperationUpload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props2 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: payslip1file,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPaySlip1Upload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPaySlip1Upload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

    const props3 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: payslip2file,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPaySlip2Upload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPaySlip2Upload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props4 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: payslip3file,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPaySlip3Upload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPaySlip3Upload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

    const props5 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: hikefile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setHikeUpload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setHikeUpload (info.file.originFileObj);
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
      const onChange1 = ({ fileList: newFileList1 }) => {
        setFileList1(newFileList1);
      };
      const onChange2 = ({ fileList: newFileList2 }) => {
        setFileList2(newFileList2);
      };
      const onChange3 = ({ fileList: newFileList3 }) => {
        setFileList3(newFileList3);
      };
      const onChange4 = ({ fileList: newFileList4 }) => {
        setFileList4(newFileList4);
      };
      const onChange5 = ({ fileList: newFileList5 }) => {
        setFileList5(newFileList5);
      };

  return (
    <div>
        <Form layout='vertical' onFinish={onFinish} form={form}>
            <div className='p_t_20'>
                <Form.Item label="Job Type" name="jobType"
                rules={[
                  {
                    required:true,
                    message:"Enter Job Type"
                  }
                ]}>
                    <Radio.Group>
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
                    <Input placeholder='Enter Company Name' />
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
                    <Input placeholder='Enter Designation' />
                </Form.Item>
                <Form.Item label="Location" name="location"
                rules={[
                  {
                    required:true,
                    message:"Enter Location"
                  }
                ]}>
                    <Input placeholder='Enter Location' />
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
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input placeholder='Offer Letter' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="offer_letter"
                rules={[
                    {
                        required:true,
                        message:"Missing Offer Letter"
                    }
                ]}>
                    <Upload {...props}
                >
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
        <Input placeholder='Separation Letter' disabled={true} />
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
    <Upload {...props1}>
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
                    <Input placeholder='PaySlip 1' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="pay_slip_01"
                >
                    <Upload {...props2} >
                  <>
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>

                </Form.Item>
            </div>
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input placeholder='PaySlip 2' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="pay_slip_02"
                >
                    <Upload {...props3} >
                  <>

                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>

                </Form.Item>
            </div>
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input placeholder='PaySlip 3' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="pay_slip_03"
                >
                    <Upload {...props4} >
                  <>
  
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>

                </Form.Item>
            </div>
      </div>
    }
            
            <div className='d_f f_w_w g_20'>
                <Form.Item>
                    <Input placeholder='Hike Letter' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="hike_letter"
                >
                    <Upload {...props5} >
                  <>
  
                   <label className='zive-personal-upload-label'> + Upload <span className='d_n_sm zive-personal-upload-supported'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   
                  </></Upload>

                </Form.Item>
            </div>
            <div className='col_1'>
            <Form.Item name="seperation_reason" onChange={handleCheckboxChange}>
                <Checkbox>Separation Letter</Checkbox>
                <Input placeholder='Reason if separation letter is not available' className='m_t_10' />
            </Form.Item>
            </div>
            <div className='col_1'>
            <Form.Item name="payslip_reason" onChange={handlePaySlipChange}>
                <Checkbox >PaySlip</Checkbox>
                <Input placeholder='Reason if PaySlip is not available' className='m_t_10' />
            </Form.Item>
            </div>
            <div className='zive-profile-button d_f g_20 j_c_c_sm'>
                <Button className='btn_cancel'>Cancel</Button>
                <Button className='btn' type='primary' htmlType='submit' loading={addbuttonEmply}>Save</Button>
            </div>
            
      </Form>
    </div>
  )
}

export default AddExperience
