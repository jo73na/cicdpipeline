import { useContext,useEffect, useState} from 'react';



import { Button, Input,Table,Select, Image, Drawer } from 'antd';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Loader from '../../Utils/Loader';

import CompanyContext from '../../Providers/Company';
import { BASE, BASE_URL } from '../../Utils/api';
import AddCompany from './AddComapny';
// import { useEffect } from 'react'
import { EditOutlined } from '@ant-design/icons';


const { Search } = Input;




const Company=()=>{

  const {fetchCompany,Loading,company,}=useContext(CompanyContext)
  const navigate=useNavigate()
   const [openadd,setOpenadd]=useState(false)
   const [openedit,setOpenedit]=useState(false)
   //  const { memoizedResult,searchjob,job,Loading,handleChangeSearch,openaddjob,setOpenaddjob} = useContext(JobContext);



 const handlenavigate=(id)=>{
    navigate(`/company/${id}`)
 }
//Tabs Items



  const handleopenDrawerCompany=()=>{
     setOpenadd(!openadd);

  }
  const handleopenEditCompany=()=>{
    setOpenadd(!openadd);

 }


//  Pie Chart Start here

//  Pie Chart ends here

const columns = [
  { title: 'Logo', dataIndex: 'logo', key: 'logo',
  render:(image)=>

      <Image
      style={{
        height: "35px",
      }}
      alt={image}
      src={`${BASE}${image}`} />
    
    
    },

  { title: 'Company Name', dataIndex: 'company_name', key: 'company_name',
  render:(text,record)=>(
    <a  className="hover_add" onClick={(e)=>handlenavigate(record?.action)}>{text}</a>

  )
  },
  { title: 'Intustry Type', dataIndex: 'industry', key: 'industry' },
  { title: 'Company Register', dataIndex: 'startDate', key: 'startDate' },

//   { title: 'Status', dataIndex: 'status', key: 'status' ,
//   render: (text, record) => (
//     <div className="green">
//       <Select
//         defaultValue={record?.status}
//         onChange={(e) => handleChangeStatus(e,record)}
//         className={` ${record.status == "Pending" ? "status_hold" :'status_selectbox'}`}
//         options={[
//           {
//             label: "Pending",
//             value: "Pending",
//           },
//           {
//             label: "Approved",
//             value: "Approved",
//           },
//         ]}
//       />
//     </div>
//   ), },
  { title: 'Approved by', dataIndex: 'approvedBy', key: 'approvedBy' },
  { title: 'Action', dataIndex: 'action', key: 'action',
  render:(text,record)=>(
    <a  className="text-primary"
     onClick><EditOutlined/></a>
    
  ) },
];

const data=[]
company?.map((item,i)=>{
  data.push({
    key:i+1,
    company_name:item?.organization||"-",
    industry:item?.industry|| "-",
    logo:item?.logo,
    startDate:moment(item?.created_At).format(' DD-MM-YYYY'),
    // endDate:moment(item?.endDate).format(' DD-MM-YYYY'),
    numberOfDays:item.no_of_days,
    reason:item?.reason,
    approvedBy:item.approved_by? item?.approved_by?.name:"-",
    status:item.status,   
    action:item._id,

  })
})

 useEffect(() => {
    fetchCompany()
   
 }, [])
 
 

  
 return( 
     <>

     {/* Drawer Open For Add Job */}
     <Drawer
    title="Add Company"
    placement="right"
    onClose={handleopenDrawerCompany}
    closable={openadd}
    size="large"
    
    open={openadd }
    height={50}
    width={650}
    
  >
    <AddCompany handleopenDrawerCompany={handleopenDrawerCompany}/>
  </Drawer>

  <Drawer
    title="Edit Company"
    placement="right"
    onClose={handleopenEditCompany}
    closable={openedit}
    size="large"
    
    open={openadd }
    height={50}
    width={650}
    
  >
    <EditCompany handleopenEditCompany={handleopenEditCompany}/>
  </Drawer>
    
     
     {/* {
        Loading && <Loader />
     } */}
  {
    Loading ?
    <Loader/> :
    <div
    className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm j_c_s_b '>
    <p className='heading_text'>Companies</p>
    <div className='d_f a_i_c j_c_f_e'>
     <button type='primary' className='btn btn-primary btn-sm' onClick={handleopenDrawerCompany}>+ Add Company</button>
     </div>
  
    </div>  

  }

         
      

    
    <div className='tab m_t_10 m_b_10 p_10 responsive_table'>
      <Table
       columns={columns} dataSource={data}/>
    </div>
     


      
        </>
    )
}


export default Company;