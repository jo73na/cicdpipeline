import { Button, Form, Input,message} from 'antd'

import {useContext, useState} from 'react'

import ClientContext from '../../Providers/ClientProvider';
import { useEffect } from 'react';


 const  AddProject =()=> {
const {clientSingle,handleAddProject} = useContext(ClientContext)


//Custom States
const[sow,setSow]=useState("")

     
const [form] = Form.useForm();
    // Custom Variables

    const props = {
        name: 'file',
        multiple: false,
        action: `https://apiv1.technoladders.com/test`,
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== 'uploading') {
          
            setSow(info.file.originFileObj)
          }
          if (status === 'done') {
            setSow(info.file.originFileObj)
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop() {
       
        },
      };

    const onSubmit =(values)=>{
  var formdata= new FormData()
        
        formdata.append("project_name",values["project_name"])
        formdata.append("client_id",clientSingle?._id)
        // formdata.append("employees_need",values["employees_need"]||0)
        // formdata.append("sow",sow)
        handleAddProject(formdata,form)
       
         
    }

useEffect(()=>{
  form.setFieldsValue({
    name:clientSingle?.name
  })  
},[])
  return (
    <div>
        <Form layout='vertical' onFinish={onSubmit} form={form}>
            <div className="col_2 col_1_sm g_20">
                
                    <Form.Item name="name" label="Client Name"  >
                    <Input value="Deloitte"  disabled={true} />
                    </Form.Item>


                    <Form.Item name="project_name" label="Project Name"
                     rules={[
                      {
                        required: true,
                        message: 'Project Name is Required!',
                      },
                    ]} >
                    <Input className="form-control" placeholder="Enter Name" />
                    </Form.Item>
                
            </div>

            {/* <div className="col_2 g_10 m_t_1 col_1_sm">
                
              
                
        
                    <Form.Item name="employees_need" label="No. of Employees Needed">
                    <Input className="form-control" ></Input>
                    </Form.Item>
              
            </div> */}
         
           

{/* <div className="col_2 g_10 m_t_1 col_1_sm">
               
                    <Form.Item label="Attachments (Eg: SOW)" name="sow"
                      rules={[
                        {
                          required: true,
                          message: 'Please Upload Resume!',
                        },
                      ]}
                      
                    >
                                
                    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <img src={Upload1} className='d_i_b'/>
    </p>
   
    <p className="ant-upload-text">Drag Your file here or <span className="browse">Browse</span></p>
    <p className="ant-upload-hint">
      Support format .PDF,.PNG,.JPG
    </p>
  </Dragger>
                    </Form.Item>

             
            
            </div> */}
            <div style={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "flex-end"
            }}>

            <Button className="btn_cancel">Cancel</Button>
                <Button type='primary' className="btn" htmlType="submit">Save</Button>

            </div>
        </Form>
    </div>
  )
}

export default AddProject
