import React,{useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { Input, Tooltip, Popover,Button } from 'antd';
import moment from 'moment';
import { Trash, Eye, Plus, UserRoundPlus, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';


const SubTask = ({ 
  subtask, 
  handleEditTask, 
  handleAction, 
  handleDateChange, 
  handleEditDescription,
  handleSelect,
  handleAssign,
  handleRemoveUser,
  filteredEmployees,
  searchQuery,
  handleSearch,
  role,
  getPriorityClass ,handleDeleteTask,handleClick
}) => {

    const [editingField, setEditingField] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleDoubleClick = (field) => {
      setEditingField(field);
    };
  console.log("Subtasks:::",subtask)
    const handleBlur = (field, value) => {
      handleEditTask(subtask._id, { [field]: value });
      setEditingField(null);
    };
  return (
    <tr style={{ backgroundColor: '#f8f9fa' }}>
      {/* <td className="sorting_25">
        <div className="form-check custom-checkbox" style={{ marginLeft: '20px' }}>
          <input 
            type="checkbox" 
            className="form-check-input"                                                                    
            id={`subtask-${subtask._id}`}
            checked={subtask.inputchecked}
          />
          <label className="form-check-label" htmlFor={`subtask-${subtask._id}`}></label>
        </div>
      </td> */}
      <td></td>
      <td>
  <div className="products" style={{ marginLeft: '20px' }}>
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
        onClick={() => handleDoubleClick(`subtask-${subtask._id}-task_title`)} // Trigger editing mode on click
      >
        {editingField === `subtask-${subtask._id}-task_title` ? (
          <Input
            defaultValue={subtask.task_title || ''}
            placeholder="Subtask Name" // Placeholder text when editing
            onBlur={(e) => handleBlur('task_title', e.target.value)} // Save the entered value on blur
            onKeyDown={(e) => handleEnterKey(e, 'task_title', subtask._id)} // Optional: handle enter key to save on enter
            autoFocus
            style={{
              border: '1px solid #88a67e',
              width: '80px', // Adjust width as needed
              height: '15px',
              marginLeft: '-7px',
            }}
          />
        ) : (
          <span style={{ fontSize: '11px' }}>{subtask.task_title || <Plus size='12px'/> }</span> // Display entered name or placeholder
        )}
      </h4>
      <span style={{ fontSize: '8px' }}>{subtask.task_id}</span>
    </div>
  </div>
</td>



      <td >
        <Dropdown className="task-dropdown-2">
          <Dropdown.Toggle as="div" className={subtask.status}style={{fontSize:'8px', height:'50%'}} >
            {subtask.status}
          </Dropdown.Toggle>
          <Dropdown.Menu className='task-drop-menu'>
            <Dropdown.Item onClick={() => handleAction(subtask._id, 'Pending')}>Pending</Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction(subtask._id, 'Not Started')}>Not Started</Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction(subtask._id, 'In Progress')}>In Progress</Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction(subtask._id, 'Cancelled')}>Cancelled</Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction(subtask._id, 'Completed')}>Completed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
      <td>
  {showStartDatePicker || !subtask.start_date ? (
    <DatePicker
      selected={subtask.start_date ? moment(subtask.start_date).toDate() : null}
      onChange={(date) => {
        const formattedDate = moment(date).format('DD MMM YYYY');
        handleDateChange(subtask._id, 'start_date', formattedDate);
        setShowStartDatePicker(false);
      }}
      dateFormat="dd/MM/yyyy"
      placeholderText="Start Date"
    />
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'color 0.3s, transform 0.3s',
        marginRight: '30px',
        fontSize:'10px'
      }}
      onMouseEnter={(e) => {
        // e.target.style.color = '#007bff';
        e.target.style.transform = 'scale(1.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.color = '#888';
        e.target.style.transform = 'scale(1)';
      }}
      onClick={() => setShowStartDatePicker(true)}
    >
      {subtask.start_date ? (
        moment(subtask.start_date).format('DD MMM YYYY') // Display formatted date
      ) : (
        <Calendar size={20} color="#888" /> // Calendar icon for null state
      )}
    </div>
  )}
</td>


<td>
  {showEndDatePicker || !subtask.end_date ? (
    <DatePicker
      selected={subtask.end_date ? moment(subtask.end_date).toDate() : null}
      onChange={(date) => {
        const formattedDate = moment(date).format('DD MMM YYYY');
        handleDateChange(subtask._id, 'end_date', formattedDate);
        setShowEndDatePicker(false);
      }}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select a date"
    />
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'color 0.3s, transform 0.2s',
        marginRight: '30px',
        fontSize:'10px'

      }}
      onMouseEnter={(e) => {
        // e.target.style.color = '#007bff';
        e.target.style.transform = 'scale(1.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.color = '#888';
        e.target.style.transform = 'scale(1)';
      }}
      onClick={() => setShowEndDatePicker(true)}
    >
      {subtask.end_date ? (
        moment(subtask.end_date).format('DD MMM YYYY')
      ) : (
        <Calendar size={20} color="#888" />
      )}
    </div>
  )}
</td>






<td>
  <div className="avatar-list avatar-list-stacked">
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
                  onClick={() => handleAssign(subtask._id, employee)}
                >
                  <strong>{employee.name}</strong>
                  <br />
                  <span style={{ fontSize: 12, color: "#888" }}>
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
          {subtask?.assignedTo?.length > 0 ? (
            subtask.assignedTo.map((assigned, index) => (
              <Tooltip key={assigned._id} title={assigned.name} placement="top">
                <div
                  className="assigned-user-avatar"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: "8px",
                    fontWeight: "bold",
                    width: "20px",
                    height: "20px",
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
                      e.stopPropagation();
                      handleRemoveUser(assigned._id, subtask);
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
  </div>
</td>


      <td>
        <span className="badge badge-secondary light border-0 ms-1" style={{fontSize:'9px', height:'50%', width:'60%', }}>
          {subtask.tags || '-'}
        </span>
      </td>
      <td>
        <Popover
          content={
            <Input.TextArea
              defaultValue={subtask?.description || ''}
              onBlur={(e) => handleEditDescription(subtask._id, e.target.value)}
              autoFocus
              rows={3}
              style={{ width: '300px' }}
            />
          }
          title="Edit Description"
          trigger="hover"
          placement="top"
          overlayStyle={{ width: '330px', height: '120px' }}
        >
          <span className="truncate" style={{fontSize:'10px'}}>
            {subtask?.description || '-'}
          </span>
        </Popover>
      </td>
      <td className="text-start">
        {role === "Employee" ? (
          <span className={getPriorityClass(subtask.priority)}>{subtask.priority}</span>
        ) : (
          <Dropdown className="task-dropdown-2">
            <Dropdown.Toggle as="div" className={subtask.priority} style={{fontSize:'8px', height:'50%'}}>
              {subtask.priority}
            </Dropdown.Toggle>
            <Dropdown.Menu className='task-drop-menu'>
              <Dropdown.Item onClick={() => handleSelect(subtask._id, 'High')}>High</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect(subtask._id, 'Medium')}>Medium</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect(subtask._id, 'Low')}>Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </td>
      <td className="">
            <div className="d-flex justify-content-center  gap-2">
         <Button 
          type="link" 
          onClick={() => handleClick(subtask)}
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
            onClick={() => handleDeleteTask(subtask._id)}
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
  );
};

export default SubTask;