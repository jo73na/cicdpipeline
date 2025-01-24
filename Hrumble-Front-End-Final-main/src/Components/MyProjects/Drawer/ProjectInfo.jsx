import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Tabs, Select, Button, Space,DatePicker ,InputNumber, Upload} from 'antd';
import { format, differenceInDays } from 'date-fns';
import {InboxOutlined} from '@ant-design/icons';
import moment from 'moment';


const { TabPane } = Tabs;
const { Dragger } = Upload;

const ProjectInfo =({projectDetails})=>{

    const [form] = Form.useForm();
      const [duration, setDuration] = useState(0);
      const [fileList, setFileList] = useState([]);

        // Handle date changes and calculate duration
        const handleDateChange = (dates, dateStrings) => {
          if (dates && dates[0] && dates[1]) {
            const daysDiff = differenceInDays(dates[1].toDate(), dates[0].toDate()) + 1;
            setDuration(daysDiff);
            form.setFieldsValue({ duration: daysDiff });
          }
        };
   
        console.log("Hiii", projectDetails)
  
   useEffect(() => {
       if (projectDetails) {
         form.setFieldsValue({
          clientName: projectDetails?.client_id.name,
          projectName: projectDetails.project_name,
          projectStatus: projectDetails.status,
          projectDates: [
            moment(projectDetails.startDate),
            moment(projectDetails.endDate)
          ],
          duration: projectDetails.duration,
          employeesNeeded: projectDetails.employees_needed,
          employeesAssigned: projectDetails.activeemployess,
           
         });
       }
     }, [projectDetails, form]);
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
       
           
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  label="Client Name"
                  name="clientName"
                  rules={[{ required: true, message: 'Please enter client  name' }]}
                >
                  <Input className='employeeForm'/>
                </Form.Item>
              </Col>
            </Row>
  
            {/* Contact Person Name Row */}
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  label="Project Name"
                  name="projectName"
                  rules={[{ required: true, message: 'Please enter project name' }]}
                >
                  <Input className='employeeForm'/>
                </Form.Item>
              </Col>
              <Col span={10}>
              <Form.Item
  label="Project Status"
  name="projectStatus"
  rules={[{ required: true, message: 'Please select the project status' }]}
>
  <Select className="employeeForm" placeholder="Select Project Status">
    <Select.Option 
      value="ongoing" 
      style={{ borderColor: 'lightorange', borderWidth: '1px', borderStyle: 'solid' }}
    >
      Ongoing
    </Select.Option>
    <Select.Option 
      value="completed" 
      style={{ borderColor: 'lightgreen', borderWidth: '1px', borderStyle: 'solid' }}
    >
      Completed
    </Select.Option>
  </Select>
</Form.Item>

              </Col>
            </Row>
  
            {/* Email and Phone Row */}
            <Row gutter={16}>
              <Col span={10}>
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
              <Col span={10}>
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
  
      
            <Row gutter={16}>
        <Col span={10}>
          <Form.Item
            label="No. of Employees Needed"
            name="employeesNeeded"
          >
            <InputNumber min={0} className="employeeForm" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="No. of Employees Assigned"
            name="employeesAssigned"
          >
            <InputNumber min={0} className="employeeForm" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Attachments"
            name="attachments"
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
    );
  };





export default ProjectInfo