import { useContext,useEffect, useState} from 'react';



import {  Drawer, Modal, Pagination,  } from 'antd';

import { Link, useNavigate, useParams } from 'react-router-dom';





// import { useEffect } from 'react'
// import SalesandMargettingContext from './../../Providers/SalesandMargetting/index';


import SalesandMargettingContext from './../../Providers/SalesandMargetting/index';

import Loader from '../../Utils/Loader';

import { Dropdown, ListGroup, Tab } from 'react-bootstrap';

import AccountAddContacts from './AccountAddContact';
import { SVGICON } from '../../Utils/SVGICON';
import ContactLinkAdd from './ContactLinkAdd';
import AddList from './AddList';
import righticon from '/images/rightclick.png';
import wrongicon from '/images/wrongClick.png';







const AccountContactPage=()=>{

  const {listopen,setcontact_id,handleopenModel,contactListDrawer,setcontactListlinkDrawer,paginationcontact,setPaginationcontact,EditContactDrawer,EditContactPopup,contactLinkDrawer,setcontactlinkDrawer,handleViewContact,fethaccountContacts,AddContactPopup,AddContactDrawer,contacts,AddCompanyPopup,Loading,AddCompanyDrawer,fethContacts,}=useContext(SalesandMargettingContext)
  const navigate=useNavigate()
  let params =useParams()

  const [showEmailIndex, setShowEmailIndex] = useState(-1);
  const [showPhoneIndex, setShowPhoneIndex] = useState(-1);
//  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);
  
 const handlenavigate=(id)=>{
    navigate(`/company/${id}`)
 }
//Tabs Items




 
const toggleEmail = (index) => {
    setShowEmailIndex(index === showEmailIndex ? -1 : index); // Toggle email visibility for the clicked row
  };
  const togglePhone = (index) => {
    setShowPhoneIndex(index === showPhoneIndex ? -1 : index); // Toggle email visibility for the clicked row
  };
//  Pie Chart Start here



//  Pie Chart ends here



const data=[]


 useEffect(() => {
    fethaccountContacts(params?.id)
   
 }, [paginationcontact?.current])


  const handleSelect =()=>{
     console.log("e")
  }


   const handleEditclick =(id)=>{
    handleViewContact(id)
    EditContactPopup()

   }


  let mapedData =contacts.map((item, index)=>{



  
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
                                                   {/* <img src={item?.photo_url||item?.logo_url} className="avatar avatar-md" alt="" /> */}
                                                   <div>
                                                       <h6><Link to={"#"}>{item.name}</Link></h6>
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
     <button style={{
        border: "none",
        position:"relative"
      }} onClick={() => toggleEmail(index)} className='btn-sm'>
      {
         item?.email_id?
         <>
           <i class="fa-regular fa-envelope me-3"
         style ={{
          //  color:"green"
         }}
         ></i>
          <img src={righticon} width={12} height={12}
          style={{
              left:"22px",
              top: "0px",
              position: "absolute"
          }}/>
         </>
          :
         <>
            <i class="fa-regular fa-envelope me-3"
          style ={{
           //  color:"green"
          }}
          ></i>
           <img src={wrongicon} width={12} height={12}
           style={{
               left:"22px",
               top: "0px",
               position: "absolute"
           }}/>
         </>
      }

        Access Email</button>}

      
       </td>
    <td>
    {showPhoneIndex === index  ? 
    <span>{item.phone_no}</span>
     :
         <button 
       style={{
        border: "none",
        position:"relative"
       }}
      onClick={() => togglePhone(index)} className='btn-sm'>
        {
            item?.phone_no ?
            <>
     <i class="fa-solid fa-phone me-3"></i>
     <img src={righticon} width={12} height={12}
          style={{
              left:"22px",
              top: "0px",
              position: "absolute"
          }}/>
            </>
            :
          <>
            <i class="fa-solid fa-phone me-3"></i>
     <img src={wrongicon} width={12} height={12}
     style={{
         left:"22px",
         top: "0px",
         position: "absolute"
     }}/>
          </>

        }

        Access Mobile</button> }
       
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
	}} onClick={(e)=>{
        setcontact_id(item?._id)
        handleopenModel()
    }}>+ Add To List </button></li>
 
  </ul>
</div>
	  </ListGroup.Item>
    </ListGroup>
		  </td> */}
    <td><span>{item?.title}</span></td>
    {/* <td>
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
        </td> */}
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
                                            onClick ={
                                        (e)=>handleEditclick(item?._id) 
                                            }
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
                            <h4 className="heading mb-0">
                            <i class="fa-solid fa-chevron-left"
      onClick={()=>navigate(-1)}
     style={
        {
            cursor:"pointer"
        }
     }></i >
                                Contacts</h4>
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

< Link to className="btn btn-success btn-sm ms-2"
                                     onClick={()=>setcontactListlinkDrawer(true)}
                                >+ Import List Link
                                </Link>
                                <Link to className="btn btn-primary btn-sm ms-2"
                                     onClick={AddContactPopup}
                                >+ Add Contacts
                                </Link>
                               < Link to className="btn btn-primary btn-sm ms-2"
                                     onClick={()=>setcontactlinkDrawer(true)}
                                >+ Import Link
                                </Link>
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div>
					<div className='col-xl-12'>
                      <div className='d-flex justify-content-between align-items-center'>
                  
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
                         <p className='text-primary'>Total Contacts : <span style ={{
                            fontSize:"20px",
                            fontWeight:"bold"
                         }}>{paginationcontact?.total}</span></p>
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
													{/* <th>Action</th> */}
                          
													<th>Job Title</th>
													<th>Contact Owner</th>
													{/* <th>Start Date</th> */}
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
        <AccountAddContacts/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>


      <Drawer
        title="Edit Contact"
        placement="right"
        closable={true}
        onClose={EditContactPopup}
        open={EditContactDrawer}
    width={650}
         
      >
        <AccountAddContacts edit ={"edit"}/>
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

      <Drawer
        title="Import List"
        placement="right"
        closable={true}
        onClose={()=>setcontactListlinkDrawer(false)}
        open={contactListDrawer}
    width={650}
         
      >
        <ContactLinkAdd List={true}/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>


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

      </>}
        </>
    )
}


export default AccountContactPage;