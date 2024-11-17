import { Button, Drawer, Form, Input, Space, Upload, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import PDFlogo from '/images/pdf-file logo.svg'
import  { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';
import AddExperience from './AddExperience';
import EditExperience from './EditExperience';
import dayjs from 'dayjs';
import { BASE } from '../../Utils/api';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Loader from '../../Utils/Loader';
import CookieUtil from '../../Utils/Cookies';

const EducationalDetails = ({goSteps,setGoSteps,handlePrev}) => {

  const {addbuttonEmply,handleOpenEditDrawer,educationExperiData,fetchEducation,fetchExperienceAll,Loading,EducationEmp,experienceSingle,handleOpenDeleteDrawer,employeeLogindata,fetchExper,editPersonal,experinceData}=useContext(EmployeeContext)

  console.log("experinceDataaaaa----------------------",EducationEmp)

  console.log("educatt",educationExperiData)

let params = useParams()

   const resumename = (data) => {
    console.log("dataaaaa",data)
        const match = data?.match(/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);
      
        // Check if there is a match and extract the desired parts
        if (match) {
          const numericPart = match[1]; // "17024865174681702377542774"
          const alphanumericPart = match[2]; // "naukri_sowmyak[4y_11m].docx"
          
          console.log('Numeric Part:', numericPart);
          console.log('Alphanumeric Part:', alphanumericPart);
          
          // Return the alphanumeric part if needed
          return alphanumericPart;
        } else {
          console.log("No match found.");
          return null;
        }
      };

  const handelEdit =(e,id)=>{
    handleOpenEditDrawer(id)
    setOpen1(true)
  }

  const handelDelete =(e,id)=>{
    handleOpenDeleteDrawer(id)
  }

  const [form] = Form.useForm();

  const [slcupload,setSlcUpload]= useState(false);
  const [hscupload,setHscUpload]= useState("");
  const [degreeupload,setDegreeUpload]= useState("");
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

  const [open1, setOpen1] = useState(false);
  const showDrawer1 = () => {
    setOpen1(true);
  };
  const onClose1 = () => {
    setOpen1(false);
  };

  const dateRangeString = "2024-01-22T12:32:22.000Z - 2024-01-31T12:32:24.000Z";
  const [startDate, endDate] = dateRangeString.split(" - ").map(dateStr => dayjs(dateStr));

  const formattedStartDate = startDate.format('DD/MM/YYYY');
  const formattedEndDate = endDate.format('DD/MM/YYYY');


const onFinish = (Values) => {

  var formdata = new FormData();
  let _id =CookieUtil.get("admin_id")

  formdata.append("edittype",Values["education"]);
  slcupload && formdata.append("ssc_file",slcupload);
  hscupload && formdata.append("hsc_file",hscupload);

  console.log("ed--",formdata)

  let additional_degree = Values["additional_degree"];  

  additional_degree?.forEach((item, index) => {
          for (const key in item) {
            upload3 && formdata.append(`additional_degree[${index}][${key}]`, item[key]);
          }
        });

  
  editPersonal(formdata,_id);
  setGoSteps(goSteps + 1)
}

  // upload function starts here

  let slcfile = [
    {
      uid: "1",
      name: EducationEmp?.ssc_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${EducationEmp?.ssc_file}`, // Set the URL of the default file
        }
  ]; 

  let hscfile = [
    {
      uid: "2",
      name: EducationEmp?.hsc_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${EducationEmp?.hsc_file}`, // Set the URL of the default file
        }
  ]; 

  let degreefile = [
    {
      uid: "3",
      name: EducationEmp?.degree_file,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${EducationEmp?.degree_file}`, // Set the URL of the default file
        }
  ]; 

  let pgdegreefile = [
    {
      uid: "3",
      name: EducationEmp?.additional_certificate,
      status: "done", // Set the status to 'done' for default files
      url: `${BASE}${EducationEmp?.additional_certificate}`, // Set the URL of the default file
        }
  ]; 

  const props = {
    action: "https://apiv1.technoladders.com/test",
    name: "file",
    multiple: false,
    defaultFileList: slcfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setSlcUpload (info.file.originFileObj)
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
    defaultFileList: hscfile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setHscUpload (info.file.originFileObj)
      }
      if (status === "done") {

        message.success(`${info.file.name} file upload successfully.`);
         console.log("lll",info.file.originFileObj)
         setHscUpload (info.file.originFileObj);
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
    defaultFileList: degreefile,
  
    onChange(info) {
      const { status } = info.file;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      if (status !== "uploading") {
      
          // setData({ ...data, resume: info.file.originFileObj });
          setDegreeUpload (info.file.originFileObj)
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

  const props3 = {
    name: "file",
    multiple: false,
    action: "https://apiv1.technoladders.com/test",
    defaultFileList: pgdegreefile,
  
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

  const onChange3 = ({ fileList: newFileList3 }) => {
    setFileList3(newFileList3);
  };

   // upload function ends here

useEffect(()=>{
  console.log("addition",EducationEmp)
  let setdata = {
  additional_degree: EducationEmp?.additional_degree
  }
  form.setFieldsValue(setdata)
  // fetchEducation()
},[EducationEmp])

useEffect(() => {
  let role = CookieUtil.get("role")

    let id = CookieUtil.get("admin_id")

    if(role=="Employee"){
      fetchEducation(id);
    }
    else{
      fetchEducation(params?.id);
    }  
},[])

  return (
    Loading ? <Loader /> :
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
  <Drawer
    title="Edit Experience"
    placement="right"
    onClose={onClose1}
    closable={false}
    size="large"
    
    open={open1}
    height={50}
    width={650}
    
  >
    <EditExperience /> 
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
                className='zive-personalDetails-upload'>
                  <>
                  {!slcupload && (
                   <label className='zive-personal-upload-label'>
                    + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  )}
                   
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
                
                >
                  <>
                  {!hscupload && (
                   <label className='zive-personal-upload-label'> + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                   )}
                   
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
                
                >
                  <>
                  {!degreeupload && (
                   <label className='zive-personal-upload-label'> + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  )}
                   
                  </>
                </Upload>
              </Form.Item>
            </div>
            <div className="col_1 col_1_sm">

            <Form.List name="additional_degree" label="additional">
    {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
       
       <Space
        key={key}
       >
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
            <Input placeholder=" Enter here" />
          </Form.Item>
          <Form.Item label=" " name={[name, 'additional_certificate']}
          {...restField}
          rules={[
              {
                required: true,
                message: 'Missing document',
              },
            ]}>
                <Upload {...props3} >
                  <>
                  
                   <label className='zive-personal-upload-label'> + Upload <span className='zive-personal-upload-supported d_n_sm'>(Supported format .PDF, .PNG, .JPG)</span></label>
                  
                   
                  </></Upload>
              </Form.Item>
          <DeleteOutlined onClick={() => remove(name)} className='zive-jobDetail-editicon' ></DeleteOutlined> 
          </div>
          </Space>
      
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
        {
        educationExperiData?.map((item,i) => {
          
          return<>
          <div>
          <label className='profile-edu-job-title'>{item?.designation!=="undefined" ? item?.designation : " "} - {item.jobType!=="undefined" ? item?.jobType : " "}</label>
          <p className='profile-edu-job-com'>{item?.company_name!=="undefined" ? item?.company_name : " "} - {item?.location!=="undefined" ? item?.location : " "}</p>
          <p className='profile-edu-job-exp'>{`${moment(item?.joining_date!=="undefined" ? item?.joining_date : " ").format(' DD-MM-YYYY')} - ${moment(item?.seperation_date!=="undefined" ? item?.seperation_date : " ").format(' DD-MM-YYYY')}`}</p>
          <p className='profile-edu-job-exp'> {item?.seperation_reason!=="undefined" ? item?.seperation_reason : " "}</p>
          <p className='profile-edu-job-exp'> {item?.payslip_reason!=="undefined" ? item?.payslip_reason : " " } </p>
          </div>
          <div className='col_8 g_20 f_w_w j_c_s_a_sm'>
            <Form.Item label="Offer Letter" name="offer">
              <img src={PDFlogo} alt='-' />
              <a href={`${BASE}${item?.offer_letter}`} target="blank">{resumename(item?.offer_letter)}</a>
            </Form.Item>
            <Form.Item label="Separation Letter" name="seperation_letter">
              <img src={PDFlogo} alt='-' />
              <a href={`${BASE}${item?.seperation_letter}`} target="blank">{resumename(item?.seperation_letter)}</a>
            </Form.Item>
            <Form.Item label="PaySlip 1" name="pay_slip_01">
              <img src={PDFlogo} alt='-' />
              <a href={`${BASE}${item?.pay_slip_01}`} target="blank">{resumename(item?.pay_slip_01)}</a>
            </Form.Item>
            <Form.Item label="PaySlip 2" name="pay_slip_02">
              <img src={PDFlogo} alt='-' />
              <a href={`${BASE}${item?.pay_slip_02}`} target="blank">{resumename(item?.pay_slip_02)}</a>
            </Form.Item>
            <Form.Item label="PaySlip 3" name="pay_slip_03">
              <img src={PDFlogo} alt='-' />
              <a href={`${BASE}${item?.pay_slip_03}`} target="blank">{resumename(item?.pay_slip_03)}</a>
            </Form.Item>
            <Form.Item label="Hike Letter" name="hike_letter">
              <img src={PDFlogo} alt='-' />
              <a href={`${BASE}${item?.hike_letter}`} target="blank">{resumename(item?.hike_letter)}</a>
            </Form.Item>
            <div className='d_f g_20'>
            <EditOutlined className='zive-jobDetail-editicon' onClick={(e)=>handelEdit(e,item?._id)}/>
            <DeleteOutlined className='zive-jobDetail-editicon' onClick={(e)=>handelDelete(e,item?._id)} />
            </div>
          </div></>
        })
      }
        
          <div className="col_3">
            <Button className="btn_cancel w_40_p" type="primary" onClick={showDrawer} block icon={<PlusOutlined />}>
                Add Experience
            </Button>
          </div>

        </div>
        <hr className='zive-hr-line m_t_30' />
        <div className="text-end toolbar toolbar-bottom p-2">
          <Button className="btn btn-secondary sw-btn-prev me-1" onClick={handlePrev}>Prev</Button>
          <Button className="btn btn-primary sw-btn-next ms-1" htmlType='submit'>Next</Button>
        </div>
        </Form>
        </div>
    </div>
    </>
  )
}

export default EducationalDetails
