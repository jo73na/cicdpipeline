import Dragger from 'antd/es/upload/Dragger'
import Link from 'antd/es/typography/Link';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form,message} from 'antd';
import { useState,useContext } from 'react';
import CandidateContext from '../../Providers/Candidate';

export default function CandidateImport({handleopenDrawerforAdd}) {
    const[upload,setUpload]=useState("")
    const [form]=Form.useForm();
 const {addimportbutton,handleAddimport,setAddImportButtonCandidate} = useContext(CandidateContext);

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
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };

 const onFinish=()=>{
  setAddImportButtonCandidate(true)
    console.log("excel,",upload)
    var formdata = new FormData()
    formdata.append("excelFile",upload)
   
    handleAddimport(formdata,form)
 }
  return (
    <>
      <Form layout='vertical'
       onFinish={onFinish}
        form={form}>

<div >
    <p className='heading_text'>Please follow the steps to import data into the system.</p>
    <p>1. Download the sample file below.</p>
        <p>2. Open it in your system and add Candidate data into it.</p>
        <p>3. Save the file  you are going to upload.</p>
        <p>4. After saving click on the upload icon below and choose the file.</p>
</div>
<div className='m_t_10'>
   
        <a className='c_primary' href='/images/sample_candidate.xlsx'>Download Sample File</a>

</div>

    <div className='col_2 m_t_10'>
        {/* <label className='zive-employeeImport-uploadtext'>Upload File</label> */}
       
            <Form.Item label="Upload File"
            name="upload"
               rules={[
                {
                  required: true,
                  message: "Please Upload Resume!",
                },
              ]}>
            <Dragger {...props}>
          <p className="ant-upload-hint addcandidate_hint"><span className="browse">+ Upload</span></p> 
              
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
        <button type='button' className="btn btn-danger btn-sm"
         onClick={handleopenDrawerforAdd}>Cancel</button>
        <button  type="submit" className="btn btn-primary btn-sm"  htmlType="submit"
         loading={addimportbutton}>
          Save
        </button> 
      </div>

</Form>

    </>
       
  )
}
