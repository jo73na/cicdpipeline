import {Row, Col, Form, Input, Upload, Button} from 'antd'
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {FileText} from "lucide-react"
 
 
const EmployeeDocuments =()=>{
    const [form] = Form.useForm();
   
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        message.success("Data saved successfully!");
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };
    return (
        <>
        <Form form={form} layout="vertical" onFinish={handleSave}>
        <h6 style={{color:"blue", marginTop:"5px"}}>Documents</h6>
        <h10 style={{color:"black", marginTop:"2px"}}>Please download and fill out the two form and upload it</h10>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
            <FileText size={70} strokeWidth={0.75} style={{color:"blue", marginLeft:"10px",marginTop:"3px",}} />
                <h6 style={{marginLeft:"10px", marginTop:"3px", fontSize:"10px"}}>Background check Form</h6>
                {/* Must add download pdf function */}
                <h6  style={{marginLeft:"10px", marginTop:"3px", fontSize:"12px", fontStyle:"underline", color:"red"}}>Download</h6>
               
 
                </Col>
                <Col xs={24} sm={12} md={8}>
            <FileText size={70} strokeWidth={0.75} style={{color:"blue", marginLeft:"10px",marginTop:"3px",}} />
                <h6 style={{marginLeft:"10px",marginTop:"3px",fontSize:"10px"}}>Authorization Form</h6>
                 {/* Must add download pdf function */}
                 <h6  style={{marginLeft:"10px", marginTop:"3px", fontSize:"12px", fontStyle:"underline", color:"red"}}>Download</h6>
         
            </Col>
 
        </Row>
        {/* Document Upload */}
         
        <Row gutter={[16, 16]} style={{marginTop:"10px"}}>
    <Col xs={24} sm={12} md={8} >
      <Form.Item
        name="background check form"
       
       
      >
        <Input
           style={{marginTop:"25px"}}
          className="employeeForm"
          maxLength={12}
          placeholder="Background Check Form"
          disabled="true"
        />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="Background Check Form"
        label="Upload File"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "upload Background verification form" }]}
      >
        <Upload
          name="backgroundverification"
          action="/upload.do"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
              message.error("Only PDF files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return isPDF;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={[16, 16]} style={{marginTop:"10px"}}>
    <Col xs={24} sm={12} md={8} >
      <Form.Item
        name="Authorization form"
      >
        <Input
        style={{marginTop:"25px"}}
       
          className="employeeForm"
          maxLength={12}
          placeholder="Authorization Form"
          disabled="true"
        />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        name="Authorization Form"
        label="Upload File"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "upload authorization form" }]}
      >
        <Upload
          name="authorization Form"
          action="/upload.do"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
              message.error("Only PDF files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return isPDF;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>
   <Button type="primary" htmlType="submit">
          Save
        </Button>
  </Form>
 
        </>
    );
}
 
export default EmployeeDocuments;