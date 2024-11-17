import { useContext,useEffect} from 'react';

import Loader from '../../../Utils/Loader';

import { Button, Input,Table,Select } from 'antd';
import LeaveContext from '../../../Providers/Leaves';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';



const { Search } = Input;




const AdminLevePage=()=>{

  const {requestleaves,fetchrequestleaves,handleChangeStatus}=useContext(LeaveContext)
  const navigate=useNavigate()
//  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);


//Tabs Items



  const handleopenDrawerJob=()=>{
    // setOpenaddjob(!openaddjob);

  }

//  Pie Chart Start here

//  Pie Chart ends here



const data=[]
let mapeddata =requestleaves?.map((item,i)=>{
  
    return <tr>
     <td><span>{item?.employee_id?.name||"-"}</span></td>
     <td><span>{item?.leave_id?.leave_title}</span></td>
     <td><span>{moment(item?.startDate).format(' DD-MM-YYYY')}</span></td>
     <td><span>{moment(item?.endDate).format(' DD-MM-YYYY')}</span></td>
     <td><span>{item.no_of_days}</span></td>
     <td><span>{item?.reason}</span></td>
     <td>
     <Dropdown className="task-dropdown-2">
    <Dropdown.Toggle as="div" className={
      item.status =="Approved"? "Complete":
      item.status =="Pending"?
      "Testing":
      "Pending" 
    }>{item.status}</Dropdown.Toggle>
    <Dropdown.Menu className='task-drop-menu'>
        <Dropdown.Item  onClick={()=>handleChangeStatus(item?._id,'Pending')}>Pending</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleChangeStatus(item?._id,'Approved')}>Approved</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleChangeStatus(item?._id,'Rejected')}>Rejected</Dropdown.Item>

    </Dropdown.Menu>
</Dropdown>	
     </td>
     <td
      style={{
         textAlign:"left"
      }}
     ><span>{item.approved_by? item?.approved_by?.name:"-"}</span></td>

   </tr>
    // key:i+1,
    // employee_id:
    // leave_id:item?.leave_id?.leave_title,
    // startDate:moment(item?.startDate).format(' DD-MM-YYYY'),
    // endDate:moment(item?.endDate).format(' DD-MM-YYYY'),
    // numberOfDays:item.no_of_days,
    // reason:item?.reason,
    // approvedBy:item.approved_by? item?.approved_by?.name:"-",
    // status:item.status,   
    // action:item._id,


})
 
  useEffect(() => {
    fetchrequestleaves()
  }, [])
  
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
    
     
     {/* {
        Loading && <Loader />
     } */}

      <div
      className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
      <p className='heading_text'>Leaves</p>
        
       <div className='d_f a_i_c'>
       <button type='primary' className='btn btn-primary btn-sm' onClick={()=>navigate("/leave-management")}>Leave Management</button>
       </div>
      </div>      
      
      <div className="table-responsive">
    <table className="table  card-table border-no success-tbl">
        <thead>
            <tr>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                 
                <th>End Date</th>
                <th>No. of Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Approved By</th>
                {/* <th>action</th> */}
            </tr>
        </thead>
        <tbody>

         {mapeddata}
            
        </tbody>
    </table>
</div>
    



      
        </>
    )
}


export default AdminLevePage;