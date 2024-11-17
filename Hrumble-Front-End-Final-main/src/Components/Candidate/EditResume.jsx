import Dragger from 'antd/es/upload/Dragger'
import Link from 'antd/es/typography/Link';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form,message} from 'antd';
import { useState,useContext } from 'react';
import CandidateContext from '../../Providers/Candidate';

export default function EditResume() {
    const[upload,setUpload]=useState("")
    const [form]=Form.useForm();
 const {handleEditresumeOnly,addResumeButton,setAddImportButtonCandidate} = useContext(CandidateContext);

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
      
      };

 const onFinish=()=>{

    console.log("excel,",upload)
    var formdata = new FormData()
    formdata.append("image",upload)
   
    handleEditresumeOnly(formdata,form)
    form.resetFields()
    setUpload("")
 }
  return (
    <>
      <Form layout='vertical'
       onFinish={onFinish}
        form={form}>




    <div className='col_2 m_t_30'>
        {/* <label className='zive-employeeImport-uploadtext'>Upload File</label> */}
       
            <Form.Item label="Upload Resume"
            name="resume"
               rules={[
                {
                  required: true,
                  message: "Please Upload Resume!",
                },
              ]}>
            <Dragger {...props}>
            <UploadOutlined className='zive-project-uploadicon'/>
            <p className='zive-employeeImport-draglabel my-3'>Drag your file here or <Link className='c_primary'>Browse</Link></p>
            <p className='zive-employeeImport-supportedLabel my-3'>Supported format .xlsx</p>
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
        <Button className="btn_cancel">Cancel</Button>
        <Button type="primary" className="btn" htmlType="submit"
         loading={addResumeButton}>
          Save
        </Button> 
      </div>

</Form>

    </>
       
  )
}
