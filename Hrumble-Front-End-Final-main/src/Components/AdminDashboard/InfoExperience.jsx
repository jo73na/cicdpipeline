import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import Bgv from "/images/BgvPhoto.svg";
import ExperiencePhoto from "/images/Experincephoto.png";
import { FileExclamationOutlined, EditTwoTone } from '@ant-design/icons';
// import { BASE } from '../../Utils/api'
import { Form, Modal, Timeline, Upload } from 'antd';
import PDFlogo from '/images/pdf-file logo.svg';
import CollapseWork from './CollapseWork';
import moment from 'moment';

const BASE = import.meta.env.VITE_BASE; 

const InfoEducational = () => {

  const {fetchEmployFull,adminLoginData,editTimeline,employeeComplete,handleEditJob,isModalOpen5,isModalOpen6,isModalOpen7,isModalOpen8,setIsModalOpen5,setIsModalOpen6,setIsModalOpen7,setIsModalOpen8} = useContext(EmployeeContext)

  console.log("ffffff",employeeComplete)

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

      const showModal = () => {
        setIsModalOpen7(true);
      };
      const handleOk = () => {
        setIsModalOpen7(false);
      };
      const onClose = () => {
        setIsModalOpen7(false);
      };
      const handleCancel = () => {
        setIsModalOpen7(false);
      };

      const[ExperienceUpload,setExperUpload]=useState("");
      const[OfferUpload,setOfferUpload]=useState("");
      const[SeperationUpload,setSeperationUpload]=useState("");
      const[Payslip1Upload,setPayslip1Upload]=useState("");
      const[Payslip2Upload,setPayslip2Upload]=useState("");
      const[Payslip3Upload,setPayslip3Upload]=useState("");
      const[HikeUpload,setHikeUpload]=useState("");

      let experienceFile = [
        {
          uid: "1",
          name: employeeComplete?.experience?.experience_letter,
          status: "done", // Set the status to 'done' for default files
          url: `${BASE}${employeeComplete?.basic?.experience_letter}`, // Set the URL of the default file
            }
      ]; 
    
      let offerFile = [
        {
          uid: "2",
          name: employeeComplete?.experience?.offer_letter,
          status: "done", // Set the status to 'done' for default files
          url: `${BASE}${employeeComplete?.experience?.offer_letter}`, // Set the URL of the default file
            }
      ];
    
      let separationFile = [
        {
          uid: "2",
          name: employeeComplete?.experience?.seperation_letter,
          status: "done", // Set the status to 'done' for default files
          url: `${BASE}${employeeComplete?.experience?.seperation_letter}`, // Set the URL of the default file
            }
      ];
    
      let payslip1File = [
        {
          uid: "2",
          name: employeeComplete?.experience?.pay_slip_01,
          status: "done", // Set the status to 'done' for default files
          url: `${BASE}${employeeComplete?.experience?.pay_slip_01}`, // Set the URL of the default file
            }
      ];
    
      let payslip2File = [
        {
          uid: "2",
          name: employeeComplete?.experience?.pay_slip_02,
          status: "done", // Set the status to 'done' for default files
          url: `${BASE}${employeeComplete?.experience?.pay_slip_02}`, // Set the URL of the default file
            }
      ];
    
      let payslip3File = [
        {
          uid: "2",
          name: employeeComplete?.experience?.pay_slip_03,
          status: "done", // Set the status to 'done' for default files
          url: `${BASE}${employeeComplete?.experience?.pay_slip_03}`, // Set the URL of the default file
            }
      ];
    
      let hikeFile = [
        {
          uid: "2",
          name: employeeComplete?.experience?.hike_letter,
          status: "done", // Set the status to 'done' for default files
          url: `${BASE}${employeeComplete?.experience?.hike_letter}`, // Set the URL of the default file
            }
      ];
    
      const props = {
        action: "https://apiv1.technoladders.com/test",
        name: "file",
        multiple: false,
        defaultFileList: experienceFile,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setExperUpload(info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setExperUpload (info.file.originFileObj);
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
        defaultFileList: offerFile,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setOfferUpload(info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setOfferUpload (info.file.originFileObj);
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
        defaultFileList: separationFile,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setSeperationUpload(info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setSeperationUpload (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };
    
      const props3 = {
        action: "https://apiv1.technoladders.com/test",
        name: "file",
        multiple: false,
        defaultFileList: payslip1File,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setPayslip1Upload(info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setPayslip1Upload (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };
    
      const props4 = {
        action: "https://apiv1.technoladders.com/test",
        name: "file",
        multiple: false,
        defaultFileList: payslip2File,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setPayslip2Upload(info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setPayslip2Upload (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };
    
      const props5 = {
        action: "https://apiv1.technoladders.com/test",
        name: "file",
        multiple: false,
        defaultFileList: payslip3File,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setPayslip3Upload(info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setPayslip3Upload (info.file.originFileObj);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log("Dropped files", e.dataTransfer.files);
        },
      };
    
      const props6 = {
        action: "https://apiv1.technoladders.com/test",
        name: "file",
        multiple: false,
        defaultFileList: hikeFile,
      
        onChange(info) {
          const { status } = info.file;
          if (info.fileList.length > 1) {
            info.fileList.shift();
          }
          if (status !== "uploading") {
          
              // setData({ ...data, resume: info.file.originFileObj });
              setHikeUpload(info.file.originFileObj)
          }
          if (status === "done") {
    
            message.success(`${info.file.name} file upload successfully.`);
             console.log("lll",info.file.originFileObj)
             setHikeUpload (info.file.originFileObj);
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
      
          ExperienceUpload && formdata.append("experience_letter",ExperienceUpload)
          OfferUpload && formdata.append("offer_letter",OfferUpload)
          SeperationUpload && formdata.append("seperation_letter",SeperationUpload)
          Payslip1Upload && formdata.append("pay_slip_01",Payslip1Upload)
          Payslip2Upload && formdata.append("pay_slip_02",Payslip2Upload)
          Payslip3Upload && formdata.append("pay_slip_03",Payslip3Upload)
          HikeUpload && formdata.append("hike_letter",HikeUpload)
      
      
          console.log("formValues",formdata)
          editPersonal(formdata,employeeComplete?.basic?._id)
        }

  return (
    <div className=''>
      <Form layout='vertical' onFinish={onFinish} form={form}>
      <div className='d_f j_c_f_e'>
        <label className='profileInfo-editIcon-size' onClick={showModal}><EditTwoTone /> Edit</label>
      </div>
      <div>
        <Timeline mode="left">
        {employeeComplete?.experience?.map((item, index) => (
            <Timeline.Item key={index} color="green">
            <div>
                <p>
                  <span className="key_Skill">{item?.company_name ? item?.company_name : ""}</span> ({item?.jobType}) <EditTwoTone onClick={(e) => handleEditJob(item)} />
                </p>
                <p className="">
                    {item?.designation || ''} (
                    {item?.joining_date.replace("'", '') ? moment(item.joining_date).format('DD MMM, YYYY') : ''} -
                    {item?.seperation_date.replace("'", '') ? moment(item.seperation_date).format('DD MMM, YYYY') : ''}
                    )
                </p>
                <div className='d_f g_50'>
                <div>
                <p>  
                    {item?.offer_letter && (
                    <div>
                        <p className='profileInfo-designation-grey'>Offer Letter</p>
                        <img src={PDFlogo} alt="-" />
                        <a href={`${BASE}${item?.offer_letter}`} target="_blank">
                        <p>{resumename(item?.offer_letter)}</p>
                        </a>
                    </div>
                    )}
                </p>
                </div>
                <div>
                <p>
                    {item?.seperation_letter && (
                    <div>
                        <p className='profileInfo-designation-grey'>Seperation Letter</p>
                        <img src={PDFlogo} alt="-" />
                        <a href={`${BASE}${item?.seperation_letter}`} target="_blank">
                        <p>{resumename(item?.seperation_letter)}</p>
                        </a>
                    </div>
                    )}
                </p>
                </div>
                <div>
                <p>
                    {item?.hike_letter && (
                    <div>
                        <p className='profileInfo-designation-grey'>Hike Letter</p>
                        <img src={PDFlogo} alt="-" />
                        <a href={`${BASE}${item?.hike_letter}`} target="_blank">
                        <p>{resumename(item?.hike_letter)}</p>
                        </a>
                    </div>
                    )}
                </p>
                </div>
                <div>
                <p>
                    {item?.experience_letter && (
                    <div>
                        <p className='profileInfo-designation-grey'>Experience Letter</p>
                        <img src={PDFlogo} alt="-" />
                        <a href={`${BASE}${item?.experience_letter}`} target="_blank">
                        <p>{resumename(item?.experience_letter)}</p>
                        </a>
                    </div>
                    )}
                </p>
                </div>
                <div>
                <p>
                    {item?.pay_slip_01 && (
                    <div>
                        <p className='profileInfo-designation-grey'>PaySlip 1</p>
                        <img src={PDFlogo} alt="-" />
                        <a href={`${BASE}${item?.pay_slip_01}`} target="_blank">
                        <p>{resumename(item?.pay_slip_01)}</p>
                        </a>
                    </div>
                    )}
                </p>
                </div>
                <div>
                <p>
                    {item?.pay_slip_02 && (
                    <div>
                        <p className='profileInfo-designation-grey'>Payslip 2</p>
                        <img src={PDFlogo} alt="-" />
                        <a href={`${BASE}${item?.pay_slip_02}`} target="_blank">
                        <p>{resumename(item?.pay_slip_02)}</p>
                        </a>
                    </div>
                    )}
                </p>
                </div>
                <div>
                <p>
                    {item?.pay_slip_03 && (
                    <div>
                        <p className='profileInfo-designation-grey'>Payslip 3</p>
                        <img src={PDFlogo} alt="-" />
                        <a href={`${BASE}${item?.pay_slip_03}`} target="_blank">
                        <p>{resumename(item?.pay_slip_03)}</p>
                        </a>
                    </div>
                    )}
                </p>
                </div>
                </div>
            </div>
            </Timeline.Item>
        ))}
        </Timeline>
      </div>
      
      <Modal 
          // title={`${valueprops}`}
          visible={isModalOpen7}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          className="rotate-modal"
          >
          <CollapseWork />
      </Modal>
      </Form>
    </div>
  )
}

export default InfoEducational



{/* <div className='d_f g_50'>
          <div className="profileInfo-cardd">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.experience?.verification_form ? (
            <>
              <a href={`${BASE}${employeeComplete?.experience?.verification_form}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={ExperiencePhoto} alt="Experience"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text"> <Upload>+ Upload</Upload></div>
          )}
          <div className="profileInfo-cardd-title">Experience Certificate</div>
          </div>
          </div>

        <div className="profileInfo-cardd">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.experience?.pay_slip_01 ? (
            <>
              <a href={`${BASE}${employeeComplete?.experience?.pay_slip_01}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={Bgv} alt="PaySlip"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">PaySlip 1</div>
          </div>
          </div>

        <div className="profileInfo-cardd">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.experience?.pay_slip_02 ? (
            <>
              <a href={`${BASE}${employeeComplete?.experience?.pay_slip_02}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={Bgv} alt="PaySlip"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">PaySlip 2</div>
          </div>
          </div>

        <div className="profileInfo-cardd">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.experience?.pay_slip_03 ? (
            <>
              <a href={`${BASE}${employeeComplete?.experience?.pay_slip_03}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={Bgv} alt="PaySlip"/>
              </a>
            </>
          ) : (
            <div className="profileInfo-empty-text"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">PaySlip 3</div>
          </div>
          </div>

        </div>
        <div className='d_f f_w_w j_c_f_e'>
          <label onClick={showModal} className='profileInfo-editIcon-size'><EditTwoTone />Edit</label>
          </div>
            <Modal 
            // title={`${valueprops}`}
            visible={isModalOpen7}
            onCancel={handleCancel}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            className="rotate-modal"
            >

              <CollapseWork />
            </Modal> */}
