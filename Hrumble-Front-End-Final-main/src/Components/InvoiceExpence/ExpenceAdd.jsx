import React, { useState,useRef } from 'react'

import {Button,  Form, Radio, Select, Input, DatePicker, message,Divider,Space } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect } from 'react';
import { useContext } from 'react';
import InvoiceExpenceContext from '../../Providers/InvoiceExpence';
import {PlusOutlined} from "@ant-design/icons"





const ExpenceAdd = ({handleFinish,handleDrawerClose,setAttachment,setFileError}) => {
    const [form] = Form.useForm();
    const [radio,setRadio]=useState("Salary")
    const [others,setOthers]=useState("")
    const {handleAddOtherType,handleExpenceOthers,expenceSelect,expenceOthersSelect,expenceAddemployee,fetchExpenceAddinit,addexpensebutton}=useContext(InvoiceExpenceContext)

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
        setOthers("")
        form.setFieldsValue({
           others_type: "",
           employee_id:""
            });
          setRadio(e.target.value)
       }

       const handleChangeOthers =(e)=>{
         handleExpenceOthers(e)
         setOthers(e)

         form.setFieldsValue({
          others_type_sub: ""
          
         })

         
       }

       const handleChangeOthers1 =(e)=>{
         setOthers(e.target.value)
         
       }

       const [items, setItems] = useState(['jack', 'lucy']);
       let index = 0;
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
     handleAddOtherType({
       name : name,
     })
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
      
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
       <>
        <Form.Item
       name="employee_id"
       label="Employee Name"
       rules={[{ required: true, message: 'Please select Employee Name' }]}
     >
       <Select placeholder="Select Employee Name"

        options={expenceAddemployee}/>
         
       
     </Form.Item>
     
       </>
     : 
      <>
       <Form.Item
      label="Others"
       name ="others_type"
       rules={[{ required: true, message: 'Please select Others Type' }]}

      
       >
      <Select placeholder="Select Others"
      onChange={handleChangeOthers}
      options ={
        expenceOthersSelect
       }/>
     </Form.Item>
     
      { others && <Form.Item
        label="Others Type"
         name ="others_type_sub"
        
         >
            <Select
      style={{
        width: 300,
      }}
      placeholder="select others"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Please enter "
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add 
            </Button>
          </Space>
        </>
      )}
      options={expenceSelect}
    />
       </Form.Item>
}
      </>
       
      

     
}

     
     </div>
    <div className='col_2 m_t_1 g_20 col_1_sm g_5_sm expence_picker'>
    <Form.Item
       name="expense_cost"
       label={radio == "Salary" ? "Salary Amount" :"Expense Cost (INR)"}
       rules={[{ required: true, message: 'Please enter Expense Cost' }]}
       getValueFromEvent={(e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
      }}
     >
       <Input  />
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
     {radio == "Salary"  && <Form.Item
       name="tax_cost"
       label="Tax dudected at source(TDS)"
       getValueFromEvent={(e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
      }}
      
     >
       <Input  />
     </Form.Item>
}
   
     </div>
     <Form.Item name="expense_desc" label="Description">
       <Input.TextArea />
     </Form.Item>
    
     <div className="col_1 m_t_1 col_1_sm g_5_sm">
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
  
                                <button htmlType="submit" className="btn btn-primary me-1 btn-sm"  >Submit</button>
                                <button   className="btn btn-danger light ms-1 btn-sm" onClick={handleDrawerClose}>Cancel</button>
                        
 </div>
   </Form>
  )
}

export default ExpenceAdd