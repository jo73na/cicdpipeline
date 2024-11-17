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
import { BASE } from '../../Utils/api';
import { Dropdown, Nav, Tab, TabContainer } from 'react-bootstrap';
import { SVGICON } from '../../Utils/SVGICON';


const InfoPage = () => {

    const {fetchsingle, fetchEmployFull, personalEmp, FetchEmployeeTable, employeeLogindata,employeeCompleteFetch, fetchEmploy} = useContext(EmployeeContext);

    console.log("employeeLogindata---->",employeeLogindata)

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const navigate = useNavigate();

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

  const handelEdit = (id) => {
    console.log("ido--",id)
    showDrawer1()
    fetchsingle(id)
  };

    const openEmployeeInfo=(id)=>{
        console.log("id-------",id)
        // handleClickjobTable(id)
        employeeCompleteFetch(id)
        navigate(`/employeeTabs/${id}`)
      }


  useEffect(() => { 
    FetchEmployeeTable()
  },[])

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


     const data=[]

     let mapeddata=employeeLogindata?.map((item, i) => {
      
    return   <div key={i} className="col-xl-3 col-lg-4 col-sm-6">
    <div className="card">
      <div className="card-body">
        <div className="card-use-box">
          <div className="crd-bx-img">
          {
          item?.display_profile_file ? (
            <img src={`${BASE}${item?.display_profile_file}`} className='profileInfo-img profile-img'
              />
          ) : (
          <img src={Avatar} alt="Avatar" className='profileInfo-img profile-img' />
   ) }
          <div className={`active ${item?.id === "deactive" ? 'deactive' : ''}`}></div>
        </div>
        <div className="card__text p_t_10">
        <label className='profileInfo-employeeName' onClick={(e)=> openEmployeeInfo(item?._id)} style={{cursor:"pointer"}}>{`${item?.firstname} ${item?.lastname} `}</label>
          <p className='info-email'
           style={{
            fontSize: "11px",
           }}>{item?.email||""}</p>
        </div>
        <ul className="post-pos">
         <li>
            <span className="info-position-text">Position: </span>
            <span
              style={{
                fontSize: "11px",
               }}>{item?.designation||""}</span>
          </li>
          <li>
            <span className="info-position-text">User Role: </span>
            <span
             style={{
              fontSize: "11px",
             }}>{item?.user_role||""}</span>
          </li>
        </ul>
       <div
        className='d_f f_d_c_sm g_10 a_i_c j_c_c'>
          <button type='primary' to="#" className="btn btn-primary me-2 btn-sm" onClick={(e)=> openEmployeeInfo(item?._id)}>View Profile</button>
          <button type='primary' to="#" className="btn btn-secondary me-2 btn-sm" onClick={(e) => handelEdit(item?._id)}>Edit Profile</button>
        </div>
      </div>
    </div>
  </div>
</div>
  }

  
)
let mapeddatatable=employeeLogindata?.map((item, i) => {
      
  return   <div key={i} className="col-xl-3 col-lg-4 col-sm-6">
  <div className="card">
    <div className="card-body">
      <div className="card-use-box">
        <div className="crd-bx-img">
        {
        item?.display_profile_file ? (
          <img src={`${BASE}${item?.display_profile_file}`} className='rounded-circle' />
        ) : (
        <img src={Avatar} alt="Avatar" className='profileInfo-img profile-img' />
 ) }
        <div className={`active ${item?.id === "deactive" ? 'deactive' : ''}`}></div>
      </div>
      <div className="card__text p_t_10">
      <label className='profileInfo-employeeName' onClick={(e)=> openEmployeeInfo(item?._id)} style={{cursor:"pointer"}}>{`${item?.firstname} ${item?.lastname} `}</label>
        <p className='info-email'>{item?.email}</p>
      </div>
      <ul className="post-pos">
       <li>
          <span className="info-position-text">Position: </span>
          <span>{item?.designation}</span>
        </li>
        <li>
          <span className="info-position-text">User Role: </span>
          <span>{item?.user_role}</span>
        </li>
      </ul>
     <div
      className='d_f f_d_c_sm g_10'>
        <button type='primary' to="#" className="btn btn-primary me-2 btn-sm" onClick={(e)=> openEmployeeInfo(item?._id)}>View Profile</button>
        <button type='primary' to="#" className="btn btn-secondary me-2 btn-sm" onClick={(e) => handelEdit(item?._id)}>Edit Profile</button>
      </div>
    </div>
  </div>
</div>
</div>
}


)

  return (
    <div>
        <Drawer
        title="Add Employee"
        placement="right"
        closable={false}
        size='large'
        onClose={onClose}
        open={open}
        
        height={50}
        width={700}
      >
        <AddEmployee onClose={onClose} />
      </Drawer>
      <Drawer
        title="Edit Employee"
        placement="right"
        closable={false}
        size='large'
        onClose={onClose1}
        open={open1}
        
        height={50}
        width={700}
      >
        <EditEmployee onClose={onClose1} />
      </Drawer>
    <Tab.Container defaultActiveKey={'Grid'}>
    <label className='c_primary profileInfo_heading'>Employee</label>
        <div className='d_f g_20 j_c_s_b a_i_c'>
            <div
                className='d_f f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm p_t_5'>
                <Search className="input_search" allowClear placeholder="Search by Employee / ID" enterButton />
            </div>
            <div className='d_f a_i_c'>
            <Nav as="ul" className="nav nav-pills mix-chart-tab user-m-tabe" id="pills-tab">
            <Nav.Item as="li" className="nav-item" >
                                        <Nav.Link as="button" className="nav-link" eventKey={'Grid'}>
                                            {SVGICON.GridDots}										
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item" role="presentation">
                                        <Nav.Link as="button" className="nav-link" eventKey={'List'}>
                                            {SVGICON.List}
                                        </Nav.Link>
                                    </Nav.Item>
                                  
                                </Nav>
                <button type='primary' className='btn btn-primary btn-sm' onClick={showDrawer} >+ Add Employee</button>
            </div>
      </div>
      <Tab.Content>
                                <Tab.Pane  eventKey={'Grid'}>
                                      <div className="row">
          {mapeddata}
     </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey={'List'}>
                                     
                 <div
                  className='card'>
                     <div
                      className='card-body'>
                     <div className="table-responsive">
        <table className="table  card-table border-no success-tbl">
            <thead>
                <tr>
                <th>Employee ID</th>
                                        <th>Employee Name</th>
                                        <th>Email Address</th>
                                        <th>Contact Number</th>
                                        <th>Gender</th>
                                        <th>Location</th>
                                        <th>Status</th>

                    {/* <th>Description</th> */}
                
                </tr>
            </thead>
            <tbody>
                                    {employeeLogindata?.map((item, index)=>(
                                        <tr key={index}>
                                          
                                            <td><span>{item.employee_id}</span></td>
                                            <td>
                                                <div className="products">
                                                {item?.display_profile_file ? (
          <img src={`${BASE}${item?.display_profile_file}`} className='avatar avatar-md' width={20} height={20}  />
        ) : (
        <img src={Avatar} alt="Avatar" className='avatar avatar-md' />)
}
                                                    <div>
                                                        <h6><Link to={"#"}>{`${item.firstname} ${item?.lastname}`}</Link></h6>
                                                        <span>Web Designer</span>	
                                                    </div>	
                                                </div>
                                            </td>
                                            <td><Link to={"#"} className="text-primary">{item.email}</Link></td>
                                            <td>
                                                <span>{item.mobile||"-"}</span>
                                            </td>
                                            <td>
                                                <span>{item.gender||"-"}</span>
                                            </td>	
                                            <td>
                                                <span>{item.location||"-"}</span>
                                            </td>
                                            <td>
                                            <Dropdown className="task-dropdown-2">
                 <Dropdown.Toggle as="div" className={
                   item.status =="opened"? "Complete":
                   item.status =="closed"?
                   "Pending":
                   "Testing" 
                 }>{item.status =="opened"? "Opened":item.status =="closed"? "Closed":"Pending"}</Dropdown.Toggle>
                 <Dropdown.Menu className='task-drop-menu'>
                     <Dropdown.Item  onClick={()=>handleChangestatus(item._id,'opened')}>Onbording</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleChangestatus(item._id,'closed')}>Terminated</Dropdown.Item>
                     <Dropdown.Item onClick={()=>handleChangestatus(item._id,'Hold')}>Pending</Dropdown.Item>

                 </Dropdown.Menu>
             </Dropdown>	
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> 
        </table>
        <div className='d_f justify-content-end mt-3 mb-3'>
	
			</div>
    </div>    
                     </div>

                 </div>
                                </Tab.Pane>
                            </Tab.Content>
  
    </Tab.Container>
       
      {/* <div className='col_4 g_30 p_t_10'>
        {
            employeeLogindata?.map((item,i) => {
                return<>
                <div className='profile-card'>
                  {
                    item?.display_profile_file ? (
                      <img src={`${BASE}${item?.display_profile_file}`} className='profileInfo-displayPic' onClick={(e)=> openEmployeeInfo(item?._id)} />
                    ) : (
                    <img src={Avatar} alt="Avatar" className='profileInfo-img' onClick={(e)=> openEmployeeInfo(item?._id)} style={{cursor:"pointer"}} />
             ) }
                <div className='p_t_10'>  
                    <label className='profileInfo-employeeName' onClick={(e)=> openEmployeeInfo(item?._id)} style={{cursor:"pointer"}}>{`${item?.firstname} ${item?.lastname} `}</label>
                    <p className='profileInfo-designation-grey'>{item?.designation}</p>
                    <div className='p_t_5'>
                        <div className={`${item?.user_status =="onBoarding"?"onboarding-going":item?.user_status =="releived"?"releived-going":"terminated"}` }>
                        <p> {item?.user_status} </p>
                    </div>
                    </div>
                </div>
                <div className='profileInfo-moreIcon'>
                    <Dropdown overlay={<Menu>
                      <Menu.Item key="1" onClick={(e) => handelEdit(item?._id)}>Edit</Menu.Item>
                      <Menu.Item key="2">Delete</Menu.Item>
                      </Menu>} placement="bottomRight">
                    <MoreOutlined />
                    </Dropdown>
                </div>
                </div>
                </>
            })
        }
      </div> */}
     
    </div>
  )
}

export default InfoPage
