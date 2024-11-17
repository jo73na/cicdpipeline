import React, { useContext } from 'react'
import PBFContext from '../../Providers/PBFReports'
import { Avatar } from 'antd'
import DateCalendarServerRequest from '../../Utils/Datepicker'
import  dayjs  from 'dayjs';

const CalenderView = () => {
     const {attenenceSingle,FetchDateClick,loginTable}=useContext(PBFContext)
const loginhour =localStorage.getItem("loginhour")

function parseTime(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    
    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }
    
    return new Date(0, 0, 0, hours, minutes, seconds);
}

const calculateDuration = (loginTime) => {

      if(loginTable?.length>0){
          if(loginTable[0]?.total_logged_hours){
            return loginTable?.total_logged_hours
             
          }
          else{
               if(loginTable?.loginhour){
                   if(loginTable?.logouthour){
                    const loginTime = parseTime(loginTable[0]?.loginhour);
                    const logoutTime = parseTime(loginTable[0]?.logouthour);
                    
                    // Calculate the duration in milliseconds
                    const durationMs = logoutTime - loginTime;
                    
                    // Convert the duration to hours, minutes, and seconds
                    const durationSeconds = Math.floor(durationMs / 1000);
                    const hours = Math.floor(durationSeconds / 3600);
                    const minutes = Math.floor((durationSeconds % 3600) / 60);
                    const seconds = durationSeconds % 60;
                    
                    console.log(`Duration: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
                   }
                   else{
                     
                   }
               }
               else{
                  "00 :00"
               }
          }
            
      }
    const loginDate = dayjs().hour(9).minute(4).second(14); // Parse the login time
    const currentTime = dayjs(); // Get the current time

    const diffInSeconds = currentTime.diff(loginDate, 'second');
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return `${hours} : ${minutes}`
  };

   const handleDateChange =(date)=>{
      FetchDateClick(date) 
   }

  return (
    <div>
                       <div className='d_f j_c_s_b m_t_5 a_i_c g_10 goal_types'>
                         <div className='d_f g_10 a_i_c'>
      <Avatar>{attenenceSingle?.name}</Avatar>
          <div>
          <h6>{attenenceSingle?.name}</h6>
          <p>{attenenceSingle?.email}</p>
          </div>
        {/* <p>This is the Assigned Target page.</p> */}
         </div>
         
         
                   
 </div>
   <div className='mt-2'
    style={{
        border: "1px solid"
    }}>
 <DateCalendarServerRequest handleDateChange={handleDateChange} attenenceSingle={attenenceSingle}/>
  <>
  <div className="table-responsive active-projects task-table mt-2">   
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
                            <th>In</th>
                            <th>Out</th>
                            <th>Duration</th>

                            
                           
                            {/* <th>Tags</th>
                            <th className="text-end">Priority</th> */}
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td>
                                <span>{
                                     loginTable?.length>0 &&
                                     loginTable[0]?.loginhour||"00:00"
}</span>
                            </td>
                            <td>
                                <span>{
                                    loginTable?.length>0 &&
                                    loginTable[0]?.logouthour||"00:00"}</span>
                            </td>
                            <td>
                                <span>{calculateDuration(loginhour)}</span>
                            </td>
                         </tr>
                         {/* {mapedData} */}
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
  </>

    </div>

             <div className="legend mt-2 ">
      <div className="legend-item">
        <div className="legend-color absent"></div>
        <span>Absent</span>
      </div>
      <div className="legend-item">
        <div className="legend-color present"></div>
        <span>Present</span>
      </div>
    </div>    
    </div>
  )
}

export default CalenderView