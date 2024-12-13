import React, {useState,useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { IMAGES } from '../../../Utils/SVGICON';
import { Button, Input, Table, Select, Tooltip } from 'antd';
import LeaveContext from '../../../Providers/Leaves';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';




const headers = [
    { label: "Applied Date", key: "createdAt" }, 
    { label: "Employee Name", key: "employee_id.name" },
    { label: "Leave Type", key: "leave_id.leave_title" },
    { label: "From Date", key: "startDate" },
    { label: "To Date", key: "endDate" },
    { label: "No. of Days", key: "no_of_days" },
    { label: "Reason", key: "reason" },
    { label: "Status", key: "status" },
  ];



const LeaveApproval = () => {
    const { requestleaves, fetchrequestleaves, handleChangeStatus } = useContext(LeaveContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchrequestleaves();
    }, []);
    const nonApprovedLeaves = requestleaves?.filter((item) => item.status !== 'Approved' && item.status !== 'Rejected');

    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    // const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(nonApprovedLeaves.length / recordsPage);
    const number = [...Array(npage).keys()].map((_, idx) => idx + 1);
    const records = nonApprovedLeaves.slice(firstIndex, lastIndex);

    
    function prePage (){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage (id){
        setCurrentPage(id);
    }
    function nextPage (){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)
        }
    }
 

    const csvlink = {
        headers : headers,
        data : records,
        filename: "csvfile.csv"
    }
    
    return (
        <>
          <div className="card">
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1">
                        <div className="tbl-caption">
                            <h4 className="heading mb-0">Leave Approval</h4>
                            <div>                            
                                <CSVLink {...csvlink} className="btn btn-primary light btn-sm "><i className="fa-solid fa-file-excel" /> Export Report </CSVLink>                             
                            </div>
                        </div>
                        <div id="projects-tbl_wrapper" className="dataTables_wrapper no-footer mb-0">
                            <table id="projects-tbl" className="table dataTable no-footer mb-2 mb-sm-0">
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((item, index)=>(
                                        <tr key={index}>                                       
                                            <td>{dayjs(item.createdAt).format("DD-MM-YYYY")}</td>
                                            <td>
                                            {item?.employee_id?.name || '-'}
                                            </td>
                                            <td className="pe-0">
  {item?.leave_id?.leave_title === "Sick Leave" ? (
    <span className="badge" style={{ backgroundColor: "#BEAFE7", color: "#5D2B90" }}>
      {item.leave_id.leave_title}
    </span>
  ) : item?.leave_id?.leave_title === "Casual Leave" ? (
    <span className="badge badge-info light border-0">
      {item.leave_id.leave_title}
    </span>
  ) : (
    item?.leave_id?.leave_title
  )}
</td>

                                            <td className="pe-0">
                                           {moment(item?.startDate).format('DD-MM-YYYY')}

                                            </td>
                                            <td className="pe-0">
                                            {moment(item?.endDate).format('DD-MM-YYYY')}
                                            </td>
                                            <td className="pe-0 table-number">
                                               {item.no_of_days}
                                            </td> 
                                            <td className="pe-0">
                                            <Tooltip title={item?.reason || '-'}>
                    <span className="truncate">{item?.reason || '-'}</span>
                  </Tooltip>
                                            </td> 
                                            <td className="pe-0">
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
                                        </tr>
                                    ))}
                                </tbody>
                                
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                <div className='dataTables_info'>
                                    Showing {lastIndex-recordsPage + 1} to{" "}
                                    {lastIndex} 
                                    {" "}of {nonApprovedLeaves.length} entries
                                </div>
                                <div
                                    className="dataTables_paginate paging_simple_numbers justify-content-center"
                                    id="example2_paginate"
                                >
                                    <Link
                                        className="paginate_button previous disabled"
                                        to="#"                                        
                                        onClick={prePage}
                                    >
                                        <i className="fa-solid fa-angle-left" />
                                    </Link>
                                    <span>                                      
                                        {number.map((n , i )=>(
                                            <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                onClick={()=>changeCPage(n)}
                                            > 
                                                {n}                                                

                                            </Link>
                                        ))}
                                    </span>
                                    <Link
                                        className="paginate_button next"
                                        to="#"                                        
                                        onClick={nextPage}
                                    >
                                        <i className="fa-solid fa-angle-right" />
                                    </Link>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    );
};



export default LeaveApproval;