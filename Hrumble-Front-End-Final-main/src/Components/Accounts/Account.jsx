// import { useContext,useEffect, useState} from 'react';



// import { Button, Input,Table,Select, Image, Drawer } from 'antd';

// import { useNavigate } from 'react-router-dom';

// import Loader from '../../Utils/Loader';


// import { DatePicker, Menu, Dropdown } from 'antd';
// import { DownOutlined } from '@ant-design/icons';

// const { RangePicker } = DatePicker;

// // import { useEffect } from 'react'
// import SalesandMargettingContext from './../../Providers/SalesandMargetting/index';
// import AddAccountsCompany from './AddAccountsCompany';
// import BulkImportCompany from './BulkImportCompany';


// const { Search } = Input;




// const Account=()=>{

//   const {OpenImportDrawer,openImport,AddCompanyPopup,Loading,AddCompanyDrawer}=useContext(SalesandMargettingContext)
//   const navigate=useNavigate()
// //  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);

//  const handlenavigate=(id)=>{
//     navigate(`/company/${id}`)
//  }
// //Tabs Items



//   const handleopenDrawerJob=()=>{
//     // setOpenaddjob(!openaddjob);

//   }

// //  Pie Chart Start here

// //  Pie Chart ends here

// const columns = [
// //   { title: 'Logo', dataIndex: 'logo', key: 'logo',
// //   render:(image)=>

// //       <Image
// //       style={{
// //         height: "35px",
// //       }}
// //       alt={image}
// //       src={`${BASE}${image}`} />
    
    
// //     },

//   { title: 'Company Name', dataIndex: 'company_name', key: 'company_name',
//   render:(text,record)=>(
//     <div
//      className='d_f f_d_c g_5'>
//           <a  className="hover_add" onClick={(e)=>handlenavigate(record?.action)}>{text}</a>
//           <a  className="hover_add" onClick={(e)=>handlenavigate(record?.action)}><LinkedinOutlined /></a>
//     </div>

//   )
//   },    
//   { title: 'Account Phone', dataIndex: 'industry', key: 'industry' },
//   { title: 'Account Stage', dataIndex: 'stage', key: 'stage' },
//   { title: 'Location', dataIndex: 'location', key: 'location' },
//   { title: 'Website  URL', dataIndex: 'website_url', key: 'website_url' },

// //   { title: 'Status', dataIndex: 'status', key: 'status' ,
// //   render: (text, record) => (
// //     <div className="green">
// //       <Select
// //         defaultValue={record?.status}
// //         onChange={(e) => handleChangeStatus(e,record)}
// //         className={` ${record.status == "Pending" ? "status_hold" :'status_selectbox'}`}
// //         options={[
// //           {
// //             label: "Pending",
// //             value: "Pending",
// //           },
// //           {
// //             label: "Approved",
// //             value: "Approved",
// //           },
// //         ]}
// //       />
// //     </div>
// //   ), },
// //   { title: 'Approved by', dataIndex: 'approvedBy', key: 'approvedBy' },
// ];

// const data=[]
// // company?.map((item,i)=>{
// //   data.push({
// //     key:i+1,
// //     company_name:item?.organization||"-",
// //     industry:item?.industry|| "-",
// //     logo:item?.logo,
// //     startDate:moment(item?.created_At).format(' DD-MM-YYYY'),
// //     // endDate:moment(item?.endDate).format(' DD-MM-YYYY'),
// //     numberOfDays:item.no_of_days,
// //     reason:item?.reason,
// //     approvedBy:item.approved_by? item?.approved_by?.name:"-",
// //     status:item.status,   
// //     action:item._id,

// //   })
// // })

//  useEffect(() => {
//     // fetchCompany()
   
//  }, [])
 
//  const [selectedOption, setSelectedOption] = useState('Today');
//  const [showCustomRangePicker, setShowCustomRangePicker] = useState(false);

//  const handleMenuClick = (e) => {
//    setSelectedOption(e.key);
//    setShowCustomRangePicker(e.key === 'Custom');
//  };

//  const handleDatePickerChange = (dates, dateStrings) => {
//    console.log('Selected Dates:', dates);
//    console.log('Formatted Dates:', dateStrings);
//  };

