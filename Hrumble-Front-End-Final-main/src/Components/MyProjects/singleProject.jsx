import React, { useState, useCallback, useContext, useEffect } from 'react';
import {Row, Col, Card, Input, Space, Button, Modal, DatePicker, Table, Select, Tag,Drawer, Pagination} from 'antd';
import { BriefcaseBusiness, UsersRound , Info, Filter, Download, Pencil} from 'lucide-react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import RevenueCircularBar from './charts/RevenueCircularBar';
import HoursChart from './charts/HoursChart';
import RevenueProfit from './charts/RevenueVProfit';
import AddProjects from './Drawer/AddProjects';
import ClientInfo from './Drawer/ClientInfo';
import AssignEmployee from './Drawer/AssignEmployee';
import ProjectInfo from './Drawer/ProjectInfo';
import ClientContext from '../../Providers/ClientProvider';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import ProjectFilter from './Drawer/ProjectDetailFilter';






const {Search} = Input;


      

const SingleProjects=()=>{
     let params =useParams()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClientOpen, setIsClientOpen] = useState(false);
    const [isAssignEmployeeOpen, setIsAssignEmployeeOpen] = useState(false);
    const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(['All']);
    const {projectSingle, fetchClient, handleClickProjectTable, handleOpenEditDrawer, editDrawer, projects, handleClientTable,handleSelectChangeProject, handleEditProject, handleEditAssignedEmployee } = useContext(ClientContext);

    
     const projectDetails = projects.find((project) => project._id === params.id);
console.log('Hello:::',projectDetails)




const assignedEmployeeDetails = projectDetails?.assignedEmployees?.filter((employee) => {
  // If 'All' is selected, include all employees
  if (selectedFilters.includes('All')) {
    return true;
  }
  // Otherwise, filter by selected status
  return selectedFilters.includes(employee.status);
}).map((employee) => ({
  id: employee._id,
  projectId: params.id,
  name: employee.name,
  email: employee.employee_id.email,
  department: employee.employee_id.department,
  startDate: employee.duration.startDate,
  endDate: employee.duration.endDate,
  duration: employee.duration.days,
  userRole: employee.employee_id.user_role,
  status: employee.status,
  yearlyCTC: employee.employee_id.yearly_ctc,
})) || [];
console.log(assignedEmployeeDetails);

const ongoing = assignedEmployeeDetails.map(project => ({
  key: project.id, 
  projectId:project.projectId,
  employee_name: project.name,
  startdate: moment(project.startDate).format('DD-MMM-YYYY'),
  enddate: moment(project.endDate).format('DD-MMM-YYYY'),
  duration: project.duration || 'N/A',
  salary: project.yearlyCTC || 0,
  client_billing: project.profit || 0,
  status: project.status,
  action: <Pencil size={18} color='red' />, 
}));

const workingEmployees = assignedEmployeeDetails.filter(employee => employee.status === "Working");
const countWorkingEmployees = workingEmployees.length;

console.log("Number of working employees:", countWorkingEmployees);

const toggleFilterDrawer = () => {
  setIsFilterDrawerOpen(!isFilterDrawerOpen);
};

const handleFilterChange = (filters) => {
  setSelectedFilters(filters);
};

