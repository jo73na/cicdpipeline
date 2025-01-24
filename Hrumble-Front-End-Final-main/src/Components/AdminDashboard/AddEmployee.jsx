import { Button, Form, Input, Select } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import EmployeeContext from '../../Providers/EmployeeProvider';
import UserManagementContext from '../../Providers/UserMangement';

const { Option } = Select;

const AddEmployee = ({ onClose }) => {
  const { addEmployee,fetchEmployFull,allEmployee } = useContext(EmployeeContext);
  const { parentRoles, childRoles, fetchchildRoles } = useContext(UserManagementContext);



  const [filteredDesignations, setFilteredDesignations] = useState([]);

  const [form] = Form.useForm();

  const roleNameToIdMap = parentRoles.reduce((acc, role) => {
    acc[role.name] = role._id;
    return acc;
  }, {});

  const handleDepartmentChange = (value) => {
    const parentId = roleNameToIdMap[value]; // Get the ID from the selected department name
    if (parentId) {
      fetchchildRoles(parentId); // Fetch child roles using the ID
    }
  };

  const onFinish = (values) => {
    console.log('AddEmployee Values:', values);
    addEmployee(values, onClose);
    form.resetFields();
  };

  return (
    <div className="p_t_15">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="col_5">
          <Form.Item
            label="Employee ID"
            name="employee_id"
            rules={[{ required: true, message: 'Please Enter Employee ID!' }]}
          >
            <Input placeholder="Enter ID"  />
          </Form.Item>
        </div>
        <div className="col_2 g_30">
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: 'Please Enter First Name' }]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname">
            <Input placeholder="Enter Last Name" />
          </Form.Item>
        </div>
        <div className="col_2 g_30">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please Enter Email!' }]}
          >
            <Input placeholder="Eg:abc@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="passwordHash"
            rules={[{ required: true, message: 'Please Enter Password!' }]}
          >
            <Input.Password placeholder="Enter Password" autoComplete="new-password" />
          </Form.Item>
        </div>
        <div className="col_2 g_30">
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please Select Department!' }]}
          >
           <Select
              placeholder="Select Department"
              onChange={handleDepartmentChange}
              options={parentRoles.map((role) => ({
                label: role.name, // Display name
                value: role.name, // Use name as value
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: false, message: 'Please Select Designation!' }]}
          >
           <Select
    placeholder="Select Designation"
    disabled={childRoles.length === 0} // Disable when no child roles are available
    options={childRoles.map((role) => ({
      label: role.name, // Display name
      value: role.name, // Use name as value
    }))}
  />
          
          </Form.Item>
        </div>
        <div className="col_2 g_30">
          <Form.Item
            label="Yearly CTC"
            name="yearly_ctc"
            rules={[{ required: true, message: 'Please Enter Yearly CTC!' }]}
          >
            <Input placeholder="Enter Value" />
          </Form.Item>
        </div>
        <div
          style={{
            gap: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button onClick={onClose} className="btn btn-danger btn-sm">
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddEmployee;
