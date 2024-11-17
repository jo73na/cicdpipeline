
import { useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import dayjs from "dayjs";
import FaqContext from '../../Providers/Faq';


// import moment from "moment";

const NonBillable = () => {
  const {
    fethRequestNonBillable,
    RequestNonBillable,
    handleChangeSelectNonBillable,
  } = useContext(FaqContext );

 



  useEffect(() => {
    fethRequestNonBillable();
  }, []);

 

  return( 
    <div className="table-responsive">
    <table className="table  card-table border-no success-tbl">
        <thead>
            <tr>
                <th>Employee Name</th>
                <th>Login Date</th>
                <th>Logged Hours</th>
                 
                <th>Break Timings</th>
                <th>status</th>
                {/* <th>action</th> */}
            </tr>
        </thead>
        <tbody>

         {
           RequestNonBillable?.map((item,index)=>(
                                        <tr key={index}>
                                        <td>
                                                <div className="products">
                                                    {/* <img src={IMAGES.User} className="avatar avatar-md" alt="" /> */}
                                                    <div>
                                                        <h6><Link to={"#"}>{item.name}</Link></h6>
                                                        <span>({item.loginhour||"00:00"} - {item.logouthour||"00:00"})</span>	
                                                    </div>	
                                                </div>
                                            </td>
         <td><span>{dayjs(item.createdAt).format('DD-MM-YYYY')}</span></td>
         <td><span>{item?.TotalLoggedHours}</span></td>

         <td><span>{item.break_timings|| "-"}</span></td>
         {/* <td><span>{item?.LoggedHours}</span></td> */}
         <td>
             <Dropdown className="task-dropdown-2">
                 <Dropdown.Toggle as="div" className={"Testing"}>{item.type}</Dropdown.Toggle>
                 <Dropdown.Menu className='task-drop-menu'>

                     {/* <Dropdown.Item >Pending</Dropdown.Item> */}
                     <Dropdown.Item onClick ={
                      (e)=>handleChangeSelectNonBillable("Approved",item?.action)
                     } >Approved</Dropdown.Item>
                     <Dropdown.Item
                      onClick ={
                        (e)=>handleChangeSelectNonBillable("Rejected",item?.action)
                       } >Rejected</Dropdown.Item>
                 </Dropdown.Menu>
             </Dropdown>															
         </td>

                                          </tr>
            
           ))
         }
            
        </tbody>
    </table>
</div>
    
  )
};

export default NonBillable;
