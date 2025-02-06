import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import CountUp from 'react-countup';
import { CSVLink } from 'react-csv';
import CookieUtil from '../../Utils/Cookies';
import { Modal, Form, Input, Select, Button, Tooltip,Popover,Flex, Tag, Table  } from 'antd';
import moment from 'moment';
import TaskContext from '../../Providers/TaskProvider';
import JobContext from "./../../Providers/JobProvider";
import EmployeeContext from "./../../Providers/EmployeeProvider";
import TaskForm from './TaskForm';
import TaskCounter from './TaskCounter';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { IconButton } from '@mui/material';
import TaskDetailsModal from './TaskDetailModal';

import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
import SubTask from './SubTask';
import { PlusOutlined } from '@ant-design/icons';
import { Trash, Eye, Plus, UserRoundPlus, Calendar } from 'lucide-react';

const headersTitle = [
    {label:'Employee ID', key:'id'},
    {label:'Invoice', key:'invid'},
    {label:'Status', key:'status'},
    {label:'Name', key:'title'},
    {label:'Start Date', key:'startdate'},
    {label:'End Date', key:'enddate'},
    {label:'Priority', key:'select'},
]
 
 
 
const TaskManager = () => {
	const {tasks, fetchTasks,fetchUsers,adminUsers, addTask, updateTask,patchTask,deleteTask} = useContext(TaskContext);
    // const cardCounter = calculateTaskCounts(tasks);
	const {fetchJob, allJobs} = useContext(JobContext);
    const [tableData, setTableData] = useState(tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [records, setRecords] = useState([]);
    // const records = tableData.slice(firstIndex, lastIndex);
 
    const [statusPriority, setStatusPriority] = useState(records);
    const [unchecked, setUnChecked] = useState(true);
	const {personalDet, fetchEmploy}=useContext(EmployeeContext)
    const role = CookieUtil.get("role");
    const adminCookie = CookieUtil.get("admin");
    const adminData = adminCookie ? JSON.parse(adminCookie) : {};
    const employeeEmail = adminData.email_id;
    const [editingField, setEditingField] = useState(null);
    const [editingDateField, setEditingDateField] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
const [filteredEmployees, setFilteredEmployees] = useState(adminUsers);
const [datePickerWidth, setDatePickerWidth] = useState('100px'); 
const [subtasks, setSubtasks] = useState({});
const [expandedRowKeys, setExpandedRowKeys] = useState([]);
// const filteredEmployees = adminUsers?.length ? adminUsers : []; 




	console.log("personalDet",adminUsers)
	console.log("Tasks:::", tasks)


	useEffect(() => {
		fetchTasks();
        fetchEmploy();
        fetchUsers();
	}, []);
    useEffect(() => {
        // Filter parent tasks (tasks without parent_id) and sort by createdAt descending
        const sortedParentTasks = tasks
            .filter(task => !task.parent_id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        setTableData(sortedParentTasks);
    
        // Create a mapping of tasks to their subtasks
        const taskMap = {};
        tasks.forEach(task => {
            if (task.parent_id) {
                if (!taskMap[task.parent_id]) {
                    taskMap[task.parent_id] = [];
                }
                taskMap[task.parent_id].push(task);
            }
        });
        setSubtasks(taskMap); // Store the mapping in state
    }, [tasks]);
    
    useEffect(() => {
        // Filter tasks based on user role
        const filteredTasks = role === "SuperAdmin"
            ? tasks // Do not filter tasks for SuperAdmin
            : tasks.filter(task =>
                task.assignedTo?.some(assigned => assigned.email === employeeEmail)
            );
    
        // Group parent tasks and subtasks
        const parentTasks = filteredTasks.filter(task => !task.parent_id);
        const tasksWithSubtasks = parentTasks
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt descending
            .map(parent => ({
                ...parent,
                subtasks: filteredTasks
                    .filter(subtask => subtask.parent_id === parent._id)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), // Optionally sort subtasks too
            }));
    
        setTableData(tasksWithSubtasks);
    }, [tasks, role, employeeEmail]);
    


   

	useEffect(() => {
		fetchJob();
	  }, []);
    
   
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
 
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setIsViewModalOpen(false);
    };

  
    const handleSelect = async (id, value) => {
        let temp = statusPriority.map((data) => {
            if (id === data.id) {
                return { ...data, select: value };
            }
            return data;
        });
        setStatusPriority(temp);

        // Update main tableData as well
        setTableData(prevData =>
            prevData.map(data => {
                if (id === data.id) {
                    return { ...data, select: value };
                }
                return data;
            })
        );

        // Call the updateTask function to update the task in the database
        const updatedData = { priority: value };
        await updateTask(id, updatedData);
    };

    const handleAction = async (id, value) => {
        let temp = statusPriority.map((data) => {
            if (id === data.id) {
                return { ...data, status: value };
            }
            return data;
        });
        setStatusPriority(temp);

        // Update main tableData as well
        setTableData(prevData =>
            prevData.map(data => {
                if (id === data.id) {
                    return { ...data, status: value };
                }
                return data;
            })
        );

        // Call the updateTask function to update the task in the database
        const updatedData = { status: value };
        await updateTask(id, updatedData);
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

 
   
    const handleSubmit = async (values) => {
        // Generate new ID based on last entry
        // const newId = (parseInt(tableData[tableData.length - 1].id) + 1).toString().padStart(2, '0');
//         let currentId = 1; 

// const generateTaskId = () => {
//   const newInvId = `TASK-${String(currentId).padStart(3, '0')}`; // Format to 3 digits
//   currentId++; // Increment for next task
//   return newInvId;
// };

// const newId = (parseInt(tableData[tableData.length - 1].id) + 1).toString().padStart(2, '0');
const newInvId = `TASK-${Math.floor(100000000 + Math.random() * 900000000)}`;
    
        const newTaskData = {
            
            // id: newId,
            task_id: newInvId,
            task_title: values.title,
            status: values.status,
            start_date: values.startdate.format('DD MMM YYYY'),
            end_date: values.enddate.format('DD MMM YYYY'),
            tags: values.tags,
            priority: values.priority,
            assign_task: values.assign,
            job_id: values.job_id,
            description: values.description,
            other_tasks: values.other_tasks
            // inputchecked: false
        };
    
        try {
            // Call the addTask function to send the new task data to the server
            await addTask(newTaskData);
    
            // Reset form and close modal
            form.resetFields();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to add task:", error);
            // Handle error (e.g., show a notification)
        }
    };
   
	console.log("statuspririty:",statusPriority)


/////Table edit functions/////

const handleDoubleClick = (fieldId) => {
    setEditingField(fieldId); // Enter editing mode
  };

  const handleClick = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true); // Open the modal on single click
  };

 
  const handleEditTask = async (id, updates) => {
    // Ensure updates is an object containing all fields to be updated
    const updatedData = { ...updates }; // Spread the updates object to include all fields
    await updateTask(id, updatedData);
    setEditingField(null); // Exit editing mode after saving
};
    const handleEditDescription = async (taskId, newDescription) => {
        try {
            const updatedData = { description: newDescription };
            await updateTask(taskId, updatedData); // Assuming updateTask is the function to update task data
            // Optionally, you can provide feedback or update local state if necessary
            console.log(`Description updated for task ${taskId}`);
        } catch (error) {
            console.error('Failed to update description:', error);
        }
    };
    
    const handleDateChange = async (taskId, field, date) => {
        if (date) {
            // Convert the date to a moment object and format it
            const updatedData = { [field]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') }; // Format to match your API
            await updateTask(taskId, updatedData);
            fetchTasks(); // Refresh tasks after update
        }
    };


    const handleSearch = (query) => {
        // Update the search query state
        setSearchQuery(query);
    
        // Ensure adminUsers is always an array
        const employees = Array.isArray(adminUsers) ? adminUsers : [];
    
        // If the query is empty, reset to all employees
        if (!query) {
            setFilteredEmployees(employees);
            return;
        }
    
        // Filter employees based on the search query
        setFilteredEmployees(
            employees.filter(employee => {
                const firstName = employee.name || ''; // Default to empty string if undefined
                const email = employee.email_id || ''; // Default to empty string if undefined
    
                return firstName.toLowerCase().includes(query.toLowerCase()) || 
                       email.toLowerCase().includes(query.toLowerCase());
            })
        );
    };
    

	console.log("search",searchQuery)

    const handleAssign = async (taskId, employee) => {
        const patchData = {
          $push: {
            assign_task: [employee._id], // Add the employee ID to assign_task
          },
        };
      
        try {
          console.log('Assigning user:', patchData);
          await patchTask(taskId, patchData); // Call API to update the task
        } catch (error) {
          console.error('Failed to assign user:', error);
        }
      };
      

      const handleRemoveUser = async (userId, item) => { 
        const patchData = {
            $pull: {
                assign_task: { $in: [userId] }, // Ensure the correct structure for `$pull`
            },
        };
    
        try {
            console.log('Sending patch data for remove:', patchData);
            await patchTask(item._id, patchData); // Call API to update the task
        } catch (error) {
            console.error('Failed to remove user:', error);
        }
    };
    
    const handleDeleteTask = (taskId) => {
        deleteTask(taskId);
    };
    ///subtask
    let taskCounter = 1; // Initialize a counter for task IDs

const generateTaskId = () => {
    const formattedId = String(taskCounter).padStart(3, '0'); // Format the ID to be three digits
    taskCounter++; // Increment the counter for the next ID
    return `SUBTASK-${formattedId}`; // Return the formatted task ID
};
    const handleAddSubTask = async (parentTaskId) => {
        const newSubtask = {
          task_id: generateTaskId(),
          task_title: '',
          status: 'Pending',
          tags:'Hiring',
          start_date: null,
          end_date: null,
          priority: 'Low',
          parent_id: parentTaskId,
          description: '',
        //   job_id:["674d7e81d692372658922785"],
        other_tasks:'',
          assignedTo: []
        };
      
        try {
          const response = await addTask(newSubtask);
          setSubtasks(prev => ({
            ...prev,
            [parentTaskId]: [...(prev[parentTaskId] || []), response.data]
          }));
          fetchTasks(); // Refresh tasks after adding subtask
          return response.data._id;
        } catch (error) {
          console.error('Failed to add subtask:', error);
        }
      };
    
      const handleAddSubTaskAndFocus = async (parentTaskId) => {
        const newSubtaskId = await handleAddSubTask(parentTaskId);
        if (newSubtaskId) {
            // Set the editing field to the new subtask's title field
            setEditingField(`subtask-${newSubtaskId}-task_title`);
    
            // Expand the parent task
            setExpandedRowKeys((prevKeys) => [...new Set([...prevKeys, parentTaskId])]);
        }
    };
    
    const handleBlur = (field, value) => {
        handleEditTask(subtasks._id, { [field]: value });
        setEditingField(null);
      };

      const handleEnterKey = (event, field, subtaskId) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent default form submission behavior
          const value = event.target.value.trim(); // Get the entered value
          if (value) {
            handleEditTask(subtaskId, { [field]: value }); // Save the value for the field
            setEditingField(null); // Exit editing mode
          }
        }
      };
    
      const columns = [
        {
            title: 'Task Name',
            dataIndex: 'job',
            width: 150,
            render: (job, record) => {
                if (job && job.length > 0) {
                    return (
                        <div>
                            <div>{job[0].job_title}</div>
                            <Tag
                                style={{
                                    borderRadius: "4px",
                                    fontSize: "7px",
                                    height: '40%',
                                    backgroundColor:"#696e68"
                                }}
                                color="#36802d"
                            >
                                {job[0].jobclient_id}
                            </Tag>
                        </div>
                    );
                } else if (record.other_tasks) {
                    return <div>{record.other_tasks}</div>;
                }
                return null;
            },
            
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 150,
            render: (status, record) => (
                <Dropdown className="task-dropdown-2">
                    <Dropdown.Toggle as="div" className={status}>
                        {status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="task-drop-menu">
                        <Dropdown.Item onClick={() => handleAction(record._id, 'Pending')}>Pending</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleAction(record._id, 'Not Started')}>Not Started</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleAction(record._id, 'In Progress')}>In Progress</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleAction(record._id, 'Cancelled')}>Cancelled</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleAction(record._id, 'Completed')}>Completed</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            width: 200,
            render: (start_date, record) => (
                editingDateField === `${record._id}-start_date` ? (
                    <DatePicker
                        selected={moment(record.start_date).toDate()}
                        onChange={(date) => {
                            handleDateChange(record._id, 'start_date', date);
                            setEditingDateField(null); // Close the editor
                        }}
                        onBlur={() => setEditingDateField(null)}
                        dateFormat="dd/MM/yyyy"
                        style={{ width: '100px' }} // Adjust width as needed
                    />
                ) : (
                    <span
                        onClick={() => setEditingDateField(`${record._id}-start_date`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {moment(record.start_date).format('DD MMM YYYY')}
                    </span>
                )
            ),
        },
        
        {
            title: 'End Date',
            dataIndex: 'end_date',
            width: 200,
            render: (end_date, record) => (
                editingDateField === `${record._id}-end_date` ? (
                    <DatePicker
                        selected={moment(record.end_date).toDate()}
                        onChange={(date) => {
                            handleDateChange(record._id, 'end_date', date);
                            setEditingDateField(null); // Close the editor
                        }}
                        onBlur={() => setEditingDateField(null)}
                        dateFormat="dd/MM/yyyy"
                        style={{ width: '100px' }} // Adjust width as needed
                    />
                ) : (
                    <span
                        onClick={() => setEditingDateField(`${record._id}-end_date`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {moment(record.end_date).format('DD MMM YYYY')}
                    </span>
                )
            ),
        },
        {
            title: 'Assignee',
            dataIndex: 'assignedTo',
            width: 150,
            render: (assignedTo, record) => (
                <div className="avatar-list avatar-list-stacked">
                    <Popover
                        content={
                            <div style={{ width: 200 }}>
                                <Input
                                    placeholder="Search name or email"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <div style={{ maxHeight: 200, overflowY: "auto", marginTop: 10 }}>
                                    {filteredEmployees.map((employee) => (
                                        <div
                                            key={employee._id}
                                            style={{
                                                padding: 5,
                                                cursor: "pointer",
                                                borderBottom: "1px solid #f0f0f0",
                                            }}
                                            onClick={() => handleAssign(record._id, employee)}
                                        >
                                            <strong>{employee.name}</strong>
                                            <br />
                                            <span style={{ fontSize: "10px", color: "#888" }}>
                                                {employee.email}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        trigger="click"
                    >
                        <div className="assigned-user-list">
                            {assignedTo?.length > 0 ? (
                                assignedTo.map((user, index) => (
                                    <Tooltip key={user._id} title={user.name} placement="top">
                                        <div
                                            className="assigned-user"
                                            style={{
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#007bff",
                                                color: "#fff",
                                                fontSize: "10px",
                                                fontWeight: "bold",
                                                width: "23px",
                                                height: "23px",
                                                marginLeft: index > 0 ? "-5px" : "0",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                position: "relative",
                                            }}
                                        >
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0].toUpperCase())
                                                .join("")}
                                            <button
                                                style={{
                                                    position: "absolute",
                                                    top: "-5px",
                                                    right: "-5px",
                                                    background: "grey",
                                                    border: "none",
                                                    color: "#fff",
                                                    fontSize: "10px",
                                                    cursor: "pointer",
                                                    borderRadius: "50%",
                                                    width: "13px",
                                                    height: "13px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering the popover
                                                    handleRemoveUser(user._id, record); // Pass the user ID and record
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </Tooltip>
                                ))
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontStyle: "italic",
                                        color: "#888",
                                        fontSize: "12px",
                                        margin: "5px 0",
                                        cursor: "pointer",
                                        transition: "color 0.3s, transform 0.3s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = "#007bff";
                                        e.target.style.transform = "scale(1.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "#888";
                                        e.target.style.transform = "scale(1)";
                                    }}
                                >
                                    <UserRoundPlus size={16} strokeWidth={0.75} />
                                </div>
                            )}
                        </div>
                    </Popover>
                </div>
            ),
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            width: 200,
            render: (tags, record) => (<span className="badge badge-secondary light border-0 ms-1" style={{fontSize:'10px', height:'60%', width:'auto'}}>{record.tags}</span>

            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 200,
            render: (description, record) => ( <Popover
                    content={
                        <Input.TextArea
                            defaultValue={record?.description || ''}
                            onBlur={(e) => handleEditDescription(record._id, e.target.value)} // Function to handle the update
                            autoFocus
                            rows={3}  // Adjust the number of rows (lines) visible
                            style={{ width: '300px' }}  // Adjust width as needed
                        />
                    }
                    title="Edit Description"
                    trigger="hover"
                    placement="top"
                    overlayStyle={{ width: '330px', height: '120px' }} // Adjust popover size
                >
                    <span className="truncate">
                        {record?.description || '-'}
                    </span>
                </Popover>
            ),
        },{
            title: 'Priority',
            dataIndex: 'proirity',
            width: 150,
            render: (tags, record) => (
                 role === "Employee" ? (
                                    // <span className="badge badge-light">{item.priority}</span> 
                                     <span className={getPriorityClass(record.priority)}>{record.priority}</span>
                                ) : (
                                    <Dropdown className="task-dropdown-2">
                                        <Dropdown.Toggle as="div"  className={record.priority}>{record.priority}</Dropdown.Toggle>
                                        <Dropdown.Menu className='task-drop-menu'>
                                            <Dropdown.Item onClick={() => handleSelect(record._id, 'High')}>High</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSelect(record._id, 'Medium')}>Medium</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleSelect(record._id, 'Low')}>Low</Dropdown.Item>                                                                    
                                        </Dropdown.Menu>
                                    </ Dropdown>
                                )

            ),
        },
        {
            title: 'Action',
            width: 150,
            render: (text, record) => (
               <div className="d-flex justify-content-center  gap-2">
                         <Button 
                           type="link" 
                           onClick={() => handleAddSubTaskAndFocus(record._id)}
                           icon={<Plus size='10px'/>}
                           style={{
                               fontSize:"6px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             height: "20px", // Adjust the height as needed
                             width: "20px", // Adjust the width as needed
                             borderRadius: "25%", // Makes the background circular
                             backgroundColor: "#321F69", // Initial background color
                             cursor: "pointer", // Pointer cursor for interactivity
                             transition: "background-color 0.3s, color 0.3s", 
                             color:'white'
                           }}
                         /><Button 
                         type="link" 
                         onClick={() => handleClick(record)}
                         icon={<Eye size='10px' />}
                         style={{
                             fontSize:"6px",
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           height: "20px", // Adjust the height as needed
                           width: "20px", // Adjust the width as needed
                           borderRadius: "25%", // Makes the background circular
                           backgroundColor: "#321F69", // Initial background color
                           cursor: "pointer", // Pointer cursor for interactivity
                           transition: "background-color 0.3s, color 0.3s", 
                           color:'white'
                         }}/>
                          <Button 
                           type="link" 
                           onClick={() => handleDeleteTask(record._id)}
                           icon={<Trash size='10px' />}
                           style={{
                               fontSize:"6px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             height: "20px", // Adjust the height as needed
                             width: "20px", // Adjust the width as needed
                             borderRadius: "25%", // Makes the background circular
                             backgroundColor: "#FF5E5E", // Initial background color
                             cursor: "pointer", // Pointer cursor for interactivity
                             transition: "background-color 0.3s, color 0.3s", 
                             color:'white'
                           }}
                         />
                          
                         </div>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        console.log("Subtasks for record:", record.subtasks);
        const subtaskColumns = [
            {
                title: 'Subtask Name',
                dataIndex: 'task_title',
                render: (task_title, record) =>(
                   <div className="products" style={{ marginLeft: '0px' }}>
                       <div>
                         <h4
                           style={{
                             margin: '0px',
                             lineHeight: '1',
                             cursor: 'pointer',
                             transition: 'color 0.3s',
                           }}
                           onMouseEnter={(e) => (e.target.style.color = '#007bff')} // Change color on hover
                           onMouseLeave={(e) => (e.target.style.color = 'inherit')} // Reset color on hover out
                           onClick={() => handleDoubleClick(`subtask-${record._id}-task_title`)} // Trigger editing mode on click
                         >
                           {editingField === `subtask-${record._id}-task_title` ? (
                             <Input
                               defaultValue={record.task_title || ''}
                               placeholder="Enter name" 
                               onBlur={(e) => handleBlur('task_title', e.target.value)} // Save the entered value on blur
                               onKeyDown={(e) => handleEnterKey(e, 'task_title', record._id)} // Optional: handle enter key to save on enter
                               autoFocus
                               style={{
                                 border: 'none',
                                 width: '120px', // Adjust width as needed
                                 height: '15px',
                                 marginLeft: '-7px',
                               }}
                             />
                           ) : (
                             <span style={{ fontSize: '10px' }}>{record.task_title || <Plus size='12px'/> }</span> // Display entered name or placeholder
                           )}
                         </h4>
                         {/* <span style={{ fontSize: '8px' }}>{record.task_id}</span> */}
                       </div>
                     </div>
                ),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: (status, record) => (
                    <Dropdown className="task-dropdown-2">
                        <Dropdown.Toggle as="div" className={status} style={{fontSize:"10px"}}>
                            {status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="task-drop-menu" style={{fontSize:"10px"}} >
                            <Dropdown.Item onClick={() => handleAction(record._id, 'Pending')} style={{fontSize:"10px"}}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(record._id, 'Not Started')}style={{fontSize:"10px"}}>Not Started</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(record._id, 'In Progress')}style={{fontSize:"10px"}}>In Progress</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(record._id, 'Cancelled')}style={{fontSize:"10px"}}>Cancelled</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(record._id, 'Completed')}style={{fontSize:"10px"}}>Completed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ),
            },
            {
                title: 'Start Date',
                dataIndex: 'start_date',
                width:'100px',
                render: (start_date, record) => (
                    editingDateField === `${record._id}-start_date` ? (
                        <DatePicker
                            selected={record.start_date ? moment(record.start_date).toDate() : null}
                            onChange={(date) => {
                                handleDateChange(record._id, 'start_date', date);
                                setEditingDateField(null); // Close the editor
                            }}
                            onBlur={() => setEditingDateField(null)}
                            dateFormat="dd/MM/yyyy"
                            style={{ width: '100px', fontSize:"10px" }} // Adjust width as needed
                        />
                    ) : (
                        <span
                            onClick={() => setEditingDateField(`${record._id}-start_date`)}
                            style={{ cursor: 'pointer', color: record.start_date ? 'inherit' : 'none', textDecoration: record.start_date ? 'none' : 'underline', fontSize:"10px" }}
                            onMouseEnter={(e) => {
                                e.target.style.color = "#007bff";
                                e.target.style.transform = "scale(1.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = "#888";
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            {record.start_date ? moment(record.start_date).format('DD MMM YYYY') : <Calendar size={16} strokeWidth={0.75}/>}
                        </span>
                    )
                ),
            },
            
            
            {
                title: 'End Date',
                dataIndex: 'end_date',
                width:'100px',
                render: (end_date, record) => (
                    editingDateField === `${record._id}-end_date` ? (
                        <DatePicker
                            selected={record.end_date ? moment(record.end_date).toDate() : null}
                            onChange={(date) => {
                                handleDateChange(record._id, 'end_date', date);
                                setEditingDateField(null); // Close the editor
                            }}
                            onBlur={() => {
                                setEditingDateField(null);
                                document.getElementById(`${record._id}-end_date-picker`).style.width = '50px';
                            }}
                            onFocus={() => {
                                document.getElementById(`${record._id}-end_date-picker`).style.width = '50px';
                            }}
                            dateFormat="dd/MM/yyyy"
                            id={`${record._id}-end_date-picker`}
                            style={{ width: '80px', fontSize:"10px" }} // Initial width
                        />
                    ) : (
                        <span
                            onClick={() => setEditingDateField(`${record._id}-end_date`)}
                            style={{
                                cursor: 'pointer',
                                color: record.start_date ? 'inherit' : 'none',
                                textDecoration: record.start_date ? 'none' : 'underline',
                                textAlign: 'center',
                                fontSize:'10px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = "#007bff";
                                e.target.style.transform = "scale(1.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = "#888";
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            {record.end_date ? moment(record.end_date).format('DD MMM YYYY') : <Calendar size={16} strokeWidth={0.75} />}
                        </span>
                    )
                ),
            },
            
            {
                title: 'Assignee',
                dataIndex: 'assignedTo',
                render: (assignedTo, record) => (
                    <div className="avatar-list avatar-list-stacked">
                        <Popover
                            content={
                                <div style={{ width: 200 }}>
                                    <Input
                                        placeholder="Search name or email"
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    <div style={{ maxHeight: 200, overflowY: "auto", marginTop: 10 }}>
                                        {filteredEmployees.map((employee) => (
                                            <div
                                                key={employee._id}
                                                style={{
                                                    padding: 5,
                                                    cursor: "pointer",
                                                    borderBottom: "1px solid #f0f0f0",
                                                }}
                                                onClick={() => handleAssign(record._id, employee)}
                                            >
                                                <strong>{employee.name}</strong>
                                                <br />
                                                <span style={{ fontSize: "10px", color: "#888" }}>
                                                    {employee.email}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            trigger="click"
                        >
                            <div className="assigned-user-list">
                                {assignedTo?.length > 0 ? (
                                    assignedTo.map((user, index) => (
                                        <Tooltip key={user._id} title={user.name} placement="top">
                                            <div
                                                className="assigned-user"
                                                style={{
                                                    display: "inline-flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: "#007bff",
                                                    color: "#fff",
                                                    fontSize: "10px",
                                                    fontWeight: "bold",
                                                    width: "23px",
                                                    height: "23px",
                                                    marginLeft: index > 0 ? "-5px" : "0",
                                                    borderRadius: "50%",
                                                    cursor: "pointer",
                                                    position: "relative",
                                                }}
                                            >
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0].toUpperCase())
                                                    .join("")}
                                                <button
                                                    style={{
                                                        position: "absolute",
                                                        top: "-5px",
                                                        right: "-5px",
                                                        background: "grey",
                                                        border: "none",
                                                        color: "#fff",
                                                        fontSize: "10px",
                                                        cursor: "pointer",
                                                        borderRadius: "50%",
                                                        width: "13px",
                                                        height: "13px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the popover
                                                        handleRemoveUser(user._id, record); // Pass the user ID and record
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        </Tooltip>
                                    ))
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontStyle: "italic",
                                            color: "#888",
                                            fontSize: "10px",
                                            margin: "5px 0",
                                            cursor: "pointer",
                                            transition: "color 0.3s, transform 0.3s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = "#007bff";
                                            e.target.style.transform = "scale(1.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = "#888";
                                            e.target.style.transform = "scale(1)";
                                        }}
                                    >
                                        <UserRoundPlus size={16} strokeWidth={0.75} />
                                    </div>
                                )}
                            </div>
                        </Popover>
                    </div>
                ),
            },
            {
                title: 'Tags',
                dataIndex: 'tags',
                width: 100,
                render: (tags, record) => (<span className="badge badge-secondary light border-0 ms-1" style={{fontSize:'10px', height:'60%', width:'65%'}}>{record.tags}</span>
    
                ),
            },
            {
                title: 'Description',
                dataIndex: 'tags',
                render: (description, record) => ( <Popover
                        content={
                            <Input.TextArea
                                defaultValue={record?.description || ''}
                                onBlur={(e) => handleEditDescription(record._id, e.target.value)} // Function to handle the update
                                autoFocus
                                rows={3}  
                                style={{ width: '300px', fontSize:"10px" }}  
                            />
                        }
                        title="Edit Description"
                        trigger="hover"
                        placement="top"
                        overlayStyle={{ width: '330px', height: '120px', fontSize:"10px" }} // Adjust popover size
                    >
                        <span className="truncate" style={{fontSize:"10px"}}>
                            {record?.description || '-'}
                        </span>
                    </Popover>
                ),
            },{
                title: 'Priority',
                dataIndex: 'tags',
                render: (tags, record) => (
                     role === "Employee" ? (
                                        // <span className="badge badge-light">{item.priority}</span> 
                                         <span className={getPriorityClass(record.priority)} style={{fontSize:"10px"}}>{record.priority}</span>
                                    ) : (
                                        <Dropdown className="task-dropdown-2">
                                            <Dropdown.Toggle as="div"  style={{fontSize:"10px"}} className={record.priority}>{record.priority}</Dropdown.Toggle>
                                            <Dropdown.Menu className='task-drop-menu'>
                                                <Dropdown.Item onClick={() => handleSelect(record._id, 'High')} style={{fontSize:"10px"}}>High</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSelect(record._id, 'Medium')}style={{fontSize:"10px"}}>Medium</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleSelect(record._id, 'Low')}style={{fontSize:"10px"}}>Low</Dropdown.Item>                                                                    
                                            </Dropdown.Menu>
                                        </ Dropdown>
                                    )
    
                ),
            },
            {
                title: 'Action',
                render: (text, record) => (
                   <div className="d-flex   gap-2">
                            <Button 
                             type="link" 
                             onClick={() => handleClick(record)}
                             icon={<Eye size='10px' />}
                             style={{
                                 fontSize:"6px",
                               display: "flex",
                               justifyContent: "center",
                               alignItems: "center",
                               height: "20px", // Adjust the height as needed
                               width: "20px", // Adjust the width as needed
                               borderRadius: "25%", // Makes the background circular
                               backgroundColor: "#321F69", // Initial background color
                               cursor: "pointer", // Pointer cursor for interactivity
                               transition: "background-color 0.3s, color 0.3s", 
                               color:'white'
                             }}/>
                              <Button 
                               type="link" 
                               onClick={() => handleDeleteTask(record._id)}
                               icon={<Trash size='10px' />}
                               style={{
                                   fontSize:"6px",
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 height: "20px", // Adjust the height as needed
                                 width: "20px", // Adjust the width as needed
                                 borderRadius: "25%", // Makes the background circular
                                 backgroundColor: "#FF5E5E", // Initial background color
                                 cursor: "pointer", // Pointer cursor for interactivity
                                 transition: "background-color 0.3s, color 0.3s", 
                                 color:'white'
                               }}
                             />
                              
                             </div>
                ),
            },
        ];

        return (
            <div style={{ padding: '0px 0px 0px 30px' }}>
      <Table
     
        className="custom-subtask-table"
        columns={subtaskColumns}
        dataSource={record.subtasks || []}
        pagination={false}
        rowKey="_id"
        showHeader={false}
      />
    </div>
        );
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
                                        <div className=' d-flex justify-content-end '>
                                            <h4 className='btn btn-primary light btn-sm me-2 '
                                             onClick={handleOpenModal}
                                            >Add Task</h4>
                    <TaskForm 
                    form={form} 
                    isModalOpen={isModalOpen} 
                    handleCancel={handleCancel} 
                    handleSubmit={handleSubmit} 
                    openJobs={allJobs} 
                    personalDet={adminUsers} 
                />
                                            
                                        </div>
                                    </div>    
           
                                    <Table
    className="custom-ant-table"
    columns={columns}
    dataSource={tableData}
    rowClassName={(record, index) => {
        // Check if the record is a parent task (no parent_id)
        return record.parent_id ? '' : 'parent-task-row';
    }}
    expandable={{
        expandedRowRender,
        rowExpandable: (record) => Array.isArray(record.subtasks) && record.subtasks.length > 0,
    }}
    rowKey="_id"
    expandedRowKeys={expandedRowKeys}
    onExpand={(expanded, record) => {
        if (expanded) {
            setExpandedRowKeys((prevKeys) => [...new Set([...prevKeys, record._id])]);
        } else {
            setExpandedRowKeys((prevKeys) => prevKeys.filter(key => key !== record._id));
        }
    }}
/>
            {selectedTask && (
                <TaskDetailsModal
                    isModalOpen={true}
                    handleCancel={() => setSelectedTask(null)}
                    task={selectedTask}
                />
            )}
                                    </div>    
                                    </div>    
                                    </div>    
                                    </div>    
                                    </div>    
                                    </div>    

        </>
    );
};
    


    
 
export default TaskManager;