import { Checkbox, Collapse, Select, Switch, Table, Tabs, Timeline } from 'antd'
import { useContext, useEffect } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { EditTwoTone, ClockCircleOutlined } from '@ant-design/icons';
import Aadhar from "/images/AadharCard.svg";
import moment from 'moment';
import Avatar from "/images/AvatarImg.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies';
import EmployeeInfoPage from '../AdminDashboard/EmployeeInfoPage';
import EmployeeDoc from './EmployeeDoc';
import { BASE } from '../../Utils/api';
import { LeftOutlined } from '@ant-design/icons';

const EmployeeDetailinfo = () => {

  const {employeesingle,employeeLogindata,employeeCompleteFetch,adminLoginData,educationExperiData,workExperinceData,employeeComplete,fetchEmploy} = useContext(EmployeeContext);

  console.log("educationExperiD",employeeComplete)

  const navigate = useNavigate();

  const items = [
    {
      key: '1',
      label: 'Profile',
      children: <EmployeeInfoPage />,
    },
    {
      key: '2',
      label: 'Employee Documents',
      children: <EmployeeDoc />,
    },
  ];

  const columns = [
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: 'Relationship Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      key: 'occupation',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
  ];

  const data=[]

  employeeComplete?.basic?.familyDetails?.map((item, i) => {
     data.push({
        key: i,
        relationship: item?.relationship,
        name: item?.name,
        occupation: item?.occupation,
        phone_no:item?.phone_no
     })
    
   })

  // useEffect(() => {
  //   fetchExperienceAll()
  //   employeeCompleteFetch()
  // },[])

  let params = useParams();

      useEffect(() => {

        let role = CookieUtil.get("role")

        let id = CookieUtil.get("admin_id")

        if(role=="Employee"){
            employeeCompleteFetch(id);
        }
        else{
            employeeCompleteFetch(params?.id);
        }
    },[]);


  return (
    <div>
       <div className='profileInfo-editIcon-size'> <LeftOutlined className="back" onClick={() => navigate(-1)} /><label className='info-backText'> {`${employeeComplete?.basic?.firstname} ${employeeComplete?.basic?.lastname}`} </label></div>
       <div className="row p_t_5">
                    <div className="col-lg-12">
                        <div className="card card-profile">
							<div className="admin-user">
								<div className="img-wrraper">                              
									<div className="">
                  {
                    employeeComplete?.basic?.display_profile_file ? (
                      <img src={`${BASE}${employeeComplete?.basic?.display_profile_file}`} className='rounded-circle' />
                    ) : (
                    <img src={Avatar} alt="Avatar" className='profileInfo-img profile-img' />
                    ) }
									{/* <Link to={"/edit-profile"} className="icon-wrapper"><i className="fa-solid fa-pencil"></i></Link> */}
								</div>
								<div className='profileInfo-content'>
                        <h5 className="card-title mb-1 profileInfo-employeeName">{`${employeeComplete?.basic?.firstname} ${employeeComplete?.basic?.lastname}`}</h5>
                        <p className="card-text text-muted mb-1">{employeeComplete?.basic?.designation}</p>
                        {/* <p className="card-text text-muted mb-1">Employee Id: {employeeComplete?.basic?.employee_id}</p> */}
                        <div className=''>
                        <div className='d-flex f_w_w g_30 p_t_10 info-heading-bold'>
                        <p className=''>Birthday: <span className='info-email'>{moment(employeeComplete?.basic?.dob).format("DD/MM/YYYY") || "-"}</span></p>
                        <p className=''>Gender: <span className='info-email'>{employeeComplete?.basic?.gender || "-"}</span> </p>
                        </div>
                        <div className='d-flex f_w_w g_30 p_t_10 info-heading-bold'>
                        <p className=''>Phone: <span className='info-email'>{employeeComplete?.basic?.mobile || "-"}</span></p>
                        <p className=''>Email: <span className='info-email'>{employeeComplete?.basic?.email || "-"}</span></p>
                        </div>
                        </div>
                    </div>
							</div>	
                        </div>
                    </div>
                </div>
        
       
        <div  className='profileInfo-tabs'>
        <Tabs defaultActiveKey="1" items={items} />
        </div>
    </div>
    </div>
    )
}

export default EmployeeDetailinfo


{/* <div className='card col-12 p-3 mb-4 shadow-sm'>
            <div className='card-body'>
                <div className='row'>
                <div className='col-lg-6 mb-3 mb-lg-0'>
            <div className='profile-card'>
                <div className='d-flex align-items-center'>
                    <div className='profile-img-wrap'>
                        <img src={`${BASE}${employeeComplete?.basic?.display_profile_file}`} className='rounded-circle' alt='Profile' />
                    </div>
                    <div className='profileInfo-content'>
                        <h5 className="card-title mb-1 profileInfo-employeeName">{`${employeeComplete?.basic?.firstname} ${employeeComplete?.basic?.lastname}`}</h5>
                        <p className="card-text text-muted mb-1">{employeeComplete?.basic?.designation}</p>
                        <p className="card-text text-muted mb-1">Employee Id: {employeeComplete?.basic?.employee_id}</p>
                        <p className="card-text small text-muted mb-0">Date of Join: 1st Jan 2013</p>
                    </div>
                </div>
            </div>
        </div>
                    <div className='col-lg-6 position-relative'>
                        <div className="dashed-line"></div>
                        <ul className='list-unstyled mb-0'>
                            <li className='mb-2'>
                                <strong>Phone:</strong> <span className='text-muted'>{employeeComplete?.basic?.mobile || "-"}</span>
                            </li>
                            <li className='mb-2'>
                                <strong>Email:</strong> <span className='text-muted'>{employeeComplete?.basic?.email || "-"}</span>
                            </li>
                            <li className='mb-2'>
                                <strong>Birthday:</strong> <span className='text-muted'>{moment(employeeComplete?.basic?.dob).format("DD/MM/YYYY") || "-"}</span>
                            </li>
                            <li className='mb-2'>
                                <strong>Address:</strong> <p className='text-muted mb-0'>{employeeComplete?.basic?.present_addr || "-"}</p>
                            </li>
                            <li className='mb-2'>
                                <strong>Gender:</strong> <span className='text-muted'>{employeeComplete?.basic?.gender || "-"}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> */}