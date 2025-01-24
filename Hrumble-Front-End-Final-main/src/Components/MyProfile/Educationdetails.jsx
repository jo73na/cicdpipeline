import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Upload,
  message,
  Row,
  Col,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import EmployeeContext from "../../Providers/EmployeeProvider";
import AddExperience from "../MyProfile/AddExperience";
import EditExperience from "./EditExperience";
// import PDFlogo from "../../../public/images/pdflogo1.svg";
import Loader from "../../Utils/Loader";
import CookieUtil from "../../Utils/Cookies";
import moment from "moment";
import { Files } from 'lucide-react';
 
 
const BASE = import.meta.env.VITE_BASE;
 
const EducationalDetails = ({ goSteps, setGoSteps, handlePrev, onNextTab, id }) => {
  const {
    handleOpenEditDrawer,
    handleOpenDeleteDrawer,
    educationExperiData,
    fetchEducation,
    Loading,
    EducationEmp,
    editPersonal,
    employeeLogindata,
    fetchEmploy,
    FetchEmployeeTable,
    editEmployee,editExperience, deleteExperience
  } = useContext(EmployeeContext);
 
  const [form] = Form.useForm();
  const [slcUpload, setSlcUpload] = useState(null);
  const [hscUpload, setHscUpload] = useState(null);
  const [degreeUpload, setDegreeUpload] = useState(null);
  const [additionalUpload, setAdditionalUpload] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedExperience,setSelectedExperience] = useState(null);
 
  console.log("selectedExperience", selectedExperience)
    useEffect(() => {
        FetchEmployeeTable();
      }, []);
 
      const onFinish = async (values) => {
        try {
          const formData = new FormData();
      
          // Retrieve previous education data from employeeLogindata
          const previousEducationData = employeeLogindata?.education?.[0] || {};
      
          // Initialize educationData with previous data or empty object
          const educationData = {
            ssc_file: previousEducationData.ssc_file,
            hsc_file: previousEducationData.hsc_file,
            degree_file: previousEducationData.degree_file,
            additional_degree: previousEducationData.additional_degree || [],
          };
      
          // Handle direct file uploads and update educationData accordingly
          if (slcUpload?.[0]) {
            formData.append("ssc_file", slcUpload[0]);
            educationData.ssc_file = slcUpload[0].name;
          }
          if (hscUpload?.[0]) {
            formData.append("hsc_file", hscUpload[0]);
            educationData.hsc_file = hscUpload[0].name;
          }
          if (degreeUpload?.[0]) {
            formData.append("degree_file", degreeUpload[0]);
            educationData.degree_file = degreeUpload[0].name;
          }
      
          // Handle additional certificate files
          educationData.additional_degree = values.additional_degree?.map((degree, index) => {
            if (additionalUpload?.[index]) {
              formData.append(`additional_certificate_${index}`, additionalUpload[index]);
              return {
                exam: degree.exam,
                additional_certificate: additionalUpload[index].name,
              };
            }
            return degree;
          }) || educationData.additional_degree;
      
          // Append the rest of the form data
          formData.append("education", JSON.stringify([educationData]));
          formData.append("admin_id", id || adminId);
      
          // Submit the form data
          await editEmployee(formData, id || adminId);
          message.success("Educational details saved successfully!");
        } catch (error) {
          console.error("Failed to save educational details:", error);
          message.error("Error saving educational details.");
        }
      };
      
      
 
  const handleFileChange = (info, setFile, index = null) => {
    const { status, originFileObj } = info.file;
 
    if (status !== "uploading") {
      if (index !== null) {
        setFile((prevFiles) => {
          const newFiles = [...(prevFiles || [])]; // Ensure prevFiles is always an array
          newFiles[index] = originFileObj;
          return newFiles;
        });
      } else {
        setFile([originFileObj]); // Wrap in an array for consistency
      }
    }
 
    if (status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };
 
  const uploadProps = (defaultFileList, setFile, index = null) => ({
    name: "file",
    multiple: false,
    action: `${BASE}test`,
    defaultFileList,
    onChange: (info) => handleFileChange(info, setFile, index),
    beforeUpload: (file) => {
      const isSupported =
        file.type === "application/pdf" ||
        file.type === "image/png" ||
        file.type === "image/jpeg";
      if (!isSupported) {
        message.error("Only PDF, PNG, JPG, or JPEG files are allowed.");
        return Upload.LIST_IGNORE;
      }
      return isSupported;
    },
  });
 
  useEffect(() => {
    const adminId = CookieUtil.get("admin_id");
    fetchEmploy(id || adminId);
  }, []);
  
 
  // Pre-fill the form with employee data
  const initialValues = {
    ssc_file: employeeLogindata?.education?.[0]?.ssc_file
      ? [
          {
            uid: "-1",
            name: employeeLogindata.education[0].ssc_file,
            status: "done",
            url: `${BASE}${employeeLogindata.education[0].ssc_file}`,
          },
        ]
      : [],
    hsc_file: employeeLogindata?.education?.[0]?.hsc_file
      ? [
          {
            uid: "-2",
            name: employeeLogindata.education[0].hsc_file,
            status: "done",
            url: `${BASE}${employeeLogindata.education[0].hsc_file}`,
          },
        ]
      : [],
    degree_file: employeeLogindata?.education?.[0]?.degree_file
      ? [
          {
            uid: "-3",
            name: employeeLogindata.education[0].degree_file,
            status: "done",
            url: `${BASE}${employeeLogindata.education[0].degree_file}`,
          },
        ]
      : [],
      additional_degree: employeeLogindata?.education?.[0]?.additional_degree?.map((degree, index) => ({
        exam: degree.exam,
        additional_certificate: [
          {
            uid: `-${index + 4}`,
            name: degree.additional_certificate,
            status: "done",
            url: `${BASE}${degree.additional_certificate}`,
          },
        ],
      })) || [],
  };
 
  const calculateDuration = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
   
    const years = end.diff(start, 'years');
    const months = end.diff(start, 'months') % 12;
 
    return `${years} yrs ${months} mos`;
  };

  const handleDeleteExperience = (experienceId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this experience?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteExperience(id, experienceId); // Call the deleteExperience function from context
      },
    });
  };

  const handleEditExperience = (experienceId) => {
    const experienceToEdit = employeeLogindata.experience.find(exp => exp._id === experienceId);
    console.log("Experience to Edit:", experienceToEdit); // Debugging line
    setSelectedExperience(experienceToEdit); // Set the selected experience
    setOpenEditDrawer(true); // Open the edit drawer
};
 
  return  (
   
    <>
      <Drawer
        title="Add Experience"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={650}
      >
        <AddExperience id={id} onClose={() => setOpenDrawer(false)} />
      </Drawer>
      <Drawer
    title="Edit Experience"
    placement="right"
    onClose={() => setOpenEditDrawer(false)}
    open={openEditDrawer}
    width={650}
>
    {selectedExperience ? ( // Ensure selectedExperience is not null
        <EditExperience experienceData={selectedExperience} onClose={() => setOpenEditDrawer(false)} />
    ) : (
        <p>No experience data available.</p> // Fallback message
    )}
</Drawer>
    
 
      <div>
        <h4 style={{fontSize:"16px", color:"rgb(48, 64, 159)", fontFamily:"poppins", marginBottom:"6px", fontWeight:"500"}}>Education</h4>
        <p style={{fontSize:"12px", color:"black", fontFamily:"poppins", marginBottom:"6px"}}>Add your course and certificate here.</p>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Exam/Course Name">
                <Input className="employeeForm" placeholder="SLC" disabled />
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginTop: "28px" }}>
              <Form.Item name="ssc_file">
                <Upload {...uploadProps(initialValues.ssc_file, setSlcUpload)}>
                  {!slcUpload && (
                    <Button icon={<UploadOutlined />}className="custom-upload-button">Upload (PDF, PNG, JPG)</Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Exam/Course Name">
                <Input className="employeeForm" placeholder="HSC/Diploma" disabled />
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginTop: "25px" }}>
              <Form.Item name="hsc_file">
                <Upload {...uploadProps(initialValues.hsc_file, setHscUpload)}>
                  {!hscUpload && (
                    <Button icon={<UploadOutlined />} className="custom-upload-button">Upload (PDF, PNG, JPG)</Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
 
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Exam/Course Name">
                <Input className="employeeForm" placeholder="Degree" disabled />
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginTop: "25px" }}>
              <Form.Item name="degree_file">
                <Upload {...uploadProps(initialValues.degree_file, setDegreeUpload)}>
                  {!degreeUpload && (
                    <Button icon={<UploadOutlined />}className="custom-upload-button">Upload (PDF, PNG, JPG)</Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
 
          <Form.List name="additional_degree">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }, index) => (
        <Row key={key} gutter={[16, 16]} align="middle">
          <Col span={6}>
            <Form.Item
              {...restField}
              name={[name, "exam"]}
              label="Exam/Course Name"
              rules={[{ required: false, message: "Enter course name!" }]}
            >
              <Input className="employeeForm" placeholder="Enter here" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...restField}
              name={[name, "additional_certificate"]}
              label="Document"
              rules={[{ required: false, message: "Upload a document!" }]}
            >
              <Upload
                {...uploadProps(
                  initialValues.additional_degree[index]?.additional_certificate,
                  setAdditionalUpload,
                  index
                )}
              >
                <Button icon={<UploadOutlined />}className="custom-upload-button">Upload (PDF, PNG, JPG)</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={4}>
            <DeleteOutlined onClick={() => remove(name)} />
          </Col>
        </Row>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
          Add Additional Course
        </Button>
      </Form.Item>
    </>
  )}
