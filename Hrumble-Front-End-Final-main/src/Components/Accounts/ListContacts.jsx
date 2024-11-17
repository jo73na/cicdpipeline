// import { useContext,useEffect} from 'react';



// import { Button, Input,Table,Select, Image, Drawer, AutoComplete } from 'antd';

// import { Link, useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import Loader from '../../Utils/Loader';

// import CompanyContext from '../../Providers/Company';

// // import { useEffect } from 'react'
// import SalesandMargettingContext from './../../Providers/SalesandMargetting/index';

// import { LinkedinOutlined } from '@ant-design/icons';
// import AddContacts from './AddContacts';


// const { Search } = Input;




// const Contacts=()=>{

//   const {AddContactPopup,AddContactDrawer,contacts,AddCompanyPopup,Loading,AddCompanyDrawer,fethContacts,}=useContext(SalesandMargettingContext)
//   const navigate=useNavigate()
// //  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);
  
//  const handlenavigate=(id)=>{
//     navigate(`/company/${id}`)
//  }
// //Tabs Items





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

//   { title: 'Name', dataIndex: 'firstname', key: 'company_name',
//   render:(text,record)=>(
//     <div
//      className='d_f f_d_c g_5'>
//           <a  className="c_primary" onClick={(e)=>handlenavigate(record?.action)}>{record?.first_name}{record?.last_name}</a>
//           <a className="hover_add"  href='https://www.linkedin.com/in/parmar-dhwani-8256b716a/' target='blank'> <i className='linked_in'><LinkedinOutlined/></i></a>
//     </div>

//   )
//   },    
//   { title: 'Email', dataIndex: 'email_id', key: 'email_id' },
//   { title: 'Mobile', dataIndex: 'phone_no', key: 'phone_no' },
//   { title: 'Job Title', dataIndex: 'job_title', key: 'job_title' },

//   { title: 'Contact Owner', dataIndex: 'contact_owner', key: 'contact_owner' },

//   {
//     title: 'Contact Stage',
//     dataIndex: 'stage',
//     render: (text, record) => (
//        <div className='green'>
//          <AutoComplete
//       // onChange={(e)=>handleChangestatus(e,record)}
// // popupClassName="certain-category-search-dropdown"
// // popupMatchSelectWidth={500}
// style={{
// width: 140,
// }}
// value={record.stage}
// options={[{
//   label:
//    <p
//     className='hold'>Cold</p>,
//   value:"Cold"
//  },
//  {
//   label: <p
//   className='opend'>Approching</p>,
//   value:"Approching"
//  },
//  {
//   label:<p
//   className='status_select'>Replied</p>,
//   value:"Replied"
//  },
//  {
//   label:<p
//   className='status_offered'>Interested</p>,
//   value:"Interested"
//  },
//  {
//   label:<p
//   className='status_reject'>Not Interested</p>,
//   value:"Not Interested"
//  },
//  {
//   label:<p
//   className='status_reject'>Un Responsive</p>,
//   value:"Un Responsive"
//  },
//  {
//   label:<p
//   className='status_reject'>Do Not Contact</p>,
//   value:"Do Not Contact"
//  },
//  {
//   label:<p
//   className='status_reject'>Bad Data</p>,
//   value:"Bad Data"
//  },
//  {
//   label:<p
//   className='hold'>Changed Job</p>,
//   value:"Changed Job"
//  },



// ]
// }
// size="large"
// >
// <Input
// prefix={

//  <p
//   className= {
//    record?.stage =="Cold"?
//    "new_status_hold":
//    record?.stage =="Approching"?
//    "new_status_selectbox":
//    record?.stage =="Replied"?

//    "status_select" :""

//   }>
//     {record.stage}
//  </p>


// }
// />
// </AutoComplete>
//        </div>
//     ) 
//   },

//   // { title: 'Contact Stage', dataIndex: 'stage', key: 'stage' ,render:(text,record)=>(
//   //    <div>
         
//   //    </div>
//   // ) },
//   // { title: 'Contact Location', dataIndex: 'location', key: 'location' },
// //   { title: 'Website  URL', dataIndex: 'website_url', key: 'website_url' },

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
// contacts?.map((item,i)=>{
//   data.push({
//     key:i+1,
//     first_name:item?.first_name||"-",
//     last_name:item?.last_name||"-",
//     email_id:item?.email_id|| "-",
//     job_title:item?.job_title, 
//     linkedin_url:item?.linkedin_url,
//     contact_owner:item?.contact_owner?.name,
//     stage:item?.stage,
//     phone_no:item?.phone_no||"-",
//     startDate:moment(item?.created_At).format(' DD-MM-YYYY'),
//     // endDate:moment(item?.endDate).format(' DD-MM-YYYY'),
   
