import  { useState } from 'react';
import {  Button, Drawer, Form, Input, DatePicker, Select, Pagination } from 'antd';
import { useEffect } from 'react';

import { useContext } from 'react';
// import moment from 'moment';

import { Link, useNavigate } from 'react-router-dom';
import { Tab } from 'react-bootstrap';


import dayjs from 'dayjs';



// import ClientContext from '../../Providers/ClientProvider';
// import Loader from '../../Utils/Loader';
// import { SVGICON } from '../../Utils/SVGICON';
import ClientContext from '../../../Providers/ClientProvider';
import { SVGICON } from '../../../Utils/SVGICON';
import Loader from '../../../Utils/Loader';
import ProjectContext from '../../../Providers/Construction/Projects';
import { InputNumber } from 'antd';
import DummyDatas from './DummyData';
import axios from 'axios';
//import EditProjects from './EditProjects';

const { RangePicker } = DatePicker;



const {Search}=Input
const Projects = () => {
  const {Loading,projects,fetchProjects,handleAddProject,fetchlocation,location,setProjectSingle}=useContext(ProjectContext)
  // const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  // const [handlereset, setHandlereset] = useState("");
  const [form] = Form.useForm();
  const navigate =useNavigate();



  

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {

    // const timeDifference = values?.endDate?.$d?.getTime() - values?.startDate?.$d?.getTime();

// Convert milliseconds to days


let senddata={
  ...values,
   
//    endDate:  values?.endDate?.$d,
//    startDate:  values?.startDate?.$d
}
handleAddProject(senddata)
  
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    // fetchlocation()
    //  fetchProjects()
    // handleClientTable()
   
   
  }, [])


   const  handleViewProject =(item)=>{
      setProjectSingle(item)
      navigate(`/projects/${item?._id}`)
   }

  let mapedData =projects.map((item, index)=>{

   

  
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
                  onClick={(e)=>handleViewProject(item)}
                  >{item?.project_name}</h6>
                 {/* <span>{item?.job_id}</span> */}
             </div>	
         </div>
     </td>
     <td>
     <span className="badge badge-warning light border-0 me-1">{item?.project_type}</span>

     </td>

     <td><span>{item?.no_of_units}</span></td>
     <td><span>{ formatCurrency(item?.estimated_cost)}</span></td>
     <td><span>{item?.estimated_delivery_date}</span></td>
     {/* <td><span>{dayjs(item?.end_date).format("YYYY-MM-DD")}</span></td> */}
 
     <td><span>
     <td>
                                            <div className='d_f g_10 a_i_c'>
                                            <i class="fa-solid fa-eye text-primary"
                                              style ={{
                                                cursor:"pointer"
                                              }}>
                                              </i>
                
                                             <i class="fa-solid fa-pen-to-square text-primary"
                                              style ={{
                                                cursor:"pointer"
                                              }}
                                            //   onClick={(e) => handleOpenEditDrawer(client?._id)}
                                              ></i>
                                             </div>
                                            </td>
      {/* {
        item?.status == "Ongoing" ?
        <span className="badge badge-warning light border-0 me-1">{item?.status}</span>
        :
        <span className="badge badge-success light border-0 me-1">{item?.status}</span>


      } */}
      </span></td>
   
    
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

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}


  

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
                       <h4 className="heading mb-0">Projects</h4>
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
                                onClick={showDrawer}
                           >+ Add Project
                           </Link>
                       </div>
                   </div>
                
               
               </Tab.Container>
           </div>
               <div className='col-xl-12'>
               <div className="d-flex justify-content-between align-items-center mb-2">
										<h4 className="heading mb-0"><div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Project Name/..." 
                        //  onChange={handleChangeSearch}
                        //  value={searchjob}
                         />
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
                                               <th>Project Title</th>
                                               <th>Project Type</th>
                                               <th>No of Units</th>

                                               <th>Estimated Cost</th>

                                             
                                              
                                               <th>Estimated Delivery Date</th>
                                               <th>Action</th>
                                              
                                               
                                               {/* <th>Tags</th>
                                               <th className="text-end">Priority</th> */}
                                           </tr>
                                       </thead>
                                       <tbody>
                                            {/* {mapedData} */}
                                            {DummyDatas.map((project, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                              <div className="ms-2 cat-name">
                              <Link to ={`/Projects/${project?._id}`} className="mb-0">{`${project.project_name}`}</Link>
                                </div></td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.project_type}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.no_of_units}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.estimated_cost}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px', alignContent: 'center' }}>{project.estimated_delivery_date}</td>
                            
                        </tr>
                    ))}
                                       </tbody>
                                       
                                  </table>

                                  <div className='d_f justify-content-end mt-3 '>
		 <Pagination
         size="small"
      showSizeChanger
    //   onChange={(e,pageSize)=>
         
    //     {
             
    //         setPagination({
		// ...pagination,
		// pageSize:pageSize,
		// current:e
	  // })}}
      defaultCurrent={1}
      total={10}
      pageSize={10}
    />
			</div>
                                   {/*  <div className="d-sm-flex text-center justify-content-between align-items-center">
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
                   </div>
               </div>
           </div>	
       </div>	
    }

          <Drawer
        title="Add Project"
        width={600}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className='applay_leave'>
         {/* <div className='col_2 m_t_20'>
         <Form.Item
          
            name="client_id" 
            label="Client"
            rules={[{ required: true, message: 'Please Select Client' }]}
          >
            <Select placeholder="Select Leave Title"
              options={clientSelect}
             />
              
             
         
          </Form.Item>
         </div> */}

         <div className='col_2 g_20'>
         <Form.Item
              label="Project Name"
              name="project_name"
              rules={[
                {
                  required: true,
                  message: "Missing Project Name",
                },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
          
          name="project_type" 
          label="Project Type"
          rules={[{ required: true, message: 'Please Select Project Type' }]}
        >
          <Select placeholder="Select Project Type"
            options={[{
                 label:"Apartment",
                 value:"Apartment"
            },
            {
                label:"Villas",
                value:"Villas"
           },{
            label:"Plots",
            value:"Plots"
       },
       {
        label:"Commercial Space",
        value:"Commercial Space"
   },
      
        ]}
           />
            
           
       
        </Form.Item>
        
         </div>


         <div className='col_2 g_20'>
         <Form.Item
          
          name="project_Location" 
          label="Project Location"
        //   rules={[{ required: true, message: 'Please Select Location' }]}
        >
          <Input placeholder="Enter Project Location"
            // options={location}
           />
            
           
       
        </Form.Item>


        <Form.Item
            name="no_of_units"
            label="No of Units"
            // rules={[{ required: true, message: 'Please select Start Date' }]}
          >
             <Input/>
          </Form.Item>
         {/* <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select Start Date' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select End Date' }]}
          >
            <DatePicker />
          </Form.Item> */}
         </div>

         <div className='col_2 g_20'>

         <Form.Item
            label="Estimated Cost"
            name="estimated_cost"
            
            // rules={[{ required: true, message: 'Please select Start Date' }]}
          >
            {/*regex for indian currency formatter number only*/}
             <InputNumber   prefix ="₹"  
             formatter={
              (value) =>
                 `${value}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                  }  
             parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      style={{ width: '100%', alignContent: 'center',  }} />
                   
          </Form.Item>
         {/* <Form.Item
          
          label="Actual Delivery Date" 
          name="actual_delivery_date"
        //   rules={[{ required: true, message: 'Please Select Location' }]}
        >
          
          </Form.Item> */}
         <Form.Item
          
          label="Estimated Delivery Date" 
          name="estimated_delivery_date"
        //   rules={[{ required: true, message: 'Please Select Location' }]}
        >
          <Select placeholder="Select Project Location"
            options={[{
                 label:"Immediate",
                 value:"Immediate"
            },
            {
                label:"1 Month",
                value:"1 Month"
           },{
            label:"2-3 Months",
            value:"2-3 Months"
       }
      
        ]}
           />
            
           
       
        </Form.Item>


      
        
         </div>


          <Form.Item>
          <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button className="btn btn-danger btn-sm"
           type="button"
          onClick={onClose} >
            Cancel
          </button>
          <button
           type="submit"

            className="btn btn-primary btn-sm"
            htmlType="submit"
            // loading={buttonLodaing}
          >
            Save
          </button>
        </div>
          </Form.Item>
        </Form>
      </Drawer>
               
   </>
//     <div>

// <p className='heading_text'>Leaves</p>

// <div
// className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm'>
// <Search className="input_search" allowClear placeholder="Search by Leave Title " enterButton 
//    />
//  <div className='d_f a_i_c'>
//  <Button type="primary" className='btn create_btn' onClick={showDrawer} style={{ marginBottom: '16px' }}>
//         Apply Leave
//       </Button>
//  {/* <Button type='primary' className='btn create_btn' onClick={handleopenDrawerJob}></Button> */}
//  </div>
// </div> 
    
//       <Table dataSource={data} columns={columns} />

//       <Drawer
//         title="Apply Leave"
//         width={600}
//         onClose={onClose}
//         visible={visible}
//         bodyStyle={{ paddingBottom: 80 }}
//       >
//         <Form form={form} layout="vertical" onFinish={onFinish} className='applay_leave'>
//          <div className='col_2 m_t_20'>
//          <Form.Item
          
//             name="leave_id" 
//             label="Leave Title"
//             rules={[{ required: true, message: 'Please enter Leave Title' }]}
//           >
//             <Select placeholder="Select Leave Title"
//              options={leavedata}/>
              
             
         
//           </Form.Item>
//          </div>

//          <div className='col_2 g_20'>
//          <Form.Item
//             name="startDate"
//             label="Start Date"
//             rules={[{ required: true, message: 'Please select Start Date' }]}
//           >
//             <DatePicker />
//           </Form.Item>

//           <Form.Item
//             name="endDate"
//             label="End Date"
//             rules={[{ required: true, message: 'Please select End Date' }]}
//           >
//             <DatePicker />
//           </Form.Item>
//          </div>

//           <Form.Item
//             name="reason"
//             label="Reason"
//             rules={[{ required: true, message: 'Please enter Reason' }]}
//           >
//             <Input.TextArea rows={4} />
//           </Form.Item>

//           <Form.Item>
//           <div
//           style={{
//             margin: "10px",
//             display: "flex",
//             gap: "10px",
//             justifyContent: "flex-end",
//           }}
//         >
//           <Button className="btn_cancel"
//           onClick={onClose} >
//             Cancel
//           </Button>
//           <Button
//            type="primary"

//             className="btn"
//             htmlType="submit"
//             // loading={buttonLodaing}
//           >
//             Save
//           </Button>
//         </div>
//           </Form.Item>
//         </Form>
//       </Drawer>
//     </div>
  );
};

export default Projects;
