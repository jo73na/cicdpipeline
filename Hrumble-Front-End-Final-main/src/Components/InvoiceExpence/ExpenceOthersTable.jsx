import  { useState } from 'react';
import { Form,  Pagination } from 'antd';


import { useContext } from 'react';
// import moment from 'moment';




import dayjs from 'dayjs';
import InvoiceExpenceContext from './../../Providers/InvoiceExpence/index';
import Loader from '../../Utils/Loader';
import { useNavigate } from 'react-router-dom';






const ExpenseOthersTable = ({type}) => {
    const {others,paginationExpenceOthers,setPaginationExpenceOthers,handleviewExpence,setEditExpence,handleOpenEditExpence,expenceOthers,setPaginationExpence,paginationExpence,handleAddExpense,handleFinishExpence,fetchExpence,expencegraph,Loading} =useContext(InvoiceExpenceContext)
    const navigate =useNavigate()
     
  // const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();





  const leavedata=[]


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };



  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };



  let mapedData =others?.map((item, index)=>{

   
       
       
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
                  onClick={()=>navigate(`/expenseinfo/${item?.others_type?._id}`)}
                  >{item?.employee_id? `${item.employee_id?.firstname}${item.employee_id?.lastname}`:`${item.others_type?.name}(${item.others_type_sub?.name||""})`
                }</h6>
                 {/* <span>{item?.job_id}</span> */}
             </div>	
         </div>
     </td>
     <td
       style ={{
        textAlign:"start"
      }}>
         {
            item.expense_type  =="Salary" ?
     <span className="badge badge-info light border-0">{item.expense_type}</span>
     :
     <span className="badge badge-secondary light border-0">{item.expense_type}</span>
   


         }
     </td>

     <td><span>{dayjs(item?.expense_date).format("YYYY-MM-DD")}</span></td>
  
     
     <td
      style ={{
        textAlign:"start"
      }}
     ><span>{formatCurrency(item?.expense_cost||0)}</span></td>

<td>
                                            <div className='d_f g_10 a_i_c'>
                                            
                                             <i class="fa-solid fa-pen-to-square text-primary"
                                              style ={{
                                                cursor:"pointer"
                                              }}
                                              onClick={(e) => {
                                                handleOpenEditExpence()
                                                 handleviewExpence(item?._id)
                                              
                                              }}></i>
                                             </div>
                                            </td>
      
     {/* <td><span>{item?.expense_desc}</span></td> */}
  
    
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
                    <th>Expense For</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Expense Cost (₹)</th>
                    <th>Action</th>

                    {/* <th>Description</th> */}
                
                </tr>
            </thead>
            <tbody>
                {mapedData}
            </tbody>
        </table>
        <div className='d_f justify-content-end mt-3 mb-3'>
		 <Pagination
      showSizeChanger
      onChange={(e)=>setPaginationExpenceOthers({
		...paginationExpenceOthers,
		current:e
	  })}
      defaultCurrent={paginationExpenceOthers?.current}
      total={paginationExpenceOthers?.total}
    />
			</div>
    </div>    
    }

      
               
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

export default ExpenseOthersTable;
