import React, { useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Tag } from 'antd';
import PBFContext from '../../Providers/PBFReports';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies';
import { LeftOutlined } from '@ant-design/icons';
 
const RecentActivity = ({handleDrawerClose, setDrawerVisible, drawerVisible, filter}) => {
   const {FectpfbReport, pbfLoading, pbfReport, filterdata, handleClearFilter} = useContext(PBFContext)
   
   const role = CookieUtil.get("role");
   const navigate = useNavigate();
 
   let data = []
   
   pbfReport?.map((item, i) => {
     if (item?.job_id){
       data.push({
         sno: i + 1,
         dateOfSubmission: moment(item?.createdAt).format('DD-MM-YYYY'),
         client: item?.job_id?.client_id[0]?.name,
         jobId: item?.job_id?.job_id,
         positionName: item?.job_id?.job_title,
         candidate: `${item?.candidateoriginal_id?.first_name} ${item?.candidateoriginal_id?.last_name||""}`,
         positionType: item?.candidateoriginal_id?.mode_of_hiring || "-",
         status: item?.status,
         recruiter: item?.candidate_owner?.name,
         candidate_id: item?.candidateoriginal_id?._id,
         job_id: item?.job_id?._id,
       })
     }
   })
 
   useEffect(() => {
     FectpfbReport()
   }, [])
 
   return (
     <div className='container-fluid'>
       <div className="row">
         <div className="d-flex justify-content-between align-items-center mb-4">
           <h4 className="heading_text mb-0">
             <LeftOutlined className='back' onClick={() => navigate(-1)}/>Reports
           </h4>
         </div>
       </div>
       <div className="table-responsive">
         <Table striped bordered hover size="sm">
           <thead>
             <tr>
               <th className="text-center">S.No</th>
               <th className="text-center">Date of Submission</th>
               {filter?.options?.includes("viewClient") && <th className="text-center">Client</th>}
               <th className="text-center">Candidate</th>
               <th className="text-center">Position Type</th>
               <th className="text-center">Status</th>
               <th className="text-center">Recruiter</th>
             </tr>
           </thead>
           <tbody>
             {data.map((record) => (
               <tr key={record.sno}>
                 <td className="text-center">{record.sno}</td>
                 <td className="text-center">{record.dateOfSubmission}</td>
                 {filter?.options?.includes("viewClient") && <td className="text-center">{record.client}</td>}
                 <td>
                   {role === "Vendor" ? (
                     <div className="text-center">
                       <div>{record.candidate}</div>
                       <div className="d-flex justify-content-center mt-1">
                         <Tag color="#f6a70f">{record.jobId}</Tag>
                         <Tag color="#6d8f62">{record.positionName}</Tag>
                       </div>
                     </div>
                   ) : (
                     <div className="text-center">
                       <a
                         className="hover_add"
                         onClick={() => navigate(`/candidates/${record.candidate_id}`)}
                       >
                         {record.candidate}
                       </a>
                       <div className="d-flex justify-content-center mt-1">
                         <Tag color="#f6a70f">{record.jobId}</Tag>
                         <Tag color="#6d8f62">{record.positionName}</Tag>
                       </div>
                     </div>
                   )}
                 </td>
                 <td className="text-center">{record.positionType}</td>
                 <td className="text-center">{record.status}</td>
                 <td className="text-center">{record.recruiter}</td>
               </tr>
             ))}
           </tbody>
         </Table>
       </div>
     </div>
   )
};
 
export default RecentActivity;