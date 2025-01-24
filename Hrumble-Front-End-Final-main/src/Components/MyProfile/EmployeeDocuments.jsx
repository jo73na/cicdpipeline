import { Row, Col, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FileText } from 'lucide-react';
import CookieUtil from '../../Utils/Cookies';
import EmployeeContext from '../../Providers/EmployeeProvider';
import { useContext, useEffect, useState } from 'react';
 
const BASE = import.meta.env.VITE_BASE;
 
const EmployeeDocuments = ({onNextTab, id}) => {
  const [form] = Form.useForm();
  const { employeeLogindata, fetchEmploy, editEmployee,FetchEmployeeTable } = useContext(EmployeeContext);
  const [adminID, setAdminID] = useState(null);
 
     useEffect(() => {
          FetchEmployeeTable();
        }, []);
 
  useEffect(() => {
    const adminIdFromCookie = CookieUtil.get('admin_id');
    if (id || adminIdFromCookie) {
      setAdminID(id || adminIdFromCookie);
      fetchEmploy(id || adminIdFromCookie);
    } else {
      console.error('Admin ID not found in cookies');
    }
  }, []);
 
  useEffect(() => {
    if (employeeLogindata?.basic) {
      const { backgroundCheckForm, authorizationForm } = employeeLogindata.basic;
  
      form.setFieldsValue({
        backgroundCheckForm: backgroundCheckForm
          ? [
              {
                uid: -1,
                name: 'Background Check Form',
                status: 'done',
                url: new URL(backgroundCheckForm, BASE).href,
              },
            ]
          : [], // Default empty array if no form data
        authorizationForm: authorizationForm
          ? [
              {
                uid: -2,
                name: 'Authorization Form',
                status: 'done',
                url: new URL(authorizationForm, BASE).href,
              },
            ]
          : [], // Default empty array if no form data
      });
    } else {
      // Default case where employeeLogindata is undefined or empty
      form.setFieldsValue({
        backgroundCheckForm: [],
        authorizationForm: [],
      });
    }
  }, [employeeLogindata, form]);
  
 
 
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append('adminID', id || adminID);
 
        // Append files to formData
        if (values.backgroundCheckForm) {
          values.backgroundCheckForm.forEach((file) => {
            formData.append('backgroundCheckForm', file.originFileObj);
          });
        }
        if (values.authorizationForm) {
          values.authorizationForm.forEach((file) => {
            formData.append('authorizationForm', file.originFileObj);
          });
        }
 
        // Send formData to backend
        editEmployee(formData, id || adminID);
         message.success('Documents added successfully!');
        onNextTab();
      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  };
 
  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <h6 style={{fontSize:"16px", color:"rgb(48, 64, 159)", fontFamily:"poppins", marginBottom:"6px", fontWeight:"500"}}>Documents</h6>
        <h10 style={{fontSize:"12px", color:"black", fontFamily:"poppins", marginBottom:"6px", fontWeight:"500"}}>
          Please download and fill out the two forms and upload them
        </h10>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
          <div style={{ color: 'blue', marginLeft: '10px', marginTop: '3px' }}> <img
          src="/public/images/pdflogo1.svg"
          alt="PDF Logo"
          width={60}
          height={60}
        />  </div>
            <h6 style={{ marginLeft: '10px', marginTop: '3px', fontSize: '10px' }}>Background Check Form</h6>
            <h6 style={{ marginLeft: '10px', marginTop: '3px', fontSize: '12px', fontStyle: 'underline', color: 'red' }}>Download</h6>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ color: 'blue', marginLeft: '10px', marginTop: '3px' }}> <img
          src="/public/images/pdflogo1.svg"
          alt="PDF Logo"
          width={60}
          height={60}
        />  </div>
            <h6 style={{ marginLeft: '10px', marginTop: '3px', fontSize: '10px' }}>Authorization Form</h6>
            <h6 style={{ marginLeft: '10px', marginTop: '3px', fontSize: '12px', fontStyle: 'underline', color: 'red' }}>Download</h6>
          </Col>
        </Row>
 
        {/* Background Check Form Upload */}
        <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
          <Col xs={24} sm={12} md={8}>
          <Form.Item>
    <Input
      style={{ marginTop: '25px' }}
      className="employeeForm"
      maxLength={12}
      placeholder="Background Check Form"
      disabled
      value={
        form.getFieldValue('backgroundCheckForm') &&
        form.getFieldValue('backgroundCheckForm')[0]?.name
          ? form.getFieldValue('backgroundCheckForm')[0].name
          : ''
      }
    />
  </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="backgroundCheckForm"
              label="Upload File"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: false, message: 'Upload Background verification form' }]}
            >
              <Upload
                name="file"
                action={`${BASE}test`}
                listType="file"
                maxCount={1}
                beforeUpload={(file) => {
                  const isPDF = file.type === 'application/pdf';
                  if (!isPDF) {
                    message.error('Only PDF files are allowed!');
                    return Upload.LIST_IGNORE;
                  }
                  return isPDF;
                }}
              >
                <Button icon={<UploadOutlined />} className='custom-upload-button'>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
 
        {/* Authorization Form Upload */}
        <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
          <Col xs={24} sm={12} md={8}>
          <Form.Item>
    <Input
      style={{ marginTop: '25px' }}
      className="employeeForm"
      maxLength={12}
      placeholder="Authorization Form"
      disabled
      value={
        form.getFieldValue('authorizationForm') &&
        form.getFieldValue('authorizationForm')[0]?.name
          ? form.getFieldValue('authorizationForm')[0].name
          : ''
      }
    />
  </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="authorizationForm"
              label="Upload File"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: false, message: 'Upload authorization form' }]}
            >
              <Upload
                name="file"
                action={`${BASE}test`}
                listType="file"
                maxCount={1}
                beforeUpload={(file) => {
                  const isPDF = file.type === 'application/pdf';
                  if (!isPDF) {
                    message.error('Only PDF files are allowed!');
                    return Upload.LIST_IGNORE;
                  }
                  return isPDF;
                }}
              >
                <Button icon={<UploadOutlined />}className='custom-upload-button'>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
         <div className="toolbar"  style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight:'30px'
                }}>
                       <Button
                type="primary"
                htmlType="submit"
                // onClick={() => {
                //   form
                //     .validateFields()
                //     .then((values) => {
                //       console.log("Form Submitted:", values);
             
                //       // Trigger the onNextTab callback to navigate to the next tab
                //       if (typeof onNextTab === 'function') {
                //         onNextTab(); // Move to the next tab
                //       }
                //       form.submit();
                //     })
                //     .catch((error) => {
                //       console.error("Validation Failed:", error);
                //       message.error("Please fill all required fields.");
                //     });
                // }}
              >
                Save and Next
              </Button>
             
                        </div>
 
        {/* <Button type="primary" htmlType="submit">
          Save and Next
        </Button> */}
      </Form>
    </>
  );
};
 
export default EmployeeDocuments;