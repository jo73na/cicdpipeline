import {
  Checkbox,
  Collapse,
  Select,
  Switch,
  Table,
  Tabs,
  Timeline,
  Typography,
  Row,
  Col,
} from "antd";
import { useContext, useEffect } from "react";
import EmployeeContext from "../../Providers/EmployeeProvider";
import { EditTwoTone, ClockCircleOutlined } from "@ant-design/icons";
import Aadhar from "/images/AadharCard.svg";
import moment from "moment";
import Avatar from "/images/AvatarImg.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import CookieUtil from "../../Utils/Cookies";
import EmployeeInfoPage from "../AdminDashboard/EmployeeInfoPage";
import EmployeeDoc from "./EmployeeDoc";
// import { BASE } from '../../Utils/api';
import { LeftOutlined } from "@ant-design/icons";
 
const BASE = import.meta.env.VITE_BASE;
 
const EmployeeDetailinfo = () => {
  const {
    employeesingle,
    employeeLogindata,
    employeeCompleteFetch,
    adminLoginData,
    educationExperiData,
    workExperinceData,
    employeeComplete,
    fetchEmploy,
  } = useContext(EmployeeContext);
 
  console.log("educationExperiD", employeeComplete);
 
  const navigate = useNavigate();
  const { Title, Text } = Typography;
 
  const items = [
    {
      key: "1",
      label: "Profile",
      children: <EmployeeInfoPage />,
    },
    {
      key: "2",
      label: "Employee Documents",
      children: <EmployeeDoc />,
    },
    {
      key: "3",
      label: "Activity",
      children: ""
    },
  ];
 
  const columns = [
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
    },
    {
      title: "Relationship Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_no",
      key: "phone_no",
    },
  ];
 
  const data = [];
 
  employeeComplete?.basic?.familyDetails?.map((item, i) => {
    data.push({
      key: i,
      id: item?.id,
      relationship: item?.relationship,
      name: item?.name,
      occupation: item?.occupation,
      phone_no: item?.phone_no,
    });
  });
 
  // useEffect(() => {
  //   fetchExperienceAll()
  //   employeeCompleteFetch()
  // },[])
 
  let params = useParams();
 
  useEffect(() => {
    let role = CookieUtil.get("role");
 
    let id = CookieUtil.get("admin_id");
 
    if (role == "Employee") {
      employeeCompleteFetch(id);
    } else {
      employeeCompleteFetch(params?.id);
    }
  }, []);
 
  return (
    <div>
      <div className="profileInfo-editIcon-size">
        <LeftOutlined className="back" onClick={() => navigate(-1)} />
        <label className="info-backText">
          {" "}
          {`${employeeComplete?.basic?.firstname} ${employeeComplete?.basic?.lastname}`}{""}
        </label>
      </div>
 
      <div className="row p_t_30">
        <Row gutter={[8, 16]}>
          <div className="container-fluid">
            <div className="card profile-overview profile-overview-wide">
              <div className="card-body d-flex">
           
              <div className="clearfix">
                <div className="d-inline-block position-relative me-sm-4 me-3 mb-3 mb-lg-0 ">
                {employeeComplete?.basic?.display_profile_file ? (
                  <img
                    src={`${BASE}${employeeComplete?.basic?.display_profile_file}`}
                    className="rounded-4 profile-avatar"
                    alt="Profile"
                  />
                ) : (
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="rounded-4 profile-avatar"
                  />
                )}
                <div className={`active ${employeeComplete?.basic?.id === 'deactive' ? 'deactive' : ''}`}></div>
              </div>
              </div>
         
           
              <div className="clearfix d-xl-flex flex-grow-1">
                <div  className="clearfix pe-md-5">
                  <h3 className="fw-semibold-1">{`${employeeComplete?.basic?.firstname} ${employeeComplete?.basic?.lastname}`} </h3>
                  <ul className="d-flex flex-wrap fs-6 align-items-center mb-3">
                  <li className="me-3 d-inline-flex align-items-center">
                    <i className="fa fa-user-shield me-1 fs-18">
                    </i>
                    {employeeComplete?.basic?.designation || "-"}
                  </li>
                  <li className="me-3 d-inline-flex align-items-center">
                    <i className="fa fa-birthday-cake me-1 fs-18">
                    </i>
                    <span className="info-email">
                      {moment(employeeComplete?.basic?.dob).format(
                        "DD/MM/YYYY"
                      ) || "-"}
                    </span>
                  </li>
                  <li className="me-3 d-inline-flex align-items-center">
                  <i
    className={`fa ${employeeComplete?.basic?.gender === 'male' ? 'fa-mars' :
                 employeeComplete?.basic?.gender === 'female' ? 'fa-venus' : 'fa-user'}
    me-1 fs-18`}
  ></i>
  {employeeComplete?.basic?.gender === 'male' ? 'Male' :
    employeeComplete?.basic?.gender === 'female' ? 'Female' : '-'}
                  </li>
                  <li className="me-3 d-inline-flex align-items-center">
                    <i className="fa fa-phone me-1 fs-18">
                    </i>
                    {employeeComplete?.basic?.mobile || "-"}
                  </li>
                  <li className="me-3 d-inline-flex align-items-center">
                    <i className="fa fa-envelope me-1 fs-18">
                    </i>
                    {employeeComplete?.basic?.email || "-"}
                  </li>
                  </ul>
                  <div className="d-md-flex d-none flex-wrap">
                    <div className="border outline-dashed rounded p-2 d-flex align-items-centre me-3 mt-3">
                    <div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1V23" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </div>
                    <div class="clearfix ms-2">
                      <h3 class="mb-0 fw-semibold lh-1">$1,250</h3>
                      <span class="fs-14">Total Earnings</span>
                    </div>
                    </div>
                    <div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
                    <div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </div>
                    <div class="clearfix ms-2">
                      <h3 class="mb-0 fw-semibold lh-1">125</h3>
                      <span class="fs-14">New Referrals</span>
                    </div>
                  </div>
                  <div class="border outline-dashed rounded p-2 d-flex align-items-center me-3 mt-3">
                    <div class="avatar avatar-md style-1 bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </div>
                    <div class="clearfix ms-2">
                      <h3 class="mb-0 fw-semibold lh-1">25</h3>
                      <span class="fs-14">New Deals</span>
                    </div>
                  </div>
 
                  </div>
                  {/* <div>
                  <ul className="d-md-flex d-none   ms-auto mr-5">
    <li className="px-1">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-linkedin-in"></i>
      </a>
    </li>
 
    <li className="px-1">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-instagram"></i>
      </a>
    </li>
 
    <li className="px-1">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-facebook-f"></i>
      </a>
    </li>
 
    <li className="px-1 ">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-twitter"></i>
      </a>
    </li>
  </ul>
  </div> */}
                 
             
                </div>
                <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column col-xl-3 ">
                <div class="clearfix mb-3 text-xl-end">
               
                  <ul className="d-md-flex d-none   ms-auto mr-5">
    <li className="px-1">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-linkedin-in"></i>
      </a>
    </li>
 
    <li className="px-1">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-instagram"></i>
      </a>
    </li>
 
    <li className="px-1">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-facebook-f"></i>
      </a>
    </li>
 
    <li className="px-1 ">
      <a className="btn btn-light text-dark">
        <i className="fa-brands fa-twitter"></i>
      </a>
    </li>
  </ul>
 
                </div>
 
                </div>
              </div>
         
          </div>
          <div className="card-footer py-0 d-flex flex-wrap justify-content-between align-items-center px-0">
 
 
  {/* Social Media Icons */}
 
  <Tabs defaultActiveKey="1" items={items} />
</div>
 
          </div>
          </div>
        </Row>
 
       
      </div>
    </div>
  );
};
 
export default EmployeeDetailinfo;