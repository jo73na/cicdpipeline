
// import { useContext, useEffect } from "react";
// import JobContext from "../../Providers/JobProvider";
// import Loader from "../../Utils/Loader";

// import { Button, Input, Tabs, Drawer } from "antd";
// import AddJob from "./AddJob";
// import OpenJobsTable from "./OpenJobTable";
// import Filterlogo from "/images/Filter.svg";

// import FilterPopup from "./filterpopup";
// import UserManagementContext from "../../Providers/UserMangement";
// import AssignVendor from "./Assignvendor";
// const { Search } = Input;

// const JobDashboard = () => {
//   const {
//     filterData,
//     setFilterdata,
//     memoizedResult,
//     searchjob,
//     job,
//     Loading,
//     handleChangeSearch,
//     openaddjob,
//     setOpenaddjob,
//     pagination,
//     fetchJob,
//     handleopenfilter,
//     openFilter,
//     setopenFilter,
//     openvendor,
//     handleClickVendor
//   } = useContext(JobContext);

//   const { permission } = useContext(UserManagementContext);
//   console.log("permission", permission);
//   let filter = permission?.find((item) => item?.name == "Jobs");
//   const sum = job?.data?.reduce((accumulator, currentValue) => {
//     return accumulator + Number(currentValue.required_no_of_candidates);
//   }, 0);

//   //Tabs Items
//   const items = [
//     {
//       key: "1",
//       label: "Open Jobs",
//       children: <OpenJobsTable table="openjobs" />,
//     },
//     // {
//     //   key: '2',
//     //   label: 'Closed Jobs',
//     //   children:<OpenJobsTable table="closedjobs"/>
//     // },
//   ];

//   const handleopenDrawerJob = () => {
//     setOpenaddjob(!openaddjob);
//   };

//   useEffect(() => {
//     fetchJob(filterData);
//   }, [pagination.current, pagination.pageSize]);

//   const handleclearFilter = () => {
//     setFilterdata({});
//     fetchJob();
//   };
//   //  Pie Chart Start here

//   //  Pie Chart ends here
//   console.log("filtyerdata", filterData);
//   const filtericon = (
//     <div className="d_f g_10 a_i_c">
//       {Object.keys(filterData).length > 0 && (
//         <Button className="btn_cancel" onClick={handleclearFilter}>
//           Clear Filter({Object.values(filterData).length} )
//         </Button>
//       )}
//          {filter?.options?.includes("ViewFilter") &&   <div
//         className="m_r_20"
//         style={{
//           cursor: "pointer",
//         }}
//         onClick={handleopenfilter}
//       >
//         {" "}
//         <img src={Filterlogo} />
//       </div>}
//     </div>
//   );
//   return (
//     <>
//       {/* Drawer Open For Add Job */}

//       {Loading && <Loader />}
//       <p className="heading_text">Jobs</p>

//       <div className="d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm">
//         <Search
//           className="input_search"
//           allowClear
//           placeholder="Search by Job Title / ID "
//           enterButton
//           onChange={handleChangeSearch}
//           value={searchjob}
//         />
//         <div className="d_f a_i_c">
//           {filter?.options?.includes("Create Job") && (
//             <Button
//               type="primary"
//               className="btn create_btn"
//               onClick={handleopenDrawerJob}
//             >
//               + Create New Job
//             </Button>
//           )}
//         </div>
//       </div>
//       {/* <div className='col_2 g_10 col_1_xs col_2_md'>
//          <div className='card p_10 w_100'>
//          <p className='card_header'> Jobs Created:{job?.total}</p>
//           <img  className='card_icon' src={icon1}/>
//           <div style={{height: 130}} className=''>
//             <PieChart />
//           </div>
//          </div>
//          <div className='card p_10 '>
//          <p className='card_header'>Requirements: {sum}</p>
//          <img  className='card_icon' src={icon2}/>
//          <div style={{height: 130}} className=''>
//             <PieChart2 />
//           </div>

//          </div>
//       </div> */}
// {/* 
//       <div className="tab m_t_10 m_b_10 p_10 responsive_table">
//         <Tabs
//           items={items}
//           defaultActiveKey="1"
//           tabBarExtraContent={filtericon}
//         />
//       </div> */}

//       <Drawer
//         title="Create New Job"
//         placement="right"
//         onClose={handleopenDrawerJob}
//         closable={openaddjob}
//         size="large"
//         open={openaddjob}
//         height={50}
//         width={650}
//         className="rotate-modal"
//       >
//         <AddJob />
//       </Drawer>
//       <Drawer
//         title="Filter"
//         placement="right"
//         onClose={handleopenfilter}
//         closable={openFilter}
//         size="small"
//         open={openFilter}
//         height={50}
//       >
//         <FilterPopup />
//       </Drawer>
      
