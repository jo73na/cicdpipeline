import React, { useEffect, useContext} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Dropdown,Tab, Nav, Offcanvas } from 'react-bootstrap';









import dayjs from 'dayjs';
import { Empty } from 'antd';
import AssignEmployeePopup from './AssignEmployeePopup';
import AssignEmployeeEditPopup from './AssignEmployeeEdit';
import Loader from '../../Utils/Loader';
import TotalDeposit from '../UtlilsComponent/TotalDeposit';
import ClientContext from '../../Providers/ClientProvider';
import { SVGICON } from '../../Utils/SVGICON';







// const tableData = [
//     {id: '01', invid:'INV-100023456', assign: '3', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '02', invid:'INV-100023567', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'Low'},    
//     {id: '03', invid:'INV-100023987', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete', select:'Medium'},    
//     {id: '04', invid:'INV-100023420', assign: '3', status:'In Progress', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project', select:'Low'},    
//     {id: '05', invid:'INV-100023436', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '06', invid:'INV-100023123', assign: '5', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert',select:'Low'},    
//     {id: '07', invid:'INV-100023987', assign: '4', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete',select:'Medium'},    
//     {id: '08', invid:'INV-100023852', assign: '3', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project',select:'High' },    
//     {id: '09', invid:'INV-100023741', assign: '5', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress',select:'Low' },    
//     {id: '10', invid:'INV-100023963', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'High'},
//     {id: '11', invid:'INV-100023123', assign: '5', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert',select:'Low'},    
//     {id: '12', invid:'INV-100023987', assign: '4', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete',select:'Medium'},    
//     {id: '13', invid:'INV-100023852', assign: '3', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project',select:'High' },    
//     {id: '14', invid:'INV-100023741', assign: '5', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress',select:'Low' },    
//     {id: '15', invid:'INV-100023963', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'High'}, 
// 	{id: '16', invid:'INV-100023456', assign: '3', status:'Complete', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
//     {id: '17', invid:'INV-100023567', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML To React Convert', select:'Low'},    
//     {id: '18', invid:'INV-100023987', assign: '4', status:'Pending', startdate:'06 May 2023', enddate:'12 june 2023', title: 'HTML template Issue Complete', select:'Medium'},    
//     {id: '19', invid:'INV-100023420', assign: '3', status:'In Progress', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Complete Admin Dashboard Project', select:'Low'},    
//     {id: '20', invid:'INV-100023436', assign: '4', status:'Testing', startdate:'06 May 2023', enddate:'12 june 2023', title: 'Create Frontend WordPress', select:'High'},    
 
// ];


