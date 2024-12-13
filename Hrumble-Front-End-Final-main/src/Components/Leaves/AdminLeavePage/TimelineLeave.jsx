import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LeaveContext from '../../../Providers/Leaves';

const TimelineLeave = () => {
  const { requestleaves } = useContext(LeaveContext);
  const colors = ['primary', 'info', 'danger', 'success', 'warning', 'dark'];

  return (
    <div className="col-lg-4 col-md-12" style={{ marginLeft: "8px", height: "auto", maxHeight: "700px" }}> 
      <div className="card h-100" style={{ maxHeight: "100%", overflow: "hidden" }}>
        <div className="card-header border-0 pb-0">
          <h4 className="card-title">Timeline</h4>
        </div>
        <div className="card-body">
          <div style={{ maxHeight: '630px', overflowY: 'auto', padding: '10px' }}>
            <div id="DZ_W_TimeLine1" className="widget-timeline dz-scroll style-1 ps--active-y">
              <ul className="timeline">
                {requestleaves.map((item, index) => {
                  const color = colors[index % colors.length]; 
                  return (
                    <li key={item.id || index}>
                      <div className={`timeline-badge ${color}`}></div>
                      <Link className="timeline-panel text-muted" to="/widget-basic">
                        <span>{moment(item.createdAt).fromNow()}</span>
                        <h6 className="mb-0">{item.employee_id?.name}</h6>
                        <span>
                          <h9>
                            {item?.leave_id?.leave_title?.length > 20 
                              ? `${item?.leave_id?.leave_title.substring(0, 20)}...` 
                              : item?.leave_id?.leave_title}
                          </h9>
                        </span> 
                        <h8 className="mb-0">
                          <strong className={`text-${color}`}>
                            From {moment(item?.startDate).format('DD-MM-YYYY')} to {moment(item?.endDate).format('DD-MM-YYYY')}
                          </strong>
                        </h8>
                        {item.status === "Approved" || item.status === "Rejected" ? (
                          <p className="mb-0">{item.status} by {item?.approved_by?.name}</p>
                        ) : null}
                        {item.status === "Pending" ? (
                          <p className="mb-0">{item.status} for Approval</p>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineLeave;
