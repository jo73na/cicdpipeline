import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import CookieUtil from '../../Utils/Cookies';
import { Modal, Form, Input, Select, DatePicker, Button, Tooltip } from 'antd';
import moment from 'moment';
import TaskContext from '../../Providers/TaskProvider';
import JobContext from "./../../Providers/JobProvider";
import EmployeeContext from "./../../Providers/EmployeeProvider";
import TaskForm from './TaskForm';
import TaskCounter from './TaskCounter';

const headersTitle = [
    { label: 'Employee ID', key: 'id' },
    { label: 'Invoice', key: 'invid' },
    { label: 'Status', key: 'status' },
    { label: 'Name', key: 'title' },
    { label: 'Start Date', key: 'startdate' },
    { label: 'End Date', key: 'enddate' },
    { label: 'Priority', key: 'select' },
];

const TaskManager = () => {
    const { tasks, fetchTasks, addTask, updateTask } = useContext(TaskContext);
    const { openJobs, fetchJob } = useContext(JobContext);
    const [tableData, setTableData] = useState(tasks);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [subtasks, setSubtasks] = useState({}); // State to hold subtasks
    const [form] = Form.useForm();
    const recordsPerPage = 13;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const npage = Math.ceil(tableData.length / recordsPerPage);
    const number = [...Array(npage + 1).keys()].slice(1);
    const { personalDet, fetchEmploy } = useContext(EmployeeContext);
    const role = CookieUtil.get("role");
    const adminCookie = CookieUtil.get("admin");
    const adminData = adminCookie ? JSON.parse(adminCookie) : {};
    const employeeEmail = adminData.email_id;
        const [isModalOpen, setIsModalOpen] = useState(false);
    

    const csvlink = {
        headers: headersTitle,
        data: tableData,
        filename: "csvfile.csv"
    };

    useEffect(() => {
        fetchTasks();
        fetchEmploy();
    }, []);

    useEffect(() => {
        setTableData(tasks);
    }, [tasks]);

    const handleEditTask = async (id, field, value) => {
        const updatedData = { [field]: value };
        await updateTask(id, updatedData);
        fetchTasks(); // Refresh tasks after update
    };

    const handleDoubleClickDescription = (task) => {
        setEditTask(task);
        setIsDescriptionModalOpen(true);
    };

    const handleDoubleClickDate = (task, dateField) => {
        setEditTask({ ...task, dateField });
        setIsDateModalOpen(true);
    };

    const handleDescriptionSubmit = async (values) => {
        await handleEditTask(editTask._id, 'description', values.description);
        setIsDescriptionModalOpen(false);
    };

    const handleDateSubmit = async (values) => {
        const updatedData = {
            [editTask.dateField]: values.date.format('DD MMM YYYY')
        };
        await updateTask(editTask._id, updatedData);
        setIsDateModalOpen(false);
    };

    const handleAddSubTask = (parentTaskId) => {
        const newSubtask = {
            task_id: `SUBTASK-${Math.floor(100000000 + Math.random() * 900000000)}`,
            task_title: 'New Subtask',
            parent_id: parentTaskId,
            // Add other default values as needed
        };

        setSubtasks(prev => ({
            ...prev,
            [parentTaskId]: [...(prev[parentTaskId] || []), newSubtask]
        }));
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const prePage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < nPages) setCurrentPage(currentPage + 1);
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'badge-danger'; // Danger color
            case 'Medium':
                return 'badge-light'; // Light color
            case 'Low':
                return 'badge-purple'; // Purple color
            default:
                return '';
        }
    };


    const renderSubtasks = (parentId) => {
        return (subtasks[parentId] || []).map((subtask, index) => (
            <tr key={subtask.task_id} className="subtask-row">
                <td>{index + 1}</td>
                <td>
                    <Input
                        defaultValue={subtask.task_title}
                        onBlur={(e) => handleEditTask(subtask.task_id, 'task_title', e.target.value)}
                        style={{ width: '200px', marginLeft: '20px' }} // Indent for subtasks
                    />
                </td>
                <td>
                    <Dropdown className="task-dropdown-2">
                        <Dropdown.Toggle as="div" className={subtask.status}>{subtask.status}</Dropdown.Toggle>
                        <Dropdown.Menu className='task-drop-menu'>
                            <Dropdown.Item onClick={() => handleAction(subtask.task_id, 'Pending')}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(subtask.task_id, 'Not Started')}>Not Started</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(subtask.task_id, 'In Progress')}>In Progress</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(subtask.task_id, 'Cancelled')}>Cancelled</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(subtask.task_id, 'Completed')}>Completed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
                <td onClick={() => handleDoubleClickDate(subtask, 'start_date')}>
                    <span>{moment(subtask.start_date).format('DD MMM YYYY')}</span>
                </td>
                <td onClick={() => handleDoubleClickDate(subtask, 'end_date')}>
                    <span>{moment(subtask.end_date).format('DD MMM YYYY')}</span>
                </td>
                <td>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        defaultValue={Array.isArray(subtask.assignedTo) ? subtask.assignedTo.map(user => user.email) : []}
                        onChange={(value) => handleEditTask(subtask.task_id, 'assignedTo', value)}
                    >
                        {personalDet.map(user => (
                            <Select.Option key={user.email} value={user.email}>{user.name}</Select.Option>
                        ))}
                    </Select>
                </td>
                <td>
                    <span className="badge badge-primary light border-0 me-1">{subtask.tags}</span>
                    <span className="badge badge-secondary light border-0 ms-1">{subtask.job_id}</span>
                </td>
                <td onDoubleClick={() => handleDoubleClickDescription(subtask)}>
                    <Tooltip title={subtask.description || '-'}>
                        <span className="truncate">{subtask.description || '-'}</span>
                    </Tooltip>
                </td>
                <td className="text-end">
                    <span className={getPriorityClass(subtask.priority)}>{subtask.priority}</span>
                </td>
                <td className="text-end">
                    <Button type="link" onClick={() => handleAddSubTask(subtask.task_id)}>+</Button>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <TaskCounter tasks={tasks} />
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-12'>
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects task-table">
                                    <div className="tbl-caption d-flex justify-content-between align-items-center">
                                        <h4 className="heading mb-0">Task</h4>
                                        <div className='d-flex justify-content-end'>
                                            <h4 className='btn btn-primary light btn-sm me-2' onClick={handleOpenModal}>Add Task</h4>
                                            <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
                                        </div>
                                    </div>
                                    <div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyeestbl2" className="table ItemsCheckboxSec dataTable no-footer ```javascript
                                        mb-2 mb-sm-0">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>{role === "SuperAdmin" ? "Assigned To" : "Assigned By"}</th>
                                                    <th>Department/Tags</th>
                                                    <th>Description</th>
                                                    <th className="text-end">Priority</th>
                                                    <th className="text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map((item, index) => (
                                                    <React.Fragment key={item._id}>
                                                        <tr className="hover-row">
                                                            <td><span>{index + 1}</span></td>
                                                            <td>
                                                                <Input
                                                                    defaultValue={item.task_title}
                                                                    onBlur={(e) => handleEditTask(item._id, 'task_title', e.target.value)}
                                                                    style={{ width: '200px' }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Dropdown className="task-dropdown-2">
                                                                    <Dropdown.Toggle as="div" className={item.status}>{item.status}</Dropdown.Toggle>
                                                                    <Dropdown.Menu className='task-drop-menu'>
                                                                        <Dropdown.Item onClick={() => handleAction(item._id, 'Pending')}>Pending</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleAction(item._id, 'Not Started')}>Not Started</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleAction(item._id, 'In Progress')}>In Progress</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleAction(item._id, 'Cancelled')}>Cancelled</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleAction(item._id, 'Completed')}>Completed</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>
                                                            <td onClick={() => handleDoubleClickDate(item, 'start_date')}>
                                                                <span>{moment(item.start_date).format('DD MMM YYYY')}</span>
                                                            </td>
                                                            <td onClick={() => handleDoubleClickDate(item, 'end_date')}>
                                                                <span>{moment(item.end_date).format('DD MMM YYYY')}</span>
                                                            </td>
                                                            <td>
                                                                <Select
                                                                    mode="multiple"
                                                                    style={{ width: '100%' }}
                                                                    defaultValue={Array.isArray(item.assignedTo) ? item.assignedTo.map(user => user.email) : []}
                                                                    onChange={(value) => handleEditTask(item._id, 'assignedTo', value)}
                                                                >
                                                                    {personalDet.map(user => (
                                                                        <Select.Option key={user.email} value={user.email}>{user.name}</Select.Option>
                                                                    ))}
                                                                </Select>
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-primary light border-0 me-1">{item.tags}</span>
                                                                <span className="badge badge-secondary light border-0 ms-1">{item?.job[0]?.job_id}</span>
                                                            </td>
                                                            <td onDoubleClick={() => handleDoubleClickDescription(item)}>
                                                                <Tooltip title={item?.description || '-'}>
                                                                    <span className="truncate">{item?.description || '-'}</span>
                                                                </Tooltip>
                                                            </td>
                                                            <td className="text-end">
                                                                <span className={getPriorityClass(item.priority)}>{item.priority}</span>
                                                            </td>
                                                            <td className="text-end">
                                                                <Button type="link" onClick={() => handleAddSubTask(item._id)}>+</Button>
                                                            </td>
                                                        </tr>
                                                        {renderSubtasks(item._id)} {/* Render subtasks under the parent task */}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            <div className='dataTables_info'>
                                                Showing {lastIndex - recordsPerPage + 1} to{" "}
                                                {tableData.length < lastIndex ? tableData.length : lastIndex}
                                                {" "}of {tableData.length} entries
                                            </div>
                                            <div className="dataTables_paginate paging_simple_numbers justify-content-center" id="example2_paginate">
                                                <Link className="paginate_button previous disabled" to="#" onClick={prePage}>
                                                    <i className="fa-solid fa-angle-left" />
                                                </Link>
                                                <span>
                                                    {number.map((n, i) => (
                                                        <Link className={`paginate_button ${currentPage === n ? 'current' : ''}`} key={i} onClick={() => handlePageChange(n)}>
                                                            {n}
                                                        </Link> ))}
                                                </span>
                                                <Link className="paginate_button next" to="#" onClick={nextPage}>
                                                    <i className="fa-solid fa-angle-right" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Editing Description */}
            <Modal
                title="Edit Description"
                visible={isDescriptionModalOpen}
                onCancel={() => setIsDescriptionModalOpen(false)}
                footer={null}
            >
                <Form onFinish={handleDescriptionSubmit}>
                    <Form.Item
                        name="description"
                        initialValue={editTask?.description}
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                        <Button onClick={() => setIsDescriptionModalOpen(false)}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal for Editing Dates */}
            <Modal
                title="Edit Date"
                visible={isDateModalOpen}
                onCancel={() => setIsDateModalOpen(false)}
                footer={null}
            >
                <Form onFinish={handleDateSubmit}>
                    <Form.Item
                        name="date"
                        rules={[{ required: true, message: 'Please select a date!' }]}
                    >
                        <DatePicker format="DD MMM YYYY" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                        <Button onClick={() => setIsDateModalOpen(false)}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TaskManager;
///////new sub task added