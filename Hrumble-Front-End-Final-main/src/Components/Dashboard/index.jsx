import { useContext,useEffect,lazy, useState } from 'react';
 
import Loader from '../../Utils/Loader';
import CookieUtil from '../../Utils/Cookies';
const GraphDashboard = lazy(() => import("./GraphDashboard"));
// const Interview = lazy(() => import("./Interview"));
 
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
import  GoalContext  from '../../Providers/Goal/GoalProvider';
 
import {Link} from 'react-router-dom';
// import loadable from "@loadable/component";
// import pMinDelay from "p-min-delay";
import RevenueChart from "./Element/RevenueChart";
import EarningChart from "./Element/EarningChart";
import ExpensesBarChart from './Element/ExpenseChart';
import ProjectOverviewTab from './Element/ProjectOverViewTab';
import UpcomingBlog from './Element/UpcomingBlog';
import CalenderData from './Element/CalenderData'
import ThemeContext from '../../Providers/Theme/index'
import SubmissionChart from "./Element/ClientSubmissionChart";
import OnboardingChart from "./Element/OnboardingChart";

 
 
 
 
const Employee=()=>{
//  const {Loading} = useContext(JobContext);
 
const {count,handleClickmanualy,handleCancel,clientSubmissionCount,Opengoal,goal,fetchDashboard,Loading,handleDateChange,monthemployee,handledatabaseChange,weekSubmission,invoicechart} =useContext(DashboardContext)
let role =CookieUtil.get("role")
const [formattedDate, setFormattedDate] = useState('');
 
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
 
const PrimaryCol =  "#88a67e";
const SecondaryCol = "#F8B940";
const Head1 = " ClientSubmission";
const Head2 = "Onboarding";
const Head3= "Total Earnings";
 
// Get the current date
const currentDate1 = new Date();
 
// Get the first day of the current month
const firstDayOfMonth = new Date(currentDate1.getFullYear(), currentDate1.getMonth(), 1);
 
// Get the last day of the current month
const lastDayOfMonth = new Date(currentDate1.getFullYear(), currentDate.getMonth() + 1, 0);
 
// Format the dates in the desired format
const startDateStr1 = `${firstDayOfMonth.toLocaleString('default', { month: 'short' })} ${firstDayOfMonth.getFullYear()}`;
 
const handleFormattedDate = (date) => {
  setFormattedDate(date);
};
 
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
 
 
 
const datacount1 = Array.isArray(invoicechart?.data1)
  ? invoicechart.data1.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0)
  : 0;

const datacount2 = Array.isArray(invoicechart?.data2)
  ? invoicechart.data2.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0)
  : 0;

