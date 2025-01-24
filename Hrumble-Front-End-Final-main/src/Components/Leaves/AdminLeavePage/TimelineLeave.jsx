import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LeaveContext from '../../../Providers/Leaves';

const TimelineLeave = () => {
  const { requestleaves } = useContext(LeaveContext);
  const colors = ['primary', 'info', 'danger', 'success', 'warning', 'dark'];

  const sortedLeaves = requestleaves.sort((a, b) => {
    const timeA = a.status === "Pending" ? a.createdAt : a.updatedAt;
    const timeB = b.status === "Pending" ? b.createdAt : b.updatedAt;
    return new Date(timeB) - new Date(timeA);
  });

  return (
    <div className="col-lg-4 col-md-12" style={{ marginLeft: "8px", height: "auto", maxHeight: "700px" }}>
      <div className="card h-100" style={{ maxHeight: "100%", overflow: "hidden" }}>
        <div className="card-header border-0 pb-0">
          <h4 className="card-title">Timeline</h4>
        </div>
        <div className="card-body">
          <div style={{ maxHeight: '630px', overflowY: 'auto', padding: '10px' }}>
            <div id="DZ_W_TimeLine" className="widget-timeline dz-scroll ps--active-y">
              <ul className="timeline">
                {sortedLeaves.map((item, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <li key={item.id || index}>
                      <div className={`timeline-badge ${color}`}></div>
                      <Link className="timeline-panel text-muted">
                        <span>
                          {item.status === "Pending"
                            ? moment(item.createdAt).fromNow()
                            : moment(item.updatedAt).fromNow()}
                        </span>
                        <h6 className="mb-0">{item.employee_id?.name}</h6>
                        <div style={{ display: 'flex', gap: '2px', flexWrap: 'nowrap' }}>
                          <span className={`badge text-white bg-${color}`} style={{ fontSize: '7px', padding: '4px 6px' }}>
                            {item?.leave_id?.leave_title?.length > 20
                              ? `${item?.leave_id?.leave_title.substring(0, 20)}...`
                              : item?.leave_id?.leave_title}
                          </span>
                          <span className={`badge text-white bg-${color}`} style={{ fontSize: '7px', padding: '4px 6px' }}>
                            {moment(item?.startDate).format('MMM DD, YYYY')}
                          </span>
                          <span className={`badge text-white bg-${color}`} style={{ fontSize: '7px', padding: '4px 6px' }}>
                            {moment(item?.endDate).format('MMM DD, YYYY')}
                          </span>
                        </div>
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
