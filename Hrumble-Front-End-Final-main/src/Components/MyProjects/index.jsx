import React, { useState, useCallback, useContext, useEffect } from 'react';
import {Row, Col, Card, Input, Space, Button, Modal, DatePicker, Table, Select, Drawer, Pagination} from 'antd';
import { BriefcaseBusiness, UsersRound , Info, Filter, Download, Pencil, File, UserRoundPlus} from 'lucide-react';
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
import ProjectFilter from './Drawer/ProjectFilter';
import { Dropdown } from 'react-bootstrap';


const BASE = import.meta.env.VITE_BASE;


const {Search} = Input;

const MyProjects=()=>{
     let params =useParams()
     const [statusData, setStatusData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClientOpen, setIsClientOpen] = useState(false);
    const [isAssignEmployeeOpen, setIsAssignEmployeeOpen] = useState(false);
    const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [ispdfModalOpen, setIspdfModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(['All']);
    const {projectSingle, fetchClient, handleClickProjectTable, handleOpenEditDrawer, editDrawer, projects, handleClientTable,handleSelectChangeProject, handleEditProject } = useContext(ClientContext);

console.log('projectSingle:::',projectSingle)
console.log('project:::',projects)

const handleSelectChange = (value, key) => {
  const updatedData = statusData.map((record) =>
    record.key === key ? { ...record, status: value } : record
  );
  setStatusData(updatedData);
};

const toggleFilterDrawer = () => {
  setIsFilterDrawerOpen(!isFilterDrawerOpen);
};
const filteredProjects = projects.filter(project => {
  // First, check if the project matches the client_id
  const matchesClientId = project.client_id?._id === projectSingle?._id;

  // Then, check the selected filters
  const matchesFilters = selectedFilters.includes('All') || 
                        (selectedFilters.includes('ongoing') && project.status === 'Ongoing') || 
                        (selectedFilters.includes('completed') && project.status === 'Completed');

  // Return true only if both conditions are met
  return matchesClientId && matchesFilters;
});


const ongoing = filteredProjects.map(project => {
  
  const workingEmployeesCount = project.assignedEmployees.filter(employee => employee.status === "Working").length;

  return {
    key: project._id,
    project_name: project.project_name,
    startdate: moment(project.startDate).format('DD-MMM-YYYY'),
    enddate: moment(project.endDate).format('DD-MMM-YYYY'),
    duration: project.duration || 'N/A',
    revenue: project.revenue || 0,
    profit: project.profit || 0,
    status: project.status,
    activeEmployee: workingEmployeesCount, 
    sow: project.sow, 
    action: (
      <div style={{ display: 'flex', gap: '10px' }}>
        <File size={18} color="red" onClick={() => showpdfModal(project.sow)} />
        <UserRoundPlus size={18} color="red" onClick={() => openAssignEmployeeModal(project)} />
      </div>
    ),
  };
});

useEffect(() => {
  console.log("Params:", params);
  console.log("Effect Triggered!");

  if (params?.id) {
    console.log("Fetching data for:", params.id);
    handleClickProjectTable(params.id, true);
    handleClientTable();
  }
}, [params]);




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
        setIspdfModalOpen(false);
        
      };

      const showpdfModal = (sow) => {
        setPdfUrl(sow); // Set the PDF file URL from the project data
        setIspdfModalOpen(true); // Open the modal
      };
      
    
      // Handle form submission from AddProjects
      const handleFormSubmit = (values) => {
        console.log('Form submitted:', values);
        // Add your API call or data processing here
        setIsModalOpen(false); // Close modal after successful submission
      }

      const openAssignEmployeeModal = (project) => {
        setSelectedProject(project);
        setIsAssignEmployeeModalOpen(true);
      };
      
      const closeAssignEmployeeModal = () => {
        setSelectedProject(null);
        setIsAssignEmployeeModalOpen(false);
      };

      const handleFilterChange = (filters) => {
        setSelectedFilters(filters);
      };

      const column1= [
        {
          title: 'Project Name',
          dataIndex: 'project_name',
          key: 'project_name',
          sorter: (a, b) => a.project_name.localeCompare(b.project_name),
          render: (text, record) => (
            <Link to={`/singleproject/${record.key}`}>{text}</Link> // Dynamically link to each project
          ),

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
          title: 'Revenue',
          dataIndex: 'revenue',
          key: 'revenue',

        },
        {
          title: 'Profit',
          dataIndex: 'profit',
          key: 'profit',

        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (text, record) => {
            const styles = {
              Completed: {
                backgroundColor: '#d4edda', 
                color: '#155724', 
                border: '1px solid #155724',
                padding: '5px 10px',
                borderRadius: '50px',
                fontSize: '10px', // Adjust font size for 'lg'
                display: 'inline-block',
                textAlign: 'center',
              },
              Ongoing: {
                backgroundColor: '#FFFBE6', 
                color: '#FAAD14',
                border: '1px solid #FAAD14',
                padding: '5px 10px',
                borderRadius: '50px',
                fontSize: '10px', 
                display: 'inline-block',
                textAlign: 'center',
              },
              Default: {
                backgroundColor: '#e2e3e5', // Light gray background
                color: '#383d41', // Dark gray text
                border: '1px solid #383d41', // Border color same as text
                padding: '10px 15px',
                borderRadius: '5px',
                fontSize: '16px', // Adjust font size for 'lg'
                display: 'inline-block',
                textAlign: 'center',
              },
            };
        
            return (
              <Dropdown className="">
                <Dropdown.Toggle as="div" style={styles[record.status] || styles.Default}>
                  {record.status === 'Completed' ? 'Completed' : record.status === 'Ongoing' ? 'Ongoing' : 'Unknown'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="">
                  <Dropdown.Item
                    onClick={() => handleSelectChangeProject('Ongoing', record)} // Set status to Ongoing
                  >
                    Ongoing
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleSelectChangeProject('Completed', record)} // Set status to Completed
                  >
                    Completed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            );
          }
        },
        
        {
          title: 'Active Employees',
          dataIndex: 'activeEmployee',
          key: 'activeEmployee',

        },
        {
          title: '',
          dataIndex: 'action',
          width:70,
          key: 'action',
        },
      ]

      //Project Summary Table

      const clientId = params.id; 

      const mappedData = projects
        .filter(project => project.client_id?._id === clientId) 
        .flatMap(project =>
          project.assignedEmployees.map(employee => ({
            name: employee.name,
            project: project.project_name,
            twh: '', 
            logged: '' 
          }))
        );

      console.log("MappedData::", mappedData)
      
      // Use `mappedData` as the data source for the Ant Design Table
      const columns = [
        {
          title: 'EmployeeName',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'Project',
          dataIndex: 'project',
          key: 'project',
          sorter: (a, b) => a.project.localeCompare(b.project),
        },
        {
          title: 'Total Working Hours',
          dataIndex: 'twh',
          key: 'twh',
        },
        {
          title: 'Hours Logged',
          dataIndex: 'logged',
          key: 'logged',
        },
      ];

    return(
        <>
     
         <h4>{projectSingle.name}</h4>
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
                <Button style={{backgroundColor:"var(--primary)", color:"white",height:"30px", width:"auto"}} onClick={showModal}>Add Project</Button>
            </Col>
             <Col flex="auto"></Col>
                        <Col span={3} xs={2} sm={2} md={2} lg={3} xl={3} xxl={3} align='end'>
                        <Info  onClick={(e) => handleOpenEditDrawer(projectSingle?._id)}/>
                        </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6} xs={24} sm={24} md={3} lg={6} xl={6}>
                    <Card  style={{width: "auto", height:" 150px", marginBottom:"12px"}}>
                        <Row justify="space-between" align="top">
                                <Col span={16}>
                                <h4 style={{padding:"10px", fontSize:"14px", fontWeight:"500"}}>Ongoing Projects</h4>
                                </Col >
                                <Col span={4} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '10px' , borderRadius:"10px", marginTop:"10px", marginRight:"10px"}}>
                                         <BriefcaseBusiness style={{color:"var(--primary)"}}/>
                                </Col>
                                

                        </Row>
                        
                        <h1 style={{marginTop:"50px", marginLeft:"20px", marginBottom:"100px"}}>{filteredProjects?.length.toString().padStart(2, '0')}</h1>
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
                        
                        <h1 style={{marginTop:"50px", marginLeft:"20px", marginBottom:"100px"}}>{mappedData?.length.toString().padStart(2, '0')}</h1>
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
          <Row gutter={8}>
            <Col span={12} xs={24} sm={24} md={6} lg={12} xl={12}>
                    <Card style={{width:"auto", height:"280px", marginBottom:"12px"}}>
                    <h4 style={{padding:"10px", fontSize:"14px", fontWeight:"500"}}>Hours Logged (HH:MM)</h4>
                    <HoursChart/>
                    </Card>
            </Col>
            <Col span={12} xs={24} sm={24} md={6} lg={12} xl={12}>
                    <Card style={{width:"auto", height:"280px", marginBottom:"12px"}}>
                    <h4 style={{padding:"10px", fontSize:"14px", fontWeight:"500"}}>Revenue vs Profit</h4>
                    
                    <RevenueProfit/>
                    </Card>
            </Col>


          </Row>
          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card style={{width:"auto", height:"400px", marginBottom:"12px"}}>
            <Row justify="end" align="top">
                    <h4 style={{margin: "10px",marginRight:"600px"}}>Project Summary</h4>
                   
                                <Col span={4}>
                                <DatePicker.MonthPicker >
                                </DatePicker.MonthPicker>
                                </Col >
                                <Col span={2}>
                                     <h5 style={{margin:"10px"}}>View All</h5>   
                                </Col>
                        </Row> 
                        <Row gutter={4} style={{marginTop:"25px"}}>
                          <Col span={16}>
                              <Table  scroll={{ y: 250 }} dataSource={mappedData} columns={columns } className='custom-table'
                              footer={() => (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0px' }}>
                                  <Pagination
                                    total={mappedData.length}
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
                              )}/>
                          </Col>
                          <Col span={8}>
                          <h3 style={{fontSize:"25px", marginLeft:"140px"}}>880</h3>
                          <h6 style={{fontSize:"10px", marginLeft:"70px"}}>WorkingHours Logged This Month</h6>
                                  <RevenueCircularBar chartheight={200}/>
                                  <h4 style={{marginLeft:"45px"}}>Total Revenue:1,00,000</h4>
                                  <h4 style={{marginLeft:"45px"}}>Total Revenue:85,000</h4>
                          </Col>
                        </Row>
            </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card style={{width:"auto", height:"auto", marginBottom:"12px"}}>
          <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
              <h4 style={{ margin: "10px" }}>Ongoing Projects</h4>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginRight:"20px"}}>
              <Filter size={18} onClick={toggleFilterDrawer}/>
                  <Download size={18}/>
              </div>
          </Row>
                        <Row>
                          <Col span={24}>
                          <Table scroll={{y:250}}dataSource={ongoing

                          } columns={column1}  pagination={false} className='custom-table' footer={() => (
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
                            )}/>
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
        title="Add New Project"
        open={isModalOpen}
        onCancel={handleCancel}
        width={700} // Adjust width as needed
        footer={null} // Remove default footer since form has its own buttons
      >
        <AddProjects onSubmitSuccess={handleFormSubmit} projectSingle={projectSingle}/>
      </Modal>
      <Modal
        title="Client Info"
        onCancel={()=>handleOpenEditDrawer(false)}
        width={700} // Adjust width as needed
        footer={null} // Remove default footer since form has its own buttons
        open={editDrawer}
      >
        <ClientInfo projectSingle={projectSingle} />
      </Modal>
      <Modal
        title="Assign Employee"
        open={isAssignEmployeeOpen}
        onCancel={EmployeeCancel}
        width={700} // Adjust width as needed
        footer={null} // Remove default footer since form has its own buttons
      >
        <AssignEmployee  />
      </Modal>
      <Modal
        title="Project Info"
        open={isProjectInfoOpen}
        onCancel={projectCancel}
        width={600} // Adjust width as needed
        footer={null} // Remove default footer since form has its own buttons
      >
        <ProjectInfo  />
      </Modal>
      <Modal
      title="Project SOW Document"
      visible={ispdfModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <iframe 
        src={`${BASE}${pdfUrl}`} // Embed the PDF using the stored URL
        width="100%" 
        height="500px" 
        title="SOW Document"
      />
    </Modal>
    <Modal
      title="Assign Employees"
      open={isAssignEmployeeModalOpen}
      onCancel={closeAssignEmployeeModal}
      footer={null}
      width={700}
    >
      {selectedProject && <AssignEmployee projectDetails={selectedProject} />}
    </Modal>

       

        </>
    );
}

export default MyProjects;