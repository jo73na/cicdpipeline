import { Button, Form, Input, Upload, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, CloudUploadOutlined} from '@ant-design/icons';
import { BASE } from '../../Utils/api'

const CollapseEducation = () => {

  const {editPersonal,Loading,employeeComplete,personalEmp,fetchPersonalDetail,defaultfilelist,employeeLogindata}=useContext(EmployeeContext)

  let [form] = Form.useForm();

  console.log("aadharData",employeeComplete)

  const[Slcupload,setSlcUpload]=useState("");
  const[Hscupload,setPanUpload]=useState("");
  const[Degreeupload,setDegreeUpload]=useState("");

  let slcFile = [
    {
      uid: "2",
      name: employeeComplete?.education?.ssc_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.education?.ssc_file}`, // Set the URL of the default file
        }
  ]; 

  let hscFile = [
    {
      uid: "2",
      name: employeeComplete?.education?.hsc_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.hsc_file}`, // Set the URL of the default file
        }
  ];

  let degreeFile = [
    {
      uid: "2",
      name: employeeComplete?.education?.degree_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.degree_file}`, // Set the URL of the default file
        }
  ];

  const props = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: slcFile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setSlcUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setSlcUpload (info.file.originFileObj);
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
    defaultFileList: hscFile,
  
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
    defaultFileList: degreeFile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setDegreeUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setDegreeUpload (info.file.originFileObj);
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
      Slcupload && formdata.append("ssc_file",Slcupload)
      Hscupload && formdata.append("hsc_file",Hscupload)
      Degreeupload && formdata.append("degree_file",Degreeupload)
  
  
      console.log("formValues",formdata)
      editPersonal(formdata,employeeComplete?.basic?._id)
    }
  
    useEffect(() => {
      form.setFieldsValue(employeeComplete?.education)
    },[employeeComplete?.education])


  return (
    <div>
    <Form layout='vertical' onFinish={onFinish}>
    <label>Edit</label>  
    <div className='d_f g_20'>
      <Form.Item label="SSLC Certificate :" name="ssc_file">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="ssc_file">
            <Upload {...props}>
          <>
          
          {!Slcupload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>
     <div className='d_f g_20'>
      <Form.Item label="HSC Certificate :" name="hsc_file">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="hsc_file">
            <Upload {...props1}>
          <>
          
          {!Slcupload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>

     <div className='d_f g_20'>
      <Form.Item label="Degree Certificate :" name="degree_file">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="degree_file">
            <Upload {...props2}>
          <>
          
          {!Slcupload && (
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

export default CollapseEducation