useEffect(() => {
        handleClickProjectTable(params?.id, true);
        handleClientTable(params?.id, true);
      }, []);


    const onSearch = (value,_e, info) => console.log(info?.source, value);
    const showClient =()=>{
        setIsClientOpen(true);
    };
    const clientCancel = () => {
      setIsClientOpen(false);
    };
    const showProject =()=>{
      setIsProjectInfoOpen(true);
  };
  const projectCancel = () => {
    setIsProjectInfoOpen(false);
  };
    const showEmployee =()=>{
      setIsAssignEmployeeOpen(true);
  };
  const EmployeeCancel = () => {
    setIsAssignEmployeeOpen(false);
  };
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
      // Handle form submission from AddProjects
      const handleFormSubmit = (values) => {
        console.log('Form submitted:', values);
        // Add your API call or data processing here
        setIsModalOpen(false); // Close modal after successful submission
      }


      const column1= [
        {
          title: 'Employee Name',
          dataIndex: 'employee_name',
          key: 'employee_name',
          sorter: (a, b) => a.employee_name.localeCompare(b.employee_name),

        },
        {
          title: 'Start Date',
          dataIndex: 'startdate',
          key: 'startdate',

        },
        {
          title: 'End Date',
          dataIndex: 'enddate',
          key: 'enddate',

        },
        {
          title: 'Duration',
          dataIndex: 'duration',
          key: 'duration',

        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          key: 'salary',
          render: (text) => `₹ ${text}`,

        },
        {
          title: 'Client Billing',
          dataIndex: 'client_billing',
          key: 'client_billing',
          render: (text) => `₹ ${text}`,

        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status, record) => {
            const styles = {
              Working: {
                backgroundColor: '#d4edda', 
                color: '#155724', 
                border: '1px solid #155724',
                padding: '5px 10px',
                borderRadius: '50px',
                fontSize: '12px', // Adjust font size for 'lg'
                display: 'inline-block',
                textAlign: 'center',
                
              },
              Relieved: {
                backgroundColor: '#FFFBE6', 
                color: '#FAAD14',
                border: '1px solid #FAAD14',
                padding: '5px 10px',
                borderRadius: '50px',
                fontSize: '12px', 
                display: 'inline-block',
                textAlign: 'center',
                borderRadius: '50px',

              },
              Terminated: {
                backgroundColor: '#f8d7da', // Light red background
                color: '#dc3545', // Red text
                border: '1px solid #dc3545', // Red border
                padding: '5px 10px',
                borderRadius: '50px',
                fontSize: '12px', // Adjust font size for 'lg'
                display: 'inline-block',
                textAlign: 'center',
              },
              Default: {
                backgroundColor: '#e2e3e5', // Light gray background
                color: '#383d41', // Dark gray text
                padding: '10px 15px',
                borderRadius: '5px',
                fontSize: '16px', // Adjust font size for 'lg'
                display: 'inline-block',
                textAlign: 'center',
              },
            };
          
            return (
              <Dropdown className="">
                <Dropdown.Toggle as="div" style={styles[status] || styles.Default}>
                  {status === "Working" ? "Working" : status === "Relieved" ? "Relieved" : status === "Terminated" ? "Terminated" : "Unknown"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="">
                  <Dropdown.Item
                    onClick={() => handleEditAssignedEmployee({
                      projectId: record.projectId,
                      employeeId: record.key,
                      status: 'Working',
                    })}
                  >
                    Working
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleEditAssignedEmployee({
                      projectId: record.projectId,
                      employeeId: record.key,
                      status: 'Relieved',
                    })}
                  >
                    Relieved
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleEditAssignedEmployee({
                      projectId: record.projectId,
                      employeeId: record.key,
                      status: 'Terminated',
                    })}
                  >
                    Terminated
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            );
          }
          
        },
        
        
        {
          title: '',
          dataIndex: 'action',
          width:50,
          key: 'action',
        },
      ]

    return(
        <>
     
         <h4>{projectDetails?.client_id?.name} / {projectDetails?.project_name}</h4>
          <Row gutter={2}>
            <Col span={6} xs={16} sm={16} md={6} lg={6} xl={6} xxl={6} >
            <Search
                placeholder="Search Projects"
                onSearch={onSearch}
                style={{
                     width: "auto",
                     marginBottom:"12px",
                    }}
            />

            </Col>
            <Col span={3} xs={2} sm={2} md={2} lg={3} xl={3} xxl={3}>
                <Button style={{backgroundColor:"var(--primary)", color:"white",height:"30px", width:"auto"}} onClick={showEmployee}>+ Assign Employees</Button>

            </Col>
            <Col flex="auto"></Col>
            <Col span={3} xs={2} sm={2} md={2} lg={3} xl={3} xxl={3} align='end'>
                <Info onClick={showProject} />

            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6} xs={24} sm={24} md={3} lg={6} xl={6}>
                    <Card  style={{width: "auto", height:" 150px", marginBottom:"12px"}}>
                        <Row justify="space-between" align="top">
                                <Col span={16}>
                                <h4 style={{padding:"10px", fontSize:"14px", fontWeight:"500"}}>Employees Worked</h4>
                                </Col >
                                <Col span={4} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '10px' , borderRadius:"10px", marginTop:"10px", marginRight:"10px"}}>
                                         <BriefcaseBusiness style={{color:"var(--primary)"}}/>
                                </Col>
                                

                        </Row>
                        
                        <h1 style={{marginTop:"50px", marginLeft:"20px", marginBottom:"100px"}}>{assignedEmployeeDetails.length.toString().padStart(2, '0')}</h1>
                    </Card>
            </Col>
            <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
            <Card  style={{width: "auto", height:" 150px", marginBottom:"12px"}}>
                        <Row justify="space-between" align="top">
                                <Col span={16}>
                                <h4 style={{padding:"10px", fontSize:"14px", fontWeight:"500"}}>Active Employees</h4>
                                </Col >
                                <Col span={4} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '10px' , borderRadius:"10px", marginTop:"10px", marginRight:"10px"}}>
                                         <UsersRound  style={{color:"var(--primary)"}}/>
                                </Col>
                                

                        </Row>
                        
                        <h1 style={{marginTop:"50px", marginLeft:"20px", marginBottom:"100px"}}>{countWorkingEmployees.toString().padStart(2, '0')}</h1>
                    </Card>
            </Col>
            <Col span={12} xs={24} sm={24} md={6} lg={12} xl={12}>
                    <Card style={{width: "auto", height:" 150px", marginBottom:"12px"}}>
                      <Row justify="space-between" align="top">
                      <Col span={16}>
                                <h4 style={{padding:"10px", fontSize:"14px", fontWeight:"500"}}>Total Revenue Vs Profit</h4>
                                </Col >
                      </Row>
                      <Row >
                        <Col>
                        <RevenueCircularBar chartheight={120}  />
                        </Col>
                      </Row>
                    </Card>
            </Col>
          </Row>
          
          <Card style={{ width: "auto", height: "50px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <Row justify="space-between" style={{ width: "100%" }}>
    <Col span={24}>
      <h3 style={{ display: 'flex', justifyContent: 'space-evenly', marginTop:'15px' }}>
        <span style={{ margin: '0 40px' }}>Start Date: <strong>{moment(projectDetails?.startDate).format('DD MMM, YYYY')}</strong></span>
        <span style={{ margin: '0 40px' }}>End Date: <strong>{moment(projectDetails?.endDate).format('DD MMM, YYYY')}</strong></span>
        <span style={{ margin: '0 40px' }}>Duration: <strong>{projectDetails?.duration} days</strong></span>
        <span style={{ margin: '0 40px' }}>Remaining: <strong>{Math.max(moment(projectDetails?.endDate).diff(moment(), 'days'), 0)} days</strong></span>
        <span style={{ margin: '0 40px' }}>Status: <Tag style={{borderRadius:'10px'}} color={projectDetails?.status === 'Ongoing' ? 'warning' : 'success'}>
            {projectDetails?.status}
          </Tag></span>
      </h3>
    </Col>
  </Row>
</Card>

          
          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card style={{width:"auto", height:"auto", marginBottom:"12px"}}>
            <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
    <h4 style={{ margin: "10px" }}>{countWorkingEmployees} Active Employees</h4>
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginRight:"30px"}}>
    <Filter size={18} onClick={toggleFilterDrawer}/>
        <Download size={18}/>
    </div>