const AssignEmployee = () => {	
	 let params =useParams()
    const navigate=useNavigate()
    const {handleAssignDelete,handleAssignEdit,openDrawerEdit,handleopenDrawerEdit,openDrawer,projectSingle,handleClickProjectTable,projectemployees,clients,Loading,handleopenDrawer,editDrawer,handleOpenEditDrawer,handleChangeSearchClient} = useContext(ClientContext);
     console.log("projectSingle",projectSingle)
     let revenue = 0;
     let profit = 0;
     let worked = 0;
    
    projectemployees?.sendContractdata?.forEach((currentValue) => {
        worked += Number(currentValue.status == "Working");
         
        revenue += Number( currentValue.clientbilling_salarytype == "Monthly" ? currentValue.client_billing :currentValue.clientbilling_salarytype == "Per Hour" ? currentValue.client_billing*160 :currentValue.client_billing/12);
        profit += Number( currentValue.expected_Ctc_type == "Monthly" ? currentValue.expected_ctc :currentValue.expected_Ctc_type == "Per Hour" ? currentValue.expected_ctc*160 :currentValue.expected_ctc/12|| 0);
    });
	
   
   




  


	 



    useEffect(() => {
        handleClickProjectTable(params?.id, true);
      }, []);
    
      const calculatedata = (item) => {
        const startDate = new Date(item?.startDate);
        const endDate = new Date(item?.endtDate);
    
        // Calculate the time difference in milliseconds
        const timeDifference = endDate - startDate;
    
        // Calculate the number of days by dividing the time difference by the number of milliseconds in a day
        return timeDifference / (1000 * 60 * 60 * 24);
      };

      function formatCurrency(amount) {
        return amount?.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).replace(/(\.00|,)$/, '');
    }
    
	return (
		<>
			{
				Loading ?
				<Loader/>
				:
				<div className="container-fluid">	
			<div className="row">
                    <Tab.Container defaultActiveKey={'Grid'} >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="heading mb-0">
                            <i class="fa-solid fa-chevron-left me-1"
      onClick={()=>navigate(-1)}
     style={
        {
            cursor:"pointer"
        }
     }></i >
                                {projectSingle?.name}</h4>
                            <div className="d-flex align-items-center">
                                {/* <Nav as="ul" className="nav nav-pills mix-chart-tab user-m-tabe" id="pills-tab">
                                    <Nav.Item as="li" className="nav-item" role="presentation">
                                        <Nav.Link as="button" className="nav-link" eventKey={'List'}>
                                            {SVGICON.List}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button" className="nav-link" eventKey={'Grid'}>
                                            {SVGICON.GridDots}										
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav> */}
							
                                <Link to className="btn btn-primary btn-sm ms-2"
                                     onClick={handleopenDrawer}
                                >+ Assign Employee
                                </Link>
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div>			
				<div className="row">
					<div className="col-xl-3 col-sm-6">
                    <div className="card same-card">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																<h6>AssignEmployess</h6>
																<h3>
                                                                    {worked}
                                                                </h3>
															</div>
															<div className="icon-box bg-primary">
                                                            <i class="fa-solid fa-rocket text-white m_t_15"></i>
															</div>
														</div>															
														
													</div>
												</div>
                                                
					</div>
                    <div className="col-xl-3 col-sm-6">
                    <div className="card same-card">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																<h6>Active Employees</h6>
																<h3>{worked}</h3>
															</div>
															<div className="icon-box bg-warning">
                                                            <i class="fa-solid fa-hand-holding-heart text-white m_t_10"></i>
															</div>
														</div>															
														{/* <TotalDeposit /> */}
													</div>
												</div>
                                                
					</div>	<div className="col-xl-3 col-sm-6">
                    <div className="card same-card">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																<h6>Total Revenue</h6>
																<h3>  {`${revenue?.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
          })}`}</h3>
															</div>
															<div className="icon-box bg-primary">
                                                            <i class="fa-solid fa-indian-rupee-sign text-white m_t_15"></i>
																
															</div>
														</div>															
														<TotalDeposit/>
													</div>
												</div>
                                                
					</div>	<div className="col-xl-3 col-sm-6">
                    <div className="card same-card">
													<div className="card-body depostit-card p-0">
														<div className="depostit-card-media d-flex justify-content-between pb-0">
															<div>
																<h6>Total Profit</h6>
																<h3>{`${(revenue-profit)?.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
          })}`}</h3>
															</div>
															<div className="icon-box bg-warning">
                                                            <i class="fa-solid fa-indian-rupee-sign text-white m_t_10"></i>
																
															</div>
														</div>															
														<TotalDeposit />
													</div>
												</div>
                                                
					</div>
					<div className="card">
            <div className="card-header border-0 pb-0 flex-wrap">
                {/* <h4 className="heading mb-0">Literary success</h4> */}
            </div>
            <div className="card-body px-0 pb-0">
                 <div>
				 <Tab.Container defaultActiveKey={'Social'}>
                    <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Social'}>
                                {SVGICON.SocialHeart}
                                <span>Fulltime</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Project'}>
                                {SVGICON.Folder}
                                <span>Contract</span>
                            </Nav.Link>
                        </Nav.Item>
                       
						
                    </Nav> 
					 {/* <p>Sathish</p> */}
                    <Tab.Content>
                        <Tab.Pane eventKey={'Social'}>                                
                            <div className="table-responsive">
                                <table className="table  card-table border-no success-tbl">
                                    <thead>
                                        <tr>
                                        <th>Employee Name</th>
                                            <th>Date of Joining</th>
                                            <th>Offered Salary</th>
                                            <th>Profit	</th>
                                            
                                            <th>Status</th>
                                           
                                        </tr>
                                    </thead>
                                    { projectemployees?.sendFullTimedata?.length >0 ? 
                                    <tbody>
                                        {
                                            
                                            projectemployees?.sendFullTimedata?.map((item, ind)=>(
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                            <div className="ms-2 cat-name">
                                                                <p className="mb-0"> {`${item?.employee_id?.firstname}${item?.employee_id?.lastname}`}</p>	
                                                                {/* <span>{item.subtitle}</span> */}
                                                            </div>	
                                                        </div>
                                                    </td>       
                                                <td>{dayjs(item?.date_of_joing).format("YYYY-MM-DD")}</td>
                                                <td> { formatCurrency(item?.offered_salary)}</td>
                                                <td>{item?.profit||0}</td>
                                                {/* <td>{item?.employee_id?.fixed_salary}</td>
                                                <td>{item?.employee_id?.variable_salary}</td> */}
                                                <td
                                                 style={{
                                                     textAlign:"left"
                                                 }}>
             <Dropdown className="task-dropdown-2">
                 <Dropdown.Toggle as="div" className={
                   item.employee_id?._id.status =="Joined"? "Complete":
                   item.employee_id?._id.status =="Offerd"?
                   "Pending":
                   "Testing" 
                 }>{item?.employee_id?._id?.status}</Dropdown.Toggle>
                 <Dropdown.Menu className='task-drop-menu'>
                     <Dropdown.Item  onClick={()=>handleChangestatus(item._id,'opened')}>Offerd</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleChangestatus(item._id,'closed')}>Joined</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleChangestatus(item._id,'Hold')}>No Show</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleChangestatus(item._id,'Hold')}>Terminated</Dropdown.Item>

                 </Dropdown.Menu>
             </Dropdown>															
         </td>
                                                    
                                                  
                                                    
                                                    
                     
                                                    {/* <td>
                                                        <div className="d-flex align-items-center">                                                    
                                                            <Sparklines data={Data} className="peity-line2">
                                                                <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                            </Sparklines>
                                                        </div>	
                                                    </td> */}
                                                    {/* <td>{item.view}%</td> */}
                                                    {/* <td><span className={`badge light border-0 badge-primary`}>Submitted</span></td> */}
                                                    {/* <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="div" className="btn-link i-false" >
                                                                {SVGICON.DropThreeDot}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu-end">
                                                            <Dropdown.Item>View</Dropdown.Item>
    
                                                                <Dropdown.Item>Edit</Dropdown.Item>
                                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td> */}
                                                </tr>
                                            ))
                                        
                                          

                                        }
                                       
                                    </tbody>
                                     : 	<Empty
                                     style={{
                                       margin: "29px auto"
                                     }}
                                    description={
                                     <span>
                                         No Data found ..........
                                     </span>
                                   } />
}


                                </table>
                            </div>                                
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Project'}>
                            <div className="table-responsive">
                                <table className="table  card-table border-no success-tbl">
                                    <thead>
                                    <tr>
                                        <th>Employee Name</th>
                                        {/* <th>End Client</th> */}
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Duration (Days)	</th>
                                            
                                            <th>Salary</th>
                                            <th>Client Billing</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr> 
                                    </thead>
                                    <tbody>
                                    
                                    {projectemployees?.sendContractdata?.map((item, ind)=>(
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {/* <img src={item.image} className="avatar avatar-xl" alt="" /> */}
                                                        <div className="ms-2 cat-name">
                                                            <p className="mb-0"> {`${item?.employee_id?.firstname}${item?.employee_id?.lastname}`}</p>	
                                                            {/* <span>{item.subtitle}</span> */}
                                                        </div>	
                                                    </div>
                                                </td>       
                                                <td>{dayjs(item?.startDate).format("YYYY-MM-DD")}</td>
                                                <td>{dayjs(item?.endtDate).format("YYYY-MM-DD")}</td>
                                                <td>{ calculatedata(item)}</td>
                                                <td>{`₹${Math.round(item.expected_Ctc_type == "Monthly" ? item.expected_ctc :item.expected_Ctc_type == "Per Hour" ? item.expected_ctc*160 :item.expected_ctc/12)?.toLocaleString()}`}</td>
                                                <td>{
                                                     `₹${Math.round( item.clientbilling_salarytype == "Monthly" ? item.client_billing :item.clientbilling_salarytype == "Per Hour" ? item.client_billing*160 :item.client_billing/12)?.toLocaleString()}
                                                    `}</td>
                                                     <td>
             <Dropdown className="task-dropdown-2">
                 <Dropdown.Toggle as="div" className={"Complete"}>{item.status}</Dropdown.Toggle>
                 <Dropdown.Menu className='task-drop-menu'>
                     <Dropdown.Item  onClick={()=>handleAction(item.id,'In Progress')}>Working</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleAction(item.id,'Pending')}>Relieved</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleAction(item.id,'Testing')}>Terminated</Dropdown.Item>

                 </Dropdown.Menu>
             </Dropdown>															
         </td>
                 
                                                {/* <td>
                                                    <div className="d-flex align-items-center">                                                    
                                                        <Sparklines data={Data} className="peity-line2">
                                                            <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                        </Sparklines>
                                                    </div>	
                                                </td> */}
                                                {/* <td>{item.view}%</td> */}
                                                {/* <td><span className={`badge light border-0 badge-primary`}>Submitted</span></td> */}
                                                <td>
                                            <div className='d_f g_10 a_i_c'>
                          
                                             <i class="fa-solid fa-pen-to-square text-primary"
                                              style ={{
                                                cursor:"pointer"
                                              }}
                                              onClick={(e)=>handleAssignEdit(item?._id)}></i>
                                                                 <i class="fa-solid fa-trash text-primary"
                                             onClick={(e)=>handleAssignEdit(item?._id)}

                                               style ={{
                                                cursor:"pointer"
                                              }}></i>
                                             </div>
                                            </td>
                                                {/* <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="div" className="btn-link i-false" >
                                                            {SVGICON.DropThreeDot}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end">
                                                      
                                                            <Dropdown.Item onClick={(e)=>handleAssignEdit(item?._id)}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={(e)=>handleAssignDelete(item?._id)}>Delete</Dropdown.Item>
                                                       
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>  
                        </Tab.Pane>
                     </Tab.Content>              
                </Tab.Container>
				 </div>
			
            </div>
         </div>   	
					{/* <div className='col-xl-12'>
						<div className="card">            
							<div className="card-body p-0">
								<div className="table-responsive active-projects task-table">   
									<div className="tbl-caption d-flex justify-content-between align-items-center">
										<h4 className="heading mb-0">Task</h4>
										<div>
											<CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
										</div>
									</div>    
									<div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
										<table id="empoloyeestbl2" className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0">
											<thead>
												<tr>
													<th className="sorting_asc_15" >
														<div className="form-check custom-checkbox ms-0">
															<input type="checkbox" className="form-check-input checkAllInput" required="" 																
																onClick={()=>handleCheckedAll(unchecked)}
															/>
															<label className="form-check-label" htmlFor="checkAll"></label>
														</div>
													</th>
													<th>#</th>
													<th>Name</th>
													<th>Status</th>
													<th>Start Date</th>
													<th>End Date</th>
													<th>Assigned To</th>
													<th>Tags</th>
													<th className="text-end">Priority</th>
												</tr>
											</thead>
											<tbody>
												{statusPriority.map((item, index)=>(
													<tr key={index}>
														<td className="sorting_25">
															<div className="form-check custom-checkbox">
																<input type="checkbox" className="form-check-input" 																	
																	id={`user-${item.id}`}
																	checked={item.inputchecked}
																	onChange={()=>handleChecked(item.id)}
																/>
																<label className="form-check-label" htmlFor={`user-${item.id}`}></label>
															</div>
														</td>
														<td><span>{index + 101}</span></td>
														<td>
															<div className="products">
																<div>
																	<h6>{item.title}</h6>
																	<span>{item.invid}</span>
																</div>	
															</div>
														</td>
														<td>
															<Dropdown className="task-dropdown-2">
																<Dropdown.Toggle as="div" className={item.status}>{item.status}</Dropdown.Toggle>
																<Dropdown.Menu className='task-drop-menu'>
																	<Dropdown.Item  onClick={()=>handleAction(item.id,'In Progress')}>In Progress</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleAction(item.id,'Pending')}>Pending</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleAction(item.id,'Testing')}>Testing</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleAction(item.id,'Complete')}>Complete</Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>															
														</td>
														<td><span>{item.startdate}</span></td>
														<td>
															<span>{item.enddate}</span>
														</td>
														<td>
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
														</td>	
														<td>
															<span className="badge badge-primary light border-0 me-1">Issue</span>
															<span className="badge badge-secondary light border-0 ms-1">HTML</span>
														</td>
														<td className="text-end">															
															<Dropdown className="task-dropdown-2">
																<Dropdown.Toggle as="div" className={item.select}>{item.select}</Dropdown.Toggle>
																<Dropdown.Menu className='task-drop-menu'>
																	<Dropdown.Item onClick={()=>handleSelect(item.id,'High')}>High</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleSelect(item.id,'Medium')}>Medium</Dropdown.Item>
																	<Dropdown.Item onClick={()=>handleSelect(item.id,'Low')}>Low</Dropdown.Item>																	
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
												{tableData.length < lastIndex ? tableData.length : lastIndex}
												{" "}of {tableData.length} entries
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
					</div> */}


				</div>	
			</div>		
			}	
            <Offcanvas className="offcanvas offcanvas-end customeoff" show={openDrawer} onHide={handleopenDrawer} placement="end" >
            <div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Assign Employee</h5>
					<button type="button" className="btn-close" onClick={handleopenDrawer}>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
        <Offcanvas.Body>
        <AssignEmployeePopup params ={params?.id} handleopenDrawer ={handleopenDrawer} />
             
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas className="offcanvas offcanvas-end customeoff" show={openDrawerEdit} onHide={handleopenDrawerEdit} placement="end" >
            <div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Edit Assign</h5>
					<button type="button" className="btn-close" onClick={handleopenDrawerEdit}>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
        <Offcanvas.Body>
        <AssignEmployeeEditPopup params ={params?.id}  handleopenDrawerEdit={handleopenDrawerEdit}/>
             
        </Offcanvas.Body>
      </Offcanvas>
		</>
	);
};

export default AssignEmployee;