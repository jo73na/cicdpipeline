import { Button, Form, Input, Upload, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, CloudUploadOutlined} from '@ant-design/icons';
import { BASE } from '../../Utils/api'

const CollapsePersonal = () => {

  const {editPersonal,Loading,addbuttonEmply,employeeCompleteFetch,employeeComplete,personalEmp}=useContext(EmployeeContext)

  let [form] = Form.useForm();

  console.log("aadharData",employeeComplete)

  const[Aadharupload,setAadharUpload]=useState("");
  const[Panupload,setPanUpload]=useState("");
  const[Esicupload,setEsicUpload]=useState("");
  const[Uanupload,setUanUpload]=useState("");


  let aadharfile = [
    {
      uid: "2",
      name: employeeComplete?.basic?.aadhar_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.aadhar_file}`, // Set the URL of the default file
        }
  ]; 

  let panfile = [
    {
      uid: "2",
      name: employeeComplete?.basic?.pan_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.pan_file}`, // Set the URL of the default file
        }
  ];

  let esicfile = [
    {
      uid: "2",
      name: employeeComplete?.basic?.esic_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.esic_file}`, // Set the URL of the default file
        }
  ];

  let uanfile = [
    {
      uid: "2",
      name: employeeComplete?.basic?.uan_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.uan_file}`, // Set the URL of the default file
        }
  ];

  const props = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: aadharfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setAadharUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setAadharUpload (info.file.originFileObj);
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
    defaultFileList: panfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setPanUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setPanUpload (info.file.originFileObj);
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
    defaultFileList: esicfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setEsicUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setEsicUpload (info.file.originFileObj);
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
    defaultFileList: uanfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setUanUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUanUpload (info.file.originFileObj);
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

    formdata.append("aadhar_num",Values["aadhar_num"])
    Aadharupload && formdata.append("aadhar_file",Aadharupload)
    Panupload && formdata.append("pan_file",Panupload)
    Esicupload && formdata.append("esic_file",Esicupload)
    Uanupload && formdata.append("uan_file",Uanupload) 


    console.log("formValues",formdata)
    editPersonal(formdata,employeeComplete?.basic?._id)
  }

  useEffect(() => {
    form.setFieldsValue(employeeComplete?.basic)
  },[employeeComplete?.basic])

  return (
    <div>
    <Form layout='vertical' onFinish={onFinish} form={form}>
    <label>Edit</label>  
    <div className='d_f g_20'>
      <Form.Item label="Aadhar Card :" name="aadhar_file">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="aadhar_file">
            <Upload {...props}>
          <>
          
          {!Aadharupload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>
     <div className='d_f g_20'>
      <Form.Item label="Pan Card :" name="pan_file">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="pan_file">
            <Upload {...props1}>
          <>
          
          {!Aadharupload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>

     <div className='d_f g_20'>
      <Form.Item label="ESIC Card :" name="esic_file">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="esic_file">
            <Upload {...props2}>
          <>
          
          {!Aadharupload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>

     <div className='d_f g_20'> 
      <Form.Item label="Uan Card :" name="uan_file">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="uan_file">
            <Upload {...props3}>
          <>
          
          {!Aadharupload && (
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

export default CollapsePersonal
