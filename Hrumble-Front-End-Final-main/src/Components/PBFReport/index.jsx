// import React from 'react'
// import RecentActivity from './RecentActivity';
// import { Button, Tabs,Menu } from 'antd';
// import Loader from '../../Utils/Loader';
// import { useContext } from 'react';
// import PBFContext from '../../Providers/PBFReports';
// import ClientReport from './ClientReport';
// import { useState } from 'react';
// import Filterlogo from "/images/Filter.svg";
// import CookieUtil from '../../Utils/Cookies';
// import UserManagementContext from '../../Providers/UserMangement';
//  import Star from "/images/Star.svg";

// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   DesktopOutlined,
//   MailOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PieChartOutlined,
//   StarOutlined,
// } from '@ant-design/icons';


// const PBFTable = () => {

//   const {FectpfbReport,pbfLoading,pbfReport,filterdata,handleClearFilter}=useContext(PBFContext)
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const role = CookieUtil.get("role");
//   const [collapsed, setCollapsed] = useState(false);
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   const {permission}=useContext(UserManagementContext)
//   console.log("permission",permission)
//   let filter=permission?.find((item)=>item?.name =="Reports")
//   const handleDrawerClose = () => {
//     setDrawerVisible(false);
//   };
//   const items = [
//     {
//       key: '1',
//       label: 'Consolidated',
//       children: <RecentActivity filter ={filter} drawerVisible={drawerVisible} handleDrawerClose={handleDrawerClose} setDrawerVisible={setDrawerVisible} />,
//     },
//     ...(role !== "Vendor" ? [
//       {
//         key: '2',
//         label: 'Clients',
//         children: <ClientReport />
//       }
//     ] : []),
//   ];
  


//   const handleFilterClick = () => {
//     setDrawerVisible(true);
//   };


//    const handleclick =(e)=>{
//     alert("hiii")
//       console.log("handleclick",e)
//    }


// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }
// const itemsmenu = [
//   getItem('Favourites', '1',"", [
//     getItem('Invoice Summary', '5',<StarOutlined
//      onClick={(e)=>handleclick("5")}
//     style={{
//       width: "18px",
//       height: "18px",
       
//     }}/>)]),
//   // getItem('Option 2', '2', <DesktopOutlined />),
//   // getItem('Option 3', '3', <ContainerOutlined />),
//   getItem('Accounts', 'sub1', "", [
//     getItem('Invoice Summary', '5',<StarOutlined
//      onClick={(e)=>handleclick("5")}
//     style={{
//       width: "18px",
//       height: "18px",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      
//     }}/>),
//     getItem('Expense Summary', '6', <img style={{
//       width: "18px",
//       height: "18px",
      
//     }} src={Star} />
//     ),
//     getItem('Payment Summary', '7',
//     <img style={{
//       width: "18px",
//       height: "18px",
      
//     }} src={Star} />),
//     getItem('Profit vs Loss', '8',
//     <img style={{
//       width: "18px",
//       height: "18px",
      
//     }} src={Star} />),
//     getItem('Salary vs Revenue', '9',<img style={{
//       width: "18px",
//       height: "18px",
      
//     }} src={Star} />),
//     getItem('GST Report', '10',<img style={{
//       width: "18px",
//       height: "18px",
      
//     }} src={Star} />),
//     getItem('TDS Report', '11',<img style={{
//       width: "18px",
//       height: "18px",
      
//     }} src={Star} />),
//   ]),
//   getItem('HR', '12', null, [
//     getItem('Timesheet Report', '12'),
//     getItem('Salary Report', '13'),
//     getItem('Leave Report', '14', ),
//     getItem('Recruiter Performance', '15', ),
//   ]),
// ];

//   return (
//      <>
//         {
//     pbfLoading && <Loader/>
//    }

// <div
// className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
//      <p className='heading_text'>Reports</p>
 

