import { useContext,useEffect, useState} from 'react';


import {  Input, Menu,Select} from 'antd';
import {LeftOutlined } from '@ant-design/icons';

import AddWorkingDays from './AddWorkingdays';
import LeaveContext from '../../../Providers/Leaves';
import HolidayManagement from './Holiday';
import Leaves from './Leaves';
import { useNavigate } from 'react-router-dom';



const { Search } = Input;
const { Option } = Select;




const LeaveMangement=()=>{
//  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);
const navigate=useNavigate()
const {fetchLeave,Leave}=useContext(LeaveContext)

const[key,setKey]=useState("1")
//Tabs Items
const[currentYear,setCurrentYear]=useState(new Date().getFullYear())

const years = Array.from({ length: 21 }, (_, index) => currentYear - 10 + index);


  const handleopenDrawerJob=()=>{
    setOpenaddjob(!openaddjob);

  }

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }


const items=[
    getItem("Monthly Working Days","1"),
    getItem("Public Holidays","2"),
    getItem("Other Leaves","3"),


]


const handleMenuClick=(e)=>{
    console.log("e",e)
    setKey(e?.key)
}

//  Pie Chart Start here

//  Pie Chart ends here


const dataSource = Array.from({ length: 12 }, (_, index) => ({
    key: index + 1,
    month: new Date(2023, index, 1).toLocaleString('en-us', { month: 'long' }),
  }));
  
  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
  ];

  useEffect(() => {
    fetchLeave(currentYear)
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
      <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/>Leave Mangement</p>
{/* 
      <div
      className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm'>
      <Search className="input_search" allowClear placeholder="Search by Job Title / ID" enterButton 
         />
       <div className='d_f a_i_c'>
       <Button type='primary' className='btn create_btn' onClick={handleopenDrawerJob}>+ Apply for Leave</Button>
       </div>
      </div>       */}
      

    
    <div className=''>
    <div className='d_f g_10 m_t_10 m-2'>
          {/* Menu Starts Here ------------> */}
          <div style={{
            flex: 1
          }}>
            <Menu
              className='card'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              onClick={handleMenuClick}
              items={items}
            />
          </div>
          {/* Menu Ends Here ---------------> */}
          <div className="card p_10" style={{
            flex: 3
          }}>
              {
                key =="1" ?
              <>
                
                <AddWorkingDays currentYear={currentYear} setCurrentYear={setCurrentYear}/>
                </>
                :
                key =="2"?
                <HolidayManagement/>
                : <Leaves/>
              }
          </div>
        </div>
    </div>
     


      
        </>
    )
}


export default LeaveMangement;