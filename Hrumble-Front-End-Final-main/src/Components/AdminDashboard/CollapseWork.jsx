import { Button, Form, Input, Upload, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, CloudUploadOutlined} from '@ant-design/icons';
import { BASE } from '../../Utils/api'

const CollapseWork = () => {

  const {editPersonal,Loading,addbuttonEmply,personalEmp,employeeComplete,editTimeline,employeeLogindata}=useContext(EmployeeContext)

  let [form] = Form.useForm();

  console.log("aadharData",employeeComplete?.experience)

  const[ExperienceUpload,setExperUpload]=useState("");
  const[OfferUpload,setOfferUpload]=useState("");
  const[SeperationUpload,setSeperationUpload]=useState("");
  const[Payslip1Upload,setPayslip1Upload]=useState("");
  const[Payslip2Upload,setPayslip2Upload]=useState("");
  const[Payslip3Upload,setPayslip3Upload]=useState("");
  const[HikeUpload,setHikeUpload]=useState("");


  let experienceFile = [
    {
      uid: "1",
      name: editTimeline?.experience_letter,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${editTimeline?.experience_letter}`, // Set the URL of the default file
    }
  ]; 

  let offerFile = [
    {
      uid: "2",
      name: editTimeline?.offer_letter,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${editTimeline?.offer_letter}`, // Set the URL of the default file
        }
  ];

  let separationFile = [
    {
      uid: "3",
      name: editTimeline?.seperation_letter,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${editTimeline?.seperation_letter}`, // Set the URL of the default file
        }
  ];

  let payslip1File = [
    {
      uid: "4",
      name: editTimeline?.pay_slip_01,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${editTimeline?.pay_slip_01}`, // Set the URL of the default file
        }
  ];

  let payslip2File = [
    {
      uid: "5",
      name: editTimeline?.pay_slip_02,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${editTimeline?.pay_slip_02}`, // Set the URL of the default file
        }
  ];

  let payslip3File = [
    {
      uid: "2",
      name: editTimeline?.pay_slip_03,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${editTimeline?.pay_slip_03}`, // Set the URL of the default file
        }
  ];

  let hikeFile = [
    {
      uid: "2",
      name: editTimeline?.hike_letter,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${editTimeline?.hike_letter}`, // Set the URL of the default file
        }
  ];

  const props = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: experienceFile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setExperUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setExperUpload (info.file.originFileObj);
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
    defaultFileList: offerFile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setOfferUpload(info.file.originFileObj)
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

  const props2 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: separationFile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setSeperationUpload(info.file.originFileObj)
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

  const props3 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: payslip1File,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPayslip1Upload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPayslip1Upload (info.file.originFileObj);
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
    defaultFileList: payslip2File,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPayslip2Upload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPayslip2Upload (info.file.originFileObj);
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
    defaultFileList: payslip3File,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPayslip3Upload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPayslip3Upload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props6 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: hikeFile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setHikeUpload(info.file.originFileObj)
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

  const onFinish = (Values) => {

  var formdata = new FormData();

    ExperienceUpload && formdata.append("experience_letter",ExperienceUpload)
    OfferUpload && formdata.append("offer_letter",OfferUpload)
    SeperationUpload && formdata.append("seperation_letter",SeperationUpload)
    Payslip1Upload && formdata.append("pay_slip_01",Payslip1Upload)
    Payslip2Upload && formdata.append("pay_slip_02",Payslip2Upload)
    Payslip3Upload && formdata.append("pay_slip_03",Payslip3Upload)
    HikeUpload && formdata.append("hike_letter",HikeUpload)


    console.log("formValues",formdata)
    editPersonal(formdata,employeeComplete?.basic?._id)
  }

  useEffect(() => {
    form.setFieldsValue(employeeComplete?.experience?.[0])
  },[employeeComplete?.experience])


  return (
    <div>
    <Form layout='vertical' onFinish={onFinish}>
    <label>Edit</label>  
    <div className='d_f'>
            <label >Experience Certificate :</label>
            <Upload {...props} >
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
        
       </div>
       <div className='d_f'>
            <label >Offer Letter :</label>
            <Upload {...props1} >
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
        </div>
    <div className='d_f g_20'>
      <Form.Item label="Experience Certificate :" name="experience_letter">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="experience_letter">
            <Upload {...props}>
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>
     <div className='d_f g_20'>
      <Form.Item label="Offer Letter :" name="offer_letter">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="offer_letter">
            <Upload {...props1}>
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>
     <div className='d_f g_20'>
      <Form.Item label="Seperation Letter :" name="seperation_letter">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="seperation_letter">
            <Upload {...props2}>
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>
     <div className='d_f g_20'>
      <Form.Item label="PaySlip 1 :" name="pay_slip_01">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="pay_slip_01">
            <Upload {...props3}>
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>

     <div className='d_f g_20'>
      <Form.Item label="PaySlip 2 :" name="pay_slip_02">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="pay_slip_02">
            <Upload {...props4}>
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>

     <div className='d_f g_20'>
      <Form.Item label="PaySlip 3 :" name="pay_slip_03">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="pay_slip_03">
            <Upload {...props5}>
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>

     <div className='d_f g_20'>
      <Form.Item label="Hike Letter :" name="hike_letter">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="hike_letter">
            <Upload {...props6}>
          <>
          
          {!ExperienceUpload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>

     <div className='d_f j_c_c'>
      <Button type='primary' htmlType='submit'>Sumbit</Button>
     </div>

        </Form>
    </div>
  )
}

export default CollapseWork