// </div> 
// <div className='d_f g_10'>
// <div
//       style={{
//         // width:230,
//       }}
//     >
//       <Button
//         type="primary"
//         onClick={toggleCollapsed}
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       <Menu
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         mode="inline"
//         // theme="dark"
//         inlineCollapsed={collapsed}
//         items={itemsmenu}
//       />
//     </div>
//     <div className='tab m_t_10 m_b_10 p_10 responsive_table'
//      style={{
//       // width:"1000px"
//      }}>
//     <Tabs items={items} defaultActiveKey="1" tabBarExtraContent={  <div className='d_f a_i_c j_c_f_e m_t_10 m_b_10 m_r_20'
//    style={{
//     cursor:"pointer"
//    }}
//   >
//    <div className='d_f a_i_c g_10'>
//     {Object.keys(filterdata).length > 0 && <Button className='btn_cancel' onClick={handleClearFilter}>Clear Filter({Object.values(filterdata).length} )</Button>}
//      {
//         filter?.options?.includes("viewFilter")  &&
//         <img src={Filterlogo}
//         onClick={handleFilterClick}/>
//      }
//    </div>
//   </div>} />
//     </div>

// </div>
// <div className='tab m_t_10 m_b_10 p_10 responsive_table'>
//     <Tabs items={items} defaultActiveKey="1" tabBarExtraContent={  <div className='d_f a_i_c j_c_f_e m_t_10 m_b_10 m_r_20'
//    style={{
//     cursor:"pointer"
//    }}
//   >
//    <div className='d_f a_i_c g_10'>
//     {Object.keys(filterdata).length > 0 && <Button className='btn_cancel' onClick={handleClearFilter}>Clear Filter({Object.values(filterdata).length} )</Button>}
//      {
//         filter?.options?.includes("viewFilter")  &&
//         <img src={Filterlogo}
//         onClick={handleFilterClick}/>
//      }
//    </div>
//   </div>} />
//     </div>

//      </>
//   )
// }

// export default PBFTable