//  const renderMenu = () => (
//    <Menu onClick={handleMenuClick}>
//      <Menu.Item key="Today">Today</Menu.Item>
//      <Menu.Item key="ThisMonth">This Month</Menu.Item>
//      <Menu.Item key="ThisYear">This Year</Menu.Item>
//      <Menu.Item key="ThisWeek">This Week</Menu.Item>
//      <Menu.Item key="Custom">
//        {showCustomRangePicker ? ( 
//          <RangePicker onChange={handleDatePickerChange}  renderExtraFooter={() => 'extra footer'}  />
//        ) : null}
//      </Menu.Item>
//    </Menu>
//  );
  
  
//  return( 
//      <>

//      {/* Drawer Open For Add Job */}
//      {/* <Drawer
//     title="Create New Job"
//     placement="right"
//     onClose={handleopenDrawerJob}
//     closable={openaddjob}
//     size="large"
    
//     open={openaddjob}
//     height={50}
//     width={650}
    
//   >
//     <AddJob/>
//   </Drawer> */}
    
     
   
//   {
//     Loading ?
//     <Loader/> :
//     <div
//     className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
//     <p className='heading_text'>Companies</p>
      
//      <div className='d_f a_i_c g_10'>
//      <Button type='primary' className='btn create_btn' onClick={AddCompanyPopup}>+ Add Company</Button>
//      <Button type='primary' className='btn create_btn' onClick={OpenImportDrawer}>+ Import</Button>

//      </div>
//     </div>      

//   }

         
      
// <Dropdown overlay={renderMenu} visible={showCustomRangePicker}>
//       <DatePicker>
//         <Button>
//           {selectedOption} <DownOutlined />
//         </Button>
//       </DatePicker>
//     </Dropdown>
//     <RangePicker renderExtraFooter={() => 
//      <>
//       <p className='c_primary'>Select Range</p>
//        <div
//         className='d_f  g_10 m_t_10 m_b_10'>
//        <Button type='primary'>Today</Button>
//       <Button  type='primary'>This Week</Button>
//       <Button  type='primary'>This Month</Button>
//       <Button  type='primary'>This Year</Button>
//        </div>
//      </>} />
    
//     <div className='tab m_t_10 m_b_10 p_10 responsive_table'>
//       <Table
//        columns={columns} dataSource={data}/>
//     </div>
     
//     <Drawer
//         title="Add Account"
//         placement="right"
//         closable={true}
//         onClose={AddCompanyPopup}
//         open={AddCompanyDrawer}
//         width={550}
//       >
//         <AddAccountsCompany/>
//          {/* <AssignUser/> */}
//         {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
//       </Drawer>

//       <Drawer
//         title="Bulk Import"
//         placement="right"
//         closable={true}
//         onClose={OpenImportDrawer}
//         open={openImport}
//         width={550}
//       >
//         <BulkImportCompany/>
//          {/* <AssignUser/> */}
//         {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
//       </Drawer>

      
//         </>
//     )
// }


// export default Account;


import { useContext,useEffect} from 'react';



import {Drawer, Modal, Pagination} from 'antd';


import { Link, useNavigate } from 'react-router-dom';





// import { useEffect } from 'react'
// import SalesandMargettingContext from './../../Providers/SalesandMargetting/index';





import { Button, ButtonGroup, Dropdown, DropdownButton, ListGroup, Nav, Tab } from 'react-bootstrap';

// import AddAccountsCompany from './AddAccount';
import BulkImportCompany from './BulkImportCompany';
// import BulkImportCompany from './BulkImportCompany';
import SalesandMargettingContext from './../../Providers/SalesandMargetting/index';
import AddAccountsCompany from './AddAccountsCompany';
import { SVGICON } from '../../Utils/SVGICON';
import Loader from '../../Utils/Loader';
import AddList from './AddList';
import AccountLinkAdd from './AccountLinkAdd';
import Lists from './List';