// Calculate total data count
const totalDataCount = (Array.isArray(invoicechart?.data1) && Array.isArray(invoicechart?.data2)) 
    ? invoicechart.data1.map((value, index) => value - (invoicechart.data2[index] || 0))
    : [];

    const totalEarnings = Array.isArray(totalDataCount)
    ? totalDataCount.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0)
    : 0;
    
    return(
      <>
      {
          Loading ? <Loader />
          :
          <>
              <p className='heading_text' style={{ paddingBottom: '15px', paddingLeft: '3px', paddingTop: '10px' }}>
                  {role === "SuperAdmin" ? "Admin Dashboard" : "Dashboard"}
              </p>
              {
                  role === "Vendor" ? (
                    <div className="container-fluid">
                   
                    {/* <Row className="mb-4">
                        <Col xl={4} md={6} sm={12}>
                            <Card className="text-center upgrade">
                                <Card.Body>
                                    <div className="text-center">
                                        <img src={Items} alt="Welcome" style={{ width: '80px', height: '80px' }} />
                                    </div>
                                    <h4 className="mt-3">Hii, Welcome to Your Dashboard</h4>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4} md={6} sm={12}>
                            <Card className="text-center">
                                <Card.Body style={{ padding: '0' }}>
                                    <h4>Calendar</h4>
                                    <div style={{ height: '400px', overflow: 'auto' }}>
                                        <CalenderData height='100%' />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4} md={6} sm={12}>
                            <Card className="text-center">
                                <Card.Body>
                                    <h4>Coming Soon!</h4>
                                    <p>New features and updates are on the way. Stay tuned!</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row> */}
                </div>
                  ) : (
                      <>
                          {
                              role === "Employee" ?
                                  <EmployeeDashboard />
                                  :
                                  <div>
                                      {
                                          role === "SuperAdmin" ?
         <>
      <div className="container-fluid">
        <div className="row ">
       
            <div className="col-xl-3">
             
                      <div className="col-xl-12 col-xxl-12 col-sm-6 col-md-6 col-lg-12">
                        <div className="card bg-primary text-white">
                          <div className="card-header border-0">
                            <div className="revenue-date">
                              <span>Revenue</span>
                              <h4 className="text-white">₹ {datacount1}</h4>
                            </div>
                            {/* <div className="avatar-list avatar-list-stacked me-2">
                            </div> */}
                          </div>
                        <div className="card-body pb-0 custome-tooltip d-flex align-items-center j_c_c">                              
                            <RevenueChart />
                      </div>
                        </div>
                      </div>
                      <div className="col-xl-12 col-xxl-12 col-sm-6 col-md-6 col-lg-12">
                        <div className="card bg-secondary text-white">
                          <div className="card-header border-0">
                            <div className="revenue-date">
                              <span className="text-black">Expenses</span>
                              <h4 className="text-black">₹ {datacount2}</h4>
                            </div>
                          </div>
                          <div className="card-body pb-0 custome-tooltip d-flex align-items-center j_c_c">
                            <ExpensesBarChart />
                          </div>
                        </div>
                      </div>
                    </div>
               
                    <div className='col-xl-4'>
               
                    <div className="col-xl-12 col-xxl-12 col-sm-6 col-md-6 col-lg-12">
  <div className="card">
    <div className="card-header border-0 pb-0">
      <EarningChart 
        Primarycolor={PrimaryCol} 
        data={totalDataCount} 
        DetailHead={Head3} 
        totalEarnings={totalEarnings} 
        onFormattedDateChange={handleFormattedDate} 
      />
    </div>
  </div>
</div>

                      {/* <div className="col-xl-12  col-lg-6">
            <div className="card  pb-0">
              <div className="card-header border-0 pb-0">
                <h4 className="card-title">To Do List</h4>
              </div>
              <div className="card-body">
                <div
                  style={{ height: "175px" }}
                  id="DZ_W_Todo4"
                  className="widget-media dz-scroll height370  ps--active-y"
                >
                  <ul className="timeline">
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox1"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox1"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Get up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                     
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-warning check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox2"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox2"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Stand up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-primary check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox3"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox3"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Don't give up the fight.</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-info check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox4"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox4"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Do something else</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox5"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox5"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Get up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-warning check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox6"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox6"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Stand up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
              </div>
                      */}
                      </div>
                 
                    
                
          
                <div className='col-xl-2 col-xxl-4 col-lg-4 col-md-2 col-sm-2'>
                  <div>
                    <CalenderData height='395px'/>
                  </div>
                </div>
                </div>
                <div className='card p_10'>

            
<GraphDashboard  options={option}/>
</div>
                  <div className = "container-fluid ">
                    <div className = "row">
                     
                        <div className="col-xl-7 col-xxl-7 col-lg-6 col-md-4 col-sm-4">
                          <ProjectOverviewTab height={220}/>
                        </div>
                        <div className="col-xl-5  col-lg-6">
            <div className="card shadow">
              <div className="card-header border-0 pb-0">
                <h4 className="card-title">Events</h4>
                              
              </div>
              <div className="card-body">
                <div
                  style={{ height: "270px" }}
                  id="DZ_W_TimeLine1"
                  className="widget-timeline dz-scroll style-1 height370  ps--active-y"
                >
                  <ul className="timeline">
                    <li>
                      <div className="timeline-badge primary"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>10 minutes ago</span>
                        <h6 className="mb-0">
                          Youtube, a video-sharing website, goes live{" "}
                          <strong className="text-primary">$500</strong>.
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge info"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          New order placed{" "}
                          <strong className="text-info">#XF-2356.</strong>
                        </h6>
                        <p className="mb-0">
                          Quisque a consequat ante Sit amet magna at volutapt...
                        </p>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge danger"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>30 minutes ago</span>
                        <h6 className="mb-0">
                          john just buy your product{" "}
                          <strong className="text-warning">Sell $250</strong>
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge success"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>15 minutes ago</span>
                        <h6 className="mb-0">
                          StumbleUpon is acquired by eBay.{" "}
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge warning"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          Mashable, a news website and blog, goes live.
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge dark"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          Mashable, a news website and blog, goes live.
                        </h6>
                      </Link>
                    </li>
                  </ul>
                </div>
           
            </div>
          </div>
                      </div>
                    </div>
                   
                   
                  </div>
                </div>
             
          <div className="col">
            <div className='row'>
              <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-3 col-sm-3 ">
              <div className="card ">
              <div className="card-header border-0 p-0">
              <SubmissionChart DetailHead ={Head1} Primarycolor={PrimaryCol}  />
              </div>
              </div>
              </div>
              <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-3 col-sm-3 ">
              <div className="card ">
              <div className="card-header border-0 p-0">
              <OnboardingChart  DetailHead={Head2} Primarycolor={SecondaryCol} />
              </div>
              </div>
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
            <div className='col-xl-12'>
            <div className="card upgrade">
       
        <div className="card-body">
            <div className="text-center">
                <img src={Items} alt="" />
            </div>
            <h4>Hii {} Welcome to Your Dashboard</h4>
 
        </div>
    </div>
            </div>
            <div className='row-xl-4'>
            <div className=" col-xl-12">
            <EmployeeTimeTracker/>
      </div>
      </div>
         </div>
     
   </div>
   <div className="col-xl-4 ">
     <div className="col-xl-12  col-lg-6">
            <div className="card  pb-0">
              <div className="card-header border-0 pb-0">
                <h4 className="card-title">To Do List</h4>
              </div>
              <div className="card-body">
                <div
                  style={{ height: "410px" }}
                  id="DZ_W_Todo4"
                  className="widget-media dz-scroll height370  ps--active-y"
                >
                  <ul className="timeline">
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox1"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox1"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Get up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                     
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-warning check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox2"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox2"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Stand up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-primary check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox3"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox3"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Don't give up the fight.</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-info check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox4"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox4"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Do something else</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox5"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox5"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Get up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="form-check custom-checkbox checkbox-warning check-lg me-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox6"
                            required=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox6"
                          ></label>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0">Stand up</h5>
                          <small className="text-muted">
                            29 July 2022 - 02:26 PM
                          </small>
                        </div>
                       
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
              </div>
                     
</div>
<div className="col-xl-3">
<div className="row">
   <div className="col-xl-8">
       <CalenderData height='465px'/>
   </div>
   <div className="col-xl-12">
       {/* <AllProjectBlog /> */}
   </div>
</div>
</div>
      
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
    
    
    
    <div className="col-xl-4">
    <div className="row">
        <div className="col-xl-12">
        {/* <Interview/> */}
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
    
          <div className="col">
            <div className='row'>
              <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-3 col-sm-3 ">
              <div className="card ">
              <div className="card-header border-0 p-0">
              <SubmissionChart DetailHead ={Head1} Primarycolor={PrimaryCol}  />
              </div>
              </div>
              </div>
              <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-3 col-sm-3 ">
              <div className="card ">
              <div className="card-header border-0 p-0">
              <OnboardingChart  DetailHead={Head2} Primarycolor={SecondaryCol} />
              </div>
              </div>
              </div>
              </div>
          </div>
          </>
                                            }
                                        </div>
                                }
                            </>
                        )
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