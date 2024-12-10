import { useContext, useEffect, useState } from 'react';
import { LeftOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LeaveContext from '../../../Providers/Leaves';
import moment from 'moment';
import { Tooltip, notification, Select } from 'antd'; // Import Select from Ant Design
import dayjs from 'dayjs';
import {  Dropdown } from 'react-bootstrap';



const { Option } = Select; // Destructure Option from Select

const LeaveHistory = () => {
  const { requestleaves, fetchrequestleaves, handleChangeStatus } = useContext(LeaveContext);
  const navigate = useNavigate();
  
  // State to track which leave request is being edited
  const [editingId, setEditingId] = useState(null);

  const approvedLeaves = requestleaves?.filter(
    (leave) => leave.status === 'Approved' || leave.status === 'Rejected'
  );

  useEffect(() => {
    fetchrequestleaves();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    if (newStatus === "Approved" || newStatus === "Rejected") {
      try {
        await handleChangeStatus(id, newStatus);
        notification.success({
          message: `Leave request ${newStatus} successfully!`,
          duration: 2,
        });
        setEditingId(null); // Reset editing state after successful update
      } catch (error) {
        // Check if the error message is "Already Approved"
        if (error.response && error.response.data.message === "Error: Already Approved") {
          notification.error({
            message: 'Update Failed',
            description: 'This leave request has already been approved.',
            duration: 2,
          });
        } else {
          notification.error({
            message: 'Failed to update leave request',
            description: error.message,
            duration: 2,
          });
        }
      }
    } else {
      notification.warning({
        message: 'Invalid status',
        description: 'Please select either "Approved" or "Rejected".',
        duration: 2,
      });
    }
  };

  return (
    <>
      <p className="heading_text">
        <LeftOutlined className="back" onClick={() => navigate(-1)} /> Leave History
      </p>

      <div className="table-responsive mt-3">
        <table className="table-custom card-table border-no success-tbl">
          <thead>
            <tr className="custom-row">
              <th>Applied Date</th>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>No. of Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Approved By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="tablebody-custom">
            {approvedLeaves?.map((item) => (
              <tr key={item._id}>
                <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                <td>{item?.employee_id?.name || '-'}</td>
                <td>{item?.leave_id?.leave_title}</td>
                <td>{moment(item?.startDate).format('DD-MM-YYYY')}</td>
                <td>{moment(item?.endDate).format('DD-MM-YYYY')}</td>
                <td>{item.no_of_days}</td>
                <td>
                  <Tooltip title={item?.reason || '-'}>
                    <span className="truncate">{item?.reason || '-'}</span>
                  </Tooltip>
                </td>
                <td>
  {editingId === item._id ? (
    <Dropdown className="task-dropdown-2">
      <Dropdown.Toggle
        as="div"
        className={`badge ${
          item.status === "Approved"
            ? "badge-success"
            : item.status === "Rejected"
            ? "badge-danger"
            : "badge-warning"
        } light border-0 me-1`}
      >
        {item.status === "Approved"
          ? "Approved"
          : item.status === "Rejected"
          ? "Rejected"
          : "Pending"}
      </Dropdown.Toggle>
      <Dropdown.Menu className="task-drop-menu">
        <Dropdown.Item
          onClick={() => {
            handleStatusChange(item._id, "Approved");
            setEditingId(null);
          }}
        >
          Approve
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            handleStatusChange(item._id, "Rejected");
            setEditingId(null);
          }}
        >
          Reject
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <span
      className={`badge ${
        item.status === "Approved"
          ? "badge-success"
          : item.status === "Rejected"
          ? "badge-danger"
          : "badge-warning"
      } light border-0 me-1`}
    >
      {item.status === "Approved"
        ? "Approved"
        : item.status === "Rejected"
        ? "Rejected"
        : "Pending"}
    </span>
  )}
</td>

                <td>{item.approved_by ? item?.approved_by?.name : '-'}</td>

                <td>
                  <EditOutlined
                    className="text-primary"
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={() => setEditingId(item._id)} // Set the editing ID when clicked
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaveHistory;