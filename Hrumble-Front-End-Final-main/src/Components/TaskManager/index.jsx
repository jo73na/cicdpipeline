import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
 
import CountUp from 'react-countup';
import { CSVLink } from 'react-csv';
 
import CookieUtil from '../../Utils/Cookies';
import { Modal, Form, Input, Select, Button, Tooltip,Popover,Flex, Tag  } from 'antd';
import moment from 'moment';
import TaskContext from '../../Providers/TaskProvider';
import JobContext from "./../../Providers/JobProvider";
import EmployeeContext from "./../../Providers/EmployeeProvider";
import TaskForm from './TaskForm';
import TaskCounter from './TaskCounter';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { IconButton } from '@mui/material';
import TaskDetailsModal from './TaskDetailModal';
import NaturalDatePicker from './DatePicker'
import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
import SubTask from './SubTask';
import { PlusOutlined } from '@ant-design/icons';
import { Trash, Eye, Plus, UserRoundPlus } from 'lucide-react';





 
 
 
 
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
	const {openJobs,fetchJob} = useContext(JobContext);
    const [tableData, setTableData] = useState(tasks);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [records, setRecords] = useState([]);
    const recordsPerPage = 13;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;  
    // const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tableData.length / recordsPerPage);
    const number = [...Array(npage + 1).keys()].slice(1);
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
// const filteredEmployees = adminUsers?.length ? adminUsers : []; 




	console.log("personalDet",adminUsers)
    const csvlink = {
        headers : headersTitle,
        data : tableData,
        filename: "csvfile.csv"
    }
	console.log("Tasks:::", tasks)
//role based display
    // useEffect(() => {
    //  let role = CookieUtil.get("role");
   
    //  let id = CookieUtil.get("admin_id");
   
    //  if (role == "Employee") {
    //    employeeCompleteFetch(id);
    //  } else {
    //    employeeCompleteFetch(params?.id);
    //  }
    //   }, []);

	useEffect(() => {
		fetchTasks();
        fetchEmploy();
        fetchUsers();
	}, []);
    useEffect(() => {
        setTableData(tasks.filter(task => !task.parent_id));
        // Create a mapping of tasks to their subtasks
        const taskMap = {};
        tasks.forEach(task => {
            if (task.parent_id) {
                // If the task has a parent_id, add it to the parent's subtasks
                if (!taskMap[task.parent_id]) {
                    taskMap[task.parent_id] = [];
                }
                taskMap[task.parent_id].push(task);
            }
        });
        setSubtasks(taskMap); // Store the mapping in state
    }, [tasks]);

    useEffect(() => {
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        setRecords(tableData.slice(firstIndex, lastIndex));
    }, [tableData, currentPage]);

    // const filteredTasks = tasks.filter(task => 
    //     task.assignedTo?.some(assigned => assigned.email === employeeEmail)
    // );

    const filteredTasks = role === "SuperAdmin" 
    ? tableData // Do not filter tasks for SuperAdmin
    : tableData.filter(task => 
        task.assignedTo?.some(assigned => assigned.email === employeeEmail) // Filter tasks for other roles
    );

    
