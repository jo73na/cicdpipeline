import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Dropdown, Tab } from "react-bootstrap";
import { useContext } from "react";
import dayjs from "dayjs";
import JobContext from "./../../Providers/JobProvider/index";
import Loader from "../../Utils/Loader";
import { Drawer, Pagination, Flex, Tag, Modal } from "antd";
import { UserAddOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import CookieUtil from "./../../Utils/Cookies";
import AssignVendor from "./Assignvendor";
import AddJobs from "./AddJobs";
import EditDirectHiring from "./EditForms/EditDirectHiring";
import ViewJobContext from "../../Providers/ViewJob";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const JobDashboard = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const {
    setvendorjob,
    openAssign,
    setOpenAssign,

    setOpenaddjob,
    // searchjob,
    // handleChangeSearch,
    fetchJob,
    Loading,
    openJobs,
    handleChangestatus,


    openaddjob,
    handleClickjobTable,
    editDrawer,
    handleEditJob,
    handleAssign,
    totalJobs,
    filteredJobs,
    searchjob,
    setSearchjob,
    pagination,
    setPagination,
  } = useContext(JobContext);
  const {} = useContext(ViewJobContext);
  const tableData = [];
  const navigate = useNavigate();
  const role = CookieUtil.get("role");
  const admin_id = CookieUtil.get("admin_id");
  const totalFilteredJobs = filteredJobs.length; // Count of jobs after search
  const isSearching = searchjob.length > 2; // Check if user is searching
  const totalPages = Math.ceil((isSearching ? totalFilteredJobs : totalJobs) / pagination.pageSize);


  const headers = [
    { label: "Job Title", key: "job_title" },
    { label: "Client", key: "client" },
    { label: "Created By", key: "done_by" },
    { label: "Hiring Type", key: "contractType" },
    { label: "Job Type", key: "secondarySelected" },
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
    data: filteredJobs || [],// Use records for CSV export
    filename: "csvfile.csv",
  };


  
  const changeCPage = (id) => {
      if (id >= 1 && id <= totalPages) {
          setPagination((prev) => ({ ...prev, current: id }));
      }
  };
  
  const prePage = () => {
      if (pagination.current > 1) {
          setPagination((prev) => ({ ...prev, current: prev.current - 1 }));
      }
  };
  
  const nextPage = () => {
      if (pagination.current < totalPages) {
          setPagination((prev) => ({ ...prev, current: prev.current + 1 }));
      }
  };





const handleSearch = (e) => {
  setSearchjob(e.target.value);
};


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
  const getStyles = (value) => {
    return {
      // border: value === 0 ? '1.5px solid rgb(225, 61, 61)' : ' 1.5px solid #6d8f62',
      borderRadius: '6px',
      padding: '2px 6px',
      backgroundColor: value === 0 ? 'rgb(242 138 138)' : 'rgb(139 229 167)',
      color: 'black',
      display: 'inline-block'
    };
  };
  const handleClickAssign = (id) => {
    setvendorjob(id);
    setOpenAssign(true);
  };

  const handleopenDrawerJob = () => {
    setOpenaddjob(!openaddjob);
  };

  useEffect(() => {
    console.log("Edit Drawer State:", editDrawer);
  }, [editDrawer]);
  useEffect(() => {
    console.log("Edit Drawer State:", openAssign);
  }, [openAssign]);

  const numberBoxStyle = {
    backgroundColor: "#321F69", // Light blue background
    alignItems: "center",
    borderRadius: "4px",

    // Primary color text
  };

  

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="row">
              <Tab.Container defaultActiveKey={"Grid"}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="heading mb-0">Jobs</h4>
                </div>
              </Tab.Container>
            </div>
            <div className="col-xl-12">
              <div className="d_f j_c_s_b a_i_c">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="heading mb-0">
                    <div className="input-group search-area">
                    <input
            type="text"
            className="form-control"
            placeholder="Search Job Title/ Job ID..."
            value={searchjob}
            onChange={handleSearch}
        />
                      <span className="input-group-text">
                        <Link to={"#"}>
                          <i
                            className="fa-solid fa-magnifying-glass text-primary"
                            style={{
                              fontSize: "16px",
                            }}
                          ></i>
                        </Link>
                      </span>
                    </div>
                  </h4>
                  <div></div>
                  <div></div>
                </div>
                {role !== "Vendor" && (
                <div className="flex align-items-center justify-content-around">
                  <Link
                    to
                    className="btn btn-primary btn-sm ms-2"
                    onClick={handleopenDrawerJob}
                    style={{ marginRight: "10px" }}
                  >
                    + Add New Jobs
                  </Link>

                  <CSVLink
                    {...csvlink}
                    className="btn btn-primary light btn-sm"
                  >
                    <i className="fa-solid fa-file-excel" /> Export Report
                  </CSVLink>
                </div>
                )}
              </div>
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive active-projects task-table">
                    <div
                      id="task-tbl_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <table
                        id="empoloyeestbl2"
                        className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0"
                      >
                        <thead>
                          <tr>
                            <th>Job Title</th>
                            {role !== "Client" ||
                              (role !== "Vendor" && <th>Client</th>)}
                             {role !== "Vendor" && <th>Client Name</th>}
                            <th>Created on</th>
                            {role !== "Vendor" ? (
                              <th
                                colSpan="2"
                                className="text-center border-bottom-0"
                              >
                                Submission
                                <div
                                  className="d-flex"
                                  style={{ marginLeft: "20px" }}
                                >
                                  <div className="flex-1 text-center border-end  px-2">
                                    Internal
                                  </div>
                                  <div className="flex-1 text-center px-2">
                                    Client
                                  </div>
                                </div>
                              </th>
                            ) : (
                              <>
        <th>Internal Submissions</th>
        <th>Client Submissions</th>
      </>
                            )}
                            <th style={{ textAlign: "left" }}>Status</th>
                            { (role === "SuperAdmin" || role === "Vendor") && (
                              <th className="text-center">Actions</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
  {filteredJobs?.map((item, index) => {
    const {
      submission,
      interview,
      joined,
      offered,
      ClientSubmission,
    } = calculateCounts(item.screening, item._id);
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
      created_at: dayjs(item?.createdAt).format("DD-MM-YYYY"),
      status: item?.status,
      done_by: item?.done_by[0]?.name,
    });

    // Check if the role is Vendor and if the job is assigned to the vendor
    const isVendor = role === "Vendor";
    const isAssignedToVendor = isVendor && item.assign.includes(admin_id);

    // Only render the job if it's assigned to the vendor or if the role is not Vendor
    if (isVendor && !isAssignedToVendor) {
      return null; // Skip rendering this job if it's not assigned to the vendor
    }

    return (
      <tr key={index}>
        <td>
          <div className="products">
            <div>
              <h6
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/jobs/${item?._id}`)}
              >
                {item.job_title}
              </h6>
              <div
                style={{
                  alignItems: "center",
                  display: "inline-flex",
                }}
              >
                <span
                  style={{
                    marginTop: "3px",
                    cursor: "pointer",
                    fontSize: "9px",
                  }}
                >
                  <Flex gap="4px">
                    <Tag
                      style={{
                        borderRadius: "4px",
                        fontSize: "8px",
                      }}
                      color="#77ab59"
                    >
                      {item?.job_id}
                    </Tag>
                    {role !== "Vendor" && (
                      <>
                        <Tag
                          style={{
                            borderRadius: "4px",
                            fontSize: "8px",
                          }}
                          color="#36802d"
                        >
                          {item?.job_type}
                        </Tag>
                        <Tag
                          style={{
                            borderRadius: "4px",
                            fontSize: "8px",
                          }}
                          color="#526E48"
                        >
                          {item?.secondarySelected}
                        </Tag>
                      </>
                    )}
                  </Flex>
                </span>
              </div>
            </div>
          </div>
        </td>
        {role !== "Vendor" && (
          <>
            {role !== "Client" && (
              <td>
                <span>{item?.Clients[0]?.name}</span>
              </td>
            )}
          </>
        )}
        <td>
          <span>
            {dayjs(item?.createdAt).format("DD-MM-YYYY")}
          </span>
        </td>
        {role !== "Vendor" ? (
          <>
            <td className="text-center border-end">
              <div style={getStyles(submission)}>
                {submission}
              </div>
            </td>
            <td className="text-center">
              <div style={getStyles(ClientSubmission)}>
                {ClientSubmission}
              </div>
            </td>
          </>
        ) : (
          <>
            <td>
              <div style={getStyles(submission)}>
                {submission}
              </div>
            </td>
            <td>
              <div style={getStyles(ClientSubmission)}>
                {ClientSubmission}
              </div>
            </td>
          </>
        )}
        <td style={{ textAlign: "left" }}>
          {role === "SuperAdmin" ? (
            <Dropdown className="task-dropdown-2">
              <Dropdown.Toggle
                as="div"
                className={
                  item.status === "opened"
                    ? "Complete"
                    : item.status === "closed"
                    ? "Pending"
                    : "Testing"
                }
              >
                {item.status === "opened"
                  ? "OPEN"
                  : item.status === "closed"
                  ? "CLOSE"
                  : "HOLD"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="task-drop-menu">
                <Dropdown.Item
                  onClick={() =>
                    handleChangestatus(item._id, "opened")
                  }
                >
                  OPEN
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleChangestatus(item._id, "closed")
                  }
                >
                  CLOSE
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleChangestatus(item._id, "Hold")
                  }
                >
                  HOLD
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <span
              className={`badge badge-${
                item.status === "opened"
                  ? "success"
                  : item.status === "closed"
                  ? "danger"
                  : "warning"
              } light border-0 me-1`}
            >
              {item.status === "opened"
                ? "Opened"
                : item.status === "closed"
                ? "Closed"
                : "Hold"}
            </span>
          )}
        </td>
        <td className="text-center">
          <div className="d-flex justify-content-center gap-2">
            {(role === "SuperAdmin" || role === "Vendor") && (
              <span
                style={{
                  ...numberBoxStyle,
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/jobs/${item?._id}`)}
                onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                onMouseLeave={(e) => (e.target.style.cursor = "default")}
              >
                <div
                  className="icon-box icon-box-xs"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                  }}
                >
                  <i className="fa-solid fa-eye text-white "></i>
                </div>
              </span>
            )}
            {role === "SuperAdmin" && (
              <>
                <span
                  style={{
                    ...numberBoxStyle,
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleEditJob(item?._id)}
                  onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                  onMouseLeave={(e) => (e.target.style.cursor = "default")}
                >
                  <div
                    className="icon-box icon-box-xs"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  >
                    <i className="fa-solid fa-pencil text-white"></i>
                  </div>
                </span>
                <span
                  style={{
                    ...numberBoxStyle,
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleClickAssign(item?._id)}
                  onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                  onMouseLeave={(e) => (e.target.style.cursor = "default")}
                >
                  <div
                    className="icon-box icon-box-xs"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  >
                    <i className="fa-solid fa-person text-white "></i>
                  </div>
                </span>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
                      </table>
                      <div className="d-sm-flex text-center justify-content-end align-items-center">
        <div className="dataTables_info">
            Showing {(pagination.current - 1) * pagination.pageSize + 1} to 
            {Math.min(pagination.current * pagination.pageSize, isSearching ? totalFilteredJobs : totalJobs)} of 
            {isSearching ? totalFilteredJobs : totalJobs} entries
        </div>
        <div className="dataTables_paginate paging_simple_numbers justify-content-center">
            <Link
                className={`paginate_button previous ${pagination.current === 1 ? "disabled" : ""}`}
                to="#"
                onClick={prePage}
            >
                <i className="fa-solid fa-angle-left" />
            </Link>
            <span>
                {totalPages <= 5 ? (
                    Array.from({ length: totalPages }, (_, i) => (
                        <Link
                            key={i}
                            className={`paginate_button ${pagination.current === i + 1 ? "current" : ""}`}
                            onClick={() => changeCPage(i + 1)}
                        >
                            {i + 1}
                        </Link>
                    ))
                ) : (
                    <>
                        <Link
                            className={`paginate_button ${pagination.current === 1 ? "current" : ""}`}
                            onClick={() => changeCPage(1)}
                        >
                            1
                        </Link>
                        {pagination.current > 3 && <span className="ellipsis">...</span>}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(
                                (n) => n !== 1 && n !== totalPages && (n === pagination.current || n === pagination.current - 1 || n === pagination.current + 1)
                            )
                            .map((n) => (
                                <Link
                                    key={n}
                                    className={`paginate_button ${pagination.current === n ? "current" : ""}`}
                                    onClick={() => changeCPage(n)}
                                >
                                    {n}
                                </Link>
                            ))}
                        {pagination.current < totalPages - 2 && <span className="ellipsis">...</span>}
                        <Link
                            className={`paginate_button ${pagination.current === totalPages ? "current" : ""}`}
                            onClick={() => changeCPage(totalPages)}
                        >
                            {totalPages}
                        </Link>
                    </>
                )}
            </span>
            <Link
                className={`paginate_button next ${pagination.current === totalPages ? "disabled" : ""}`}
                to="#"
                onClick={nextPage}
            >
                <i className="fa-solid fa-angle-right" />
            </Link>
        </div>
        <div className="dropdown-container no-arrow">
            <select
                id="itemsPerPage"
                className="custom-dropdown1"
                value={pagination.pageSize}
                onChange={(e) => {
                    setPagination((prev) => ({ ...prev, pageSize: parseInt(e.target.value, 20), current: 1 }));
                }}
            >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
            </select>
        </div>
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
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={750}
        height={"auto"}
        className="custom-modal"
      >
        <AddJobs handleopenDrawerJob={handleopenDrawerJob} />
      </Modal>
      <Modal
        title="Edit Job"
        onCancel={() => handleEditJob(false)}
        open={editDrawer}
        footer={null}
        width={750}
      >
        <EditDirectHiring
        // jobId={editDrawer}
        closeForm={() => handleEditJob()}
        />
      </Modal>

      <Modal
        title="Assign"
        placement="right"
        onCancel={() => setOpenAssign(false)}
        closable={openAssign}
        footer={null}
        size="large"
        open={openAssign}
        height={50}
        width={400}
        className="rotate-modal"
      >
        <AssignVendor onCancel={() => setOpenAssign(false)} />
      </Modal>
    </>
  );
};

export default JobDashboard;
