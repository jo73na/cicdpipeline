import { Form, Input, Button, Row, Col, Checkbox } from 'antd';
import { useState } from 'react';

const ProjectFilter = ({ onFilterChange, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const selectedFilters = values.status || ['All']; // Default to 'All' if no status is selected
    onFilterChange(selectedFilters); // Notify the parent about the selected filters
    onClose(); // Close the filter drawer after applying
  };

  const handleReset = () => {
    form.resetFields();
    onFilterChange(['All']); // Reset to show all projects
  };

  const options = [
    { label: 'All', value: 'All' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <h4 style={{ fontSize: '14px', marginTop:'10px', marginBottom:'10px' }}>Project Status</h4>
      <Row gutter={24}>
  <Col xs={24}>
    <Form.Item name="status">
      <Checkbox.Group 
        options={options} 
        style={{ marginBottom: '10px', display: 'flex', gap: '10px' }} 
      />
    </Form.Item>
  </Col>
</Row>

      <h4>Revenue</h4>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="From" label="From">
            <Input className="employeeForm" style={{ marginBottom: '10px' }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="To" label="To">
            <Input className="employeeForm" style={{ marginBottom: '10px' }} />
          </Form.Item>
        </Col>
      </Row>
      <h4>Profit</h4>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="From" label="From">
            <Input className="employeeForm" style={{ marginBottom: '10px' }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="To" label="To">
            <Input className="employeeForm" style={{ marginBottom: '10px' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: '20px' }}>
        <Col>
          <Button className="btn_cancel" onClick={handleReset} style={{ marginRight: '10px' }}>
            Clear
          </Button>
          <Button className="btn" type="primary" htmlType="submit">
            Apply
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectFilter;
