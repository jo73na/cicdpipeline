import { useContext,useEffect,lazy } from 'react';

import Loader from '../../Utils/Loader';
import CookieUtil from '../../Utils/Cookies';

import icon1 from "/images/Stopwatch.svg";
import icon2 from "/images/Stopwatchblue.svg"
const GraphDashboard = lazy(() => import("./GraphDashboard"));
const Interview = lazy(() => import("./Interview"));

const ClientBarChart = lazy(() => import("./ClientBarChart"));
import DashboardContext from '../../Providers/DashboardProvider';

// import TimeSheetHr from './TimeSheetHr';
import EmployeeTimeTracker from './Timer';

import {  Modal,Progress} from 'antd';


import Items from "/images/items.png"
const EmployeeDashboard = lazy(() => import("./EmployeeDashboard"));
import {DollarOutlined,TrophyOutlined,HomeOutlined, UserSwitchOutlined, FireOutlined,HeatMapOutlined,RiseOutlined,SlackOutlined,ContactsOutlined } from '@ant-design/icons';
import Addmanualy from './Addmanualy';
import { Card, Col, Nav, ProgressBar, Row, Tab } from 'react-bootstrap';
import AnalyticsEarning from '../UtlilsComponent/Anlaytics';
import { SalesandMarketting } from './SalesandMargetting';
import ProjectOverviewChart from '../UtlilsComponent/ProjectOveviewTab';
import InvoiceExpenceChart from './InvoiceExpenceChart';
import GoalCard from '../../Utils/GoalCard';
// import { GoalContext } from '../../Providers/Goal/GoalProvider';




const Employee=()=>{
//  const {Loading} = useContext(JobContext);
const {count,handleClickmanualy,handleCancel,clientSubmissionCount,Opengoal,goal,fetchDashboard,Loading,handleDateChange,monthemployee,handledatabaseChange,weekSubmission} =useContext(DashboardContext)
let role =CookieUtil.get("role")


 let data = JSON.parse(CookieUtil.get('admin'));
//  console.log("name",name)

// Get the current date
const currentDate = new Date();

// Find the start date of the current week (Sunday)
const startDate = new Date(currentDate);
startDate.setDate(currentDate.getDate() - currentDate.getDay());

// Find the end date of the current week (Saturday)
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 6);

 // Format the dates in the desired format
const startDateStr = `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'short' })}`;
const endDateStr = `${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'short' })}`;

// Create the date range string
const dateRange = `${startDateStr} - ${endDateStr}`;




// Get the current date
const currentDate1 = new Date();

// Get the first day of the current month
const firstDayOfMonth = new Date(currentDate1.getFullYear(), currentDate1.getMonth(), 1);

// Get the last day of the current month
const lastDayOfMonth = new Date(currentDate1.getFullYear(), currentDate.getMonth() + 1, 0);

// Format the dates in the desired format
const startDateStr1 = `${firstDayOfMonth.toLocaleString('default', { month: 'short' })} ${firstDayOfMonth.getFullYear()}`;
const endDateStr1 = `${lastDayOfMonth.toLocaleString('default', { month: 'short' })} ${lastDayOfMonth.getFullYear()}`;

// Create the date range string
const dateRange1 = `${startDateStr1}`;


  const option=[
   {
      label:"This Week",
      value:"Week"
  },
  {
   label:" This Month",
   value:"Month"
},
{
   label:"This Year",
   value:"Year"
}
]

useEffect(() => {
   fetchDashboard()
}, [])


function calculatePercentage(part, total) {
   return (part / total) * 100;
}


const  color =["primary","secondary","info", "danger","success"]

