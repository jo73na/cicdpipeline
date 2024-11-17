import { Button, Form, Input, Upload, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, CloudUploadOutlined} from '@ant-design/icons';
import { BASE } from '../../Utils/api'

const CollapseBGV = () => {

  const {editPersonal,Loading,addbuttonEmply,employeeComplete,fetchPersonalDetail,defaultfilelist,employeeLogindata}=useContext(EmployeeContext)

  const[Authorizationupload,setAuthorizationUpload]=useState("")
  const[Verificationupload,setVerificationUpload]=useState("");

  let Authorizationfile = [
    {
      uid: "2",
      name: employeeComplete?.basic?.verification_form,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.verification_form}`, // Set the URL of the default file
        }
  ]; 

  let VerificationFile = [
    {
      uid: "2",
      name: employeeComplete?.basic?.authorization_form,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${employeeComplete?.basic?.authorization_form}`, // Set the URL of the default file
        }
  ];

  const props1 = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: Authorizationfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setAuthorizationUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setAuthorizationUpload (info.file.originFileObj);
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
    defaultFileList: VerificationFile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setVerificationUpload(info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setVerificationUpload (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  let [form] = Form.useForm();

  const onFinish = (Values) => {

    var formdata = new FormData();
  
    Authorizationupload && formdata.append("verification_form",Authorizationupload)
    Verificationupload && formdata.append("authorization_form",Verificationupload)
  
  
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
      <Form.Item label="Verification Form :" name="verification_form">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="aadhar_file">
            <Upload {...props1}>
          <>
          
          {!Verificationupload && (
          <label className='profileInfo-upload-new'><CloudUploadOutlined /> <span className='profileInfo-upload-text'> UPLOAD FILE</span> </label>
          )}
          </></Upload>
      </Form.Item>
     </div>
     <div className='d_f g_20'>
      <Form.Item label="Authorization Form :" name="authorization_form">
            {/* <Input placeholder='Enter Aadhar Number' /> */}
      </Form.Item>
      <Form.Item label="" name="aadhar_file">
            <Upload {...props2}>
          <>
          
          {!Authorizationupload && (
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

export default CollapseBGV
