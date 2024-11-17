// import { useContext, useEffect } from "react";

// import { DatePicker, Select } from "antd";

// import DashboardContext from "../../Providers/DashboardProvider";

// import { useState } from "react";

// import LogHoursMonthchart from "../TimeSheetEmployee/LogHoursMonthChart";
// import FaqContext from "../../Providers/Faq";
// import TimesheetSchdular from "./TimesheetSchdular";
// import CylindricalColumn from "./TeraParchart";
// import PieRadius from "./PieChartlogged";


// const EmployeeDashboard = () => {
//   //  const {Loading} = useContext(JobContext);
//   const { fetchFaq, Loading } = useContext(DashboardContext);
//   const { DashboardEmployee } = useContext(FaqContext);
//   const [addLogButtonCount, setAddLogButtonCount] = useState(0);
//   const [Selectmonth, setSelectmonth] = useState("Week");

//   // useEffect(() => {
//   //    console.log('Component rendered');
//   //    fetchFaq();
//   // },[]);
//   //  let name = JSON.parse(CookieUtil.get('admin'));
//   //  console.log("name",name)

//   // Get the current date
//   const currentDate = new Date();

//   const formattedDate = currentDate.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   // Find the start date of the current week (Sunday)
//   const startDate = new Date(currentDate);
//   startDate.setDate(currentDate.getDate() - currentDate.getDay());

//   // Find the end date of the current week (Saturday)
//   const endDate = new Date(startDate);
//   endDate.setDate(startDate.getDate() + 6);

//   // Format the dates in the desired format
//   const startDateStr = `${startDate.getDate()} ${startDate.toLocaleString(
//     "default",
//     { month: "short" }
//   )}`;
//   const endDateStr = `${endDate.getDate()} ${endDate.toLocaleString("default", {
//     month: "short",
//   })}`;

//   // Create the date range string
//   const dateRange = `${startDateStr} - ${endDateStr}`;

//   // Get the current date
//   const currentDate1 = new Date();

//   // Get the first day of the current month
//   const firstDayOfMonth = new Date(
//     currentDate1.getFullYear(),
//     currentDate1.getMonth(),
//     1
//   );

//   // Get the last day of the current month
//   const lastDayOfMonth = new Date(
//     currentDate1.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   );

//   // Format the dates in the desired format
//   const startDateStr1 = `${firstDayOfMonth.toLocaleString("default", {
//     month: "short",
//   })} ${firstDayOfMonth.getFullYear()}`;
//   const endDateStr1 = `${lastDayOfMonth.toLocaleString("default", {
//     month: "short",
//   })} ${lastDayOfMonth.getFullYear()}`;

//   // Create the date range string
//   const dateRange1 = `${startDateStr1}`;

//   const option = [
//     {
//       label: "This Week",
//       value: "Week",
//     },
//     {
//       label: " This Month",
//       value: "Month",
//     },
//     {
//       label: "This Year",
//       value: "Year",
//     },
//   ];

//   const { schedulerData, ChartData, setSchedulerData, epmloeescdular } =
//     useContext(FaqContext);

//   // Use state variable to track double-click
//   const [doubleClick, setDoubleClick] = useState(false);

//   // const onPopupOpen = (args) => {
//   //   if (args.type === 'QuickInfo') {
//   //     const eventDetails = args.data;

//   //     // Generate HTML content dynamically based on eventDetails, including an "Edit" button
//   //     const content = `
//   //       <div style="background-color: red;">
//   //         <div style="padding: 10px; background-color: #f2f2f2; border: 1px solid #ddd;">
//   //           <p style="color: #303030;

//   //           font-family: Mulish;
//   //           font-size: 14px;
//   //           font-style: normal;
//   //           font-weight: 600;
//   //           line-height: normal;">${eventDetails.project_id?.project_name} : ${eventDetails.logged_houres} </p>
//   //           <p style="font-weight: bold; font-size: 16px; color: #333;">Client Name: ${eventDetails.client_id?.name} </p>

//   //           <button id="editButton" style="display: inline-flex;
//   //           border: none;
//   //           padding: 12px 16px;
//   //           justify-content: end;
//   //           margin-left:280px;
//   //           align-items: end;
//   //           gap: 8px; border-radius: 8px;
//   //           background: #757B48;">Edit</button>
//   //         </div>
//   //       </div>
//   //     `;

//   //     args.element.innerHTML = content;

//   //     // Handle the click event of the "Edit" button
//   //     const editButton = args.element.querySelector('#editButton');
//   //     if (editButton) {
//   //       editButton.addEventListener('click', () => {
//   //         // Close the current quick info popup
//   //         scheduleObj.current.closeQuickInfoPopup();

