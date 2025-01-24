import  { useState } from 'react';
import { Table, Button, Drawer, Form, Input, DatePicker, Select, Tooltip } from 'antd';
import { useEffect } from 'react';

import { useContext } from 'react';
// import moment from 'moment';

import { Link } from 'react-router-dom';
import { Dropdown, Tab } from 'react-bootstrap';


import dayjs from 'dayjs';
import LeaveContext from './../../../Providers/Leaves/index';
import Loader from '../../../Utils/Loader';
import { SVGICON } from './../../../Utils/SVGICON';
import moment from 'moment';
import { CSVLink } from 'react-csv';







const {Search}=Input
const EmployeeLevePage = () => {
  const {Loading,fetchavailableLeaves,totalleaves,Addleaverequest,fetchrequestleaves,requestleaves}=useContext(LeaveContext)
  // const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const headers = [
    { label: "Applied Date", key: "createdAt" }, 
    { label: "Leave Type", key: "leave_id.leave_title" },
    { label: "From Date", key: "startDate" },
    { label: "To Date", key: "endDate" },
    { label: "No. of Days", key: "no_of_days" },
    { label: "Status", key: "status" },
    { label: "Reason", key: "reason" },
    { label: "Approved By", key: "approved_by.name" },
  ];

  const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    // const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(requestleaves.length / recordsPage);
    const number = [...Array(npage).keys()].map((_, idx) => idx + 1);
    const records = requestleaves.slice(firstIndex, lastIndex);

    const sortedLeaves = requestleaves.sort((a, b) => {
      const timeA = a.status === "Pending" ? a.createdAt : a.updatedAt;
      const timeB = b.status === "Pending" ? b.createdAt : b.updatedAt;
      return new Date(timeB) - new Date(timeA);
    });
    
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




  const leavedata=[]
  totalleaves?.map((item)=>{
    leavedata.push({
    label:item.leave_title,
    value:item._id
    })
  })

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {

    const timeDifference = values?.endDate?.$d?.getTime() - values?.startDate?.$d?.getTime();

// Convert milliseconds to days
const daysDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;
console.log('daysDifference',daysDifference)

let senddata={
  ...values,
   no_of_days: parseInt(daysDifference < 1? 1: daysDifference),
   endDate:  values?.endDate?.$d,
   startDate:  values?.startDate?.$d,
   appliedDate: new Date()
}
   Addleaverequest(senddata)
  
    form.resetFields();
    onClose();
  };

  useEffect(() => {
  
   fetchavailableLeaves()
   fetchrequestleaves()
   
  }, [])

  let mapedData =records.map((item, index)=>{

   

  
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
     <td>{dayjs(item.createdAt).format("DD-MM-YYYY")}</td>

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
     <td><span>{dayjs(item?.startDate).format("DD-MM-YYYY")}</span></td>
     <td><span>{dayjs(item?.endDate).format("DD-MM-YYYY")}</span></td>
     <td className='table-number'><span>{item.no_of_days}</span></td>
     <td className="pe-0">
                                            <Tooltip title={item?.reason || '-'}>
                    <span className="truncate">{item?.reason || '-'}</span>
                  </Tooltip>
                                            </td> 
     <td><span>
  {
    item?.status === "Pending" ?
      <span className="badge badge-warning light border-0 me-1">{item?.status}</span>
      : item?.status === "Rejected" || item?.status === "Cancelled" ?
        <span className="badge badge-danger light border-0 me-1">{item?.status}</span>
        : 
        <span className="badge badge-success light border-0 me-1">{item?.status}</span>
  }
</span></td>
     <td><span>{item.approved_by? item?.approved_by?.name:"-"}</span></td>
     
    
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
  


const statusCounts = requestleaves.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { Approved: 0, Pending: 0, Rejected: 0 } // Initial values for all statuses
  );

  // Status-based card configuration
  const statusCards = [
    { title: 'Approved', count: statusCounts.Approved, color: 'success' },
    { title: 'Pending', count: statusCounts.Pending, color: 'warning' },
    { title: 'Rejected', count: statusCounts.Rejected, color: 'danger' },
  ];

  const colors = ['primary', 'info', 'danger', 'success', 'warning', 'dark'];

  return (
    <>  
    {
       Loading ?
        <Loader/>
        :
        // <div className="container-fluid">	
           
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
                       <h4 className="heading mb-0">Leaves</h4>
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
                           >+ Apply Leave
                           </Link>
                       </div>
                   </div>
                
               
               </Tab.Container>
           </div>
               <div className='col-xl-12'>
               <div className="card" style={{height:"4rem"}}>
          <div className="card-body px-3 py-2">
            <div className="row">
              {statusCards.map((card, index) => (
                <div className="col-xl-4 col-sm-6 col-5 mb-3" key={index}>
                  <div className="task-summary">
                    <div className="d-flex align-items-baseline">
                      <h1 className={`mb-0 fs-28 fw-bold me-2 text-${card.color}`}>{card.count}</h1>
                      <h6 className="mb-0">{card.title}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="container-fluid"> */}
        <div className="row">
          <div className="d-flex" style={{ height: '100vh' }}>
            {/* Left Section: Table */}
            <div style={{ width: '69%', height: '74%', marginRight:"10px" }}>
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
                                        {/* <th>Employee Name</th> */}
                                        <th>Leave Type</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>No. of Days</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                        <th>Approved By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mapedData}
                                </tbody>
                                
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                <div className='dataTables_info'>
                                    Showing {lastIndex-recordsPage + 1} to{" "}
                                    {lastIndex} 
                                    {" "}of {requestleaves.length} entries
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
            </div>
          {/* Right Section: Timeline */}
          <div style={{ width: '32%', height: '70%' }}>
              <div className="card h-100">
                <div className="card-header border-0 pb-0">
                  <h4 className="card-title">Timeline</h4>
                </div>
                <div className="card-body">
                  <div
                    style={{ maxHeight: '370px', overflowY: 'auto', padding: '10px'}}
                  >
                    <div id="DZ_W_TimeLine" className="widget-timeline dz-scroll ps--active-y">
                      <ul className="timeline">
                        {sortedLeaves.map((item, index) => {
                          const color = colors[index % colors.length];
                          return (
                            <li key={item.id || index}>
                              <div className={`timeline-badge ${color}`}></div>
                              <Link className="timeline-panel text-muted" to="">
                                   <span>
                                                          {item.status === "Pending"
                                                            ? moment(item.createdAt).fromNow()
                                                            : moment(item.updatedAt).fromNow()}
                                                        </span>
                                <h6 className="mb-0">{item.employee_id?.name}</h6>
                                <div style={{ display: 'flex', gap: '2px', flexWrap: 'nowrap' }}>
                                                         <span className={`badge text-white bg-${color}`} style={{ fontSize: '7px', padding: '4px 6px' }}>
                                                           {item?.leave_id?.leave_title?.length > 20
                                                             ? `${item?.leave_id?.leave_title.substring(0, 20)}...`
                                                             : item?.leave_id?.leave_title}
                                                         </span>
                                                         <span className={`badge text-white bg-${color}`} style={{ fontSize: '7px', padding: '4px 6px' }}>
                                                           {moment(item?.startDate).format('MMM DD, YYYY')}
                                                         </span>
                                                         <span className={`badge text-white bg-${color}`} style={{ fontSize: '7px', padding: '4px 6px' }}>
                                                           {moment(item?.endDate).format('MMM DD, YYYY')}
                                                         </span>
                                                       </div>
                                {item.status === 'Approved' || item.status === 'Rejected' || item.status === 'Cancelled' ? (
                                  <p className="mb-0">
                                    {item.status} by {item?.approved_by?.name}
                                  </p>
                                ) : null}
                                {item.status === 'Pending' ? (
                                  <p className="mb-0">{item.status} for Approval</p>
                                ) : null}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
               </div>
        //    </div>	
    //    </div>	
    }

          <Drawer
        title="Apply Leave"
        width={600}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className='applay_leave'>
         <div className='col_2 m_t_20'>
         <Form.Item
          
            name="leave_id" 
            label="Leave Title"
            rules={[{ required: false, message: 'Please enter Leave Title' }]}
          >
            <Select placeholder="Select Leave Title"
             options={leavedata}/>
              
             
         
          </Form.Item>
         </div>

         <div className='col_2 g_20'>
         <Form.Item
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
          </Form.Item>
         </div>

          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'Please enter Reason' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
          <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button className="btn_cancel"
          onClick={onClose} >
            Cancel
          </Button>
          <Button
           type="primary"

            className="btn btn-primary"
            htmlType="submit"
            // loading={buttonLodaing}
          >
            Save
          </Button>
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

export default EmployeeLevePage;