</Row>

                        <Row>
                          <Col span={24}>
                          <Table
  scroll={{ y: 250 }}
  dataSource={ongoing}
  columns={column1}
  pagination={false} // Disable default pagination
  className="custom-table"
  footer={() => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <Pagination
        total={ongoing.length}
        pageSize={10}
        showSizeChanger
        pageSizeOptions={['10', '20']}
        size='small'
        onChange={(page, pageSize) => {
          // Handle page change here
          console.log('Page:', page, 'PageSize:', pageSize);
        }}
      />
    </div>
  )}
/>
       <Drawer
        title="Filter Projects"
        placement="right"
        onClose={toggleFilterDrawer}
        visible={isFilterDrawerOpen}
        width={430} // Adjust the width as needed
      >
        <ProjectFilter onFilterChange={handleFilterChange} onClose={toggleFilterDrawer}/>
      </Drawer>
                          </Col>
                        </Row>
            </Card>
            </Col>
          </Row>
               
          
      <Modal
        title="Assign Employee"
        open={isAssignEmployeeOpen}
        onCancel={EmployeeCancel}
        width={1000} // Adjust width as needed
        footer={null} // Remove default footer since form has its own buttons
      >
        <AssignEmployee projectDetails={projectDetails} />
      </Modal>
      <Modal
        title="Project Info"
        open={isProjectInfoOpen}
        onCancel={projectCancel}
    
        width={600} 
        footer={null} 
        
      >
        <ProjectInfo projectDetails={projectDetails} />
      </Modal>

       

        </>
    );
}

export default SingleProjects;