//     </>
//   );
// };

// export default JobDashboard;
import {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Dropdown,Tab, } from 'react-bootstrap';
// import { CSVLink } from 'react-csv';


import { useContext } from 'react';



import dayjs from 'dayjs';
import JobContext from './../../Providers/JobProvider/index';

import Loader from '../../Utils/Loader';
import { Drawer, Pagination } from 'antd';

import AddJob from './AddJob';
import CookieUtil from './../../Utils/Cookies';
import {UserAddOutlined } from "@ant-design/icons"
import AssignVendor from './Assignvendor';
import { CSVLink } from 'react-csv';
import { Modal } from 'antd';







const JobDashboard = () => {	
    const tableData = [
       
    ];
    
    
    const headers = [
        { label: "Job Title", key: "job_title" },
        { label: "Client", key: "client" },
        { label: "Created By", key: "done_by" },
        { label: "job Type", key: "job_type" },
        { label: "Created On", key: "created_at" },
        { label: "Status", key: "status" },
        { label: "Client Submissions", key: "ClientSubmission" },
    ];
    
    const csvlink = {
        headers : headers,
        data : tableData,
        filename: "csvfile.csv"
    }
    
    const {setvendorjob,openAssign,setOpenAssign, setPagination,setOpenaddjob,searchjob,handleChangeSearch,fetchJob,Loading,openJobs,handleChangestatus,pagination,handlePageChange,openaddjob}=useContext(JobContext)
      const navigate =useNavigate()
    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 10;

     const role =CookieUtil.get("role")
     const admin_id =CookieUtil.get("admin_id")
    
    const npage = Math.ceil(pagination.total / recordsPage)
    const number = [...Array(npage + 1).keys()].slice(1)
  
    console.log("assignEditCandidate",currentPage)
   
	

   const handleClickAssign=(id)=>{
    setvendorjob(id)
        setOpenAssign(true)
   }

    const calculateCounts = (candidates,_id) => {
        let submission = 0;
        let ClientSubmission=0;
        let interview = 0;
        let offered = 0;
        let joined = 0;
      
        candidates.forEach((e) => {
          if(e.status === "Submitted"){
             if(role =="Vendor"){
                if(e?.created_by== admin_id && e.job_id==_id){
                  console.log("admin_id",e.status,)
    
                    console.log("admin_id",admin_id)
                    console.log("created_by",e.created_by)
                     submission+=1;
    
                }
               
             }
             else{
            submission+=1;
                   
             }
          }
          if ( e.status === "Client submission") {
            if(role =="Vendor"){
                if(e?.created_by== admin_id && e.job_id==_id){ 
                  console.log("admin_id",e.status,)
    
                    console.log("admin_id",admin_id)
                    console.log("created_by",e.created_by)
                    ClientSubmission+=1;
    
                }
               
             }
             else{
                ClientSubmission+=1;
                   
             }
            
          }
          if (e.status === "L1 schedule"){
            interview += 1;
          }
          if (e.status === "offered") {
            offered += 1;
          }
          if (e.status === "jioned") {
            joined += 1;
          }
        });
      
        return { submission, interview, offered, joined,ClientSubmission };
      };


      let mapedData =openJobs?.map((item, index)=>{
        

        const { submission, interview, joined, offered,ClientSubmission} = calculateCounts(item.screening,item._id);
          tableData.push({
            submission,
            interview,
            joined,
            offered,
            ClientSubmission,
            job_id: item._id,
            job_title: item.job_title,
            client:item?.Clients[0]?.name,
        
            job_type: item.job_type,
            created_at:dayjs(item?.createdAt).format(' DD-MM-YYYY'),
            status: item.status,
            done_by:item?.done_by[0]?.name,
          
          })
      
         return   <tr key={index}>
         {/* <td className="sorting_25">
             <div className="form-check custom-checkbox">
                 <input type="checkbox" className="form-check-input" 																	
                     id={`user-${item.id}`}
                     checked={item.inputchecked}
                     onChange={()=>handleChecked(item.id)}
                 />
                 <label className="form-check-label" htmlFor={`user-${item.id}`}></label>
             </div>
         </td> */}
         {/* <td><span>{index + 101}</span></td> */}
         <td>
             <div className="products">
                 <div>
                     <h6
                      style ={{
                         cursor:"pointer"
                      }}
                      onClick ={()=>navigate(`/jobs/${item?._id}`)}>{item.job_title}</h6>
                     <span>{item?.job_id}</span>
                 </div>	
             </div>
         </td>
  {
     role != "Client" || role !="Vendor" &&
     <td><span>{`${item?.Clients[0]?.name} ${item.poc?.length>0?(`(${item.poc[0]})`):""}`}</span></td>

  }

        
         <td><span>{item?.done_by[0]?.name}</span></td>

         <td><span>{dayjs(item?.createdAt).format(' DD-MM-YYYY')}</span></td>
     {
         role !="Vendor" ?
         <>
             <td><span>{submission}</span></td>
         <td><span>{ClientSubmission}</span></td>
         </>
         :
         <td>{ClientSubmission}</td>
     }
         <td
           style={{
            textAlign:"Left"
         }}>
            {
                 role =="SuperAdmin" ?
                < Dropdown className="task-dropdown-2">
                 <Dropdown.Toggle as="div" className={
                   item.status =="opened"? "Complete":
                   item.status =="closed"?
                   "Pending":
                   "Testing" 
                 }>{item.status =="opened"? "Opened":item.status =="closed"? "Closed":"Hold"}</Dropdown.Toggle>
                 <Dropdown.Menu className='task-drop-menu'>
                     <Dropdown.Item  onClick={()=>handleChangestatus(item._id,'opened')}>Opened</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleChangestatus(item._id,'closed')}>Closed</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleChangestatus(item._id,'Hold')}>Hold</Dropdown.Item>

                 </Dropdown.Menu>
             </Dropdown>:
                <span className={`badge badge-${item.status =="opened"? "success":item.status =="closed"? "danger":"warning"} light border-0 me-1`}>{item.status =="opened"? "Opened":item.status =="closed"? "Closed":"Hold"}</span>
       

            }
             													
         </td>
         {/* <td>
             <span>{item.enddate}</span>
         </td> */}
         {/* <td>
             <div className="avatar-list avatar-list-stacked">
                 {item.assign === "3" ? 																
                     <>
                         <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
                     </>
                 : 
                 item.assign === "4" ? 
                     <>
                         <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
                         <img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
                     </>
                 :
 
                     <>
                         <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact2} className="avatar avatar-md rounded-circle" alt="" />{" "}
                         <img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
                     </>																	
                 }
             </div>
         </td>	 */}
       {
         role == "SuperAdmin" &&
         <td>
            <UserAddOutlined
            onClick={(e)=>handleClickAssign(item?._id)}
             style={{
                 fontSize:"18px",
                 fontWeight:900,
                 cursor:"pointer",

                 color:"var(--color-primary)"
             }}/>
         {/* <span className="badge badge-primary light border-0 me-1">Internal</span>
         <span className="badge badge-secondary light border-0 ms-1">External</span> */}
     </td>
       }
         {/* <td className="text-end">															
             <Dropdown className="task-dropdown-2">
                 <Dropdown.Toggle as="div" className={item.select}>{item.select}</Dropdown.Toggle>
                 <Dropdown.Menu className='task-drop-menu'>
                     <Dropdown.Item onClick={()=>handleSelect(item.id,'High')}>High</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleSelect(item.id,'Medium')}>Medium</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleSelect(item.id,'Low')}>Low</Dropdown.Item>																	
                 </Dropdown.Menu>
             </Dropdown>
         </td> */}
     </tr>
})


     useEffect(() => {
        fetchJob()
     }, [pagination.current, pagination.pageSize])
     


       const handleopenDrawerJob = () => {
    setOpenaddjob(!openaddjob);
  };

     
     
	return (
		<>
         {
            Loading ?
             <Loader/>
             :
             <div className="container-fluid">	
            	
				<div className="row">
					{/* <div className="col-xl-12">
						<div className="card">
							<div className="card-body">
								<div className="row task">
									{cardCounter.map((item, index)=>(
										<div className="col-xl-2 col-sm-4 col-6" key={index}>
											<div className="task-summary">
												<div className="d-flex align-items-baseline">
													<CountUp className={`mb-0 fs-28 fw-bold me-2 text-${item.countText}`}  end={item.number} duration={'5'} />
													<h6 className='mb-0'>{item.title}</h6>
												</div>
												<p>Tasks assigne</p>
											</div>
										</div>
									))}

								</div>	
							</div>	
						</div>	
					</div>	 */}
                    	<div className="row">
                    <Tab.Container defaultActiveKey={'Grid'} >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="heading mb-0">Jobs</h4>
                            <div className="d-flex align-items-center">
                                {/* <Nav as="ul" className="nav nav-pills mix-chart-tab user-m-tabe" id="pills-tab">
                                    <Nav.Item as="li" className="nav-item" role="presentation">
                                        <Nav.Link as="button" className="nav-link" eventKey={'List'}>
                                            {SVGICO.List}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button" className="nav-link" eventKey={'Grid'}>
                                            {SVGICON.GridDots}										
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav> */}
                                
                                <Link to className="btn btn-primary btn-sm ms-2"
                                 onClick={handleopenDrawerJob}
                                >+ Add Job
                                </Link>
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div>
					<div className='col-xl-12'>
                       <div className='d_f j_c_s_b a_i_c'>
                       <div className="d-flex justify-content-between align-items-center mb-2">
										<h4 className="heading mb-0"><div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Job Title/ Job ID..." 
                         onChange={handleChangeSearch}
                         value={searchjob}/>
						<span className="input-group-text">
							<Link to={"#"}>
                            <i class="fa-solid fa-magnifying-glass text-primary "
                             style={{
                                fontSize:"16px"
                             }}></i>
							</Link>
						</span>
					</div></h4>
                   <div>

                   </div>
                    <div>                            
                            </div>
										<div>
											{/* <CSVLink  className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink> */}
										</div>
									</div> 
                                    <CSVLink {...csvlink} className="btn btn-primary light btn-sm "><i className="fa-solid fa-file-excel" /> Export Report </CSVLink>                             

                       </div>
						<div className="card">            
							<div className="card-body p-0">
								<div className="table-responsive active-projects task-table">   
									{/* <div className="tbl-caption d-flex justify-content-between align-items-center">
										<h4 className="heading mb-0"></h4>
										<div>
											<CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
										</div>
									</div>     */}
									<div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
										<table id="empoloyeestbl2" className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0">
											<thead>
												<tr>
													{/* <th className="sorting_asc_15" >
														<div className="form-check custom-checkbox ms-0">
															<input type="checkbox" className="form-check-input checkAllInput" required="" 																
																onClick={()=>handleCheckedAll(unchecked)}
															/>
															<label className="form-check-label" htmlFor="checkAll"></label>
														</div>
													</th> */}
													{/* <th>#</th> */}
													<th>Job Title</th>
													{
                                                        role  !== "Client"  || role !=="Vendor" &&
                                                        <th>Client</th>
                                                    }

													<th>Created By</th>
													<th>Created on</th>
                                                    {
                                                         role !=="Vendor" ?
                                                       <>
                                                          <th>Internal Submission</th>
													<th>Client Submission</th>
                                                       </> 
                                                    :
                                                        <th>Total Submissions</th>
                                                    }
													
													<th
                                                      style={{
                                                         textAlign:"Left"
                                                      }}>Status</th>

													{
                                                        role == "SuperAdmin" && 
                                                        <th>Assigned To</th>
                                                    }
													{/* <th>Tags</th>
													<th className="text-end">Priority</th> */}
												</tr>
											</thead>
											<tbody>
												 {mapedData}
											</tbody>
											
										</table>
                                        <div className='d_f justify-content-end mt-3 mb-3'>
		 <Pagination
         size="small"
      showSizeChanger
      onChange={(e,pageSize)=>
         
        {
             
            setPagination({
		...pagination,
		pageSize:pageSize,
		current:e
	  })}}
      defaultCurrent={pagination?.current}
      total={pagination?.total}
      pageSize={pagination?.pageSize}
    />
			</div>
										{/* <div className="d-sm-flex text-center justify-content-between align-items-center">
										
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
														<Link className={`paginate_button ${pagination?.current === n ? 'current' :  '' } `} key={i}                                            
															onClick={()=>handlePageChange(n, 10)}
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
										</div>  */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>	
         }




{/* <Modal
        title="Create New Job"
      
        open={openaddjob}
        onOk={() => setOpen(false)}
        onCancel={handleopenDrawerJob}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
    
        width={1200}
      >
        <AddJob  handleopenDrawerJob={handleopenDrawerJob}/>
         
      </Modal> */}


     <Drawer
        title="Create New Job"
        placement="right"
        onClose={handleopenDrawerJob}
        closable={openaddjob}
        size="large"
        open={openaddjob}
        height={50}
        width={650}
        className="rotate-modal"
      >
        <AddJob  handleopenDrawerJob={handleopenDrawerJob}/>
      </Drawer> 

      <Drawer
        title="Assign"
        placement="right"
        onClose={()=>setOpenAssign(false)}
        closable={openAssign}
        size="large"
        open={openAssign}
        height={50}
        width={400}
        className="rotate-modal"
      >
        <AssignVendor />
      </Drawer>
					
		</>
	);
};

export default JobDashboard;



