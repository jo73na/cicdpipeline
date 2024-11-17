import  { useContext, useState } from "react";
import FaqContext from "../../Providers/Faq";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
 
  Month,

  Inject,
  
} from "@syncfusion/ej2-react-schedule";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import icon1 from "/images/Pending.png";
import icon2 from "/images/right.png";

const TimesheetSchdular = ({ setAddLogButtonCount }) => {
  let loggedHours = ":00";
  let totalHours = 8;
  const icon = <DeleteOutlined />;
  const [hours, minutes] = loggedHours.split(":");

  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

  // Calculate the percentage
  const calculatedPercentage = (totalMinutes / (totalHours * 60)) * 100;
  console.log("calculatedPercentage", calculatedPercentage);

  const { schedulerData, setSchedulerData, epmloeescdular } =
    useContext(FaqContext);
  const [doubleClick, setDoubleClick] = useState(false);

  const currentDate = new Date();
  const startDatereport = new Date("2024-2-29");
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
    let orignal = [];
    let backdata = [];
    schedulerData.map((item) => {
      const dateString = item.StartTime;
      const dateObject = new Date(dateString);

      // Get the day of the month
      const dayOfMonth = dateObject.getDate();
      backdata.push(dayOfMonth);
    });
    const uniqueArray = [...new Set(backdata)];

    setAddLogButtonCount(numberOfDaysBetween - uniqueArray?.length);

    console.log("backData", backdata);
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
        args.element.innerHTML = `<p style="font-weight: bold; margin-top:20px; margin-left:40px; font-size: 14px; color: #333;">${args.data.leave_title}</p>`;

        args.element.classList.remove("e-appointment");
        break;
      default:
        if (args.data.type === "Pending") {
          const eventElement = args.element;

          const clientName = args.data.Client;
          const projectName = args.data.project_id?.project_name;
          const logged_houres = args.data.logged_houres;

          const content = `
      <div>
          <div style="display:flex; gap:30px ;">
              <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
              <div style="display:flex; gap:5px; align-items: center;">
              <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>
              <img src=${icon1} style="width:15px; height:15px; color:red"/>
          </div>

             
          </div>
      </div>
    `;

          eventElement.innerHTML = content;
          // args.element.classList.remove('e-appointment');

          eventElement.classList.add("event_exist_pending");
        } else {
          const eventElement = args.element;

          const clientName = args.data.Client;
          const projectName = args.data.project_id?.project_name;
          const logged_houres = args.data.logged_houres;

          const content = `
        <div>
            <div style="display:flex; gap:30px ;">
                <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
                <div style="display:flex; gap:5px">
                <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>
                <img  src=${icon2}  style ="width:20px; height:20px;"/> 
                </div>


               
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
    // If doubleClick is true, prevent the default behavior and handle custom logic
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
      const hasEvent = schedulerData?.find((event) => {
        const eventDate = new Date(event.StartTime);
        return (
          eventDate.getDate() === cellDate.getDate() &&
          eventDate.getMonth() === cellDate.getMonth() &&
          eventDate.getFullYear() === cellDate.getFullYear()
        );
      });

      if (!hasEvent) {
        // Show "Add Log" button in the cell
        const addButton = document.createElement("p");

        addButton.textContent = " + Add Log Hours";
        // addButton.style.display = 'inline-flex';
        addButton.style.fontFamily = "Mulish";
        addButton.style.fontSize = "14px";
        addButton.style.fontWeight = 900;
        // addButton.style.padding = '12px 16px';
        // addButton.style.justifyContent = 'end';
        addButton.style.marginTop = "30px";

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
        addButton.style.color = "black"; // Set text color

        // addButton.addEventListener('click', () => handleAddLog(a));
        args.element.appendChild(addButton);

        args.element.classList.add("no-event-cell");
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
          <div className="control-wrapper">
            <Link to={"/Timesheet"}>
              <ScheduleComponent
                width="100%"
                height="650px"
                selectedDate={currentDate}
                eventSettings={{ dataSource: schedulerData }}
                // popupOpen={onPopupOpen}
                // Added popupClose event
                eventRendered={onEventRendered}
                eventClick={onEventClick}
                cellClick={onCellClick}
                beforeMonthNavigate={onBeforeMonthNavigate}
                headerToolbar={headerOptions}
                readonly={true}
                renderCell={onRenderCell}
                currentView="Month" // Added renderCell event
              >
                <ViewsDirective>
                  <ViewDirective option="Month" />
                </ViewsDirective>

                <Inject services={[Month]} />
              </ScheduleComponent>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetSchdular;
