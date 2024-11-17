import { useContext,useEffect} from 'react';



import { Button, Input,Table,Select, Image, Tabs, Drawer } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Loader from '../../Utils/Loader';

import CompanyContext from '../../Providers/Company';
import { BASE, BASE_URL } from '../../Utils/api';
// import { useEffect } from 'react'
import { LeftOutlined } from '@ant-design/icons';
import AddCompanyUser from './AddCompanyUser';


const { Search } = Input;




const CompanyUsers=()=>{

  const {fetchuserList,Loading,companySingle,userList,handleOpen,openDrawer}=useContext(CompanyContext)
  let params =useParams()

  const navigate=useNavigate()
//  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);

 const handlenavigate=(id)=>{
    navigate(`/company/${id}`)
 }
//Tabs Items



  const handleopenDrawerJob=()=>{
    // setOpenaddjob(!openaddjob);

  }

//  Pie Chart Start here

//  Pie Chart ends here

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    // {
    //   title: 'Contact Number',
    //   dataIndex: 'number',
    //   key: 'number',
    // }, 
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Added On',
      dataIndex: 'addedon',
      key: 'addedon',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    
  ]
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

const data=[]
userList?.map((crud,i)=>{
    data.push({
     id:i+1,
     username:crud?.name,
     number:crud?.phone_number,
     email:crud?.email_id,
     role:crud?.role,
      addedon:formatDate(crud?.created_at)


    
    })})

 useEffect(() => {
    fetchuserList(params?.id)
   
 }, [])


 
 
 

 const items =[
    {
        key: "1",
        label: "Users",
        children:   <Table
        columns={columns} dataSource={data}/> ,
      },
 ]


 const Assign= <p  type='primary' className='c_primary' style={{
    cursor:"pointer",
    fontSize:"15px",
    fontWeight:700
  }} onClick={handleOpen} >+ Add User</p>
 
  
  
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
  {
    Loading ?
    <Loader/> :
    <div
    className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
    <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/>Company / {companySingle?.organization}</p>
      
     {/* <div className='d_f a_i_c'>
     <Button type='primary' className='btn create_btn' onClick={()=>navigate("/leave-management")}>Leave Management</Button>
     </div> */}
    </div>  

  }

         
      

    
  
      
    <div className="tab m_t_10 m_b_10 p_10 responsive_table">
        <Tabs
          items={items}
          defaultActiveKey="1"
          tabBarExtraContent={Assign}
        />
      </div>

      <Drawer
        title="Add User"
        placement="right"
        closable={true}
        onClose={handleOpen}
        open={openDrawer}
        width={550}
      >
        <AddCompanyUser/>
         {/* <AssignUser/> */}
        {/* <AssignUser onDrawerClose={onDrawerClose} setActiveKey={setActiveKey} id={roleSingle?._id} /> */}
      </Drawer>
      
        </>
    )
}


export default CompanyUsers;