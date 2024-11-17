import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Modal, Button, Input, DatePicker, Avatar, Tooltip, Select, Radio } from 'antd';
import { PlusOutlined, EditOutlined, ExclamationCircleOutlined, CalendarOutlined, UserOutlined, FlagOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import SalesandMargettingContext from '../../Providers/SalesandMargetting';
import SpaceContext from '../../Providers/Space';
 const {Option}=Select
// Mock data
const initialData = {
  columns: {
    column1: {
      id: 'column1',
      title: 'Backlog',
      color:"#4466ff",
      background:"#f5f7ff",
      taskIds: ['task1', 'task2'],
    },
    column2: {
      id: 'column2',
      title: 'To Do',
      background: "#f1e9d7",

      color:"#ffcc33",
      taskIds: ['task3'],
    },
    column3: {
      id: 'column3',
      title: 'Pending',
      background: "#fdf5f5",
   
      color:"#d33d44",

      taskIds: ['task4'],
    },
    column4: {
      id: 'column4',
      title: 'Run',
      background:"#bce5d0",
      color:"#008844",
      taskIds: ['task5'],
    },
    column5: {
      id: 'column5',
      title: 'Done',
      taskIds: [],
    },
  },
  tasks: {
    task1: {
      id: 'task1',
      title: 'Mail App',
      description: 'Mail application and screens will be added',
      imgUrl: 'https://via.placeholder.com/150',
      assignee: 'User1',
      priority: 3,
      comments: 3,
      daysLeft: 7,
    },
    task2: {
      id: 'task2',
      title: 'Invoice',
      description: 'Invoices are ready for generation',
      imgUrl: 'https://via.placeholder.com/150',
      assignee: 'User2',
      priority: 2,
      comments: 2,
      daysLeft: 5,
    },
    task3: {
      id: 'task3',
      title: 'Write Blog',
      description: 'Explain why it should be chosen',
      imgUrl: 'https://via.placeholder.com/150',
      assignee: 'User3',
      priority: 1,
      comments: 1,
      daysLeft: 7,
    },
    task4: {
      id: 'task4',
      title: 'Landing Page Update',
      description: 'Will be redesigned',
      imgUrl: 'https://via.placeholder.com/150',
      assignee: 'User4',
      priority: 1,
      comments: 3,
      daysLeft: 5,
    },
    task5: {
      id: 'task5',
      title: 'Bug Fix',
      description: 'Minor bugs will be fixed',
      imgUrl: 'https://via.placeholder.com/150',
      assignee: 'User5',
      priority: 3,
      comments: 3,
      daysLeft: 7,
    },
  },
  columnOrder: ['column1', 'column2', 'column3', 'column4', 'column5'],
};

const KanbanBoard = () => {
  const {sendColumn,sendTasks}=useContext(SalesandMargettingContext)
  const {ListColumn,fetchListSingle,StatusChange,columnselect,viewTask}=useContext(SpaceContext)
  const [state, setState] = useState(initialData);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ id: '', title: '', description: '', dueDate: null });
  const [newColumn, setNewColumn] = useState({ id: '', title: '', color: '' });
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [openModal,setOpenModal ] = useState(false);

   const params =useParams()

  const colors = [
      
    '#10B981', '#F59E0B', '#d33d44', '#EF4444', 
    '#EC4899', '#A855F7', '#8B5CF6', '#6B7280', '#A16207'
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  

   useEffect(() => {
    
      if(!activeTaskId){
          viewTask(activeTaskId)
      }
   },[activeTaskId])


  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
     console.log("destination", destination)
     console.log("source", source)
     console.log("draggableId", draggableId)
    if (!destination) return;
  
     
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    StatusChange(draggableId,{
      column_id:destination?.droppableId
    },params.id)

    // const start = state.columns[source.droppableId];
    // const finish = state.columns[destination.droppableId];

    // if (start === finish) {
    //   const newTaskIds = Array.from(start.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds,
    //   };

    //   const newState = {
    //     ...state,
    //     columns: {
    //       ...state.columns,
    //       [newColumn.id]: newColumn,
    //     },
    //   };

    //   setState(newState);
    //   return;
    // }




    // const startTaskIds = Array.from(start.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds,
    // };

    // const finishTaskIds = Array.from(finish.taskIds);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    // };

    // const newState = {
    //   ...state,
    //   columns: {
    //     ...state.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };


    // setState(newState);
  };

  const openTaskModal = (columnId) => {
    setActiveColumnId(columnId);
    setIsEditMode(false);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task) => {
    setNewTask(task);
    setIsEditMode(true);
    setIsTaskModalOpen(true);
  };

  const openColumnModal = () => {
    setIsColumnModalOpen(true);
  };

  const closeModal = () => {
    setIsTaskModalOpen(false);
    setIsColumnModalOpen(false);
    setNewTask({ id: '', title: '', description: '', dueDate: null });
    setNewColumn({ id: '', title: '', color: '' });
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setNewTask({ ...newTask, dueDate: dateString });
  };

  const handleColumnInputChange = (e) => {
    const { name, value } = e.target;
    setNewColumn({ ...newColumn, [name]: value });
  };

  const addNewTask = () => {
    const newTaskId = `task${Date.now()}`;
    const newTaskObject = { id: newTaskId, ...newTask };

    sendTasks({
       title:newTask.title,
       description:newTask.description,
       dueDate:newTask.dueDate,
      column_id: activeColumnId,
      list_id:params.id

    })
    fetchListSingle(params.id)
    const updatedState = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTaskId]: newTaskObject,
      },
      columns: {
        ...state.columns,
        [activeColumnId]: {
          ...state.columns[activeColumnId],
          taskIds: [...state.columns[activeColumnId].taskIds, newTaskId],
        },
      },
    };

    setState(updatedState);
    closeModal();
  };

  const updateTask = () => {
    const updatedTasks = {
      ...state.tasks,
      [newTask.id]: newTask,
    };

    const updatedState = {
      ...state,
      tasks: updatedTasks,
    };

    setState(updatedState);
    closeModal();
  };

  const handleSubmitTask = () => {
    if (isEditMode) {
      updateTask();
    } else {
      addNewTask();
    }
  };

  const addNewColumn = () => {
    const newColumnId = `column${Date.now()}`;
    const newColumnObject = { id: newColumnId, title: newColumn.title, taskIds: [], color:selectedColor,background:"#fdf5f5",list_id:params?.id };
     sendColumn({
      title: newColumn.title, taskIds: [], color:selectedColor,background:"#fdf5f5",list_id:params?.id
     })

    fetchListSingle(params.id)


    const updatedState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumnId]: newColumnObject,
      },
      columnOrder: [...state.columnOrder, newColumnId],
    };

    setState(updatedState);
    closeModal();
  };

  const statusOptions = [
    { label: 'DEVELOPMENT IN PROGRESS', color: '#4B72FF',value:"1" },
    { label: 'TO BE TESTED', color: '#FFD700',value:"2" },
    { label: 'TESTING IN PROGRESS', color: '#D96FFF',value:"4" },
    { label: 'ISSUES', color: '#FF4D4F',value:"3" },
    { label: 'TO BE DEPLOYED', color: '#52C41A',value:"5" },
  ];


   const handleOpenModal =()=>{
       setOpenModal(!openModal)
   }


  console.log("ListColumn",ListColumn)
  return (
    <>
      <div className='d_f j_c_f_e m_t_1 m_b_5'>
        <button onClick={openColumnModal} className="btn-sm btn  btn-warning">+ Add Group </button>
      </div>
      <div className="page-wrapper  kanbanboard">
        <div className="container2">
          <DragDropContext onDragEnd={onDragEnd}>

            {
               ListColumn?.map((column)=>{
                     return (
                <Droppable key={column._id} droppableId={column._id}>
                  {(provided, snapshot) => (
                    <div
                     style={{
                      backgroundColor: column.background,
                     }}
                      className={`column ${snapshot.isDraggingOver ? 'draggingOver' : ''}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className="column-title">
                        <div className="d_f j_c_s_b a_i_c">
                          {
                                 <div className="status-tag"
                                  style={{
                                    backgroundColor: column.color,
                                  }}>
                                 <div className="status-label">
                                 <span
            style={{
              fontSize: "10px",
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'white',
              marginRight: 8,
            }}
          />
                                   <span className="status-text"
                                    style={{
                                       color:"white",
                                       fontSize:"13px"
                                    }}>{column?.title}</span>
                                 </div>
                               
                               </div>
                          }
                          <PlusOutlined className="add-icon" onClick={() => openTaskModal(column._id)} />
                        </div>
                      </div>
                      <div className="task-list">
                        {column.tasks?.map((task, index) => (
                          <Draggable key={task.id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                               style={{
                                backgroundColor: column.background,
                               }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
                              >
                                <div className="task-header d_f j_c_s_b a_i_c">
                                  <h6
                                onClick={(e)=>{
                                  setActiveTaskId(task?._id)
                                  handleOpenModal
                                }}
                                   style={{
                                     fontWeight:"bold",
                                     cursor:"pointer"
                                   }}>{task.title}</h6>
                                  <EditOutlined className="edit-icon" onClick={() => openEditModal(task)} />
                                </div>
                                <div className="task-body">
                                  <p>{task.description}</p>
                                  <Tooltip title="Status">
                                    <p className="status">
                                       
                                    <span
            style={{
              fontSize: "10px",
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: column?.color,
              marginRight: 8,
            }}
          />
                                    <Select
    defaultValue={task.column_id}
  
    style={{ width:"100%" ,fontSize:"10px" }}
    // dropdownStyle={{ minWidth: 300 }}
    
  >
      {
         columnselect?.map((item)=>{
           return  <Option value={item.value}> <span style={{
             fontSize: "10px",
           }}>{item.label}</span></Option>
         })
      }

  </Select>
    
        
    

                   

                                      {/* <Avatar style={{ backgroundColor: '#87d068' }} size={15} icon={<UserOutlined />} /> {task.assignee} */}
                                    </p>
                                  </Tooltip>
                                  <Tooltip title="Assignee">
                                    <p className="assignee">
                                       
                                  <UserOutlined style={{ fontSize: "12px", color:"green" }}  /> 
                                   <Select
                                     style={{
                                       width:"100%",
                                       border:"none",
                                       borderBottom:"none"
                                     }}
                                    options={
                                       [
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        
                                       ]
                                    }/>

                                      {/* <Avatar style={{ backgroundColor: '#87d068' }} size={15} icon={<UserOutlined />} /> {task.assignee} */}
                                    </p>
                                  </Tooltip>
                                  <Tooltip title="Due Date">
                                    <p className="date mt-1 mb-1">
                             <CalendarOutlined style={{ fontSize: "12px" }} /> 
                                      <Select
                                     style={{
                                       width:"100%",
                                       border:"none",
                                       borderBottom:"none"
                                     }}
                                    options={
                                       [
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        { value: 'user1', label: 'User 1' },
                                        
                                       ]
                                    }/>
                                    </p>
                                  </Tooltip>
                                  <Tooltip title="Priority">
                                    <p className="priority">
                                      <FlagOutlined style={{ fontSize: "12px" }} /> {task.priority}
                                    </p>
                                  </Tooltip>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                         <div
                          className="add_button"
                          onClick={() => openTaskModal(column.id)}
                          style={{
                             cursor:"pointer",
                             textAlign:"center"
                          }}>
                         + Add Task
                         </div>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
               })
            }
          
          </DragDropContext>
        </div>


        <Modal
          title="BackLog"
          visible={openModal}
          onCancel={handleOpenModal}
          width={800}
          footer={[
            // <Button key="cancel" onClick={closeModal} className='btn-sm btn_cancel'>
            //   Cancel
            // </Button>,
            // <Button key="submit" type="primary" className='btn-sm btn-primary' onClick={addNewColumn}>
            //   Save
            // </Button>,
          ]}
        >
            <div
             className='col_2 g_20'>
               <div>
              <h4>Kanbanboard  Design Change</h4>

               <div
                className='col_2 g_20'>
                   <div className='d_f a_i_c'>
                      <h6 className='m_b_1'>Status</h6>
                      <Select  style={{
                         width:"130px"
                      }}/>
                   </div>
                   <div className='d_f a_i_c'>
                      <h6 className='m_b_1'>Status</h6>
                      <Select style={{
                         width:"130px"
                      }}/>
                   </div>

               </div>
           </div>
           <div>
               <h4>Timeline</h4>
           </div>
            </div>
        </Modal>

        <Modal
          title={isEditMode ? "Edit Task" : "Add New Task"}
          visible={isTaskModalOpen}
          onCancel={closeModal}
          footer={[
            <Button key="cancel" className='btn-sm btn_cancel' onClick={closeModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" className='btn-sm btn-primary' onClick={handleSubmitTask}>
              {isEditMode ? "Update Task" : "Add Task"}
            </Button>,
          ]}
        >
          <form>
            <label>
              Title:
              <Input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleTaskInputChange}
              />
            </label>
            <br />
            <label>
              Description:
              <Input.TextArea
                name="description"
                value={newTask.description}
                onChange={handleTaskInputChange}
              />
            </label>
            <br />
            <label>
              Due Date:
              <DatePicker
                value={newTask.dueDate ? moment(newTask.dueDate) : null}
                onChange={handleDateChange}
              />
            </label>
          </form>
        </Modal>

        <Modal
          title="Add New Column"
          visible={isColumnModalOpen}
          onCancel={closeModal}
          footer={[
            <Button key="cancel" onClick={closeModal} className='btn-sm btn_cancel'>
              Cancel
            </Button>,
            <Button key="submit" type="primary" className='btn-sm btn-primary' onClick={addNewColumn}>
              Save
            </Button>,
          ]}
        >
          <form>
            <label>
              Column Name:
              <Input
                type="text"
                name="title"
                value={newColumn.title}
                onChange={handleColumnInputChange}
              />
            </label>
            <br />
        <label>Color</label>
         <br/>
          <Radio.Group
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
    >
       <div
        className='col_9'>
       {colors.map(color => (
            <Radio.Button 
            key={color} 
            value={color} 
            className="color-radio" 
            style={{ backgroundColor: color, borderColor: selectedColor === color ? 'black' : color }}
          />
      ))}
       </div>
    
    </Radio.Group>
          
           
            {/* <label>
              Column Color:
              <Input
                type="color"
                name="color"
                value={newColumn.color}
                onChange={handleColumnInputChange}
              />
            </label> */}
          </form>
        </Modal>
      </div>
    </>
  );
};

export default KanbanBoard;