//     status:item.status,   
//     action:item._id,

//   })
// })

//  useEffect(() => {
//     fethContacts()
   
//  }, [])
 
 
  
  
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
//     <>
  
//     <div
//     className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
//     <p className='heading_text'>Contacts</p>
      
 
    
//     </div> 
//     <div className="d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm">
//         <Search
//           className="input_search"
//           allowClear
//           placeholder="Search by Job Title / ID "
//           enterButton
//           // onChange={handleChangeSearch}
//           // value={searchjob}
//         />
//        <div className='d_f a_i_c g_10'>
//      <Button type='primary' className='btn create_btn' onClick={AddContactPopup}>+ Add Contact</Button>
  

//      </div>
//       </div>


//    </>

    

//   }

         
      

    
//     <div className='tab m_t_10 m_b_10 p_10 responsive_table'>
//       <Table
//        columns={columns} dataSource={data}/>
//     </div>
     
//     <Drawer
//         title="Add Contact"
//         placement="right"
//         closable={true}
//         onClose={AddContactPopup}
//         open={AddContactDrawer}
//     width={650}
         
//       >
//         <AddContacts/>
//          {/* <AssignUser/> */}
//         {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
//       </Drawer>

      
//         </>
//     )
// }


// export default Contacts;


import { useContext,useEffect, useState} from 'react';



import { Button, Drawer, Pagination,  } from 'antd';

import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';




// import { useEffect } from 'react'
// import SalesandMargettingContext from './../../Providers/SalesandMargetting/index';


import AddContacts from './AddContacts';


import { Dropdown, Tab } from 'react-bootstrap';
import { SVGICON } from '../../Utils/SVGICON';
import SalesandMargettingContext from '../../Providers/SalesandMargetting';
import Loader from './../../Utils/Loader';
import ViewContact from './ViewContact';
import ContactLinkAdd from './ContactLinkAdd';







