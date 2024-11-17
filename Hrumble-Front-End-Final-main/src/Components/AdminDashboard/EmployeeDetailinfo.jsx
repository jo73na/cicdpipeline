import { Avatar, Checkbox, Collapse, Select, Switch } from 'antd'
import { AntDesignOutlined, DeleteOutlined, CloseOutlined, PhoneOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import PersonalDetailinfo from './PersonalDetailinfo';
import BankDetails from './BankDetails';
import WorkExperience from './WorkExperience';
import Documents from './Documents';
import { useContext, useEffect, useState } from 'react';
import EmployeeContext from '../../Providers/EmployeeProvider';
import { useNavigate } from 'react-router-dom';
import { BASE } from '../../Utils/api';

const EmployeeDetailinfo = () => {

  const {employeesingle,fetchEmployFull,employeeLogindata,personalEmp,adminLoginData,deleteEmployee} = useContext(EmployeeContext)

    console.log("personalEmp------->>",personalEmp)

    const items = [
        {
            key: '1',
            label: "Personal Details",
            children: <PersonalDetailinfo />
        }
    ]

    const items1 = [
        {
            key: '2',
            label: "Bank Details",
            children: <BankDetails />
        }
    ]

    const items2 = [
        {
            key: '3',
            label: "Work Experience",
            children: <WorkExperience />
        }
    ]
    
    const items3 = [
        {
            key: '4',
            label: "Documents",
            children: <Documents />
        }
    ]

    const navigate=useNavigate()

    const [isClosed, setIsClosed] = useState(false);

    const handleClientTableClick=(e,id)=>{
        navigate(`/myprofiles/${id}`)
   }

   const handelDelete =(e,id)=>{
    setIsClosed(true); 
    deleteEmployee(id)
  }

//    let profileStatus =[]
//    employeesingle?.map((candidate)=>{
//     profileStatus.push({
//       label:candidate?.name,
//       value:candidate?.user_status
//     })
//  })

    // useEffect(() => {
    //     alert("uuu")
    // },[])

  return (
    <div className=''>
        <div className='d_f employeeDashboard-info'>
            <div className=''>
                <img src={`${BASE}${adminLoginData?.display_profile_file}`} className='profile-image ' />
            </div>
        <div>
            <div className=' p_15'>
        <div className='d_f j_c_s_b g_40'>
        <label className='profile-heading'>{`${adminLoginData?.firstname || " "} ${adminLoginData?.lastname || " "}`}</label>
        <div className={`${adminLoginData?.user_status =="onBoarding"?"onboarding-going":adminLoginData?.user_status =="releived"?"releived-going":"terminated"}` }>
        
        <p> {adminLoginData?.user_status} </p>
        </div>
        <div className='d_f g_10 employeedash-editDelete'>
        <label onClick={(e)=>handleClientTableClick(e,adminLoginData?._id)} className='edit-cursor'><EditOutlined /> Edit</label>
        <span className='edit-cursor' onClick={(e)=>handelDelete(e,adminLoginData?._id)}><DeleteOutlined /> Delete</span>
        </div>
        </div>
        <div className='d_f f_w_w g_20'>
            <label className='employeeDashboard-Verifi'>Verification Status</label>
            <Switch size="small" />
        </div>
        <div className='d_f g_10 employeeDashboard-infojob'>
            <label className='employeeDash-prof-dash'>{adminLoginData?.employee_id!=="undefined" ? adminLoginData?.employee_id : "-"}</label>
            <span>|</span>
            <span>{adminLoginData?.designation}</span>
            <span>|</span>
            <span>{adminLoginData?.job_type}</span>
            <span>|</span>
            <span>{adminLoginData?.salary_type}</span>
            <span>|</span>
            <span>{adminLoginData?.yearly_ctc} <span>(LPA)</span></span>
        </div>
        <div className='d_f f_w_w'>

            <div className='d_f g_10 employeeDashboard-infoEmail'>
            <label><PhoneOutlined className='employeeDashboard-infoNum' /> <span> {adminLoginData?.mobile}</span> </label>
            <span><MailOutlined className='employeeDashboard-infoNum' /> {adminLoginData?.email}</span>
            </div>
            <div className='d_f g_20 m_l_50'>
                <label onClick={(e)=>handleClientTableClick(e,adminLoginData?._id)} className='edit-cursor'><EditOutlined /> Edit</label>
                 <span className='edit-cursor' onClick={(e)=>handelDelete(e,adminLoginData?._id)}><DeleteOutlined /> Delete</span>
            </div>
        </div>
        </div>
            </div>
        </div>
        <div className='zive-employeeDashboard'>
        <div className='p_t_20'>
            <Collapse ghost items={items} defaultActiveKey={['0']} />
        </div>
        <div className='p_t_20'>
            <Collapse ghost items={items1} />
        </div>
        <div className='p_t_20'>
            <Collapse ghost items={items2} />
        </div>
        <div className='p_t_20'>
            <Collapse ghost items={items3} />
        </div>
        </div>
    </div>
  )
}

export default EmployeeDetailinfo
