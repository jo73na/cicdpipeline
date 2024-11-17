import React, { useContext, useEffect, useState } from 'react'
import Doc from "/images/Document.svg"
import { Button, Form, Input, Upload, message } from 'antd'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { BASE } from '../../Utils/api'
import { useParams } from 'react-router-dom'
import Loader from '../../Utils/Loader'
import CookieUtil from '../../Utils/Cookies'

const Documents = ({handlePrev,goSteps,setGoSteps}) => {

  const {editPersonal,employeeLogindata,addbuttonEmply,fetchDocuments,Loading,documentsEmp} = useContext(EmployeeContext)

  console.log("documents",documentsEmp)

  const [verifiupload,setVerifiUpload]= useState("");
  const [authorupload,setAuthorUpload]= useState("");

  let params = useParams();

  let verificationfile = [
    {
      uid: "1",
      name: documentsEmp?.verification_form,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${documentsEmp?.verification_form}`, // Set the URL of the default file
    }
  ]; 

  let authorizationfile = [
    {
      uid: "2",
      name: documentsEmp?.authorization_form,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${documentsEmp?.authorization_form}`, // Set the URL of the default file
    }
  ]; 

  const onFinish = (Values) => {

    var formdata = new FormData();

    let _id =CookieUtil.get("admin_id")

    formdata.append("edittype",Values["bgv"]);
    formdata.append("verification_form",verifiupload);
    formdata.append("authorization_form",authorupload);

    editPersonal(formdata,_id)
    setGoSteps(goSteps + 1)
    
  }
      let [form] = Form.useForm();

      const props = {
        action: "https://apiv1.technoladders.com/test",
        name: "file",
        multiple: false,
        defaultFileList: verificationfile,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setVerifiUpload (info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setVerifiUpload (info.file.originFileObj);

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
        defaultFileList: authorizationfile,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setAuthorUpload (info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setAuthorUpload (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };

      const [fileList, setFileList] = useState([]);
      const [fileList1, setFileList1] = useState([]);
    
    
      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
      const onChange1 = ({ fileList: newFileList1 }) => {
        setFileList1(newFileList1);
      };

      useEffect(() => {
        form.setFieldsValue(documentsEmp)
      },[documentsEmp])

    //   useEffect(() => {
    //     let role = CookieUtil.get("role")

    // let id = CookieUtil.get("admin_id")

    // if(role=="Employee"){
    //   fetchDocuments(id);
    // }
    // else{
    //   fetchDocuments(params?.id);
    // }  
    //   },[])


  return (
    
    Loading ? <Loader /> :
    <div className='p_10'>
      <label className='zive-jobDetail-desc'>Documents</label>
      <p className='zive-onboarding-para'>Please download and fill out the two forms given below and upload it.</p>
      <Form onFinish={onFinish} form={form}>
      <div className='d_f f_w_w g_80 p_t_20 g_5_sm j_c_s_b_sm'>
        <Form.Item>
          <img src={Doc} />
          <label className='document-label-background'>Background Check Form</label>
          
          <a href={`${BASE}${documentsEmp?.verification_form}` }  className='employeeDashBoard-personalLabel' target='blank'><p className='document-link-label'>Download</p></a>
          
        </Form.Item>
        <Form.Item>
          <img src={Doc} />
          <label className='document-label-background'>Authorization form</label>
          <a href={`${BASE}${documentsEmp?.authorization_form}` } download="FileName" className='employeeDashBoard-personalLabel'  target='blank'><p className='document-link-label'>Download</p></a>
        </Form.Item>
      </div>
      <div className='d_f f_w_w g_20 g_5_sm'>
                <Form.Item>
                    <Input placeholder='Background Check Form' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="verification_form"
                >
                    <Upload {...props}
                // fileList={fileList}
                // onChange={onChange}
                >
                  <>
                  {!verifiupload && (
                   <label className='zive-personal-upload-label'> + Upload File</label>
                   )}
                   
                  </></Upload>

                </Form.Item>
            </div>
            <div className='d_f f_w_w g_20 g_5_sm'>
                <Form.Item>
                    <Input placeholder='Authorization form' disabled={true} />
                </Form.Item>
                <Form.Item label="" name="authorization_form"
                >
                    <Upload {...props1}

                >
                  <>
                  {!authorupload && (
                   <label className='zive-personal-upload-label'> + Upload File</label>
                   )}
                   
                  </></Upload>

                </Form.Item>
            </div>
            <hr className='zive-hr-line' />
            <div className="text-end toolbar toolbar-bottom p-2">
              <Button className="btn btn-secondary sw-btn-prev me-1" onClick={handlePrev}>Prev</Button>
              <Button className="btn btn-primary sw-btn-next ms-1" htmlType='submit'>Next</Button>
            </div>
      </Form>

    </div>
  )
}

export default Documents