console.log("FilteredTasksss::", filteredTasks)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const prePage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < nPages) setCurrentPage(currentPage + 1);
    };
   
   console.log("Openedjob:::::", openJobs)

	useEffect(() => {
		fetchJob();
	  }, []);
    
   
    const handleChecked = (id) => {
        let temp = statusPriority.map((data) => {
            if (id === data.id) {
                return { ...data, inputchecked: !data.inputchecked };
            }
            return data;
        });
        setStatusPriority(temp);
    };
    const handleCheckedAll = (value) => {
        let temp = statusPriority.map((data) => {          
            return { ...data, inputchecked: value };  
        });
        setStatusPriority(temp);
        setUnChecked(!unchecked);
    };
 
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
        } catch (error) {
          console.error('Failed to add subtask:', error);
        }
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
                    openJobs={openJobs} 
                    personalDet={adminUsers} 
                />
                                            <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel"/> Export Report</CSVLink>
                                        </div>
                                    </div>    
                                    <div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyeestbl2" className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0 custom-task">
                                            <thead>
                                                <tr>
                                                    {/* <th className="sorting_asc_15" >
                                                        <div className="form-check custom-checkbox ms-0">
                                                            <input type="checkbox" className="form-check-input checkAllInput" required=""                                                              
                                                                onClick={()=>handleCheckedAll(unchecked)}
                                                            />
                                                            <label className="form-check-label" htmlFor="checkAll"></label>
                                                        </div>
                                                    </th> */}
                                                    <th className='text-center'>S.No</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Assigned To</th>
                                                    <th>Tags</th>
                                                    <th>Description</th>
                                                    <th>Priority</th>
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            

                                            <tbody >
    {filteredTasks.map((item, index) => (
         <React.Fragment key={item._id}>
        <tr> {/* Use item._id as the key for better uniqueness */}
            {/* <td className="sorting_25">
                <div className="form-check custom-checkbox">
                    <input 
                        type="checkbox" 
                        className="form-check-input"                                                                    
                        id={`user-${item._id}`} // Use item._id for the checkbox ID
                        checked={item.inputchecked}
                        onChange={() => handleChecked(item._id)} // Use item._id for handling checked state
                    />
                    <label className="form-check-label" htmlFor={`user-${item._id}`}></label>
                </div>
            </td> */}
            <td className='text-center'><span>{index + 1}</span></td> {/* Adjusted index for display */}
            <td>
    <div className="products">
        <div >
        <h4
                    style={{
                      margin: '0px',
                      lineHeight: '1',
                      cursor: 'pointer',
                    }}
                    // onDoubleClick={() => handleDoubleClick(`${item._id}-task_title`) } 
                  >
                    {/* {editingField === `${item._id}-task_title` ? (
                      <Input
                        defaultValue={item.task_title}
                        onBlur={(e) => handleEditTask(item._id, 'task_title', e.target.value)}
                        autoFocus
                        style={{
                          border: "1px solid  #88a67e",
                          width: '100px',
                          height: '20px',
                          marginLeft: '-7px',
                        }}
                      />
                    ) : ( */}
                      {/* <span>{item.task_title}</span> */}
                    {/* )} */}
                    <span>{item.job?.map((job, index) => (
    <div key={index} >
      {job.job_title}
    </div>
  ))}</span>

                  </h4>
                  <span onClick={() => handleClick(item)} style={{ marginTop: '0px', display: 'block',  }}>
                  <Flex gap="1px">
                                            {/* <Tag
                                              style={{
                                                borderRadius: "4px",
                                                fontSize: "8px",
                                                height:'60%'
                                              }}
                                              color="#77ab59"
                                            >
  {item.job?.map((job, index) => (
    <div key={index} style={{fontSize:'10px'}}>
      {job.job_title}
    </div>
  ))}</Tag> */}
   <Tag
                                              style={{
                                                borderRadius: "4px",
                                                fontSize: "6px",
                                                height:'40%'
                                              }}
                                              color="#36802d"
                                            >
  {item.job?.map((job, index) => (
    <div key={index}style={{fontSize:'10px'}}>
      {job.jobclient_id}
    </div>
  ))}</Tag>
   </Flex>
</span>

           {/* <div
                                        style={{
                                          alignItems: "center",
                                          display: "inline-flex",
                                        }}
                                      >
                                        <span
                                          style={{
                                            marginTop: "3px",
                                            cursor: "pointer",
                                            fontSize: "9px",
                                          }}
                                        >
                                          <Flex gap="4px">
                                            <Tag
                                              style={{
                                                borderRadius: "4px",
                                                fontSize: "8px",
                                              }}
                                              color="#77ab59"
                                            >
                                              {item?.job_id}
                                            </Tag>
                                            <Tag
                                              style={{
                                                borderRadius: "4px",
                                                fontSize: "8px",
                                              }}
                                              color="#36802d"
                                            >
                                              {item?.contractType}
                                            </Tag>
                                            <Tag
                                              style={{
                                                borderRadius: "4px",
                                                fontSize: "8px",
                                              }}
                                              color="#526E48"
                                            >
                                              {item?.secondarySelected}
                                            </Tag>
                                          </Flex>
                                        </span>
                                      </div> */}
        </div>
    </div>
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
            <td>
                                                    {editingDateField === `${item._id}-start_date` ? (
                                                        <DatePicker
                                                            selected={moment(item.start_date).toDate()}
                                                            onChange={(date) => {
                                                                handleDateChange(item._id, 'start_date', date);
                                                                setEditingDateField(null); // Close the editor
                                                                setDatePickerWidth('100px');
                                                            }}
                                                            onBlur={() =>{ setEditingDateField(null); setDatePickerWidth('100px');}}
                                                            dateFormat="dd/MM/yyyy"
                                                            style={{ width: '100px' }} // Adjust width as needed
                                                            onFocus={() => setDatePickerWidth('50px')}
                                                        />
                                                    ) : (
                                                        <span
                                                            onClick={() =>{ setEditingDateField(`${item._id}-start_date`); setDatePickerWidth('50px');}}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            {moment(item.start_date).format('DD MMM YYYY')}
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {editingDateField === `${item._id}-end_date` ? (
                                                        <DatePicker
                                                            selected={moment(item.end_date).toDate()}
                                                            onChange={(date) => {
                                                                handleDateChange(item._id, 'end_date', date);
                                                                setEditingDateField(null); // Close the editor
                                                                setDatePickerWidth('50px');
                                                            }}
                                                            onBlur={() =>{ setEditingDateField(null);setDatePickerWidth('50px');}}
                                                            dateFormat="dd/MM/yyyy"
                                                            style={{ width: '100px' }} // Adjust width as needed
                                                            onFocus={() => setDatePickerWidth('50px')}
                                                        />
                                                    ) : (
                                                        <span
                                                            onClick={() => { setEditingDateField(`${ item._id}-end_date`);setDatePickerWidth('50px');}}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            {moment(item.end_date).format('DD MMM YYYY')}
                                                        </span>
                                                    )}
                                                </td>
 
            <td>
            <div className="avatar-list avatar-list-stacked">
    {/* {role === "SuperAdmin" ? ( */}
    <div className="avatar-container">
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
                            onClick={() => handleAssign(item._id, employee)}
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
            {item?.assignedTo?.length > 0 ? (
                item.assignedTo.map((assigned, index) => (
                    <Tooltip key={assigned._id} title={assigned.name} placement="top">
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
                            {assigned.name
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
                                    handleRemoveUser(assigned._id, item); // Pass the user ID and item
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

    
    
    {/* ) : ( */}
        {/* <div className="assigned-by-info">
            <div
                className="assigned-by-avatar"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    width: "40px",
                    height: "40px",
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "50%", // Circular shape
                }}
            >
                {item?.assignedBy?.name
                    ?.split(" ")
                    .map((n, index) => (index === 0 || index === 1 ? n[0].toUpperCase() : ""))
                    .join("")}
                <button
                                style={{
                                    position: "absolute",
        top: "-5px",
        right: "-5px",
        background: "grey",
        border: "none",
        color: "#fff",
        fontSize: "11px",
        cursor: "pointer",
        borderRadius: "50%", 
        width: "13px", 
        height: "13px",
        display: "flex", 
        justifyContent: "center"
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the popover
                                    handleRemoveUser(assigned._id, item); // Pass the user ID and item
                                }}
                            >
                                &times;
                            </button>
            </div>
            <div className="hover-card">
                <div>
                    <strong>Name:</strong> {item?.assignedBy?.name || "N/A"}
                </div>
                <div>
                    <strong>Email:</strong> {item?.assignedBy?.email || "N/A"}
                </div>
                <div>
                    <strong>Role:</strong> {item?.assignedBy?.user_role || "N/A"}
                </div>
            </div>
        </div>
    )} */}
</div>

</td>

  
            <td>
                {/* <span className="badge badge-primary light border-0 me-1">{item.tags}</span> */}
                {/* <span className="badge badge-secondary light border-0 ms-1">{item?.job[0]?.jobclient_id || item.other_tasks || '-'}</span> */}
                <span className="badge badge-secondary light border-0 ms-1" style={{fontSize:'11px', height:'60%', width:'65%'}}>{item.tags}</span>

            </td>
            <td className="pe-0">
            <Popover
        content={
            <Input.TextArea
                defaultValue={item?.description || ''}
                onBlur={(e) => handleEditDescription(item._id, e.target.value)} // Function to handle the update
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
            {item?.description || '-'}
        </span>
    </Popover>
            </td>
            <td className="">                                                          
                {role === "Employee" ? (
                    // <span className="badge badge-light">{item.priority}</span> 
                     <span className={getPriorityClass(item.priority)}>{item.priority}</span>
                ) : (
                    <Dropdown className="task-dropdown-2">
                        <Dropdown.Toggle as="div"  className={item.priority}>{item.priority}</Dropdown.Toggle>
                        <Dropdown.Menu className='task-drop-menu'>
                            <Dropdown.Item onClick={() => handleSelect(item._id, 'High')}>High</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelect(item._id, 'Medium')}>Medium</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelect(item._id, 'Low')}>Low</Dropdown.Item>                                                                    
                        </Dropdown.Menu>
                    </ Dropdown>
                )}
            </td>
            <td className="">
            <div className="d-flex justify-content-center  gap-2">
          <Button 
            type="link" 
            onClick={() => handleAddSubTask(item._id)}
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
          onClick={() => handleClick(item)}
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
            onClick={() => handleDeleteTask(item._id)}
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
        </td>
        </tr>
        {(subtasks[item._id] || []).map(subtask => (
                <SubTask
                    key={subtask._id}
                    subtask={subtask}
                    handleEditTask={handleEditTask}
                    handleAction={handleAction}
                    handleDateChange={handleDateChange}
                    handleEditDescription={handleEditDescription}
                    handleSelect={handleSelect}
                    handleAssign={handleAssign}
                    handleRemoveUser ={handleRemoveUser }
                    filteredEmployees={filteredEmployees}
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    role={role}
                    getPriorityClass={getPriorityClass}
                    handleDeleteTask={handleDeleteTask}
                    handleClick={handleClick}
                    style={{ marginLeft: '20px' }} // Add margin to indent
                />
            ))}
       
       </React.Fragment>
    ))}
</tbody>
                                           
                                        </table>
                                       
                                         {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          isModalOpen={isViewModalOpen}
          handleCancel={handleCancel}
          task={selectedTask}
          handleEditTask={handleEditTask}
        />
      )}
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            <div className='dataTables_info'>
                                                Showing {lastIndex-recordsPerPage + 1} to{" "}
                                                {tableData.length < lastIndex ? tableData.length : lastIndex}
                                                {" "}of {tableData.length} entries
                                            </div>
                                            <div
                                                className="dataTables_paginate paging_simple_numbers justify-content-center"
                                                id="example2_paginate"
                                            >
                                                <Link
                                                    className="paginate_button previous disabled"
                                                    to="#"                                        
                                                    onClick={prePage}
                                                >
                                                    <i className="fa-solid fa-angle-left" />
                                                </Link>
                                                <span>                                      
                                                    {number.map((n , i )=>(
                                                        <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                            onClick={()=>changeCPage(n)}
                                                        >
                                                            {n}                                                
 
                                                        </Link>
                                                    ))}
                                                </span>
                                                <Link
                                                    className="paginate_button next"
                                                    to="#"                                        
                                                    onClick={nextPage}
                                                >
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
               
        </>
    );
};
 
export default TaskManager;