const Account=()=>{

    const {setaccountlinkDrawer,accountLinkDrawer,listopen,handleopenModel,handleSelect,account,fethAccounts,OpenImportDrawer,setPagination,pagination,openImport,AddCompanyPopup,Loading,AddCompanyDrawer}=useContext(SalesandMargettingContext)
    // const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total:10 });
  console.log("paggg",pagination)
  const navigate=useNavigate()
//  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);
  
 const handlenavigate=(id)=>{
    navigate(`/company/${id}`)
 }
//Tabs Items





//  Pie Chart Start here



//  Pie Chart ends here






 useEffect(() => {
     fethAccounts()
   
 }, [pagination?.current])





 let mapedData =account?.data?.map((item,index)=>{
	return <tr key={index}>
		
		  <td>
             <div className="products">
      <img src={item?.logo_url||""} className="avatar avatar-md" alt="" />
                 
                 <div>

                     <h6
                      
                      style ={{
                         cursor:"pointer",
                         color:"blue"
                      }}
                      onClick ={()=>navigate(`/account/${item?._id}`)}>{item.account_name|| item?.name} </h6>
                     <span>
                     <a href={item.website_url} target="_blank"><i class="fa-solid fa-link me-2 f_s_1"></i></a>
                     <a  href={item.linkedin_url} target="_blank"> <i class="fa-brands fa-linkedin-in me-2"></i> </a>
                     <a  href={item.fecebook_url} target="_blank"> <i class="fa-brands fa-facebook me-2 "></i></a>  
                     <a  href={item.twitter_url} target="_blank">
                      <i class="fa-brands fa-twitter me-2"></i>
                       </a>
                      </span>
                        
                        {/* <i class="fa-solid fa-link me-2 f_s_1"></i> <i class="fa-brands fa-linkedin-in me-2 "></i> <i class="fa-brands fa-facebook me-2 "></i> <i class="fa-brands fa-twitter me-2"></i> */}
                 </div>	
             </div>
         </td>
		  {/* <td>
		  <ListGroup horizontal
		   style={{
			cursor:"pointer"
		   }}>
      <ListGroup.Item><i class="fa-solid fa-phone"></i></ListGroup.Item>
      <ListGroup.Item><i class="fa-solid fa-book-open"></i></ListGroup.Item>
      <ListGroup.Item><i class="fa-regular fa-paper-plane"></i></ListGroup.Item>
      <ListGroup.Item>
	  <div class="dropdown m_t_1">
  <p class="fs-1 m_t_1"
   style ={{
	 marginTop: '-30px ',
   }} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
   
    ...
  </p>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><button className='btn btn-primary p-1' style={{
		    width: "130px"
	}} onClick={handleopenModel}>+ Add To List </button></li>
 
  </ul>
</div>
	  </ListGroup.Item>
    </ListGroup>
		  </td> */}
		  <td><span>{item.estimated_num_employees || "-"}</span></td>
		  <td><span>{item.industry || "-"}</span></td>
           
		  
		  <td className="">															
         <Dropdown className="task-dropdown-2">
             <Dropdown.Toggle as="div" className={item.select}>{item.company_stage}</Dropdown.Toggle>
             <Dropdown.Menu className='task-drop-menu'>
                 <Dropdown.Item onClick={()=>handleSelect(item._id,'Cold')}>Cold</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item._id,'Current Client')}>Current Client</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item._id,'Active Opportunity')}>Active Opportunity</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item._id,'Dead Opportunity')}>Dead Opportunity</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item._id,'Do Not Prospect')}>Do Not Prospect</Dropdown.Item>
																	
             </Dropdown.Menu>
         </Dropdown>
     </td>
	 <td><span>{item.created_by?.name || "-"}</span></td>
	  
		  <td><span>{item.country || "-"}</span></td>
		  <td>
			 {/* <p>ssss</p> */}
			 <a
			 href={item.website_url} target='blank'
			 className='me-2'
			 >
			
			<i class="fa-brands fa-google"
			  style={{
				fontSize: '15px'
			  }}></i>
			 
			

			</a>
		    <a
			 href={item.linkedin_url} target='blank'
			 >
			
			<i class="fa-brands fa-linkedin"
			 style={{
				 fontSize:"15px"
			 }}></i>
			

			</a>
			
		
			
			
			</td>
			<td>
                                            <div className='d_f g_10 a_i_c'>
                                             <i class="fa-solid fa-eye text-primary"
                                             onClick={(e)=>navigate(`/accountview/${item?._id}`)}

                                               style ={{
                                                cursor:"pointer"
                                              }}></i>
                                             <i class="fa-solid fa-pen-to-square text-primary"
                                              style ={{
                                                cursor:"pointer"
                                              }}
                                              onClick={(e) => showCandidateModalEdit(item?._id)}></i>
                                             </div>
                                            </td>
			
		 
		</tr>
 })





  
  
 return( 
     <>

     {/* Drawer Open For Add Job */}
     {/* <Drawer
    title="Create New Job"
    placement="right"
    onClose={handleopenDrawerJob}
    closable={openaddjob}
    size="large"
    
    open={openaddjob}
    height={50}
    width={650}
    
  >
    <AddJob/>
  </Drawer> */}
    
     
   
  {
    Loading ?
    <Loader/> :


    

  
<>
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
                            <h4 className="heading mb-0">Companies</h4>
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
                                     onClick={AddCompanyPopup}
                                >+ Add Company
                                </Link>
                                <Link to className="btn btn-primary btn-sm ms-2"
                                     onClick={OpenImportDrawer}
                                >+ Import
                                </Link>
                                <Link to className="btn btn-primary btn-sm ms-2"
                                     onClick={()=>setaccountlinkDrawer(true)}
                                >+ Import Link
                                </Link>
                                
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div>
				<div className='col-xl-12'>
                    {/* <div className="d-flex justify-content-between align-items-center mb-2">
										<h4 className="heading mb-0"><div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Job Title/ Job ID..." />
						<span className="input-group-text">
							<Link to={"#"}>
								{SVGICON.SearchIcon}
							</Link>
						</span>
					</div></h4>
										<div>
											{/* <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink> */}
										{/* </div>
									</div>  */}
									<div className="card-body px-0 pb-0">
                 <div>
				 <Tab.Container defaultActiveKey={'Social'}>
                    <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Social'}>
                                {SVGICON.SocialHeart}
                                <span>Company</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Project'}>
                                {SVGICON.Folder}
                                <span>Lists</span>
                            </Nav.Link>
                        </Nav.Item>
                       
						
                    </Nav> 
					 {/* <p>Sathish</p> */}
                    <Tab.Content>
                        <Tab.Pane eventKey={'Social'}>                                
                             <div
							  className='row'>
								{/* <div className='col-3'>
									 <div className='card p-2'>
                                         <div className='crad-body'>
										 <div className="d-flex justify-content-between align-items-center mb-2">
										<h4 className="heading mb-0"><div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Company..." />
						<span className="input-group-text">
							<Link to={"#"}>
								{SVGICON.SearchIcon}
							</Link>
						</span>
					</div></h4> 
					 </div>
										 </div>
									 </div>

								</div> */}
								 <div className='col-12'>
								 <div className="card">            
							<div className="card-body p-0">
								<div className="table-responsive active-projects task-table mb-2">   
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
													<th>Company </th>
													
													<th># Employees</th>
													<th>Industry</th>
													<th>Stage</th>
													<th>Account Owner</th>
													<th>Location</th>

													<th>URL</th>
													<th>Action</th>

													

													{/* <th>Account Stage</th> */}
													{/* <th>Location</th> */}
													{/* <th>Location</th> */}


													{/* <th>URLs</th> */}
													{/* <th>Action</th> */}
													{/* <th>Start Date</th> */}
													{/* <th>Client Submission</th> */}
													{/* <th>Assigned To</th> */}
													{/* <th>Tags</th>
													<th className="text-end">Priority</th> */}
												</tr>
											</thead>
											<tbody>
												 {mapedData}
											</tbody>
											
										</table>
										{/* <div className="d-sm-flex text-center justify-content-between align-items-center">
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
										</div>  */}
									</div>
								</div>
	     <div className='d_f justify-content-end mt-3 mb-3'>
		 <Pagination
      showSizeChanger
      onChange={(e)=>setPagination({
		...pagination,
		current:e
	  })}
      defaultCurrent={pagination?.current}
      total={pagination?.total}
    />
			</div>
							</div>
						</div>
								 </div>
							</div>                             
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Project'}>
						   <Lists/>
                        </Tab.Pane>
                    
                    </Tab.Content>               
                </Tab.Container>
				 </div>
				{/* <div>
											<CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
										</div> */}
            </div>
					</div>
				</div>	
			</div>	    
      

    
			<Modal
title=""
placement="right"
visible={listopen}
onCancel={handleopenModel}
okButtonProps={{ style: { display: 'none' } }}
cancelButtonProps={{ style: { display: 'none' } }}


// open={viewInterviewDrawer}
height={50}
width={500}

>
	 <AddList/>
{/* <AddInterViewPopup status={status}/> */}
</Modal>
     
    <Drawer
        title="Add Account"
        placement="right"
        closable={true}
        onClose={AddCompanyPopup}
        open={AddCompanyDrawer}
    width={650}
         
      >
        <AddAccountsCompany/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>
      <Drawer
        title="Bulk Import"
        placement="right"
        closable={true}
        onClose={OpenImportDrawer}
        open={openImport}
    width={650}
         
      >
        <BulkImportCompany/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>
      <Drawer
        title="Import"
        placement="right"
        closable={true}
        onClose={()=>setaccountlinkDrawer(false)}
        open={accountLinkDrawer}
    width={650}
         
      >
        <AccountLinkAdd/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>

      </>}
        </>
    )
}


export default Account;