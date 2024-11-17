import React, { useState } from 'react'

import {  Button, Form, Radio, Select, Input, DatePicker, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect } from 'react';
import { useContext } from 'react';
import InvoiceExpenceContext from './../../../Providers/InvoiceExpence/index';


const ExpenceAdd = ({handleFinish,handleDrawerClose,setAttachment,setFileError}) => {
    const [form] = Form.useForm();
    const [radio,setRadio]=useState("Salary")
    const {expenceAddemployee,fetchExpenceAddinit,addexpensebutton}=useContext(InvoiceExpenceContext)

    const props = {
        name: "file",
        multiple: false,
        action: "https://apiv1.technoladders.com/test",
        beforeUpload: (file) => {
          // Define the allowed file types (e.g., PDF, PNG, JPG)
          const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      
          // Check if the uploaded file's type is in the allowedTypes array
          if (!allowedTypes.includes(file.type)) {
              message.error("Invalid file type. Please upload a PDF, JPG, PNG, DOC, or DOCX.")
            return (
              setFileError(true),
              false
            ) // Prevent the file from being uploaded
          }
      
          return (
              setFileError(false),
              true
            ) ; // Allow the file to be uploaded
        },
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setAttachment (info.file.originFileObj)
          }
          if (status === "done") {
            message.success(`${info.file.name} file upload successfully.`);
    
            setAttachment (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };

      useEffect(() => {
          fetchExpenceAddinit()
      }, [])

       const handlChangeRadio =(e)=>{
          setRadio(e.target.value)
       }
      
  return (
    <Form form={form} onFinish={(values)=>handleFinish(values,form)}
    layout='vertical'>
     <div className='col_2 g_20 col_1_sm g_5_sm m_t_20'>
     <Form.Item
       name="expense_type"
       label="Expense Type"
       rules={[{ required: true, message: 'Please select Expense Type' }]}
     >
       <Radio.Group
        onChange ={handlChangeRadio}>
         <Radio value="Salary">Salary</Radio>
         <Radio value="Others">Others</Radio>
       </Radio.Group>
     </Form.Item>
     </div>
     <div className='col_2 m_t_1 g_20 col_1_sm g_5_sm'>
     
      {radio == "Salary" ?
      <Form.Item
       name="employee_id"
       label="Employee Name"
       rules={[{ required: true, message: 'Please select Employee Name' }]}
     >
       <Select placeholder="Select Employee Name"
        options={expenceAddemployee}/>
         
       
     </Form.Item>
     : 
     <Form.Item
      label="Others"
       name ="others_type">
      <Select placeholder="Enter Others"
      options ={
        [
          {
        label:"Office Rent",
        value:"Office Rent"
      },
      {
        label:"Marketing",
        value:"Marketing"
      },
      {
        label:"Maintenance and Repairs",
        value:"Maintenance and Repairs"
      },
      {
        label:"Office Supplies",
        value:"Office Supplies"
      },
      {
        label:"Travel Expenses",
        value:"Travel Expenses"
      },
      {
        label:"Business Licences and Permits",
        value:"Business Licences and Permits"
      },  {
        label:"Vehicle Expenses",
        value:"Vehicle Expenses"
      },
      {
        label:"Taxes",
        value:"Taxes"
      },
      {
        label:"Insurance",
        value:"Insurance"
      },
      {
        label:"Employee Benefits",
        value:"Employee Benefits"
      },
      {
        label:"Utilities",
        value:"Utilities"
      },
      {
        label:"Credit",
        value:"Credit"
      },


      
      
      
      
      ]}/>
     </Form.Item>
}

     
     </div>
    <div className='col_2 m_t_1 g_20 col_1_sm g_5_sm expence_picker'>
    <Form.Item
       name="expense_cost"
       label="Expense Cost (INR)"
       rules={[{ required: true, message: 'Please enter Expense Cost' }]}
     >
       <Input type="number" />
     </Form.Item>
     <Form.Item
       name="date"
       label="Date"
       rules={[{ required: true, message: 'Please select Date' }]}
     >
       <DatePicker  style={{
        width:"260px"
       }}/>
     </Form.Item>
     </div>
     <Form.Item name="expense_desc" label="Description">
       <Input.TextArea />
     </Form.Item>
    
     <div className="col_2 m_t_1 col_1_sm g_5_sm">
   <Form.Item
     label="Attachments"
     name="attachments"
  
   >
      <Dragger {...props}>
          <p className="ant-upload-hint addcandidate_hint"><span className="browse">+ Upload</span> Support format .PDF,.PNG,.JPG</p> 
            
        </Dragger>
   </Form.Item>
 </div>
    
     <div
   style={{
     margin: "10px",
     display: "flex",
     gap: "10px",
     justifyContent: "flex-end",
   }}
 >
   <Button className="btn_cancel" onClick={handleDrawerClose}>Cancel</Button>
   <Button type="primary" className="btn" htmlType="submit" loading={addexpensebutton}>
      Save
   </Button> 
 </div>
   </Form>
  )
}

export default ExpenceAdd