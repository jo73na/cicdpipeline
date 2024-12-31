import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';

const TaskForm = ({ form, isModalOpen, handleCancel, handleSubmit, openJobs, personalDet }) => {
    const [hiringMode, setHiringMode] = useState('Hiring'); // Store the current hiring mode selection
    const isDisabled = true;
    const handleHiringModeChange = (value) => {
        setHiringMode(value); // Update the hiring mode when changed
        form.setFieldsValue({ tags: value }); // Update the form field dynamically
    };

    // Filter personal details based on the selected hiring mode
    const filteredPersonalDet = Array.isArray(personalDet)
        ? personalDet.filter((role) => {
              if (hiringMode === 'Hiring') {
                  return role.role === 'HR'; // Only map HR roles if "Hiring" mode is selected
              } else {
                  return role.role !== 'HR'; // Map all other roles when it's not "Hiring" mode
              }
          })
        : [];

    return (
        <Modal
            title="Add New Task"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={700}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Item
                            name="tags"
                            label="Tag"
                            rules={[{ required: true, message: 'Please select the mode' }]}
                        >
                            <Select
                                value={hiringMode} // Bind the value to the current state
                                onChange={handleHiringModeChange}
                            >
                                <Select.Option value="Hiring">Hiring</Select.Option>
                                <Select.Option value="Projects">Projects</Select.Option>
                                <Select.Option value="Finance">Finance</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    {/* <div className="col-md-6">
                        <Form.Item
                            name="title"
                            label="Task Name"
                            rules={[{ required: false, message: 'Please enter task name' }]}
                        >
                            <Input placeholder="Enter task name" disabled={true}/>
                            
                        </Form.Item>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Item
                            name="status"
                            label="Status"
                            initialValue="Pending"
                        >
                            <Select>
                                <Select.Option value="Pending">Pending</Select.Option>
                                <Select.Option value="In Progress">In Progress</Select.Option>
                                <Select.Option value="Cancelled">Cancelled</Select.Option>
                                <Select.Option value="Not Started">Not Started</Select.Option>
                                <Select.Option value="Completed">Completed</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    {hiringMode === 'Hiring' ? (
                        <div className="col-md-6">
                            <Form.Item
                                label="Job ID"
                                name="job_id"
                                rules={[{ required: false, message: 'Please select a Job ID' }]}
                            >
                                <Select
                                // mode="multiple"
                                    placeholder="Search Job ID"
                                    showSearch
                                    optionFilterProp="label"
                                    filterOption={(input, option) =>
                                        option?.label?.toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={openJobs.map((job) => ({
                                        label: `${job.job_id}`,
                                        value: job.job_id,
                                        key: job.job_id,
                                    }))}
                                    notFoundContent="No matching jobs found"
                                />
                            </Form.Item>
                        </div>
                    ) : (
                        <div className="col-md-6">
                            <Form.Item
                                name="other_tasks"
                                label="Other Tasks"
                                rules={[{ required: true, message: 'Please enter other tasks (max 28 words)' }]}
                            >
                                <Input.TextArea
                                    maxLength={28 * 5}
                                    placeholder="Enter other tasks"
                                />
                            </Form.Item>
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Item
                            name="startdate"
                            label="Start Date"
                            rules={[{ required: true, message: 'Please select start date' }]}
                        >
                            <DatePicker className="w-100" />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item
                            name="enddate"
                            label="End Date"
                            rules={[{ required: true, message: 'Please select end date' }]}
                        >
                            <DatePicker className="w-100" />
                        </Form.Item>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Item name="assign" label="Assigned To">
                            <Select
                                placeholder="Select Employee"
                                options={filteredPersonalDet.map((role) => ({
                                    label: role.name,
                                    value: role._id,
                                }))}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item
                            name="priority"
                            label="Priority"
                            initialValue="Medium"
                        >
                            <Select>
                                <Select.Option value="High">High</Select.Option>
                                <Select.Option value="Medium">Medium</Select.Option>
                                <Select.Option value="Low">Low</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-12">
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </div>
                <Form.Item className="mb-0">
                    <div className="d-flex justify-content-end">
                        <Button onClick={handleCancel} className="me-2">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Add Task
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskForm;
