import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Upload,
  message,
  Space,
  Row,
  Col,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";
import EmployeeContext from "../../Providers/EmployeeProvider";
import AddExperience from "../MyProfile/AddExperience";
import EditExperience from "../ProfilesEmployee/EditExperience";
import PDFlogo from "/images/pdf-file logo.svg";
import Loader from "../../Utils/Loader";
import CookieUtil from "../../Utils/Cookies";
 
const BASE = import.meta.env.VITE_BASE;
 
const EducationalDetails = ({ goSteps, setGoSteps, handlePrev }) => {
  const {
    handleOpenEditDrawer,
    handleOpenDeleteDrawer,
    educationExperiData,
    fetchEducation,
    Loading,
    EducationEmp,
    editPersonal,
  } = useContext(EmployeeContext);
 
  const [form] = Form.useForm();
  const [slcUpload, setSlcUpload] = useState(null);
  const [hscUpload, setHscUpload] = useState(null);
  const [degreeUpload, setDegreeUpload] = useState(null);
  const [additionalUpload, setAdditionalUpload] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
 
  const onFinish = (values) => {
    const formData = new FormData();
    const adminId = CookieUtil.get("admin_id");
 
    formData.append("edittype", values.education);
    slcUpload && formData.append("ssc_file", slcUpload);
    hscUpload && formData.append("hsc_file", hscUpload);
    degreeUpload && formData.append("degree_file", degreeUpload);
 
    values.additional_degree?.forEach((item, index) => {
      for (const key in item) {
        additionalUpload &&
          formData.append(`additional_degree[${index}][${key}]`, item[key]);
      }
    });
 
    editPersonal(formData, adminId);
    setGoSteps(goSteps + 1);
    message.success("Educational details saved successfully!");
  };
 
  const handleFileChange = (info, setFile) => {
    const { status, originFileObj } = info.file;
 
    if (status !== "uploading") {
      setFile(originFileObj);
    }
    if (status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };
 
  const uploadProps = (defaultFileList, setFile) => ({
    name: "file",
    multiple: false,
    action: `${BASE}test`,
    defaultFileList,
    onChange: (info) => handleFileChange(info, setFile),
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
    fetchEducation(adminId);
  }, []);
 
  return Loading ? (
    <Loader />
  ) : (
    <>
      <Drawer
        title="Add Experience"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={650}
      >
        <AddExperience />
      </Drawer>
      <Drawer
        title="Edit Experience"
        placement="right"
        onClose={() => setOpenEditDrawer(false)}
        open={openEditDrawer}
        width={650}
      >
        <EditExperience />
      </Drawer>
 
      <div>
        <h6 className="card_header">Education</h6>
        <p className="zive-onboarding-para">Add your course and certificate here.</p>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Exam/Course Name">
                <Input className="employeeForm" placeholder="SLC" disabled />
              </Form.Item>
              </Col>
              <Col span={6} style={{marginTop:"28px"}}>
              <Form.Item name="ssc_file">
                <Upload {...uploadProps([], setSlcUpload)}>
                  {!slcUpload && (
                    <Button icon={<UploadOutlined />}>Upload (PDF, PNG, JPG)</Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
                  </Row>
                  <Row gutter={[16,16]}>
            <Col span={6}>
              <Form.Item label="Exam/Course Name">
                <Input className="employeeForm"placeholder="HSC/Diploma" disabled />
              </Form.Item>
              </Col>
              <Col span={6} style={{marginTop:"25px"}}>
              <Form.Item name="hsc_file">
                <Upload {...uploadProps([], setHscUpload)}>
                  {!hscUpload && (
                    <Button icon={<UploadOutlined />}>Upload (PDF, PNG, JPG)</Button>
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
              <Col span={6} style={{marginTop:"25px"}}>
              <Form.Item name="degree_file">
                <Upload {...uploadProps([], setDegreeUpload)}>
                  {!degreeUpload && (
                    <Button icon={<UploadOutlined />}>Upload (PDF, PNG, JPG)</Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
 
          <Form.List name="additional_degree">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={[16, 16]} align="middle">
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "exam"]}
                        label="Exam/Course Name"
                        rules={[{ required: true, message: "Enter course name!" }]}
                      >
                        <Input  className="employeeForm" placeholder="Enter here" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "additional_certificate"]}
                        label="Document"
                        rules={[{ required: true, message: "Upload a document!" }]}
                      >
                        <Upload {...uploadProps([], setAdditionalUpload)}>
                          <Button icon={<UploadOutlined />}>Upload (PDF, PNG, JPG)</Button>
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
 
          <h6 className="card_header">Experience</h6>
          <p className="zive-onboarding-para">
            Add your previous working experience and internship details.
          </p>
 
          <Button
          style={{margin:"10px"}}
            type="primary"
            onClick={() => setOpenDrawer(true)}
            icon={<PlusOutlined />}
          >
            Add Experience
          </Button>
 
          <div className="toolbar">
            <Button style={{margin:"5px"}} onClick={handlePrev}>Prev</Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
 
export default EducationalDetails;