import React, { useContext, useEffect } from 'react';
import { Modal, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import PBFContext from '../../Providers/PBFReports';
import {LeftOutlined } from '@ant-design/icons';
import Loader from '../../Utils/Loader';
import ExpenseInfochart from "../UtlilsComponent/ExpenseInfochart"  

import { Tab } from 'react-bootstrap';
import CookieUtil from '../../Utils/Cookies';


import { useState } from 'react';
import InvoiceExpenceContext from '../../Providers/InvoiceExpence';
import dayjs from "dayjs";



const ExpenceInfo = () => {
   const {fetchExpenseOthersSub,expenceOthersSub}=useContext(InvoiceExpenceContext)
    console.log("expenceOthersSub",expenceOthersSub)
   const [filter,setFilter]=useState("Week")
    const params =useParams()

    const navigate=useNavigate()
    const role = CookieUtil.get("role")
 let logindata = JSON.parse(CookieUtil.get('admin'));





  useEffect(() => {
     fetchExpenseOthersSub(params?.id)
  }, [filter])


  
  const option=[
    {
       label:"This Week",
       value:"Week"
   },
   {
    label:" This Month",
    value:"Month"
 },
 {
    label:"This Year",
    value:"Year"
 }
 ]

  let mapedData =expenceOthersSub?.map((item,index)=>{
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
                 >{item?.employee_id? `${item.employee_id?.firstname}${item.employee_id?.lastname}`:`${item.others_type_sub?.name||""}`
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

    <td><span>{dayjs(item?.expense_date).format("DD-MM-YYYY")}</span></td>
 
    
    <td
     style ={{
       textAlign:"start"
     }}
    ><span>₹{item?.expense_cost}</span></td>

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
  

  return(
    <>
  
    {/* <div
    className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
         <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/>Clients</p>
     
   
    </div>       */}
    
   
    
    <div className='container-fluid'>
    <div className="row">
                    <Tab.Container defaultActiveKey={'Grid'} >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="heading_text mb-0">
                            <LeftOutlined className='back' onClick={()=>navigate(-1)}/>
                            {expenceOthersSub?.length>0 &&
                             expenceOthersSub[0]?.others_type?.name
                }
                            </h4>
                            <div className="d-flex align-items-center">
                               
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div> 
   <div className='card'>
     <ExpenseInfochart />
     {
    //    role !== "Client" && <ClientwiseReport  setFilter={setFilter} filter={filter} chartlabel={chartlabel} chart1={chart1} chart2 ={chart2} chart3={chart3} chart4={chart4} chart5={chart5}/> 
     }
       <div className="table-responsive">
        <table className="table  card-table border-no success-tbl">
            <thead>
                <tr>
                <th>Expense For</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Expense Cost (₹)</th>
                    <th>Action</th>
                
                </tr>
            </thead>
            <tbody>
                {mapedData}
            </tbody>
        </table>
    </div> 

    </div>   
    </div>


   
    
     </>
  )
  
 
  
  
  
};

export default ExpenceInfo;
