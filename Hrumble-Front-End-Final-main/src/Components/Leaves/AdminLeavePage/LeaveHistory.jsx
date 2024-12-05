import { useContext, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LeaveContext from '../../../Providers/Leaves';
import moment from 'moment';
import { Tooltip, Tag } from 'antd'; // Import Tooltip and Tag from Ant Design

const LeaveHistory = () => {
  const { requestleaves, fetchrequestleaves } = useContext(LeaveContext);
  const navigate = useNavigate();

  const approvedLeaves = requestleaves?.filter(
    (leave) => leave.status === 'Approved' || leave.status === 'Rejected'
  );

  useEffect(() => {
    fetchrequestleaves();
  }, []);

  return (
    <>
      <p className="heading_text">
        <LeftOutlined className="back" onClick={() => navigate(-1)} /> Leave History
      </p>

      <div className="table-responsive mt-3">
        <table className="table card-table border-no success-tbl">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>No. of Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
            {approvedLeaves?.map((item) => (
              <tr key={item._id}>
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
                  {item.status === 'Approved' ? (
                    <Tag color="#BBE6E3">Approved</Tag>
                  ) : (
                    <Tag color="red">Rejected</Tag>
                  )}
                </td>
                <td>{item.approved_by ? item?.approved_by?.name : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaveHistory;
