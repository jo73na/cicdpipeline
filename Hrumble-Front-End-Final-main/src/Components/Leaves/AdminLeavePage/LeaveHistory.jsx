import React, {useState,useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { IMAGES } from '../../../Utils/SVGICON';
import { Button, Input, Table, Select, Tooltip, Modal, Form, notification } from 'antd';
import LeaveContext from '../../../Providers/Leaves';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';
import { LeftOutlined, EditOutlined } from '@ant-design/icons';






const headers = [
  { label: "Applied Date", key: "createdAt" }, 
  { label: "Employee Name", key: "employee_id.name" },
  { label: "Leave Type", key: "leave_id.leave_title" },
  { label: "From Date", key: "startDate" },
  { label: "To Date", key: "endDate" },
  { label: "No. of Days", key: "no_of_days" },
  { label: "Reason", key: "reason" },
  { label: "Status", key: "status" },
    { label: "Approved By", key: "approved_by.name" },
];



const LeaveHistory = () => {
    const { requestleaves, fetchrequestleaves, handleChangeStatus } = useContext(LeaveContext);
    const navigate = useNavigate();
    const [editingId, setEditingId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
  
    useEffect(() => {
      fetchrequestleaves();
    }, []);
    const approvedLeaves = requestleaves?.filter(
      (leave) => leave.status === 'Approved' || leave.status === 'Rejected' || leave.status === 'Cancelled'
    );

    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    // const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(approvedLeaves.length / recordsPage);
    const number = [...Array(npage).keys()].map((_, idx) => idx + 1);
    const records = approvedLeaves.slice(firstIndex, lastIndex);

    
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
    

    // const handleStatusChange = async (id, newStatus) => {
    //   if (newStatus === "Approved" || newStatus === "Rejected") {
    //     try {
    //       await handleChangeStatus(id, newStatus);
    //       notification.success({
    //         message: `Leave request ${newStatus} successfully!`,
    //         duration: 2,
    //       });
    //       setEditingId(null); // Reset editing state after successful update
    //     } catch (error) {
    //       // Check if the error message is "Already Approved"
    //       if (error.response && error.response.data.message === "Error: Already Approved") {
    //         notification.error({
    //           message: 'Update Failed',
    //           description: 'This leave request has already been approved.',
    //           duration: 2,
    //         });
    //       } else {
    //         notification.error({
    //           message: 'Failed to update leave request',
    //           description: error.message,
    //           duration: 2,
    //         });
    //       }
    //     }
    //   } else {
    //     notification.warning({
    //       message: 'Invalid status',
    //       description: 'Please select either "Approved" or "Rejected".',
    //       duration: 2,
    //     });
    //   }
    // };

    const handleEditClick = (id) => {
      setEditingId(id);
      setIsModalVisible(true);
    };
  
    const handleModalCancel = () => {
      setIsModalVisible(false);
      setEditingId(null);
    };
  
    const handleFormSubmit = async () => {
      if (selectedStatus) {
        await handleStatusChange(editingId, selectedStatus);
        setIsModalVisible(false);
      }
    };
  
    const handleStatusChange = async (id, newStatus) => {
      try {
        await handleChangeStatus(id, newStatus);
        notification.success({
          message: `Leave request ${newStatus} successfully!`,
          duration: 2,
        });
        setEditingId(null);
      } catch (error) {
        notification.error({
          message: 'Failed to update leave request',
          description: error.message,
          duration: 2,
        });
      }
    };


    return (
        <>
        <Modal
        title="Edit Leave Status"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onOk={handleFormSubmit}
        width={300}
      >
        <Form>
          <Form.Item label="Status" name="status">
            <Select onChange={(value) => setSelectedStatus(value)} value={selectedStatus}>
              <Option value="Approved">Approve</Option>
              <Option value="Rejected">Reject</Option>
              <Option value="Cancelled">Cancel</Option>

            </Select>
          </Form.Item>
        </Form>
      </Modal>

        
          <div className="card">
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1">
                        <div className="tbl-caption">
                            <h4 className="heading mb-0">Leave History</h4>
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
                                        <th >No. of Days</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                        <th>Approved By</th>
                                        <th>Action</th>

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
                                            <td className="pe-0 ">
                                            <Tooltip title={item?.reason || '-'}>
                    <span className="truncate">{item?.reason || '-'}</span>
                  </Tooltip>
                                            </td> 
                                            <td className="pe-0">
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
          : item.status === "Cancelled"
          ? "Cancelled"
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
        <Dropdown.Item
          onClick={() => {
            handleStatusChange(item._id, "Cancelled");
            setEditingId(null);
          }}
        >
          Cancelled
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <span
      className={`badge ${
        item.status === "Approved"
          ? "badge-success"
          : item.status === "Rejected" || item.status === "Cancelled"
          ? "badge-danger"
          : "badge-warning"
      } light border-0 me-1`}
    >
      {item.status === "Approved"
        ? "Approved"
        : item.status === "Rejected"
        ? "Rejected"
        : item.status === "Cancelled"
          ? "Cancelled"
        : "Pending"}
    </span>
  )}
                                            </td>
                                            <td className="pe-0">
                                            {item.approved_by ? item?.approved_by?.name : '-'}
                                            </td> 
                                            <td className="pe-0 table-number" style={{ textAlign: "center", verticalAlign: "middle" }}>
                                            <EditOutlined
                          className="icon-box icon-box-xs hover-effect"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "30px",
                            width: "30px",
                            borderRadius: "10%",
                            backgroundColor: "#321F69",
                            color: "white",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditClick(item._id)}
                        />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                <div className='dataTables_info'>
                                    Showing {lastIndex-recordsPage + 1} to{" "}
                                    {lastIndex} 
                                    {" "}of {approvedLeaves.length} entries
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



export default LeaveHistory;