const ListContacts=()=>{

  const {ContactListdata,fethContactList,paginationcontact,setPaginationcontact,contactLinkDrawer,setcontactlinkDrawer,handleViewContact,ViewContactDrawer,ViewContactPopup,AddContactPopup,AddContactDrawer,contacts,AddCompanyPopup,Loading,AddCompanyDrawer,fethContacts,}=useContext(SalesandMargettingContext)
  const navigate=useNavigate()
  let params =useParams()
  const [showEmailIndex, setShowEmailIndex] = useState(-1);
  const [showPhoneIndex, setShowPhoneIndex] = useState(-1);
//  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);
  
 const handlenavigate=(id)=>{
    navigate(`/company/${id}`)
 }
//Tabs Items





//  Pie Chart Start here



//  Pie Chart ends here





 useEffect(() => {
    fethContactList(params?.id)
   
 }, [])


  const handleSelect =()=>{
     console.log("e")
  }


  const toggleEmail = (index) => {
    setShowEmailIndex(index === showEmailIndex ? -1 : index); // Toggle email visibility for the clicked row
  };
  const togglePhone = (index) => {
    setShowPhoneIndex(index === showPhoneIndex ? -1 : index); // Toggle email visibility for the clicked row
  };



 let mapedData =ContactListdata?.map((item, index)=>{



  
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
                                                    <img src={item?.photo_url} className="avatar avatar-md" alt="" />
                                                    <div>
                                                        <h6><Link to={"#"}>{item.first_name}{item.last_name}</Link></h6>
                                                        <span
                                                         style ={{
                                                             cursor:"pointer"
                                                         }}
                                                        ><i class="fa-brands fa-linkedin text-primary fa-3" 
                                                        ></i></span>	
                                                    </div>	
                                                </div>
                                            </td>
     <td>
     {showEmailIndex === index  ? 
     <span>{item.email_id}</span>
      :
          <button onClick={() => toggleEmail(index)} className='btn btn-info btn-sm'>
          <i class="fa-regular fa-envelope me-2"></i>

            Access Email</button> }

       
        </td>
     <td>
     {showPhoneIndex === index  ? 
     <span>{item.phone_no}</span>
      :
          <button onClick={() => togglePhone(index)} className='btn btn-primary btn-sm'>
         <i class="fa-solid fa-phone me-2"></i>

            Access Mobile</button> }
        
       </td>

     <td><span>{item?.title}</span></td>
     <td>
             <div className="products">
      <img src={item?.account_id?.logo_url||""} className="avatar avatar-md" alt="" />
                 
                 <div>

                     <h6
                      
                      style ={{
                         cursor:"pointer",
                         color:"blue"
                      }}
                      onClick ={()=>navigate(`/account/${item?.account_id?._id}`)}>{item?.account_id?.name} </h6>
                     <span><i class="fa-solid fa-link me-2 f_s_1"></i> <i class="fa-brands fa-linkedin-in me-2 "></i> <i class="fa-brands fa-facebook me-2 "></i> <i class="fa-brands fa-twitter me-2"></i></span>
                 </div>	
             </div>
         </td>
     <td><span>{item?.contact_owner?.name}</span></td>
      <td className="text-end">															
         <Dropdown className="task-dropdown-2">
             <Dropdown.Toggle as="div" className={item.select}>{item.stage}</Dropdown.Toggle>
             <Dropdown.Menu className='task-drop-menu'>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'High')}>Cold</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Approching')}>Approching</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Approching')}>Replied</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Approching')}>Interested</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Approching')}>Not Interested</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Approching')}>Un Responsive</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Approching')}>Do Not Contact</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Approching')}>Bad Data</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleSelect(item.id,'Low')}>Changed Job</Dropdown.Item>																	
             </Dropdown.Menu>
         </Dropdown>
     </td> 

     <td>
                                            <div className='d_f g_10 a_i_c'>
                                             <i class="fa-solid fa-eye text-primary"
                                             onClick={(e)=>handleViewContact(item?._id)}

                                               style ={{
                                                cursor:"pointer"
                                              }}></i>
                                             <i class="fa-solid fa-pen-to-square text-primary"
                                              style ={{
                                                cursor:"pointer"
                                              }}
                                            ></i>
                                             </div>
                                            </td>


     {/* <td>
         <Dropdown className="task-dropdown-2">
             <Dropdown.Toggle as="div" className={"Complete"}>{item.status}</Dropdown.Toggle>
             <Dropdown.Menu className='task-drop-menu'>
                 <Dropdown.Item  onClick={()=>handleAction(item.id,'In Progress')}>In Progress</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleAction(item.id,'Pending')}>Pending</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleAction(item.id,'Testing')}>Testing</Dropdown.Item>
                 <Dropdown.Item onClick={()=>handleAction(item.id,'Complete')}>Complete</Dropdown.Item>
             </Dropdown.Menu>
         </Dropdown>															
     </td>
     <td><span>{item?.done_by[0]?.name}</span></td> */}

     {/* <td><span>{item.startdate}</span></td> */}
   
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
                            <h4 className="heading mb-0">List Contacts</h4>
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
                                     onClick={AddContactPopup}
                                >+ Add Contacts
                                </Link>
                                <Link to className="btn btn-primary btn-sm ms-2"
                                     onClick={()=>setcontactlinkDrawer(true)}
                                >+ Import Link
                                </Link>
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div>
					<div className='col-xl-12'>
                    <div className="d-flex justify-content-between align-items-center mb-2">
										<h4 className="heading mb-0"><div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Job Title/ Job ID..." />
						<span className="input-group-text">
							<Link to={"#"}>
                            <i class="fa-solid fa-magnifying-glass text-primary "
                             style={{
                                fontSize:"16px"
                             }}></i>
								{/* {SVGICON.SearchIcon} */}
							</Link>
						</span>
					</div></h4>
										<div>
											{/* <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink> */}
										</div>
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
													<th>Name</th>
													<th>Email</th>

													<th>Mobile</th>

													<th>Job Title</th>
													<th>Account</th>

													<th>Contact Owner</th>
													<th>Contact Stage</th>
													<th>Action</th>
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
							</div>
                            <div className='d_f justify-content-end mt-3 mb-3'>
		 <Pagination
      showSizeChanger
      onChange={(e)=>setPaginationcontact({
		...paginationcontact,
		current:e
	  })}
      defaultCurrent={paginationcontact?.current}
      total={paginationcontact?.total}
    />
			</div>
						</div>
					</div>
				</div>	
			</div>	    
      

    
 
     
    <Drawer
        title="Add Contact"
        placement="right"
        closable={true}
        onClose={AddContactPopup}
        open={AddContactDrawer}
    width={650}
         
      >
        <AddContacts/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>

      <Drawer
        title="Contact View"
        placement="right"
        closable={true}
        onClose={ViewContactPopup}
        open={ViewContactDrawer}
    width={650}
         
      >
        <ViewContact/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>


      <Drawer
        title="Import"
        placement="right"
        closable={true}
        onClose={()=>setcontactlinkDrawer(false)}
        open={contactLinkDrawer}
    width={650}
         
      >
        <ContactLinkAdd/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>

      </>}
        </>
    )
}


export default ListContacts;