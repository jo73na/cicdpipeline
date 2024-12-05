import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {  Dropdown, Tab } from 'react-bootstrap';
import { useContext } from 'react';
import dayjs from 'dayjs';
import JobContext from './../../Providers/JobProvider/index';
import Loader from '../../Utils/Loader';
import { Drawer, Pagination,  Flex, Tag, Modal } from 'antd';
import { UserAddOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import CookieUtil from './../../Utils/Cookies';
import AssignVendor from './Assignvendor';
import AddJobs from './AddJobs';
import EditDirectHiring from './EditForms/EditDirectHiring';
import ViewJobContext from '../../Providers/ViewJob';

const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};
 
const JobDashboard = () => {
    const [selectedJobId, setSelectedJobId] = useState(null);
    const tableData = [];
    const headers = [
        { label: "Job Title", key: "job_title" },
        { label: "Client", key: "client" },
        { label: "Created By", key: "done_by" },
        { label: "Hiring Type", key: "contractType" },
        {label: "Job Type", key: "secondarySelected"},
        { label: "Job Description", key: "job_context" },
        { label: "Minimum Experience", key: "min_experience" },
        { label: "Maximum Experience", key: "max_experience" },
        { label: "Salary", key: "salary" },
        { label: "Location", key: "location" },
        { label: "Created On", key: "created_at" },
        { label: "Status", key: "status" },
        { label: "Client Submissions", key: "ClientSubmission" },
    ];
 
    const csvlink = {
        headers: headers,
        data: tableData,
        filename: "csvfile.csv"
    };
 
    const {
        setvendorjob,
        openAssign,
        setOpenAssign,
        setPagination,
        setOpenaddjob,
        searchjob,
        handleChangeSearch,
        fetchJob,
        Loading,
        openJobs,
        handleChangestatus,
        pagination,
        handlePageChange,
        openaddjob,
        handleClickjobTable,editDrawer,handleEditJob,handleAssign
    } = useContext(JobContext);
    const {} = useContext(ViewJobContext);
 
    const navigate = useNavigate();
    const role = CookieUtil.get("role");
    const admin_id = CookieUtil.get("admin_id");
    const calculateCounts = (candidates, _id) => {
        let submission = 0;
        let ClientSubmission = 0;
        let interview = 0;
        let offered = 0;
        let joined = 0;
 
        candidates.forEach((e) => {
            if (e.status === "Submitted") {
                if (role == "Vendor") {
                    if (e?.created_by == admin_id && e.job_id == _id) {
                        submission += 1;
                    }
                } else {
                    submission += 1;
                }
            }
            if (e.status === "Client submission") {
                if (role == "Vendor") {
                    if (e?.created_by == admin_id && e.job_id == _id) {
                        ClientSubmission += 1;
                    }
                } else {
                    ClientSubmission += 1;
                }
            }
            if (e.status === "L1 schedule") {
                interview += 1;
            }
            if (e.status === "offered") {
                offered += 1;
            }
            if (e.status === "jioned") {
                joined += 1;
            }
        });
 
        return { submission, interview, offered, joined, ClientSubmission };
    };
 
    const handleClickAssign=(id)=>{
        setvendorjob(id)
            setOpenAssign(true)
       }

    useEffect(() => {
        fetchJob();
    }, [pagination.current, pagination.pageSize]);
 
    const handleopenDrawerJob = () => {
        setOpenaddjob(!openaddjob);
    };

    useEffect(() => {
        console.log("Edit Drawer State:", editDrawer);
      }, [editDrawer]);
      useEffect(() => {
        console.log("Edit Drawer State:", openAssign);
      }, [openAssign]);
 
    return (
        <>
            {Loading ? (
                <Loader />
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="row">
                            <Tab.Container defaultActiveKey={'Grid'}>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="heading mb-0">Jobs</h4>
                                </div>
                            </Tab.Container>
                        </div>
                        <div className='col-xl-12'>
                            <div className='d_f j_c_s_b a_i_c'>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h4 className="heading mb-0">
                                        <div className="input-group search-area">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Job Title/ Job ID..."
                                                onChange={handleChangeSearch}
                                                value={searchjob}
                                            />
                                            <span className="input-group-text">
                                                <Link to={"#"}>
                                                    <i className="fa-solid fa-magnifying-glass text-primary"
                                                        style={{
                                                            fontSize: "16px"
                                                        }}></i>
                                                </Link>
                                            </span>
                                        </div>
                                    </h4>
                                    <div></div>
                                    <div></div>
                            </div>
                            <div className='flex align-items-center justify-content-around'>
                                                     
                                        <Link to className="btn btn-primary btn-sm ms-2"
                                            onClick={handleopenDrawerJob}
                                            style={{marginRight:"10px"}}
                                        >+ Add New Jobs
                                        </Link>
                                       
                                <CSVLink {...csvlink} className="btn btn-primary light btn-sm">
                                    <i className="fa-solid fa-file-excel" /> Export Report
                                </CSVLink>
                               
                            </div>
                        </div>
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="table-responsive active-projects task-table">
                                        <div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
                                            <table id="empoloyeestbl2" className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0">
                                                <thead>
                                                    <tr>
                                                        <th>Job Title</th>
                                                        {role !== "Client" || role !== "Vendor" && <th>Client</th>}
                                                        <th>Created By</th>
                                                        <th>Created on</th>
                                                        {role !== "Vendor" ? (
                                                            <th colSpan="2" className="text-center border-bottom-0">
                                                                Submission
                                                                <div className="d-flex" style={{marginLeft: "20px"}}>
                                                                    <div className="flex-1 text-center border-end  px-2">Internal</div>
                                                                    <div className="flex-1 text-center px-2">Client</div>
                                                                </div>
                                                            </th>
                                                        ) : (
                                                            <th>Total Submissions</th>
                                                        )}
                                                        <th style={{ textAlign: "left" }}>Status</th>
                                                        {role === "SuperAdmin" && (
                                                            <th className="text-center">Actions</th>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {openJobs?.map((item, index) => {
                                                        const { submission, interview, joined, offered, ClientSubmission } = calculateCounts(item.screening, item._id);
                                                        tableData.push({
                                                            submission,
                                                            interview,
                                                            joined,
                                                            offered,
                                                            ClientSubmission,
                                                            job_id: item._id,
                                                            job_title: item.job_title,
                                                            client: item?.Clients[0]?.name,
                                                            contractType: item.contractType,
                                                            secondarySelected: item.secondarySelected,
                                                            job_context: stripHtml(item?.job_description),
                                                            salary: item?.salary,
                                                            location: item?.location,
                                                            min_experience: item?.exp_from,
                                                            max_experience: item?.exp_to,
                                                            created_at: dayjs(item?.createdAt).format('DD-MM-YYYY'),
                                                            status: item?.status,
                                                            done_by: item?.done_by[0]?.name,
                                                        });
 
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="products">
                                                                        <div>
                                                                            <h6 style={{ cursor: "pointer" }}
                                                                                onClick={() => navigate(`/jobs/${item?._id}`)}>
                                                                                {item.job_title}
                                                                            </h6>
                                                                            <div style={{ alignItems: "center", display: "inline-flex" }}>
                                                                                <span style={{ marginTop: "3px", cursor: "pointer", fontSize: "9px" }}>
                                                                                    <Flex gap="4px">
                                                                                        <Tag style={{ borderRadius: "4px" }} color='#77ab59'>{item?.job_id}</Tag>
                                                                                        <Tag style={{ borderRadius: "4px" }} color='#36802d'>{item?.contractType}</Tag>
                                                                                        <Tag style={{ borderRadius: "4px" }} color='#526E48'>{item?.secondarySelected}</Tag>
                                                                                    </Flex>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                {role !== "Client" || role !== "Vendor" && (
                                                                    <td><span>{`${item?.Clients[0]?.name} ${item.poc?.length > 0 ? (`(${item.poc[0]})`) : ""}`}</span></td>
                                                                )}
                                                                <td><span>{item?.done_by[0]?.name}</span></td>
                                                                <td><span>{dayjs(item?.createdAt).format('DD-MM-YYYY')}</span></td>
                                                                {role !== "Vendor" ? (
                                                                    <>
                                                                        <td className="text-center border-end">{submission}</td>
                                                                        <td className="text-center ">{ClientSubmission}</td>
                                                                    </>
                                                                ) : (
                                                                    <td>{ClientSubmission}</td>
                                                                )}
                                                                <td style={{ textAlign: "left" }}>
                                                                    {role === "SuperAdmin" ? (
                                                                        <Dropdown className="task-dropdown-2">
                                                                            <Dropdown.Toggle as="div" className={
                                                                                item.status === "opened" ? "Complete" :
                                                                                    item.status === "closed" ? "Pending" : "Testing"
                                                                            }>
                                                                                {item.status === "opened" ? "Opened" :
                                                                                    item.status === "closed" ? "Closed" : "Hold"}
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu className='task-drop-menu'>
                                                                                <Dropdown.Item onClick={() => handleChangestatus(item._id, 'opened')}>Opened</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => handleChangestatus(item._id, 'closed')}>Closed</Dropdown.Item>
                                                                                <Dropdown.Item onClick={() => handleChangestatus(item._id, 'Hold')}>Hold</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    ) : (
                                                                        <span className={`badge badge-${item.status === "opened" ? "success" :
                                                                            item.status === "closed" ? "danger" : "warning"
                                                                            } light border-0 me-1`}>
                                                                            {item.status === "opened" ? "Opened" :
                                                                                item.status === "closed" ? "Closed" : "Hold"}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                {role === "SuperAdmin" && (
                                                                    <td className="text-center" >
                                                                        <div className="d-flex justify-content-center  gap-2">
                                                                            <EyeOutlined
                                                                                className="text-primary"
                                                                                style={{ fontSize: "18px", cursor: "pointer" }}
                                                                                onClick={() => navigate(`/jobs/${item?._id}`)}
                                                                            />
                                                                            <EditOutlined
                                                                                className="text-primary"
                                                                                style={{ fontSize: "18px", cursor: "pointer" }}
                                                                                onClick={(e) => handleEditJob(item?._id)}
                                                                            />
                                                                            <UserAddOutlined
                                                                                style={{
                                                                                    fontSize: "18px",
                                                                                    cursor: "pointer",
                                                                                    color: "var(--color-primary)"
                                                                                }}
                                                                                onClick={(e)=>handleClickAssign(item?._id)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className='d_f justify-content-end mt-3 mb-3'>
                                                <Pagination
                                                    size="small"
                                                    showSizeChanger
                                                    onChange={(e, pageSize) => {
                                                        setPagination({
                                                            ...pagination,
                                                            pageSize: pageSize,
                                                            current: e
                                                        });
                                                    }}
                                                    defaultCurrent={pagination?.current}
                                                    total={pagination?.total}
                                                    pageSize={pagination?.pageSize}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
 
            <Modal
                title="Create New Job"
                open={openaddjob}
                onOk={() => setOpen(false)}
                onCancel={handleopenDrawerJob}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                width={750}
                height={"auto"}
                className="custom-modal"
            >
                <AddJobs handleopenDrawerJob={handleopenDrawerJob} />
            </Modal>
            <Modal
    title="Edit Job"
    onCancel={()=>handleEditJob(false)}
    open={editDrawer}
    
    footer={null}
    width={750}
>
    <EditDirectHiring
        // jobId={editDrawer}
        // closeForm={() => handleEditJob()}
    />
</Modal>
 
            <Modal
                title="Assign"
                placement="right"
                onCancel={()=>setOpenAssign(false)}
                closable={openAssign}
                footer={null}
                size="large"
                open={openAssign}
                height={50}
                width={400}
                className="rotate-modal"
       >
         <AssignVendor  onCancel={()=>setOpenAssign(false)}/>
       </Modal>   
        </>
    );
 };
 
 
 export default JobDashboard;
