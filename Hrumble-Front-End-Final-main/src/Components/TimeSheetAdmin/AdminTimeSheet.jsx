import { TimelineViews, TimelineMonth, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { useContext, useEffect, useState } from 'react';

import { Drawer,Select,Form} from 'antd';
import { useRef } from 'react';
// import AddTimesheet from './AddTimesheet';

import axios from 'axios';


import AddTimesheet from './AddTimesheet';
import { BASE_URL } from '../../Utils/api';
import Loader from '../../Utils/Loader';
import FaqContext from '../../Providers/Faq';

// import Loader from '../../Utils/Loader';
 
 
 
 
const TimelineGrouping = ({setSalaryType,salary_type}) => {
    const {firstDayOfMonth,lastDayOfMonth,epmloeescdularNonbillable,setlastDayOfMonth,setfirstDayOfMonth,Loading,schedulerAdminData,AdminTimesheetData,epmloeescdularAdmin,setSchedulerAdminData,employee,setAdminTimesheetData}=useContext(FaqContext)
 
    const scheduleObj = useRef(null);
 
 
    const [doubleClick, setDoubleClick] = useState(false);
    const [employeeSelect, setEmployeeSelect] = useState("All");
    const [args, setargs] = useState({});
 
    const [edit, setEdit] = useState(false);
    const [fileError, setFileError] = useState(false);
    const [screenshot, setscreenshot] = useState();
    const [selectedDate, setSelectDate] = useState();
 
   
 
    const [openAddEmployeeDrawer, setAddEmployeeDrawer] = useState(false);
 
 
    const workDays = [0, 1, 2, 3, 4, 5];
 
    const emplyeedata=[{label:"All",value:"All"} ,...employee]
   
 
 
     let categoryData =   [
      ...schedulerAdminData,
   
  ];


  const getRoomName = (value) => {
    return value.resourceData[value.resource.textField];
};
const getRoomType = (value) => {
    return value.resourceData.typ || "Total Present  :0" ;
};
const getRoomCapacity = (value) => {
    return value.resourceData.capacity ||"Total Absent  :0";
};


  const resourceHeaderTemplate = (props) => {
    return (<div className="template-wrap">
            <div className="room-name">{getRoomName(props)}</div>
            <div className="room-type"
             style={{
               color:"green"
             }}>{getRoomType(props)}</div>
            <div className="room-capacity"
             style ={{
               color:"red"
             }}>{getRoomCapacity(props)}</div>
        </div>);
};
  let data=AdminTimesheetData
   
 
    const startDatereport = new Date('2023-12-31');
    const endDatereport = new Date();
    const timeDifference = endDatereport.getTime() - startDatereport.getTime();
const daysDifference = timeDifference / (1000 * 3600 * 24);
 
const handleAddLog = (args) => {
 
    // args.cancel = false;
    // setargs(args);
    // setAddEmployeeDrawer(true);
    // Handle the logic to add a log for the selected date
    // Open the Add Log form or take any other necessary action
    // For example, you can set state to show a modal or navigate to a different page
   
  };
 
 
    const onRenderCell = (args) => {
     
        const cellDate = args.date;
       // Current date
     
     
      // Convert the difference to days
     
        // Check if the cell date is within the specified range
        const isWithinRange = cellDate >= startDatereport && cellDate <= endDatereport;
     
        // Check if the cell is a body cell and not a header cell
        const isBodyCell = args.element.classList.contains('e-work-cells');
       
        if (isWithinRange && isBodyCell) {
         
          // Check if there is an event for the current cell date
          const hasEvent = AdminTimesheetData?.find((event) => {
            const eventDate = new Date(event.StartTime);
         
            return (
             
              eventDate.getDate() === cellDate.getDate() &&
              eventDate.getMonth() === cellDate.getMonth()  &&
              eventDate.getFullYear() === cellDate.getFullYear() &&
             schedulerAdminData[args.groupIndex]?.id === (event.employee_id||"gggg")
           
             
 
            );
          });
          if(hasEvent){
            console.log("hasevent",hasEvent)
           if(hasEvent.status=="publicholiday"){
            const content = `
            <div style="color: #333; font-size: 12px; text-align: center;">
              <p>${hasEvent?.title}</p>
           
            </div>
          `;
           args.element.innerHTML = content;
           args.element.classList.remove('e-appointment');
           args.element.setAttribute('aria-disabled', 'true');
           args.element.classList.add('leave_color');
           }
           else if(hasEvent.status=="Leave"){
            const content = `
            <div style="color: #333; font-size: 12px; text-align: center;">
              <p>${hasEvent?.leave_title
              }</p>
           
            </div>
          `;
           args.element.innerHTML = content;
           args.element.setAttribute('aria-disabled', 'true');
           args.element.classList.remove('e-appointment');
 
           args.element.classList.add('leave_color');
 
           }
         
         
          }
         
          else {
            const hasEvent1 = AdminTimesheetData?.find((event) => {
              const eventDate = new Date(event.StartTime);
           
              return (
               
                eventDate.getDate() === cellDate.getDate() &&
                eventDate.getMonth() === cellDate.getMonth()  &&
                eventDate.getFullYear() === cellDate.getFullYear()
               
             
               
 
              )
            })
 
            if(hasEvent1){
              console.log("hasevent",hasEvent1)
             if(hasEvent1.status=="publicholiday"){
              const content = `
              <div style="color: #333; font-size: 12px; text-align: center;">
                <p>${hasEvent1?.title}</p>
             
              </div>
            `;
             args.element.innerHTML = content;
             args.element.classList.remove('e-appointment');
             args.element.setAttribute('aria-disabled', 'true');
 
             args.element.classList.add('publicholiday_color');
             }
         
             else{
 
     
              console.log("args",args)
             // Show "Add Log" button in the cell
             const addButton = document.createElement('p');
       
             addButton.textContent = ' + ';
             // addButton.style.display = 'inline-flex';
              addButton.style.fontFamily = 'Mulish';
              addButton.style.fontSize = '30px';
             //  addButton.style.fontWeight = 900;
           
             //  addButton.style.fontWeight = 900;
             // addButton.style.padding = '12px 16px';
             // addButton.style.justifyContent = 'end';
             //  addButton.style.marginTop = '30px';
       
             //  color: #000;
       
       // font-family: Mulish;
       // font-size: 14px;
       // font-style: normal;
       // font-weight: 500;
       // line-height: normal;
             // addButton.style.alignItems = 'end';
             // addButton.style.gap = '8px';
             // addButton.style.borderRadius = '8px';
             // addButton.style.background = 'rgba(225, 1, 2, 0.10)';
             addButton.style.color = 'white'; // Set text color
       
             addButton.addEventListener('click', () => handleAddLog(args));
             args.element.appendChild(addButton);
       
             args.element.classList.add('no-event-cell_admin');
           }
           
            }
            else{
 
     
           
            // Show "Add Log" button in the cell
            const addButton = document.createElement('p');
     
            addButton.textContent = ' + ';
            // addButton.style.display = 'inline-flex';
             addButton.style.fontFamily = 'Mulish';
             addButton.style.fontSize = '30px';
            //  addButton.style.fontWeight = 900;
           
            //  addButton.style.fontWeight = 900;
            // addButton.style.padding = '12px 16px';
            // addButton.style.justifyContent = 'end';
            //  addButton.style.marginTop = '30px';
     
            //  color: #000;
     
      // font-family: Mulish;
      // font-size: 14px;
      // font-style: normal;
      // font-weight: 500;
      // line-height: normal;
            // addButton.style.alignItems = 'end';
            // addButton.style.gap = '8px';
            // addButton.style.borderRadius = '8px';
            // addButton.style.background = 'rgba(225, 1, 2, 0.10)';
            addButton.style.color = 'white'; // Set text color
     
            addButton.addEventListener('click', () => handleAddLog(args));
            args.element.appendChild(addButton);
     
            args.element.classList.add('no-event-cell_admin');
          }
       
          // else{
           
         
            //  if(hasEvent?.status == "publicholiday"){
             
            //   console.log("hasevent",hasEvent)
           
            // args.element.classList.add('publicholiday_cell_admin');
            //    let para=`<p>sathish</p>`
            // args.element.innerHTML =para;
 
            //  }
            // setAddLogButtonCount((prev)=>prev+1);
             
          // }
     
          // setAddLogButtonCount(datacount);
     
       
     
        }
        // else{
        //   const hasEvent = AdminTimesheetData?.find((event) => {
        //     const eventDate = new Date(event.StartTime);
         
        //     return (
             
        //       eventDate.getDate() === cellDate.getDate() &&
        //       eventDate.getMonth() === cellDate.getMonth()  &&
        //       eventDate.getFullYear() === cellDate.getFullYear()
        //       // schedulerAdminData[args.groupIndex]?.id === (event.employee_id||"gggg")
           
             
 
        //     );
        //   });
        //   if(hasEvent){
        //    if(hasEvent.status=="publicholiday"){
        //     const content = `
        //     <div style="color: #333; font-size: 12px; text-align: center;">
        //       <p>${hasEvent?.title}</p>
           
        //     </div>
        //   `;
        //    args.element.innerHTML = content;
        //    }
         
        //   }
         
        // }
      }
    }
 
    // const onRenderCell = (args) => {
     
    // //     const date = args.date || new Date();
    // // const isJanuary15 = date.getMonth() === 0 && date.getDate() === 15;
 
    // // if (isJanuary15 && args.element.dataset.groupIndex) {
    // //         console.log("args",args)
    // //     const addButton = document.createElement('p');
 
    // //     addButton.textContent = ' + Add Log Hours';
    // //     // addButton.style.display = 'inline-flex';
    // //      addButton.style.fontFamily = 'Mulish';
    // //      addButton.style.fontSize = '14px';
    // //      addButton.style.fontWeight = 900;
    // //     // addButton.style.padding = '12px 16px';
    // //     // addButton.style.justifyContent = 'end';
    // //      addButton.style.marginTop = '30px';
    // //      args.element.appendChild(addButton);
    // // }
    // };
 
    const onPopupOpen = (args) => {
      
      
      // if (args.type === 'EventContainer'){
      //  return  args.element.querySelector('#editButton')?.addEventListener('click', () => {
           
      //       // Close the current quick info popup
      //       scheduleObj.current.closeQuickInfoPopup();
 
      //       // Open the editor template popup
 
      //       console.log("argsedit",args)
      //       setargs(args);
      //       setEdit(true);
      //       setAddEmployeeDrawer(true);
      //     });
       
      //   // return editButton
       
     
      // }
 
     
     
       
      if( salary_type == "Billable"){
        if(args.type =="EventContainer"){
       
 
          const eventDetails = args.data?.event;
     
       
          // Generate HTML content dynamically based on eventDetails, including an "Edit" button
          const content = `
            <div style="background-color: red;">
              <div style="padding: 10px 20px; background-color:#e2e3da; border: 1px solid #ddd;">
                <p style="color: #303030;
                // background: #757B48;
                font-family: Mulish;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;">Sathish </p>
                <p style="font-weight: bold; font-size: 16px; color: #333;">Client Name:sss </p>
               
                <button id="editButton" style="display: inline-flex;
                border: none;
                padding: 12px 16px;
                justify-content: end;
                margin-left:280px;
                align-items: end;
                gap: 8px; border-radius: 8px;
                background: #757B48;">Edit</button>
              </div>
            </div>
           
          `;
          // args.element.innerHTML = content;
           args.cancel = false;
 
 
        }
        else if (args.type === 'QuickInfo') {
         
 
          console.log("argsffff",args)
 
          const eventDetails = args.data;
   
          // Generate HTML content dynamically based on eventDetails, including an "Edit" button
          const content = `
            <div style="background-color: red;">
              <div style="padding: 10px 20px; background-color:#e2e3da; border: 1px solid #ddd;">
                <p style="color: #303030;
                // background: #757B48;
                font-family: Mulish;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;">${eventDetails.project_id?.project_name} : ${eventDetails.logged_houres} </p>
                <p style="font-weight: bold; font-size: 16px; color: #333;">Client Name: ${eventDetails.client_id?.name} </p>
               
                <button id="editButton" style="display: inline-flex;
                border: none;
                padding: 12px 16px;
                justify-content: end;
                margin-left:280px;
                align-items: end;
                gap: 8px; border-radius: 8px;
                background: #757B48;">Edit</button>
              </div>
            </div>
           
          `;
   
          args.element.innerHTML = content;
          const editButton = args.element.querySelector('#editButton');
          if (editButton) {
            editButton.addEventListener('click', () => {
              // Close the current quick info popup
              scheduleObj.current.closeQuickInfoPopup();
   
              // Open the editor template popup
               args.element.classList.add('leave_color');
 
             
              console.log("argsedit",args)
             
              setargs(args);
              setEdit(true);
              setAddEmployeeDrawer(true);
            });
          }
   
          // Handle the click event of the "Edit" button
       
        }
       
     
       
        else {
          args.cancel = true;
          setargs(args);
          setAddEmployeeDrawer(true);
        }
      }
      else{
        args.cancel = true;
      }
      };
 
      const onEventRendered = (args) => {
       
 
          
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
       
        // Create a new Date object for the first day of the current month
        const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
       
        // Calculate the difference in days between the first day of the current month and the current date
        const timeDifference = currentDate.getTime() - firstDayOfCurrentMonth.getTime();
        const numberOfDaysBetween = Math.ceil(timeDifference / (1000 * 3600 * 24));
     
       
   
   
      if(args.data.status =="Leave"){
        const eventElement = args.element;
 
        const content = `
        <div>
           
                <span style="">.</span>
 
 
     
        </div>
      `;
      eventElement.innerHTML = content;
      // eventElement.classList.add('leave');
      args.element.setAttribute('aria-disabled', 'true');
      eventElement.classList.remove('e-appointment');
 
      }
      else{
        const eventElement = args.element;
 
        const clientName = args.data.Client;
        const projectName = args.data.project_id?.project_name;
        const logged_houres = salary_type =="Non Billable" ?args.data.total_logged_hours: args.data.logged_houres;
       
        const content = `
          <div>
              <div style="display:flex; gap:30px; align-items:center ;">
 
                  <p style="">${logged_houres}</p>
 
 
                 
              </div>
          </div>
        `;
 
        eventElement.innerHTML = content;
        eventElement.classList.add('event_cell');
      }
       
 
 
       
       
     
        // // Clear the default content
        // eventElement.innerHTML = '';
     
        // Add custom content, including skill, client, and project information
     
     
      };
 
      const onEventClick = (args) => {
         console.log("args",args)
          // If doubleClick is true, prevent the default behavior and handle custom logic
         if(salary_type === 'Billable'){
          if (doubleClick) {
            args.cancel = false;
           // setDoubleClick(false); // Reset doubleClick state
           // Implement logic to open your custom double-click popup here
           // console.log('Double Clicked Event', args);
       } else {
 
       
           // If it's a single click, set doubleClick to true and reset after a short delay
           setDoubleClick(true);
           // setTimeout(() => setDoubleClick(false), 300); // Adjust the delay as needed
       }
         }
      };
 
      const onCellClick = (args) => {
         console.log("args",args)
     
        // Prevent the default behavior (default cell click popup)
        if(salary_type === 'Billable'){
          args.cancel = true;
        setargs({employee_id:schedulerAdminData[args.groupIndex]?.id,...args});
        setAddEmployeeDrawer(true);
        }
    };
 
 
 
 
    const onAddEmployeeClose = () => {
        setAddEmployeeDrawer(false);
        setEdit(false)
 
      };
   
 
      const handleSave =  async(values,args,form) => {
        // Process the form data and update the scheduler data
   
 
       const currentDate = new Date();
 
       // Function to format a date as "YYYY-MM-DD"
       const formatDate = (date) => {
         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, '0');
         const day = String(date.getDate()).padStart(2, '0');
       
         return `${year}-${month}-${day}`;
       };
       
       // Format the current date
       const currentDateString = formatDate(currentDate);
       const yesterdayDate = new Date(currentDate);
       yesterdayDate.setDate(currentDate.getDate() - 1);
       
       // Function to format a date as "YYYY-MM-DD"
       const formatDate1 = (date) => {
         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, '0');
         const day = String(date.getDate()).padStart(2, '0');
       
         return `${year}-${month}-${day}`;
       };
       
       // Format yesterday's date
       const yesterdayDateString = formatDate1(yesterdayDate);
 
       // Get tomorrow's date by adding one day
   
 console.log("currentDateString",currentDateString)
// Assuming you have the provided StartTime and EndTime strings
const providedStartTime = `${yesterdayDateString}T18:30:00.000Z`;
const providedEndTime = `${currentDateString}T18:30:00.000Z`;
 
// Replace the date part with the current date
 
 
// Log the updated start and end times
console.log("Updated StartTime:", providedStartTime);
console.log("Updated EndTime:", providedEndTime);
        var formdata=new FormData()
        formdata.append("client_id",values["client_id"])
        formdata.append("project_id",values["project_id"])
        formdata.append("logged_houres",values["logged_houres"])
        formdata.append("employee_id",values["employee_id"])
        formdata.append("StartTime", args?.data?args?.data.StartTime:args.startTime )
        formdata.append("EndTime",args?.data? args.data.EndTime:args.endTime)
        formdata.append("timesheet",screenshot)
        console.log("values",values["start"])
        const startTimes = values["start"];
        startTimes?.forEach((item, index) => {
       
          formdata.append(`startend_time[${index}]`, item?.$d);
       
      });
       
        formdata.append("type","Approved")
   
       
   
       if(edit){
     
        await axios.put(`${BASE_URL}/events/adminedit/${args?.data?._id}`,formdata,
      ).then( async(res)=>{
       
          epmloeescdularAdmin()
           
           setAddEmployeeDrawer(false);
           form.resetFields();
           setargs({})
           setEdit(false)
           setscreenshot("")
           
           
           
         })
       }
       else{
        await axios.post(`${BASE_URL}/events/adminadd`,formdata,).then( async(res)=>{
          epmloeescdularAdmin()
        //   await axios.get(`${BASE_URL}/events/`,{params:{type:"Approved",lastDayOfMonth,firstDayOfMonth}}).then((res)=>{
        //     setAdminTimesheetData(res.data.data);
        //  })
        //  await axios.get(`${BASE_URL}/events/admintimesheet`,{params:{type:"Approved",lastDayOfMonth,firstDayOfMonth}}).then((res)=>{
        //   setSchedulerAdminData(res.data.data);
      //  })
           setAddEmployeeDrawer(false);
           form.resetFields();
           setscreenshot("")
           
           
           
         })
       }
   
       
      };
 
      useEffect(() => {
     
 
         categoryData =
         [
          ...schedulerAdminData,
     
      ];
      }, [AdminTimesheetData,schedulerAdminData])
     
     
      const handleChangeEmployee= async(e)=>{
 
 
        if(e !== "All"){
          let params={
            // month:currentmonth,
            employee_id:e}
            setEmployeeSelect(e)
            epmloeescdularAdmin(params)
 
          //   await axios.get(`${BASE_URL}/events/`,{params}).then((res)=>{
          //     setAdminTimesheetData(res.data.data);
          //  })
           
          //   await axios.get(`${BASE_URL}/events/admintimesheet`,{params}).then((res)=>{
          //     setSchedulerAdminData(res.data.data);
          //  })
       
        //   axios.get("http://localhost:8080/api/v1/events/report",{params}).then((response)=>{
        //     setAdminTimesheetData(response.data.data)
           
        //  })
        }
        else{
          let params={
            // year:currentYear,
           }
           setEmployeeSelect(e)
 
         
            epmloeescdularAdmin()
       
        }
       
       }
 
       function onNavigating(args) {
        console.log("args",args)
        const dateObject = new Date(args.currentDate);
 
 
        // Get year, month, and day from the parsed date
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth();
        const day = dateObject.getDate();
       
        // Calculate the first day of the month
        const firstDayOfMonth1 = new Date(year, month, 1);
       
        // Calculate the last day of the month
        const lastDayOfMonth1 = new Date(year, month + 1, 0);
      setSelectDate(args.currentDate)
 
   
     setfirstDayOfMonth(firstDayOfMonth1)
     setlastDayOfMonth(lastDayOfMonth1)
     if(salary_type == "Billable"){
     epmloeescdularAdmin({firstDayOfMonth:firstDayOfMonth1,lastDayOfMonth:lastDayOfMonth1})
       
     }
     else{
 
      epmloeescdularNonbillable({firstDayOfMonth:firstDayOfMonth1,lastDayOfMonth:lastDayOfMonth1})
     
     }
    //  setDate(new Date(args.currentDate))
    //  setEndDate(new Date(dateObject))
     
     
   
      }
 
 
      const handleStatus=(e)=>{
        setSalaryType(e)
        if(e == "Non Billable"){
        epmloeescdularNonbillable()
 
        }
        else{
        epmloeescdularAdmin()
 
        }
      }
 
 
    return (
 
     
       <>
 
 
 
        {
           Loading  ?
           <Loader/>
           :
           <>
        
           {/* <div
            className='text-center d-flex justify-content-center '>
           <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist"
             style={{
               width:"180px"
             }}>
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Billable</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">Non Billable</Nav.Link>
                          </Nav.Item>
                      </Nav> 
           </div> */}
       <Form.Item
        lable ="Salary Type">

       <Select
      style={{
        width:"260px"
      }}
      onChange={handleStatus}
      value={salary_type}
     options={[
      {
        label:" Billable",
        value:"Billable"
      },
      {
       label:"Non Billable",
       value:"Non Billable"
     }
   
     ]}/>
       </Form.Item>
 
           
         
           {
      salary_type =="Billable" ?
 
     
            <>
               <Form layout='vertical'>
           <div className='col_3'>
                <div>
                   <Form.Item
                    label="Employee Name">
                      <Select
                      value={employeeSelect}
                      placeholder="Select Employee"
                       allowClear
                      onChange={handleChangeEmployee}
                      options={emplyeedata}
                      />
                   </Form.Item>
                </div>
            </div>
           </Form>
             <div className='schedule-control-section admin'>
               <div className='col-lg-12 control-section'>
                   <div className='control-wrapper'>
                       <ScheduleComponent
                         ref={scheduleObj}
                           cssClass='timeline-resource-grouping'
                           width='100%'
                           height='650px'
                           readOnly
   
                           popupOpen={onPopupOpen}
               
                 eventRendered={onEventRendered}
                 eventClick={onEventClick}
                 cellClick={onCellClick}
                 navigating={onNavigating}
                            selectedDate={selectedDate}
                           currentView='TimelineMonth'
                           workDays={workDays}
                           eventSettings={{ dataSource: data }}
                           group={{ resources: ['Categories'] }}
                           renderCell={onRenderCell}
                       >
                           <ResourcesDirective>
                           
                               <ResourceDirective field='employee_id' title='Category' name='Categories' allowMultiple={true} dataSource={categoryData} textField='text' idField='id' groupIDField='groupId' colorField='color' />
                           </ResourcesDirective>
                           <ViewsDirective>
                           
                               <ViewDirective option='TimelineMonth' />
                             
                           </ViewsDirective>
                           <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop]} />
                       </ScheduleComponent>
                   </div>
               </div>
           </div>
            </>
           :
 
           <div className='schedule-control-section admin'>
               <div className='col-lg-12 control-section'>
                   <div className='control-wrapper'>
                       <ScheduleComponent
                         ref={scheduleObj}
                           cssClass='timeline-resource-grouping'
                           width='100%'
                           height='650px'
                           readOnly={true}
                           popupOpen={onPopupOpen}
                           resourceHeaderTemplate={resourceHeaderTemplate} 
               
                 eventRendered={onEventRendered}
                 eventClick={onEventClick}
                 cellClick={onCellClick}
                 navigating={onNavigating}
                            selectedDate={selectedDate}
                           currentView='TimelineMonth'
                           workDays={workDays}
                           eventSettings={{ dataSource: data }}
                           group={{ resources: ['Categories'] }}
                           renderCell={onRenderCell}
                       >
                           <ResourcesDirective>
                           
                               <ResourceDirective field='employee_id' title='Category' name='Categories' allowMultiple={true} dataSource={categoryData} textField='text' idField='id' groupIDField='groupId' colorField='color' />
                           </ResourcesDirective>
                           <ViewsDirective>
                           
                               <ViewDirective option='TimelineMonth' />
                             
                           </ViewsDirective>
                           <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop]} />
                       </ScheduleComponent>
                   </div>
               </div>
           </div>
}
           </>
        }
        <Drawer
        title="Add Log Hours"
        placement="right"
        closable={true}
        size="medium"
        width={650}
        onClose={onAddEmployeeClose}
        open={openAddEmployeeDrawer}
       
      >
         <AddTimesheet
         onSave={handleSave}
         onAddEmployeeClose={onAddEmployeeClose}
        args={args} edit={edit} setscreenshot={setscreenshot} setFileError={setFileError}/>
      </Drawer>
       </>
    );
};
 
export default TimelineGrouping
 

