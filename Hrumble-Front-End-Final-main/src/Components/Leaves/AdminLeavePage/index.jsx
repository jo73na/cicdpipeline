import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveApproval from '../AdminLeavePage/LeaveApproval';
import LeaveHistory from './LeaveHistory';
import TimelineLeave from './TimelineLeave';
import LeaveContext from '../../../Providers/Leaves';

const AdminLevePage = () => {
  const navigate = useNavigate();
  const leftSideRef = useRef(null); // Ref for the left side container
  const [leftSideHeight, setLeftSideHeight] = useState(0);
  const { requestleaves, fetchrequestleaves, handleChangeStatus } = useContext(LeaveContext);

  // Calculate the height of the left-side components
  useEffect(() => {
    if (leftSideRef.current) {
      setLeftSideHeight(leftSideRef.current.offsetHeight);
    }
  }, [leftSideRef]);

  // Grouping the counts by status
  const statusCounts = requestleaves.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { Approved: 0, Pending: 0, Rejected: 0 } // Initial values for all statuses
  );

  // Status-based card configuration
  const statusCards = [
    { title: 'Approved', count: statusCounts.Approved, color: 'success' },
    { title: 'Pending', count: statusCounts.Pending, color: 'warning' },
    { title: 'Rejected', count: statusCounts.Rejected, color: 'danger' },
  ];

  return (
    <>
      <div className="d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm">
        <p className="heading_text">Leaves</p>
         {/* Button Section */}
         <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/leave-management')}
          >
            Manage Leaves
          </button>
        </div>
      </div>
      {/* <div style={{ display: 'flex', alignContent: 'center', justifyContent:'center' }}> */}
        {/* Cards Section */}
        <div
  className="card"
  style={{
    flex: '1',
    marginTop: '2rem',
    marginBottom: '-2px',
  }}
>
  <div className="card-body px- py-2">
    <div className="row">
      {statusCards.map((card, index) => (
        <div
          className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-2"
          key={index}
          style={{
            maxWidth: '200px', 
            margin: '0 auto', 
          }}
        >
          <div className="d-flex align-items-baseline">
            <h1 className={`mb-0 fs-28 fw-bold me-2 text-${card.color}`}>{card.count}</h1>
            <h6 className="mb-0">{card.title}</h6>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* </div> */}
      <div className="mt-4 d-flex">
        <div ref={leftSideRef} className="col-lg-8 col-md-12 d-flex flex-column">
          <div>
            <LeaveApproval />
          </div>
          <LeaveHistory />
        </div>
        {/* Right side: Timeline */}
        <TimelineLeave leftSideHeight={leftSideHeight} />
      </div>
    </>
  );
};

export default AdminLevePage;
