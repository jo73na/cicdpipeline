import React, { useState } from 'react';
import { Modal, Row, Col, Divider, Card, Button, Tooltip, message, Timeline } from 'antd';
import moment from 'moment';
import { Calendar, User, FileText, Clock, CirclePlay, CircleStop, CircleCheck, Flag, Tag, Hourglass } from 'lucide-react';  // Importing Lucide icons
import { CheckCircleOutlined, PlayCircleOutlined, StopOutlined, ClockCircleOutlined } from '@ant-design/icons';

const TaskDetailsModal = ({ isModalOpen, handleCancel, task, handleEditTask }) => {
    const [isTracking, setIsTracking] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // Store elapsed time in seconds
    const [timer, setTimer] = useState(null);

  // Function to copy task_id to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(task.task_id);
    message.success("Task ID copied to clipboard!");
  };

  const startTimeTracking = () => {
    setIsTracking(true);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(diff);
    }, 1000);
    setTimer(interval);
  };

  // Stop Timer
  const stopTimeTracking = () => {
    setIsTracking(false);
    clearInterval(timer);
    setTimer(null);
    handleEditTask(task._id, { elapsed_time: elapsedTime }); // Save elapsed time to the backend
  };

  // Format elapsed time into HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <Modal
      title="Task Details"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1100}
    //   height={1200}
    >
      <Row gutter={16}>
        {/* Task Summary Section */}
        <Col span={16}>
  <Card 
//   style={{
//     height: '100%',
//     overflowY: 'scroll',
//     marginBottom: '16px',
//     padding: '10px',
//     background: 'linear-gradient(135deg, #F3F0EC, #FFFFFF)', 
//     borderRadius: '8px', 
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
//   }}
>
    <h2
      style={{
        cursor: 'pointer', margin: '5px', color: '#E040FB',
      }}
    >
      {task.task_title}
      <Tooltip title="Click to Copy Task ID">
        <span style={{ display: 'inline-block', fontSize: '12px', color: '#888', marginLeft: '10px' }} onClick={copyToClipboard}>
          {task.task_id}
        </span>
      </Tooltip>
    </h2>
    <Divider />

    <Row gutter={[16, 8]}>
      {/* Left Column - Labels */}
      <Col span={12} style={{   lineHeight:'4' }}>
        <p><CircleCheck size={15} strokeWidth={1.75} style={{ margin: '5px' }} color='green' />Status:</p>
        <p><Calendar size={15} style={{ margin: '5px' }} />Date:</p>
        <p><Flag size={15} strokeWidth={1.75} color="#FF5E5E" style={{ margin: '5px'}} />Priority:</p>
        <p><User size={15} style={{ margin: '5px' }} color='#E040FB' />Assigned To:</p>
        <p><Hourglass size={15} color="#DC3545" strokeWidth={1.75} style={{margin: '5px'}}/>Track Time:</p>
        <p><Tag size={15} color="#FF9F00" strokeWidth={1.75} style={{ margin: '5px' }} />Tags:</p>
        <p><FileText size={15} strokeWidth={1.75} style={{ margin: '5px' }} color='#58BAD7' />Description:</p>
      </Col>

      {/* Right Column - Values */}
      <Col span={12} style={{lineHeight:'4'}}>
      <p>{task.status}</p>
                                <p>{moment(task.start_date).format('DD MMM YYYY')} - {moment(task.end_date).format('DD MMM YYYY')}</p>
                                <p>{task.priority}</p>
                                <p>
  {task?.assignedTo?.length > 0
    ? task.assignedTo.map((assignee) => assignee.name).join(", ")
    : "No assignees"}
    </p>
    <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {isTracking ? (
        <span
          style={{
            cursor: 'pointer',
            color: 'red',
            transition: 'transform 0.2s',
          }}
          onClick={stopTimeTracking}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        ><CircleStop size='18px' /></span>
      ) : (
        <span
          style={{
            cursor: 'pointer',
            color: 'green',
            transition: 'transform 0.2s',
          }}
          onClick={startTimeTracking}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        ><CirclePlay size='18px' /></span>
      )}
      {elapsedTime > 0 && <span> Elapsed Time: {formatTime(elapsedTime)}</span>}
    </p>
                                <p>{task?.job?.length > 0
    ? task.job.map((job) => job.jobclient_id).join(", ")
    : "No Tags"}</p>
                                <p style={{lineHeight:'2'}}>Description: {task.description || '-'}</p>
      </Col>
    </Row>
  </Card>
</Col>

        {/* Activity Section */}
        <Col span={8}>
                    <Card title="Activity Log" style={{ height: '100%', overflowY: 'scroll', padding: '8px',}}>
                        <p style={{margin:'10px'}}><strong>Timeline:</strong></p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin:'15px' }}>
                        <Timeline mode="alternate">
              <Timeline.Item
                color="green"
                dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}
              >
                Task Created: {moment(task.createdAt).format('DD MMM YYYY HH:mm:ss')}
              </Timeline.Item>
              {task.start_time && (
                <Timeline.Item
                  color="blue"
                  dot={<PlayCircleOutlined style={{ fontSize: '16px' }} />}
                >
                  Start Time: {moment(task.start_time).format('DD MMM YYYY HH:mm:ss')}
                </Timeline.Item>
              )}
              {task.end_time && (
                <Timeline.Item
                  color="red"
                  dot={<StopOutlined style={{ fontSize: '16px' }} />}
                >
                  End Time: {moment(task.end_time).format('DD MMM YYYY HH:mm:ss')}
                </Timeline.Item>
              )}
              {elapsedTime > 0 && (
                <Timeline.Item
                  color="purple"
                  dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
                >
                  Total Time: {formatTime(elapsedTime)}
                </Timeline.Item>
              )}
            </Timeline>
                        </div>
                    </Card>
                </Col>
      </Row>
    </Modal>
  );
};

export default TaskDetailsModal;
