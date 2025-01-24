import {Form, Input,Button,Row, Col, Checkbox } from 'antd';
import {useState} from 'react';



const ProjectDetailFilter =({ onFilterChange, onClose })=>{
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const selectedFilters = values.status || ['All']; 
    onFilterChange(selectedFilters); 
    onClose(); 
  };

  const handleReset = () => {
    form.resetFields();
    onFilterChange(['All']); 
  };


      const options = [
        {
          label: 'All',
          value: 'All',
        },
        {
          label: 'Working',
          value: 'Working',
        },
        {
          label: 'Relieved',
          value: 'Relieved',
        },
        {
            label: 'Terminated',
            value: 'Terminated',
          },
      ];
      

      return(
        <>
        <Form form={form} onFinish={handleFinish} layout='vertical'>
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
        
        </>
      );

}


export default ProjectDetailFilter