//   //         // Open the editor template popup
//   //         setargs(args);
//   //         setAddEmployeeDrawer(true);
//   //       });
//   //     }
//   //   } else {
//   //     args.cancel = true;
//   //     setargs(args);
//   //     setAddEmployeeDrawer(true);
//   //   }
//   // };

//   const config4 = {
//     data: ChartData?.result || [],
//     xField: "type",
//     yField: "LoggedHours",
//     style: {
//       fill: "#00897B",
//       fillOpacity: 1,

//       shadowBlur: 10,
//       rotation: 8,
//     },
//     size: 10,
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },

//     meta: {
//       submission: {
//         alias: "submission",
//       },
//     },
//   };

//   useEffect(() => {
//     DashboardEmployee();
//   }, []);

//   return (
//     <>
//       {
//         //   Loading && <Loader />
//       }
//       {/* <p className='heading_text'>Dashboard </p> */}

//       <div className="d_f f_d_c g_10 ">
//         {/* <div className='col_1  g_10'> */}
//         <div
//           className="card column p_10"
//           style={{
//             flex: 2,
//           }}
//         >
//           <div className="monthly-submission-header">
//             <h4>Monthly Log Hours (HH:MM) </h4>
//             <div>
//               <DatePicker
//                 picker="year"
//                 placeholder="This Year"

//                 //  onChange={handleDateChange}
//               />
//             </div>
//           </div>
//           {/* <YearParchart/> */}
//           {/* <Column {...config4}/>  */}
//           <CylindricalColumn />
//         </div>

//         <div className="d_f g_10 f_d_c_sm">
//           <div className="card p_15 p_10_xs w_30_p">
//             <p className="card_header ">Today’s Activity </p>
//             <p className="m_t_5 card_header_para">({formattedDate})</p>

//             <div
//               className="d_f f_d_c g_40 a_i_c j_c_s_b m_t_50"
//               style={{
//                 position: "relative",
//               }}
//             >
//               {/* <EmployeeTimeTracker/> */}
//               {/* <div className='zive-dashboard-time1'>
//                   <label className='zive-dashboard-timer1'>00.00</label>
//             </div> */}
//               <div className="timesheet_log_button">
//                 {/* <div><Button className='btn_cancel'>Add Log Hours</Button></div> */}
//                 <div className="pending_timesheet">
//                   <p>
//                     <span className="pending_timesheet_inside_span">
//                       {addLogButtonCount || 0}
//                     </span>{" "}
//                     Pending Timesheet{" "}
//                   </p>
//                 </div>
//                 <span className="pending_timesheet_span">
//                   *Please fill your timesheets regularly.
//                 </span>
//               </div>
//             </div>
//           </div>

//           {Selectmonth == "Week" ? (
//             <div
//               className="card p_15 w_50_p"
//               style={{
//                 flex: 1.5,
//                 height: "239px",
//               }}
//             >
//               <p className="card_header">Log Hours This Week </p>
//               <p className="m_t_5 card_header_para">({dateRange})</p>

//               <Select
//                 style={{
//                   width: "100px",
//                   zIndex: 999,
//                 }}
//                 className="card_icon"
//                 value={Selectmonth}
//                 onChange={(e) => setSelectmonth(e)}
//                 options={[
//                   {
//                     lable: "Week",
//                     value: "Week",
//                   },
//                   {
//                     lable: "Month",
//                     value: "Month",
//                   },
//                 ]}
//               />

//               <div
//                 style={{
//                   marginLeft: "50px",
//                   marginTop: "-20px",
//                 }}
//               >
//                 <PieRadius />
//               </div>
//             </div>
//           ) : (
//             <div
//               className="card p_15 w_50_p"
//               style={{
//                 flex: 1.5,
//                 height: "239px",
//               }}
//             >
//               <p className="card_header">Log Hours This Month </p>
//               <p className="m_t_5 card_header_para">({dateRange1})</p>

//               <Select
//                 style={{
//                   zIndex: 999,
//                   width: "100px",
//                 }}
//                 className="card_icon"
//                 onChange={(e) => setSelectmonth(e)}
//                 value={Selectmonth}
//                 options={[
//                   {
//                     lable: "Week",
//                     value: "Week",
//                   },
//                   {
//                     lable: "Month",
//                     value: "Month",
//                   },
//                 ]}
//               />

//               <div>
//                 <LogHoursMonthchart />
//               </div>
//             </div>
//           )}

//           <div
//             className=" card p_15"
//             style={{
//               flex: 1,
//             }}
//           >
//             <p className="card_header">Ongoing Projects</p>
//             {/* <div className='d_f j_c_s_b m_10'>
//             <p className='c_primary'>Deloitte</p>
//             <p>Paradigm - 1</p>
//           </div> */}
//           </div>
//         </div>
//       </div>
//       {/* </div> */}