import  { useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {Tab} from 'react-bootstrap';
import CookieUtil from './../../Utils/Cookies';
















const PBFTable = () => {	

     
      const navigate =useNavigate()
    
      const role =CookieUtil.get("role")
   
   


//       let mapedData =openJobs?.map((item, index)=>{
        

//         const { submission, interview, joined, offered,ClientSubmission} = calculateCounts(item.screening,item._id);

      
//          return   <tr key={index}>
//          {/* <td className="sorting_25">
//              <div className="form-check custom-checkbox">
//                  <input type="checkbox" className="form-check-input" 																	
//                      id={`user-${item.id}`}
//                      checked={item.inputchecked}
//                      onChange={()=>handleChecked(item.id)}
//                  />
//                  <label className="form-check-label" htmlFor={`user-${item.id}`}></label>
//              </div>
//          </td> */}
//          {/* <td><span>{index + 101}</span></td> */}
//          <td>
//              <div className="products">
//                  <div>
//                      <h6
//                       style ={{
//                          cursor:"pointer"
//                       }}
//                       onClick ={()=>navigate(`/job/${item?._id}`)}>{item.job_title}</h6>
//                      <span>{item?.job_id}</span>
//                  </div>	
//              </div>
//          </td>
//          <td><span>{`${item?.Clients[0]?.name} ${item.poc?.length>0?(`(${item.poc[0]})`):""}`}</span></td>


//          <td>
//              <Dropdown className="task-dropdown-2">
//                  <Dropdown.Toggle as="div" className={
//                    item.status =="opened"? "Complete":
//                    item.status =="closed"?
//                    "Pending":
//                    "Testing" 
//                  }>{item.status =="opened"? "Opened":item.status =="closed"? "Closed":"Hold"}</Dropdown.Toggle>
//                  <Dropdown.Menu className='task-drop-menu'>
//                      <Dropdown.Item  onClick={()=>handleChangestatus(item._id,'opened')}>Opened</Dropdown.Item>
//                      <Dropdown.Item onClick={()=>handleChangestatus(item._id,'closed')}>Closed</Dropdown.Item>
//                      <Dropdown.Item onClick={()=>handleChangestatus(item._id,'Hold')}>Hold</Dropdown.Item>

//                  </Dropdown.Menu>
//              </Dropdown>															
//          </td>
//          <td><span>{item?.done_by[0]?.name}</span></td>

//          <td><span>{item.startdate}</span></td>
//          <td><span>{submission}</span></td>
//          <td><span>{ClientSubmission}</span></td>
//          {/* <td>
//              <span>{item.enddate}</span>
//          </td> */}
//          {/* <td>
//              <div className="avatar-list avatar-list-stacked">
//                  {item.assign === "3" ? 																
//                      <>
//                          <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
//                      </>
//                  : 
//                  item.assign === "4" ? 
//                      <>
//                          <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />
//                          <img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
//                      </>
//                  :
 
//                      <>
//                          <img src={IMAGES.contact6} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact5} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact3} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact2} className="avatar avatar-md rounded-circle" alt="" />{" "}
//                          <img src={IMAGES.contact1} className="avatar avatar-md rounded-circle" alt="" />
//                      </>																	
//                  }
//              </div>
//          </td>	 */}
//          <td>
//              <span className="badge badge-primary light border-0 me-1">Internal</span>
//              <span className="badge badge-secondary light border-0 ms-1">External</span>
//          </td>
//          {/* <td className="text-end">															
//              <Dropdown className="task-dropdown-2">
//                  <Dropdown.Toggle as="div" className={item.select}>{item.select}</Dropdown.Toggle>
//                  <Dropdown.Menu className='task-drop-menu'>
//                      <Dropdown.Item onClick={()=>handleSelect(item.id,'High')}>High</Dropdown.Item>
//                      <Dropdown.Item onClick={()=>handleSelect(item.id,'Medium')}>Medium</Dropdown.Item>
//                      <Dropdown.Item onClick={()=>handleSelect(item.id,'Low')}>Low</Dropdown.Item>																	
//                  </Dropdown.Menu>
//              </Dropdown>
//          </td> */}
//      </tr>
// })


  

     
     
	return (
		<>
        
             <div className="container-fluid">	
            	  	<div className="row">
                    <Tab.Container defaultActiveKey={'Grid'} >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="heading mb-0">Reports</h4>
                            <div className="d-flex align-items-center">
                               
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div>
				<div className="row">
                     
               
                  {
                       role  !== "Client" &&
                    <>
                         <div className="col-xl-4 col-md-4 col-6">
                       <div className="card  blog-card">
                           <Link className="card-body text-center" to={"/recentactivity"}>
                               {/* <img src={IMAGES.News} alt="" />   */}
                               <h4>Recent Activity</h4>
                               <p>Overview of Recent Activities in Job </p>
                           </Link>
                       </div>
                   </div> 
                
                      

                    </>
                   
                  }
                       
                     {
                         role =="SuperAdmin" &&
                         
                         <>
                         <div className="col-xl-4 col-md-4 col-6">
                         <div className="card  blog-card">
                             <Link className="card-body text-center" to={"/attenence"}>
                                 {/* <img src={IMAGES.Books} alt="" />   */}
                                 <h4>Attenence </h4>
                                 <p>Overview of AllEmployee In and Out Time </p>
                             </Link>
                         </div>
                     </div>
                        <div className="col-xl-4 col-md-4 col-6">
                         <div className="card  blog-card">
                             <Link className="card-body text-center" to={"/clientwsie"}>
                                 {/* <img src={IMAGES.Books} alt="" />   */}
                                 <h4>Client Wise Report </h4>
                                 <p>Overview of All Client wise consolitated in Job </p>
                             </Link>
                         </div>
                     </div>

                     <div className="col-xl-4 col-md-4 col-6">
                         <div className="card  blog-card">
                             <Link className="card-body text-center" to={"/recruiter-report"}>
                                 {/* <img src={IMAGES.Books} alt="" />   */}
                                 <h4>Recruiter Wise Report </h4>
                                 <p>Overview of All  Recruiter consolitated in Job </p>
                             </Link>
                         </div>
                     </div>
                     <div className="col-xl-4 col-md-4 col-6">
                         <div className="card  blog-card">
                             <Link className="card-body text-center" to={"/recruiter-report"}>
                                 {/* <img src={IMAGES.Books} alt="" />   */}
                                 <h4>Attendance login </h4>
                                 <p>Login data</p>
                             </Link>
                         </div>
                     </div>
                       </>
                     }
                       
                
                
             
                   
                    
					
                  
				
				</div>	
			</div>	
         
					
		</>
	);
};

export default PBFTable;