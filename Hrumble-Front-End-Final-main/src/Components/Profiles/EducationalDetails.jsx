import { Button, Drawer, Form, Input, Space, Upload, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import PDFlogo from '/images/pdf-file logo.svg'
import  { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';
import AddExperience from './AddExperience';

const EducationalDetails = () => {

  const {addbuttonEmply,employeeLogindata,editEmployee}=useContext(EmployeeContext)

  console.log("educat",employeeLogindata)

  const [form] = Form.useForm();

  const [upload,setUpload]= useState("");
  const [upload1,setUpload1]= useState("");
  const [upload2,setUpload2]= useState("");
  const [upload3,setUpload3]= useState("");

  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


const onFinish = (Values) => {

  var formdata = new FormData();

  formdata.append("edittype",Values["education"]);
  formdata.append("ssc_file",upload);
  formdata.append("hsc_file",upload1);
  formdata.append("degree_file",upload2);

  console.log("ed--",formdata)
  editEmployee(formdata);
}

  // upload function starts here

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

  const props1 = {
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
          setUpload1 (info.file.originFileObj)
      }
      if (status === "done") {
        

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload1 (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props2 = {
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
          setUpload2 (info.file.originFileObj)
      }
      if (status === "done") {
        

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload2 (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props3 = {
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
          setUpload3 (info.file.originFileObj)
      }
      if (status === "done") {
        

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setUpload3 (info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };


  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onChange1 = ({ fileList: newFileList1 }) => {
    setFileList1(newFileList1);
  };

  const onChange2 = ({ fileList: newFileList2 }) => {
    setFileList2(newFileList2);
  };

  const onChange3 = ({ fileList: newFileList2 }) => {
    setFileList3(newFileList2);
  };

   // upload function ends here

useEffect(()=>{
  form.setFieldsValue(employeeLogindata)
},[employeeLogindata])

  return (
    
    <>
    <Drawer
    title="Add Experience"
    placement="right"
    onClose={onClose}
    closable={false}
    size="large"
    
    open={open}
    height={50}
    width={650}
    
  >
    <AddExperience /> 
  </Drawer>

    <div className='p_10'>
        <label className='card_header'>Education</label>
        <p className='zive-onboarding-para'>Add your course and certificate here.</p>
        <div className='p_t_15'>
          <Form layout='vertical' onFinish={onFinish} form={form}>
            <div className='col_3 g_20 col_2_md col_2_sm g_5_sm'>
             <Form.Item label="Exam/Course Name" rules={[
              {
                required:true,
                message:"Enter Course"
              }
             ]}>
               <Input placeholder='SLC' disabled={true} />
             </Form.Item>
             <Form.Item label=" " name="ssc_file">
              <Upload {...props}
                fileList={fileList}
                onChange={onChange}>
                  <>
                  {
                    fileList.length < 1 && 
                   <label> + Upload <span className='d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  }
                   
                  </></Upload>
             </Form.Item>
            </div>
            <div className='col_3 g_20 col_2_md col_2_sm'>
              <Form.Item label="Exam/Course Name" rules={[
              {
                  required:true,
                  message:"Enter Course"
                }
              ]}>
               <Input placeholder='HSC/Diploma' disabled={true} />
              </Form.Item>
              <Form.Item label=" " name="hsc_file">
                <Upload {...props1}
                fileList1={fileList1}
                onChange={onChange1}>
                  <>
                  {
                    fileList1.length < 1 && 
                   <label> + Upload <span className='d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  }
                   
                  </>
                </Upload>
              </Form.Item>
            </div>
            <div className='col_3 g_20 col_2_md col_2_sm'>
            <Form.Item label="Exam/Course Name" rules={[
              {
                  required:true,
                  message:"Enter Course"
                }
              ]}>
               <Input placeholder='Degree' disabled={true} />
              </Form.Item>
              <Form.Item label=" " name="degree_file">
                <Upload {...props2}
                fileList2={fileList2}
                onChange={onChange2}>
                  <>
                  {
                    fileList2.length < 1 && 
                   <label> + Upload <span className='d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  }
                   
                  </>
                </Upload>
              </Form.Item>
            </div>
            <div className="col_1 col_1_sm">

            <Form.List name="contact_persons">
    {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
       
        <> 
          <div className='col_3 g_20 col_3_sm g_5_sm'>
          <Form.Item
            {...restField}
            label="Exam/Course Name"
            name={[name, 'exam']}
            rules={[
              {
                required: true,
                message: 'Missing  name',
              },
            ]}
          >
            <Input placeholder=" Relationship" />
          </Form.Item>
          <Form.Item label=" ">
                <Upload {...props3}
                fileList3={fileList3}
                onChange={onChange3}>
                  <>
                  {
                    fileList3.length < 1 && 
                   <label> + Upload <span className='d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  }
                   
                  </></Upload>
              </Form.Item>
          <DeleteOutlined onClick={() => remove(name)} className='zive-jobDetail-editicon' ></DeleteOutlined> 
          </div></>
      
      ))}
      <Form.Item>
       <div className="col_3">
       <Button className="btn_cancel w_40_p" type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
           Add Additional Exam/Course
        </Button>
       </div>
      </Form.Item>
    </>
  )}
</Form.List>
        </div>

        <hr className='zive-hr-line' />

        <div className='p_t_20'>
          <label className='card_header'>Experience</label>
          <p className='zive-onboarding-para'>Add your previous working experience and internship details. </p>
        </div>
        <div className='col_2 col_1_sm g_20_sm p_t_15'>
          <div>
          <label className='profile-edu-job-title'>Software Developer - Full Time</label>
          <p className='profile-edu-job-com'>comapany name - location</p>
          <p className='profile-edu-job-exp'>Jul 2018 - Jun 2022 (2 Yrs 5 Mon )</p>
          </div>
          <div className='d_f f_w_w j_c_s_b j_c_s_a_sm'>
            <Form.Item label="Offer Letter" name="offer">
              <img src={PDFlogo} alt='-' />
            </Form.Item>
            <Form.Item label="Separation Letter" name="separation">
              <img src={PDFlogo} alt='-' />
            </Form.Item>
            <Form.Item label="PaySlip 1" name="payslip1">
              <img src={PDFlogo} alt='-' />
            </Form.Item>
            <Form.Item label="PaySlip 2" name="payslip2">
              <img src={PDFlogo} alt='-' />
            </Form.Item>
            <Form.Item label="PaySlip 3" name="payslip3">
              <img src={PDFlogo} alt='-' />
            </Form.Item>
            <EditOutlined className='zive-jobDetail-editicon' />
            <DeleteOutlined className='zive-jobDetail-editicon' />
          </div>
          <div className="col_3">
            <Button className="btn_cancel w_40_p" type="primary" onClick={showDrawer} block icon={<PlusOutlined />}>
                Add Experience
            </Button>
          </div>

        </div>
        <hr className='zive-hr-line m_t_30' />
        <div className='zive-profile-button d_f g_20 j_c_c_sm'>
          <Button className='btn_cancel'>Back</Button>
          <Button className='btn' type='primary' htmlType='submit' loading={addbuttonEmply}>Save & Next</Button>
        </div>
        </Form>
        </div>
    </div>
    </>
  )
}

export default EducationalDetails