//       {/* {
//          role === "SuperAdmin" &&
//          <>
//             <div className='col_1 m_t_10 g_10 col_1_sm'>
//          <div className='zive-dashboard-graph'>
//          <GraphDashboard  options={option}/>
//          </div>
//       </div>
//       <div className='zive-dashboard-clientbar  m_t_10'>
//          <ClientBarChart  options={option} />
//       </div>
//          </>
       
//       } */}
//       {/* <div className='col_2 m_t_10'>
//          <Interview/>
//       </div> */}
//       <TimesheetSchdular setAddLogButtonCount={setAddLogButtonCount} />
//     </>
//   );
// };

// export default EmployeeDashboard;


import React, { useContext, useEffect } from 'react'


import Items from "/images/items.png"

import EmployeeTimeTracker from './Timer';

import Interview from './Interview'



// import UpcomingBlog from '../../components/Dashboard/elements/UpcomingBlog'
import { Card, Col, Nav, ProgressBar, Row, Tab } from 'react-bootstrap'



// import EmployeeBarchart from './EmployeeBarchart'

import { useState } from 'react'
import TimesheetSchdular from './TimesheetSchdular'
import CookieUtil from '../../Utils/Cookies'
import DashboardContext from '../../Providers/DashboardProvider'
import Loader from '../../Utils/Loader';
import EmployeeBarchart from './EmployeeBarchart';


 const EmployeeDashboard = () => {


  const { DashboardEmployee } = useContext(DashboardContext);
  const [addLogButtonCount, setAddLogButtonCount] = useState(0);
  
     const {fetchDashboard,clientSubmissionCount,Loading,goal}=useContext(DashboardContext)
      console.log("clientSubmissionCountclientSubmissionCount",goal,)
      

    let data =JSON.parse(CookieUtil.get("admin"))
    useEffect(() => {
      DashboardEmployee()
     }, [])

  const currentDate = new Date();


  const formattedDate = currentDate.toLocaleDateString("en-US", {
   day: "numeric",
   month: "short",
   year: "numeric",
 });
    return (<div className='container-fluid'>
    <h6 className='text-primary'>Employee Dashboard</h6>
 

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
            <div className="d_f g_10 f_d_c">
        <div className="card p_15 ">
          <h4 className="text-primary">Today’s Activity </h4>
          <div className="m_t_5 card_header_para">({formattedDate})</div>

          <div
            className="d_f f_d_c g_40 a_i_c j_c_s_b m_t_70"
            style={{
              position: "relative",
            }}
          >
            {/* <EmployeeTimeTracker/> */}
            {/* <div className='zive-dashboard-time1'>
                <label className='zive-dashboard-timer1'>00.00</label>
          </div> */}
            <div className="timesheet_log_button">
              {/* <div><Button className='btn_cancel'>Add Log Hours</Button></div> */}
              <div className="pending_timesheet">
                <p>
                  <span className="pending_timesheet_inside_span">
                    {addLogButtonCount || 0}
                  </span>{" "}
                  Pending Timesheet{" "}
                </p>
              </div>
              <span className="pending_timesheet_span">
                *Please fill your timesheets regularly.
              </span>
            </div>
          </div>
        </div>

     
      </div>
         </div>
     
   </div> 
   <div className="col-xl-4 ">
     <EmployeeTimeTracker/>
</div>
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
           <h4 className="heading mb-0">Monthly Log Hours (HH:MM) </h4>                

                               {/* <Card.Title>Default Accordion</Card.Title>
                               <Card.Text className="m-0 subtitle">
                                 Default accordion. Add <code>accordion</code> class in root
                               </Card.Text> */}
                             </div> 
                             {/* <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                                 <Nav.Item as="li" className="nav-item" role="presentation">
                                   <Nav.Link as="button"  type="button" eventKey="Preview">My Activity</Nav.Link>
                                 </Nav.Item>
                                 <Nav.Item as="li" className="nav-item" >
                                   <Nav.Link as="button"  type="button" eventKey="Code">Team Activity</Nav.Link>
                                 </Nav.Item>
                             </Nav> */}
                         </Card.Header>
                         <Tab.Content className="tab-content" id="myTabContent">
                           <Tab.Pane eventKey="Preview">
                                   <EmployeeBarchart />
                                  
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
           <div className="col-xl-4">
               {/* <ToDoList /> */}
           </div>
           <div className='col-12'>
    <TimesheetSchdular setAddLogButtonCount={setAddLogButtonCount} />
                
           </div>

       </div>									
  

 </div>
 )
}


export default EmployeeDashboard


