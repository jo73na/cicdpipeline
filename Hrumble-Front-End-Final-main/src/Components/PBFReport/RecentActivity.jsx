import React, { useContext, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Tag, Pagination } from 'antd';
import PBFContext from '../../Providers/PBFReports';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies';
import { LeftOutlined } from '@ant-design/icons';
 
const StatusLabel = ({ status }) => {
  let badgeVariant = '';
 
 
  if (status.toLowerCase().includes('Submitted' || "submission")) {
    badgeVariant = 'primary';
  } else if (status.toLowerCase().includes('reject' || "rejected")) {
    badgeVariant = 'danger';
  } else if (status === 'approved' || "approve") {
    badgeVariant = 'success';
  }
  if (!badgeVariant) {
    return null;
  }
 
  return <Badge bg={badgeVariant}>{status}</Badge>;
};
 
const RecentActivity = ({ handleDrawerClose, setDrawerVisible, drawerVisible, filter }) => {
  const { FectpfbReport, pbfLoading, pbfReport, filterdata, handleClearFilter } = useContext(PBFContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
 
  const role = CookieUtil.get("role");
  const navigate = useNavigate();
 
  let data = [];
 
  pbfReport?.map((item, i) => {
    if (item?.job_id) {
      data.push({
        sno: i + 1,
        dateOfSubmission: moment(item?.createdAt).format('DD-MM-YYYY'),
        client: item?.job_id?.client_id[0]?.name,
        jobId: item?.job_id?.job_id,
        positionName: item?.job_id?.job_title,
        candidate: `${item?.candidateoriginal_id?.first_name} ${item?.candidateoriginal_id?.last_name || ""}`,
        positionType: item?.candidateoriginal_id?.mode_of_hiring || "-",
        status: item?.status,
        recruiter: item?.candidate_owner?.name,
        candidate_id: item?.candidateoriginal_id?._id,
        job_id: item?.job_id?._id,
      });
    }
  });
 
  const indexOfLastRecord = currentPage * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalRecords = data.length;
 
  console.log("Client nmame:" , currentRecords)
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
 
  useEffect(() => {
    FectpfbReport();
  }, []);
 
  // Define header styles
  const headerStyle = {
    backgroundColor: 'rgb(163, 192, 154)', // Green background
    color: 'white',            // White text
    fontWeight: '500',         // Semi-bold text
    padding: '12px',           // Comfortable padding
  };
 
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="heading_text mb-0">
            <LeftOutlined className='back' onClick={() => navigate(-1)} />Reports
          </h4>
        </div>
      </div>
      <div className="table-responsive" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table className="table card-table border-no success-tbl" style={{ backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th className="text-left" style={headerStyle}>S.No</th>
              <th className="text-left" style={headerStyle}>Date</th>
              {filter?.options?.includes("viewClient") && <th className="text-left" style={headerStyle}>Client</th>}
              <th className='text-left'style={headerStyle} >Job Name</th>
              <th className="text-left" style={headerStyle}>Candidate Name</th>
              <th className="text-left" style={headerStyle}>Status</th>
              <th className="text-left" style={headerStyle}>Candidate Owner</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.sno} style={{ backgroundColor: 'white' }}>
                <td className="text-left">{record.sno}</td>
                <td className="text-left">{record.dateOfSubmission}</td>
                <td className='text-left'>{record.positionName}</td>
                {filter?.options?.includes("viewClient") && <td className="text-left">{record.client}</td>}
                <td>
                  {role === "Vendor" ? (
                    <div className="text-left">
                      <div>{record.positionName}</div>
                      <div>{record.candidate}</div>
                      <div className="d-flex justify-content-left mt-1">
                        <Tag color="#f6a70f" style={{fontSize:"8px"}}>{record.jobId}</Tag>
                        <Tag color="#6d8f62" style={{fontSize:"8px"}}>{record.client}</Tag>
                        <Tag color='#090731' style={{fontSize:"8px"}}>{record.positionType}</Tag>
                      </div>
                    </div>
                  ) : (
                   
                    <div className="text-left">
                   
                      <a
                        className="hover_add"
                        onClick={() => navigate(`/candidates/${record.candidate_id}`)}
                      >
                       
                        {record.candidate}
                      </a>
                      <div className="d-flex justify-content-left mt-1">
                        <Tag color="#f6a70f" style={{fontSize:"8px"}}>{record.jobId}</Tag>
                        <Tag color="#6d8f62" style={{fontSize:"8px"}}>{record.client}</Tag>
                        <Tag color='#090731' style={{fontSize:"8px"}}>{record.positionType}</Tag>
                      </div>
                    </div>
                 
                  )}
                </td>
                <td className="text-left"><StatusLabel  status={record.status} /></td>
                <td className="text-left">{record.recruiter}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end mt-3">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalRecords}
            onChange={handlePageChange}
            showSizeChanger
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          />
        </div>
      </div>
    </div>
  );
};
 
export default RecentActivity;