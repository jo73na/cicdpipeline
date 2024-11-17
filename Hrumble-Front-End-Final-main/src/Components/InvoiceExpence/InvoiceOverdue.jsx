import  { useState } from 'react';
import {  Drawer, Form, Input,  } from 'antd';


import { useContext } from 'react';
// import moment from 'moment';


import dayjs from 'dayjs';

// import Invoiceinfo from './Invoiceinfo';
import InvoiceExpenceContext from '../../Providers/InvoiceExpence';
import Loader from '../../Utils/Loader';




const {Search}=Input
const InvoiceOverdue = () => {
    const {invoice,handleAddExpense,handleFinishExpence,fetchExpence,expencegraph,Loading} =useContext(InvoiceExpenceContext)
 
  // const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
 const [invoiceVisible, setDrawerInvoice] = useState(false);

  const [form] = Form.useForm();



  const handleDrawerClick=(id)=>{
    // handleviewInvoice(id)
    setDrawerInvoice(true)

  }


  const leavedata=[]


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const checkOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const differenceInDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));

    return `Overdue by ${differenceInDays} day`
};





  let mapedData =invoice?.map((item, index)=>{

   

  
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
                   onClick={(e)=>handleDrawerClick(item._id)}
                  >{item?.invoice_number}</h6>
                 {/* <span>{item?.job_id}</span> */}
             </div>	
         </div>
     </td>
     <td>
         <div className="products">
             <div>
                 <h6
                  style ={{
                     cursor:"pointer"
                  }}
                  >{dayjs(item?.invoice_date).format(' DD-MM-YYYY')}</h6>
                 {/* <span>{item?.job_id}</span> */}
             </div>	
         </div>
     </td>
   
     <td><span>{item?.client_id?.client_id?.name|| "-"}</span></td>
     <td><span>₹{item?.total_amount}</span></td>
     <td><span>{item?.paid||"-"}</span></td>
     <td><span>{dayjs(item?.due_date).format("YYYY-MM-DD")}</span></td>
     <td>
															<span className="badge badge-danger light border-0 me-1">{checkOverdue(item.due_date)}</span>

                                                 </td>
     {/* <td><span>{item?.status}</span></td> */}

    
   
  
     
     
  
    
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
  

  return (
    <>  
    {
       Loading ?
        <Loader/>
        :
        
        <div className="table-responsive">
        <table className="table  card-table border-no success-tbl">
            <thead>
                <tr>
                <th>Invoice No</th>

                    <th>Invoice Date</th>
                    <th>Customer</th>
                    <th>Billed</th>
                    <th>Paid</th>
                    <th>Due Date</th>
                    <th>Status</th>
                
                </tr>
            </thead>
            <tbody>
                {mapedData}
            </tbody>
        </table>
    </div> 
    
    
    }
        <Drawer
        title="InVoice"
        placement="right"
        closable={true}
        onClose={()=>setDrawerInvoice(false)}
        open={invoiceVisible}
        width={800}
      >
        {/* <Invoiceinfo/> */}
         {/* <ExpenceAdd setFileError={setFileError} setAttachment={setAttachment}  handleDrawerClose={handleDrawerClose} handleFinish={handleFinish}/> */}
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


export default InvoiceOverdue;