</Form.List>

 
          <h6 style={{fontSize:"16px", color:"rgb(48, 64, 159)", fontFamily:"poppins", marginBottom:"6px", fontWeight:"500"}}>Experience</h6>
          <p style={{fontSize:"12px", color:"black", fontFamily:"poppins", marginBottom:"6px", fontWeight:"500"}}>
            Add your previous working experience and internship details.
          </p>
          {employeeLogindata?.experience?.length > 0 ? (
  employeeLogindata.experience.map((experience, index) => (
    <div key={experience._id || index} className="experience-details">
      <Row gutter={[16, 16]}>
        {/* Left side - Experience Details */}
        <Col span={8}>
          <h5 className="mt-3">
            {experience.designation} - {experience.jobType}
          </h5>
          <p style={{ color: '#555' }}>
            {experience.company} - {experience.location}
          </p>
          <div className="duration text-muted">
            <span>
              {moment(experience.startDate).format('MMM YYYY')} -
              {experience.endDate
                ? moment(experience.endDate).format('MMM YYYY')
                : 'N/A'} ({experience.endDate ? calculateDuration(experience.startDate, experience.endDate) : 'Ongoing'})
            </span>
          </div>
        </Col>

        {/* Right side - Documents */}
        <Col span={16}>
          <div className="document-section mt-3">
            {/* Hike Letter */}
            {/* {experience.hike_letter && ( */}
            <div className="document-item">
  
    
      <p>Hike Letter</p>
      {experience.hike_letter ? (
      <a
        href={BASE + experience.hike_letter}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/public/images/pdflogo1.svg"
          alt="PDF Logo"
          width={30}
          height={30}
        />
      </a>
   
  ) : (
    <p style={{paddingLeft:'20px'}}>-</p> // Display a dash if no document is present
  )}
</div>

            {/* )} */}

            {/* Offer Letter */}
            {/* {experience.offer_letter && ( */}
              <div className="document-item">
                <p>Offer Letter</p>
                {experience.offer_letter ? (
      <a
        href={BASE + experience.offer_letter}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/public/images/pdflogo1.svg"
          alt="PDF Logo"
          width={30}
          height={30}
        />
      </a>
   
  ) : (
    <p style={{paddingLeft:'20px'}}>-</p> // Display a dash if no document is present
  )}
              </div>
            {/* )} */}

            {/* Pay Slips */}
            {/* {experience.pay_slip_01 && ( */}
            <div className="document-item">
  <p>Pay Slips</p>
  {experience.pay_slip_01 || experience.pay_slip_02 || experience.pay_slip_03 ? (
    <>
      {experience.pay_slip_01 && (
        <a
          href={BASE + experience.pay_slip_01}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/public/images/pdflogo1.svg"
            alt="PDF Logo"
            width={30}
            height={30}
          />
        </a>
      )}
      {experience.pay_slip_02 && (
        <a
          href={BASE + experience.pay_slip_02}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/public/images/pdflogo1.svg"
            alt="PDF Logo"
            width={30}
            height={30}
          />
        </a>
      )}
      {experience.pay_slip_03 && (
        <a
          href={BASE + experience.pay_slip_03}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/public/images/pdflogo1.svg"
            alt="PDF Logo"
            width={30}
            height={30}
          />
        </a>
      )}
    </>
  ) : (
    <p>-</p> // Display a dash if no pay slips are available
  )}
</div>

            {/* )} */}

            {/* Separation Letter */}
            {/* {experience.separation_letter && ( */}
              <div className="document-item">
                <p>Separation Letter</p>
                {experience.separtion_letter ? (
      <a
        href={BASE + experience.separtion_letter}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/public/images/pdflogo1.svg"
          alt="PDF Logo"
          width={30}
          height={30}
        />
      </a>
   
  ) : (
    <p style={{paddingLeft:'20px'}}>-</p> // Display a dash if no document is present
  )}
              </div>
            {/* )} */}
            <div className="document-item">
  {experience.internship_certificate ? (
    <>
      <p>Internship Letter</p>
      <a
        href={BASE + experience.internship_certificate}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/public/images/pdflogo1.svg"
          alt="PDF Logo"
          width={30}
          height={30}
        />
      </a>
    </>
  ) : (
    "" // Render nothing if no document is present
  )}
</div>

            <div className="action-buttons">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditExperience(experience._id)}
            ></Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteExperience(experience._id)}
            ></Button>
          </div>
          </div>
          
        </Col>
      </Row>
    </div>
  ))
) : (
  <p>No experience details available.</p>
)}

          <Button
            style={{ margin: "15px" }}
            type="primary"
            onClick={() => setOpenDrawer(true)}
            icon={<PlusOutlined />}
          >
            Add Experience
          </Button>
 
          <div className="toolbar"  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginRight:'30px'
  }}>
         <Button
  type="primary"
  htmlType="submit"
  onClick={() => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Submitted:", values);
        // Trigger the onNextTab callback to navigate to the next tab
        if (typeof onNextTab === 'function') {
          onNextTab(); // Move to the next tab
        }
        form.submit();
      })
      .catch((error) => {
        console.error("Validation Failed:", error);
        message.error("Please fill all required fields.");
      });
  }}
>
  Save and Next
</Button>
 
          </div>
        </Form>
      </div>
    </>
  );
};
 
export default EducationalDetails;