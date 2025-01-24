import { Upload ,Form, Row, Col, Space, Button} from "antd";
import React, { useState, useEffect } from 'react';
import {InboxOutlined} from '@ant-design/icons';

const { Dragger } = Upload;

const ImportEmployee=()=>{
    const [form] = Form.useForm();
      const [fileList, setFileList] = useState([]);


       
            // File upload props
            const uploadProps = {
              name: 'file',
              multiple: true,
              fileList,
              beforeUpload: (file) => {
                const isValidType = ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type);
                if (!isValidType) {
                  message.error(`${file.name} is not a valid file type`);
                  return Upload.LIST_IGNORE;
                }
                setFileList(prev => [...prev, file]);
                return false; // Prevent auto upload
              },
              onRemove: (file) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFileList(newFileList);
              }
            };
          
            const onFinish = (values) => {
              console.log('Form values:', {
                ...values,
                files: fileList
              });
              // Add your submission logic here
            };
        
          const handleReset = () => {
            form.resetFields();
         
          setFileList([]);
          };
        


    return(

        <>
        <h5>Please follow the steps to import data into the system:</h5>
        <ul>
          <li>Download the sample file below.</li>
          <li>Open it in your system and add employee data into it.</li>
          <li>Save the file with the project name that you’re going to upload.</li>
          <li>After saving, click on the upload icon below and choose the file.</li>
        </ul>

        <h5 style={{color:"red"}}>Download Sample</h5>
        <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="p-4"
              >

<Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Attachments"
            name="attachments"
            rules={[{ required: true, message: 'Please upload a file before proceeding.' }]}
          >
            <Dragger {...uploadProps} >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{width:"100px"}} />
              </p>
              <p className="ant-upload-text">Click or drag files to upload</p>
              <p className="ant-upload-hint">
                Support for PDF, PNG, JPG files
              </p>
            </Dragger>
          </Form.Item>
        </Col>
      </Row>
        {/* Submit and Clear Buttons */}
        <Row>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={handleReset}>
                  Clear
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
              </Form>
      </>
    );
}


export default ImportEmployee