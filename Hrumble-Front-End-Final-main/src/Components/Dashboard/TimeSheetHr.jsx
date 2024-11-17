import { useContext, useState } from "react";

import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";

import icon1 from "/images/Pending.png";
import icon2 from "/images/right.png";
import DashboardContext from "../../Providers/DashboardProvider";

const TimeSheetHr = ({ setAddLogButtonCount }) => {
  let loggedHours = ":00";
  let totalHours = 8;

  const [hours, minutes] = loggedHours.split(":");

  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

  // Calculate the percentage
  const calculatedPercentage = (totalMinutes / (totalHours * 60)) * 100;
  console.log("calculatedPercentage", calculatedPercentage);

  const { HrTimesheet } = useContext(DashboardContext);
  const [doubleClick, setDoubleClick] = useState(false);

  const currentDate = new Date();
  const startDatereport = new Date("2024-1-1");
  const endDatereport = new Date();
  const timeDifference = endDatereport.getTime() - startDatereport.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  const onEventRendered = (args) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Create a new Date object for the first day of the current month
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);

    // Calculate the difference in days between the first day of the current month and the current date
    const timeDifference =
      currentDate.getTime() - firstDayOfCurrentMonth.getTime();
    const numberOfDaysBetween = Math.ceil(timeDifference / (1000 * 3600 * 24));

    //  for( let i=1;i<=numberOfDaysBetween;i++) {

    // //   // Set the content inside the event element
    // //  eventElement.innerHTML = content;

    //   //  if(backdata.includes(i)){

    //   //  const eventElement = args.element;

    //   //   const clientName = args.data.Client;
    //   //   const projectName = args.data.project_id?.project_name;
    //   //   const logged_houres = args.data.logged_houres;

    //   //   const content = `
    //   //     <div>
    //   //         <div style="display:flex; gap:30px ;">
    //   //             <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
    //   //             <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>

    //   //         </div>
    //   //     </div>
    //   //   `;

    //   //   // Set the content inside the event element
    //   //  eventElement.innerHTML = content;

    //   //  }
    //   //  else{
    //   //   console.log("i",i,args)
    //   //   const eventElement = args.element;

    //   //   const clientName = args.data.Client;
    //   //   const projectName = args.data.project_id?.project_name;
    //   //   const logged_houres = args.data.logged_houres;

    //   //   const content = `
    //   //     <div>
    //   //         <div style="display:flex; gap:30px ;">
    //   //             <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
    //   //             <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>

    //   //         </div>
    //   //     </div>
    //   //   `;

    //   //   // Set the content inside the event element
    //   //  eventElement.innerHTML = content;
    //   //   // args.element.innerHTML ="Sathish"
    //   //  }
    //     //  if()
    //  }
    switch (args.data.status) {
      case "publicholiday":
        args.element.innerHTML = `<p style="font-weight: bold; font-size: 14px; color: #333;">${args.data.title}</p>`;
        args.element.classList.remove("e-appointment");
        args.element.classList.add("publicholiday");
        break;
      case "Leave":
        if (args.data.type === "Pending"){
          args.element.innerHTML = 
          `<div style="display:flex; gap:5px; align-items:"center">
          <p style="font-weight: bold; margin-top:10px; margin-left:40px; font-size: 14px; color: #333;">${args.data.leave_id?.leave_id?.leave_title}</p>
          <img src=${icon1} style="width:15px; height:15px; margin-top:10px; color:red"/>
          </div>
          `;
        }
        else{
        console.log("fff",args.data)
        args.element.innerHTML = 
        `<div style="display:flex; gap:5px; align-items:"center">
        <p style="font-weight: bold; margin-top:10px; margin-left:40px; font-size: 14px; color: #333;">${args.data.leave_id?.leave_id?.leave_title}</p>
        <img src=${icon2} style="width:15px; height:15px; margin-top:10px; color:red"/>
        </div>
        `;
        }

        args.element.classList.remove("e-appointment");
        break;
      default:
        if (args.data.type === "Pending") {
          const eventElement = args.element;

          const Totallogged_houres = args.data?.total_logged_hours;
          const break_logged_hours = args.data?.break_logged_hours;

          const content = `
      <div> 
          <div style="display:flex; gap:10px; align-items:"center">
          <div >
          <p style="font-weight: bold; font-size: 14px; color: #333;">Total Logged :${Totallogged_houres}</p>

          <p style="font-weight: bold; font-size: 14px; color: #333">Break :${break_logged_hours}</p> 
               
          </div>
        
          <img src=${icon1} style="width:15px; height:15px; color:red"/>
           
             
          </div>

      </div>
    `;

          eventElement.innerHTML = content;
          // args.element.classList.remove('e-appointment');

          eventElement.classList.add("event_exist_pending_hr");
        } else {
          const eventElement = args.element;

          const Totallogged_houres = args.data?.total_logged_hours;
          const break_logged_hours = args.data?.break_logged_hours;

          const content = `
        <div> 
            <div style="display:flex; gap:10px; align-items:"center">
            <div >
            <p style="font-weight: bold; font-size: 14px; color: #333;">Total Logged :${Totallogged_houres}</p>
  
            <p style="font-weight: bold; font-size: 14px; color: #333">Break :${break_logged_hours}</p> 
                 
            </div>
          
            <img src=${icon2} style="width:15px; height:15px; color:red"/>
             
               
            </div>
  
        </div>
      `;

          eventElement.innerHTML = content;
          // args.element.classList.remove('e-appointment');

          eventElement.classList.add("event_exist");
        }
        break;
    }
    // // Clear the default content
    // eventElement.innerHTML = '';

    // Add custom content, including skill, client, and project information
  };

  const onEventClick = (args) => {
    console.log("args", args);
    args.cancel = false;
    // If doubleClick is true, prevent the default behavior and handle custom logic
    if (doubleClick) {
      args.cancel = false;
      // setDoubleClick(false); // Reset doubleClick state
      // Implement logic to open your custom double-click popup here
      // console.log('Double Clicked Event', args);
    }
  };

  const onCellClick = (args) => {
 
    // Prevent the default behavior (default cell click popup)
    args.cancel = true;
  };

  const onBeforeMonthNavigate = (args) => {
    // Disable weekends (Saturdays and Sundays)
    const currentDate = args.currentDate;
    const start = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const end = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 /* Sunday */ || dayOfWeek === 6 /* Saturday */) {
        args.isDisabled = true;
        break;
      }
    }
  };

  const onRenderCell = (args) => {
    console.log("argscell: ", args);
    const cellDate = args.date;
    // Current date

    // Convert the difference to days

    // Check if the cell date is within the specified range
    const isWithinRange =
      cellDate >= startDatereport && cellDate <= endDatereport;

    // Check if the cell is a body cell and not a header cell
    const isBodyCell = args.element.classList.contains("e-work-cells");

    if (isWithinRange && isBodyCell) {
      let datacount = 0;
      // Check if there is an event for the current cell date
      const hasEvent = HrTimesheet?.find((event) => {
        const eventDate = new Date(event.StartTime);
        return (
          eventDate.getDate() === cellDate.getDate() &&
          eventDate.getMonth() === cellDate.getMonth() &&
          eventDate.getFullYear() === cellDate.getFullYear()
        );
      });

      if (!hasEvent) {
        // Show "Add Log" button in the cell
      } else {
        if (hasEvent.status == "publicholiday") {
          args.element.classList.add("publicholiday_color");
        }
        if (hasEvent.status == "Leave") {
          args.element.classList.add("leave_color");
        }
      }
      // else{
      //   // setAddLogButtonCount((prev)=>prev+1);

      // }

      // setAddLogButtonCount(datacount);
    }
  };

  const headerOptions = {
    left: "prev,next today",
    center: "",
    right: "month",
  };

  const onPopupOpen = (args) => {
    console.log("args", args);
    args.cancel = true;
  };

  // useEffect(() => {
  //   // Add a class to hide the unwanted header elements
  //   const headerElements = document.querySelectorAll(
  //     '.e-toolbar-left .e-btn-group, .e-toolbar-right .e-btn-group'
  //   );

  //   headerElements.forEach((element) => {
  //     element.style.display = 'none';
  //   });
  // }, []);
  return (
    <div className="card m_t_10">
      <div className="schedule-control-section col_1 m_t_10 m_10">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper timesheet_hr">
            <ScheduleComponent
              width="100%"
              height="650px"
              selectedDate={currentDate}
              readOnly
              eventSettings={{ dataSource: HrTimesheet }}
              // popupOpen={onPopupOpen}
              // Added popupClose event
              eventRendered={onEventRendered}
              eventClick={onEventClick}
              cellClick={onCellClick}
              beforeMonthNavigate={onBeforeMonthNavigate}
              headerToolbar={headerOptions}
              readonly={true}
              popupOpen={onPopupOpen}
              renderCell={onRenderCell}
              currentView="Month" // Added renderCell event
            >
              <ViewsDirective>
                <ViewDirective option="Month" />
              </ViewsDirective>

              <Inject services={[Month]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheetHr;