//  const color = ["#ffb800","#42cdff","#52fb6a","#f555ff","#FF6600" ]
 const backround = ["#ffeec3","#d1f3ff","#ceffd5","#fccaff","#ffeec3"]
 const icon =[
   <UserSwitchOutlined/>,
   <TrophyOutlined />,
   // <HomeOutlined />,
   <DollarOutlined />,
   // <ContactsOutlined />,
   <RiseOutlined/>,
    <SlackOutlined />,

 ]


 const iconBoxCard = [
  {icon:'fa-solid fa-person', bg:'success', number:count?.totalCandidates||0, title:'Total Candidates'},
  {icon:'fa-solid fa-briefcase', bg:'primary', number:count?.totalCompany||0, title:'Total Company'},
  {icon:'fa-solid fa-users ', bg:'secondary', number:count?.totalConatcs||0, title:'Total Contacts '},
  // {icon:'fa-solid fa-hand-holding-dollar', bg:'danger', number:'$1500', title:'Total Sales'},
];

   
    return( 
     <>
     
     {
        Loading ? <Loader />

     :
     <>

      <p className='heading_text' style={{paddingBottom:'15px', paddingLeft:'3px', paddingTop:'10px'}}>  {role === "SuperAdmin"?" Admin Dashboard":"Dashboard"} </p>

      {
         role  == "Employee" ?
         // <EmployeeHoursTracker/>
          <EmployeeDashboard/>
          
          // <p> Welcome to Employee Dashboard</p>

        
         :
     

         <div>
           
      
      {
         role === "SuperAdmin" ?
         <>
             <div className='container-fluid' style={{marginLeft: '-10px'}}>
               <div className='row mt-1'>
               {iconBoxCard.map((item, index)=>(
                            <div className="col-xl-3 col-sm-6" key={index}>
                                <div className="card box-hover">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className={`icon-box icon-box-lg bg-${item.bg}-light rounded`}>
                                                <i className={`${item.icon} text-${item.bg}`}></i>
                                            </div>
                                            <div className="total-projects ms-3">
                                                <h3 className={`text-${item.bg} count mb-2`}>{item.number}</h3> 
                                                <span>{item.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

               </div>
           
          
            <div className='col_1  g_10 col_1_sm g_5_sm col_1_md'>
         <div className='card p_10'>

            
         <GraphDashboard  options={option}/>
         </div>
     
      <div className='card p_10'>
         <ClientBarChart  options={option} />
      </div>

      <div className='card p_10'>
         <InvoiceExpenceChart  options={option} />
      </div>
      </div>

             </div>
     
        
       

      
         </>
         :
         role == "Sales" ?
         <SalesandMarketting/> :
      <>
      
      <div className="row">  
      <div className="col-xl-4">
           <div className='row'>
              {/* <div className='col-xl-12'>
              <div className="card upgrade">
          
          <div className="card-body">
              <div className="text-center">
                  <img src={Items} alt="" />
              </div>
              <h4>Hii {data.name} Welcome to Your Dashboard</h4>

          </div>
      </div>
              </div> */}
          
       <EmployeeTimeTracker/>

           </div>
       
     </div> 
     <div className="col-xl-8">
  <div className={`col_${goal?.senddata?.length > 2 ? "3" : goal?.senddata?.length === 2 ? "2" : "1"} g_5`}>
    {
      goal?.senddata?.map((item, i) => {
        return (
          <div className="card" style={{ height: "350px" }} key={i}>
            <div className="card-body text-center">
            <GoalCard
                chartdata={[{
                  x: item.goaltype_name, // Label for the x-axis
                  y: item.count, // Actual value for the chart
                  goals: [{ name: 'Target', value: item.target }] // Target value for comparison
                }]}
                goals={[item.goaltype_name]} // Goal name for the Y-axis
              />

            </div>
          </div>
        );
      })
    }
  </div>
</div>


   

  {/* <div
   className="col_3">
  <div className="card">
                  <div className="card-header border-0 pb-0">
                    <div className="clearfix">
                      <h3 className="card-title">Blood pressure</h3>
                      <span>In the normal</span>
                    </div>
                    <div className="clearfix text-center">
                      <h3 className="text-primary mb-0">120/89</h3>
                      <span>mmHG</span>
                    </div>
                  </div>
                  <div className="card-body text-center">
                  <Progress
      percent={50}
      status="active"
      strokeColor={{
        from: '#108ee9',
        to: '#87d068',
      }}
    />
                    <GoalCard/>
                  </div>
                </div>
              
  </div> */}
 <div className="col-xl-4">
 <div className="row">
     <div className="col-xl-12">
     <Interview/>
         
     </div>
     <div className="col-xl-12">
         {/* <AllProjectBlog /> */}
     </div>
 </div>
</div>
<div className='card p_10'>
<ClientBarChart  options={option} login={true} />
         
      </div>
    
           
      <div className='col-xl-12'>
                  <div className='row'>
                  <div className="col-xl-12">
                  <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
               <Row>
                 <Col xl="12">
                     <Card name="accordion-one" className="dz-card">
                         <Tab.Container defaultActiveKey="Preview">
                           <Card.Header className="card-header flex-wrap border-0">
                               <div>
             <h4 className="heading mb-0">Performance</h4>                

                                 {/* <Card.Title>Default Accordion</Card.Title>
                                 <Card.Text className="m-0 subtitle">
                                   Default accordion. Add <code>accordion</code> class in root
                                 </Card.Text> */}
                               </div> 
                               <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                                   <Nav.Item as="li" className="nav-item" role="presentation">
                                     <Nav.Link as="button"  type="button" eventKey="Preview">My Activity</Nav.Link>
                                   </Nav.Item>
                                   <Nav.Item as="li" className="nav-item" >
                                     <Nav.Link as="button"  type="button" eventKey="Code">Team Activity</Nav.Link>
                                   </Nav.Item>
                               </Nav>
                           </Card.Header>
                           <Tab.Content className="tab-content" id="myTabContent">
                             <Tab.Pane eventKey="Preview">
                                     <ProjectOverviewChart height={300}/>
                                    
                             </Tab.Pane>
                             <Tab.Pane eventKey="Code">
             <h4 className="heading mb-0 p-2 text-primary"> Client Submissions</h4>                

     { !Loading  &&
     
      <AnalyticsEarning ClientSubmissionCount={clientSubmissionCount}/>
      }

                                  {/* <h1>Hii Sathish</h1> */}
                             </Tab.Pane>
                           </Tab.Content>    
                         </Tab.Container>  
                     </Card>
                 </Col>
                    
             
               </Row>{" "}                     
             </div>  
                                 </div>
                    
             </div>
             </div>
   </div>
         
       {/* <TimeSheetHr/> */}
      </>
         
       
      } 
  
  
         </div>
       
      }


       </>
      
   }  
   <Modal
    title="Add Manualy Goal"
    open={Opengoal}  onCancel={handleCancel}
    okButtonProps={{ style: { display: 'none' } }}
    cancelButtonProps={{ style: { display: 'none' } }}
    
    >
     <Addmanualy/>
       
    </Modal>
        
        
        </>
    )
}


export default Employee;