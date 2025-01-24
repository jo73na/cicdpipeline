import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, InputNumber, Upload, Button, Space, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { differenceInDays } from 'date-fns';
import ClientContext from '../../../Providers/ClientProvider';
import CookieUtil from '../../../Utils/Cookies';


const BASE = import.meta.env.VITE_BASE; 

const { Dragger } = Upload;

const AddProjects = ({ projectSingle }) => {
  const [form] = Form.useForm();
  const [duration, setDuration] = useState(0);
  const [fileList, setFileList] = useState([]);
  const { handleAddProject } = useContext(ClientContext);
  const adminId = CookieUtil.get('admin_id');
  
  const handleDateChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      const daysDiff = differenceInDays(dates[1].toDate(), dates[0].toDate()) + 1;
      setDuration(daysDiff);
      form.setFieldsValue({ duration: daysDiff });
    }
  };

  useEffect(() => {
    if (projectSingle) {
      form.setFieldsValue({ clientName: projectSingle.name });
    }
  }, [projectSingle, form]);

  const uploadProps = {
    name: 'file',  // Name of the file input
    multiple: true, // Allow multiple files
    fileList, // Current file list
    beforeUpload: async (file) => {
      const isValidType = ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type);
      if (!isValidType) {
        message.error(`${file.name} is not a valid file type`);
        return Upload.LIST_IGNORE;  // Ignore invalid file types
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch(`${BASE}test`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          const fileUrl = result.url; // Assuming the backend responds with the file URL
  
          // Update fileList with the URL returned from the backend
          setFileList(prev => [
            ...prev,
            { ...file, url: fileUrl }
          ]);
  
          message.success(`${file.name} file uploaded successfully`);
        } else {
          message.error(`${file.name} file upload failed`);
        }
      } catch (error) {
        message.error(`Upload failed: ${error.message}`);
      }
  
      return false; // Prevent default behavior (i.e., don't upload immediately)
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList); // Update fileList after removal
    }
  };
  

  const onFinish = (values) => {
    const { projectDates, ...rest } = values;
    const [startDate, endDate] = projectDates;
  
    // Use the URLs from the fileList for the sow field
    const uploadedFiles = fileList.map((file) => file.url);  // This will be just the relative paths now
  
    const payload = {
      project_name: rest.project_name,
      client_id: projectSingle ? projectSingle._id : null,
      employees_needed: rest.employeesNeeded,
      employees_assigned: rest.employeesAssigned,
      sow: uploadedFiles.join(', '),
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      duration:rest.duration,
      status: 'Ongoing',
      created_by: adminId,
    };
  
    console.log('Form values:', payload);
    handleAddProject(payload); // Send the payload to the backend
  };
  
  
  

  const handleReset = () => {
    form.resetFields();
    setDuration(0);
    setFileList([]);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="p-4"
    >
      {/* Client Name Row */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Client Name"
            name="clientName"
          >
            <Input className='employeeForm' disabled />
          </Form.Item>
        </Col>
      </Row>

      {/* Project Name Row */}
      <Row gutter={2}>
        <Col span={8}>
          <Form.Item
            label="Project Name"
            name="project_name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input className='employeeForm' />
          </Form.Item>
        </Col>
      </Row>

      {/* Project Duration Row */}
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Project Duration"
            name="projectDates"
            rules={[{ required: true, message: 'Please select project dates' }]}
          >
            <DatePicker.RangePicker
              onChange={handleDateChange}
              className="w-full"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Duration (Days)"
            name="duration"
          >
            <Input
              value={duration}
              disabled
              className="employeeForm"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Employees Row */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="No. of Employees Needed"
            name="employeesNeeded"
          >
            <InputNumber min={0} className="employeeForm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="No. of Employees Assigned"
            name="employeesAssigned"
          >
            <InputNumber min={0} className="employeeForm" />
          </Form.Item>
        </Col>
      </Row>

      {/* Attachments Row */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Attachments"
            name="attachments"
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
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
  );
};

export default AddProjects;
