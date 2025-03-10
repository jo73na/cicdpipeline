import { Button, Drawer, Menu } from 'antd'
import Search from 'antd/es/input/Search'
import React, { useContext, useEffect, useState } from 'react'
import { MoreOutlined} from '@ant-design/icons';
import Avatar from "/images/AvatarImg.png";
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import EmployeeContext from '../../Providers/EmployeeProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies';
// import { BASE } from '../../Utils/api';
import { Dropdown, Nav, Tab, TabContainer } from 'react-bootstrap';
import { SVGICON } from '../../Utils/SVGICON';
import { UserRoundPen } from 'lucide-react';
 
const BASE = import.meta.env.VITE_BASE;
 
 
const InfoPage = () => {
  const { fetchsingle, fetchEmployFull, personalEmp, FetchEmployeeTable, employeeLogindata, employeeCompleteFetch, fetchEmploy } = useContext(EmployeeContext);
 
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
 
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const filteredData = (Array.isArray(employeeLogindata) ? employeeLogindata : []).filter((item) => {
    const fullName = `${item?.firstname} ${item?.lastname}`.toLowerCase();
    const employeeID = item?.employee_id?.toString();
    return fullName.includes(searchTerm) || employeeID.includes(searchTerm);
  });
  
 
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
 
  const showDrawer1 = () => {
    setOpen1(true);
  };
  const onClose1 = () => {
    setOpen1(false);
  };
 
  const handleEdit = (id) => {
    showDrawer1();
    fetchsingle(id);
  };
  const handleEditClick = (id) => {
    navigate(`/Detailprofiles/${id}`);
    // Navigate to the edit page with the ID
  };
 
  const openEmployeeInfo = (id) => {
    employeeCompleteFetch(id);
    navigate(`/employeeTabs/${id}`);
  };
 
  useEffect(() => {
    FetchEmployeeTable();
    console.log("fetchEmployee:", FetchEmployeeTable)
    console.log("fetchSingle:", fetchsingle)
  }, []);
 
 
 
 
    // let params = useParams();
 
    //   useEffect(() => {
 
    //     let role = CookieUtil.get("role")
 
    //     let id = CookieUtil.get("admin_id")
 
    //     if(role=="Employee"){
    //       fetchEmploy(id);
    //     }
    //     else{
    //       fetchEmploy(params?.id);
    //     }
    // },[]);
 
 
    return (
      <div>
        <Drawer title="Add Employee" placement="right" closable={false} size="large" onClose={onClose} open={open} height={50} width={700}>
          <AddEmployee onClose={onClose} />
        </Drawer>
        <Drawer title="Edit Employee" placement="right" closable={false} size="large" onClose={onClose1} open={open1} height={50} width={700}>
          <EditEmployee onClose={onClose1} />
        </Drawer>
 
        <Tab.Container defaultActiveKey={'List'}>
          <label className="c_primary profileInfo_heading">Employee</label>
          <div className="d_f g_20 j_c_s_b a_i_c">
            <div className="d_f f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm p_t_5">
              <Search className="input_search" allowClear placeholder="Search by Employee / ID" onChange={handleSearchChange} enterButton />
            </div>
            <div className="d_f a_i_c">
              <Nav as="ul" className="nav nav-pills mix-chart-tab user-m-tabe" id="pills-tab">
                {/* <Nav.Item as="li" className="nav-item">
                  <Nav.Link as="button" className="nav-link" eventKey={'Grid'}>
                    {SVGICON.GridDots}
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item as="li" className="nav-item" role="presentation">
                  <Nav.Link as="button" className="nav-link" eventKey={'List'}>
                    {SVGICON.List}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <button type="primary" className="btn btn-primary btn-sm " onClick={showDrawer}>
                + Add Employee
              </button>
             
            </div>
          </div>
 
          <Tab.Content>
          {/* <Tab.Pane eventKey={'Grid'}>
  <div className="row">
    {filteredData?.map((item, i) => (
      <div key={i} className="col-xl-3 col-lg-4 col-sm-6">
        <div className="card">
          <div className="card-body">
            <div className="card-use-box">
              <div className="card-bx-img">
                {item?.display_profile_file ? (
                  <img src={`${BASE}${item?.display_profile_file}`} className="profileInfo-img profile-img" />
                ) : (
                  <img src={Avatar} alt="Avatar" className="profileInfo-img profile-img" />
                )}
                {/* <div className={`active ${item?.id === 'deactive' ? 'deactive' : ''}`}></div> */}
              {/* </div>
              <div className="card__text p_t_10">
                <label
                  className="profileInfo-employeeName"
                  onClick={() => openEmployeeInfo(item?._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {`${item?.firstname} ${item?.lastname}`}
                </label>
                <p className="info-email" style={{ fontSize: '11px' }}>
                  {item?.email || ''}
                </p>
              </div>
              <ul className="post-pos">
                <li>
                  <span className="info-position-text">Position: </span>
                  <span style={{ fontSize: '11px' }}>{item?.designation || ''}</span>
                </li>
                <li>
                  <span className="info-position-text">User Role: </span>
                  <span style={{ fontSize: '11px' }}>{item?.user_role || ''}</span>
                </li>
              </ul>
              <div className="d_f f_d_c_sm g_10 a_i_c j_c_c">
                <button
                  type="primary"
                  className="btn btn-primary me-2 btn-sm"
                  onClick={() => openEmployeeInfo(item?._id)}
                >
                  View Profile
                </button>
                <button
                  type="primary"
                  className="btn btn-secondary me-2 btn-sm"
                  onClick={() => handleEdit(item?._id)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</Tab.Pane> */}
 
 
<Tab.Pane eventKey={'List'}>
  <div className="card">
    <div className="card-body">
      <div className="table-responsive">
        <table className="table card-table border-no success-tbl">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Contact Number</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {filteredData?.map((item, index) => (
    <tr key={index}>
      <td>{item.employee_id}</td>
      <td>
        <div className="products">
          {item?.display_profile_file ? (
            <img
              src={`${BASE}${item?.display_profile_file}`}
              className="avatar avatar-md"
              width={20}
              height={20}
            />
          ) : (
            <img src={Avatar} alt="Avatar" className="avatar avatar-md" />
          )}
          <div>
            <h6>
              <Link to={`/viewprofile/${item?._id}`}>{`${item.firstname} ${item?.lastname}`}</Link>
            </h6>
            <span>{item?.designation || item?.department}</span>
          </div>
        </div>
      </td>
      <td>
        <Link to={"#"} className="text-primary">{item.email}</Link>
      </td>
      <td>{item.mobile || '-'}</td>
      <td>{item.gender || '-'}</td>
      <td>{item.location || '-'}</td>
      <td>
        <Dropdown className="task-dropdown-2">
          <Dropdown.Toggle
            as="div"
            className={item.status === 'opened' ? 'Complete' : item.status === 'closed' ? 'Pending' : 'Testing'}
          >
            {item.status === 'opened' ? 'Opened' : item.status === 'closed' ? 'Closed' : 'Pending'}
          </Dropdown.Toggle>
          <Dropdown.Menu className="task-drop-menu">
            <Dropdown.Item onClick={() => handleChangestatus(item._id, 'opened')}>Onboarding</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangestatus(item._id, 'closed')}>Terminated</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangestatus(item._id, 'Hold')}>Pending</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
      <td>
        <UserRoundPen size={16} className="text-indigo-500" style={{marginLeft:"0px", color:"var(--primary)"}} onClick={() => handleEdit(item?._id)} />
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  </div>
</Tab.Pane>
 
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  };
export default InfoPage