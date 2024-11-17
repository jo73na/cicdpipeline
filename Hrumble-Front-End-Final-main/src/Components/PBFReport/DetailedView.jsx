import React, { useContext } from 'react'
import PBFContext from './../../Providers/PBFReports/index';
import { useEffect } from 'react';
import { Drawer } from 'antd';
import CalenderView from './CalenderView';
import { SVGICON } from '../../Utils/SVGICON';
import { Nav, Tab } from 'react-bootstrap';

export const DetailedView = () => {
     const {fetchAttenenceSingle,fetchattenenceReport,attenenceBillable,attenenceReport,opencalander,handleopenCalandar}=useContext(PBFContext)
      console.log("attenenceReport",attenenceReport)
    useEffect(() => {
        fetchattenenceReport()
    }, [])

    const calendarClick=(id,billable)=>{
        fetchAttenenceSingle(id,billable)
        handleopenCalandar()

    }

     let mapedData =attenenceReport?.map((item,index)=>{
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
                     >{item.text}</h6>
                    {/* <span>{item?.job_id}</span> */}
                </div>	
            </div>
        </td>
        <td><span>{item?.attenence|| "-"}</span></td>

        <td><span>{item?.totallogged}</span></td>
        <td><span>{item?.totalBreak}</span></td>
        <td><i 
        onClick ={(e)=>calendarClick(item?._id)}
        style ={{
             cursor:"pointer"
        }} class="fa-regular fa-calendar-days"></i></td>
       
   
      
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
     let mapedDataBillable =attenenceBillable?.map((item,index)=>{
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
                     >{item.text}</h6>
                    {/* <span>{item?.job_id}</span> */}
                </div>	
            </div>
        </td>
        <td><span>{item?.attenence|| "-"}</span></td>

        <td><span>{item?.totallogged}</span></td>
        <td><span>{item?.totalBreak}</span></td>
        <td><i 
        onClick ={(e)=>calendarClick(item?._id,"billable")}
        style ={{
             cursor:"pointer"
        }} class="fa-regular fa-calendar-days"></i></td>
       
        
      
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

<Tab.Container defaultActiveKey={'Sale'}>
       <Nav  as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
       
           <Nav.Item as="li" >
               <Nav.Link as="button" eventKey={'Sale'}>
                   {SVGICON.SocialHeart}
                   <span>Billable</span>
               </Nav.Link>
           </Nav.Item>
           <Nav.Item as="li" >
               <Nav.Link as="button" eventKey={'Mobile'}>
                   {SVGICON.Mobile}
                   <span>NonBillable</span>
               </Nav.Link>
           </Nav.Item>
          
           
       </Nav> 
        {/* <p>Sathish</p> */}
       <Tab.Content>
        
           <Tab.Pane eventKey={'Sale'}>
        <div className='col_2'>
        <div className="card"
           >            
    <div className="card-body p-0">
        <div className="table-responsive active-projects task-table">   
            {/* <div className="tbl-caption d-flex justify-content-between align-items-center">
                <h4 className="heading mb-0"></h4>
                <div>
                    <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
                </div>
            </div>     */}
            <div id="task-tbl_wrapper" className="dataTables_wrapper no-footer"
          >
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
                            <th>Employee</th>
                            <th>Attence</th>

                            <th>Working Time</th>
                            <th>Break Time</th>
                            <th>View</th>
                           
                            {/* <th>Tags</th>
                            <th className="text-end">Priority</th> */}
                        </tr>
                    </thead>
                    <tbody>
                         {mapedDataBillable}
                    </tbody>
                    
                </table>
                {/* <div className="d-sm-flex text-center justify-content-between align-items-center">
                
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
                                <Link className={`paginate_button ${pagination?.current === n ? 'current' :  '' } `} key={i}                                            
                                    onClick={()=>handlePageChange(n, 10)}
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
           </Tab.Pane>
           <Tab.Pane eventKey={'Mobile'}>
    <div className='col_2'>
            
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
                            <th>Employee</th>
                            <th>Attence</th>

                            <th>Working Time</th>
                            <th>Break Time</th>
                            <th>View</th>
                           
                            {/* <th>Tags</th>
                            <th className="text-end">Priority</th> */}
                        </tr>
                    </thead>
                    <tbody>
                         {mapedData}
                    </tbody>
                    
                </table>
                {/* <div className="d-sm-flex text-center justify-content-between align-items-center">
                
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
                                <Link className={`paginate_button ${pagination?.current === n ? 'current' :  '' } `} key={i}                                            
                                    onClick={()=>handlePageChange(n, 10)}
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
                {/* <NonBillable/> */}
           </Tab.Pane>
        
       </Tab.Content>               
   </Tab.Container>
 
<Drawer
        title=""
        placement="right"
        onClose={handleopenCalandar}
        closable={opencalander}
        size="small"
        open={opencalander}
        height={50}
        width={400}
        className="rotate-modal"
      >
        <CalenderView/>
      </Drawer>
   </>

 
  )
  
}
