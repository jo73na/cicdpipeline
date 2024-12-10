import { useContext, useEffect } from 'react';
import Loader from '../../../Utils/Loader';
import { Button, Input, Table, Select, Tooltip } from 'antd';
import LeaveContext from '../../../Providers/Leaves';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';

const { Search } = Input;

const AdminLevePage = () => {
  const { requestleaves, fetchrequestleaves, handleChangeStatus } = useContext(LeaveContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchrequestleaves();
  }, []);
  


  const nonApprovedLeaves = requestleaves?.filter((item) => item.status !== 'Approved' && item.status !== 'Rejected');

  const mappedData = nonApprovedLeaves?.map((item, i) => (
    <tr key={i}>
           <td>{dayjs(item.createdAt).format("DD-MM-YYYY")}</td>

      <td><span>{item?.employee_id?.name || '-'}</span></td>
      <td><span>{item?.leave_id?.leave_title}</span></td>
      <td><span>{moment(item?.startDate).format('DD-MM-YYYY')}</span></td>
      <td><span>{moment(item?.endDate).format('DD-MM-YYYY')}</span></td>
      <td><span>{item.no_of_days}</span></td>
      <td>
      <Tooltip title={item?.reason || '-'}>
                    <span className="truncate">{item?.reason || '-'}</span>
                  </Tooltip>
                  </td>
      <td>
        <Dropdown className="task-dropdown-2">
          <Dropdown.Toggle
            as="div"
            className={
              item.status === 'Approved' ? 'Complete' :
              item.status === 'Pending' ? 'Testing' :
              'Pending'
            }
          >
            {item.status}
          </Dropdown.Toggle>
          <Dropdown.Menu className="task-drop-menu">
            <Dropdown.Item onClick={() => handleChangeStatus(item?._id, 'Pending')}>Pending</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeStatus(item?._id, 'Approved')}>Approved</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeStatus(item?._id, 'Rejected')}>Rejected</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
      {/* <td style={{ textAlign: 'left' }}>
        <span>{item.approved_by ? item?.approved_by?.name : '-'}</span>
      </td> */}
    </tr>
  ));

  return (
    <>
      <div className="d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm">
        <p className="heading_text">Leaves</p>
      </div>
      <div className="d_f a_i_c mt-3">
        <button type="primary" className="btn btn-primary btn-sm me-3" onClick={() => navigate('/leave-management')}>
          Leave Management
        </button>
        <button type="primary" className="btn btn-primary btn-sm" onClick={() => navigate('/leavehistory')}>
          Leave History
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table className="table-custom card-table border-no success-tbl">
          <thead>
            <tr>
              <th>Applied Date</th>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>No. of Days</th>
              <th>Reason</th>
              <th>Status</th>
              {/* <th>Approved By</th> */}
            </tr>
          </thead>
          <tbody className="tablebody-custom">
            {mappedData}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminLevePage;
