import { useRef, useState, useEffect } from "react";
import { Drawer } from "antd";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import AddLogHoursPopup from "./AddLogHoursPopup";
import axios from "axios";

import icon1 from "/images/Pending.png";
import icon2 from "/images/right.png";

import { useContext } from "react";




import CookieUtil from "../../Utils/Cookies";
import FaqContext from "../../Providers/Faq";
import { BASE_URL } from "../../Utils/api";
import Loader from "../../Utils/Loader";

/**
 * Schedule editor custom fields sample
 */
const TimesheetTable = ({ setPending }) => {
  const [startDatereport, setStartDate] = useState(new Date("2024-2-28"));
  const [endDatereport, setEndDate] = useState(new Date());
  const [firstDatMonthBack, setfirstDayOfMonthBack] = useState("");
  const [lastDatMonthBack, setlastDayOfMonthBack] = useState("");
  const [Datereport, setDate] = useState(new Date());

  const currentDate = new Date();

  const [args, setargs] = useState({});
  const [edit, setEdit] = useState(false);

  const { schedulerData, setSchedulerData, epmloeescdular, Loading } =
    useContext(FaqContext);

  const scheduleObj = useRef(null);
  const data = [];

  // Use state variable to track double-click
  const [doubleClick, setDoubleClick] = useState(false);
  const [openAddEmployeeDrawer, setAddEmployeeDrawer] = useState(false);

  const onAddEmployeeClose = () => {
    setAddEmployeeDrawer(false);
  };

  const onPopupOpen = (args) => {
    if (args.type === "QuickInfo") {
      const eventDetails = args.data;

      // Generate HTML content dynamically based on eventDetails, including an "Edit" button
      const content = `
          <div style="background-color: red;">
            <div style="padding: 10px; background-color: #f2f2f2; border: 1px solid #ddd;">
              <p style="color: #303030;

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

      // Handle the click event of the "Edit" button
      const editButton = args.element.querySelector("#editButton");
      if (editButton) {
        editButton.addEventListener("click", () => {
          // Close the current quick info popup
          scheduleObj.current.closeQuickInfoPopup();

          // Open the editor template popup

          setargs(args);
          setEdit(true);
          setAddEmployeeDrawer(true);
        });
      }
    } else {
      args.cancel = true;
      setargs(args);
      setAddEmployeeDrawer(true);
    }
  };

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

    setPending(numberOfDaysBetween - uniqueArray?.length);

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
//  <img src=${icon1} style="width:15px; height:15px; color:red"/>
          const content = `
          <div>
              <div style="display:flex; gap:30px ;">
                  <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
                  <div style="display:flex; gap:5px; align-items: center;">
                  <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>
                 
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
                    // <img  src=${icon2}  style ="width:20px; height:20px;"/> 

          const content = `
            <div>
                <div style="display:flex; gap:30px ;">
                    <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
                    <div style="display:flex; gap:5px">
                    <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>
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
    setargs(args);
    setAddEmployeeDrawer(true);
  };

  const onPopupClose = (args) => {
    // Check if the default popup is closed and handle custom logic
    if (args.type === "Editor" && doubleClick) {
      // Implement logic to open your custom double-click popup here
      // console.log('Default Popup Closed', args);
    }
  };

  // Check if the cell date is before the current date

  // useEffect(() => {
  //     // Cleanup function to reset doubleClick state
  //     return () => {
  //         setDoubleClick(false);
  //     };
  // }, []);

  function onNavigating(args) {
    console.log("args", args);
    const dateObject = new Date(args.currentDate);

    // Get year, month, and day from the parsed date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const day = dateObject.getDate();

    // Calculate the first day of the month
    const firstDayOfMonth1 = new Date(year, month, 1);

    // Calculate the last day of the month
    const lastDayOfMonth1 = new Date(year, month + 1, 0);
    setDate(args.currentDate);

      setfirstDayOfMonthBack(firstDayOfMonth1)
      setlastDayOfMonthBack(lastDayOfMonth1)

    epmloeescdular({
      firstDayOfMonth: firstDayOfMonth1,
      lastDayOfMonth: lastDayOfMonth1,
    });

    //  setDate(new Date(args.currentDate))
    //  setEndDate(new Date(dateObject))
  }

  // useEffect(() => {
  //   epmloeescdular();
  // }, []);

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
  };

  let token = CookieUtil.get("admin_token");
  const handleSave = async (formData, args, form) => {
    // Process the form data and update the scheduler data
    const newEvents = formData.map((item) => {
      console.log("startend_time", item?.start);
      const startTimes = item?.start;

      // Check if startTimes is an array with at least two elements
      const startend_time =
        startTimes && Array.isArray(startTimes) && startTimes.length >= 2
          ? [startTimes[0]?.$d, startTimes[1]?.$d]
          : null;

      return {
        Subject: item.skill,
        client_id: item.client_id,
        project_id: item?.project_id,
        logged_houres: item?.logged_houres,
        startend_time: startend_time,
        StartTime: args?.data ? args?.data.StartTime : args.startTime,
        EndTime: args?.data ? args.data.EndTime : args.endTime,
      };
    });

    if (edit) {
      console.log("args", args);
      await axios
        .put(`${BASE_URL}/events/${args?.data?._id}`, newEvents[0], {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        })
        .then(async (res) => {
          epmloeescdular();
          setAddEmployeeDrawer(false);
          form.resetFields();
          setargs({});
        });
    } else {
      await axios
        .post(`${BASE_URL}/events`, newEvents, {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        })
        .then(async (res) => {
           let params ={
            
             ...firstDatMonthBack && {firstDayOfMonth: firstDatMonthBack},
              ...lastDatMonthBack &&{lastDayOfMonth : lastDatMonthBack,
              }
           } 
          epmloeescdular(params);
          setAddEmployeeDrawer(false);
          form.resetFields();
        });
    }
  };

  const headerOptions = {
    left: "prev,next today",
    center: "",
    right: "month",
  };

  useEffect(() => {
    // Add a class to hide the unwanted header elements
    const headerElements = document.querySelectorAll(
      ".e-toolbar-left .e-btn-group, .e-toolbar-right .e-btn-group"
    );

    headerElements.forEach((element) => {
      element.style.display = "none";
    });
  }, []);

  const [addLogButtonCount, setAddLogButtonCount] = useState(0);

  console.log("kkk", startDatereport);

  const timeDifference = endDatereport.getTime() - startDatereport.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  const onRenderCell = (args) => {
    const cellDate = args.date;

    // Current date
    const endDatereport = new Date();

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
      if (hasEvent) {
        // args.element.classList.remove('e-appointment');
      }

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

        addButton.style.color = "black"; // Set text color

        addButton.addEventListener("click", () => handleAddLog());
        args.element.appendChild(addButton);

        args.element.classList.add("no-event-cell");
      } else {
        if (hasEvent?.status == "publicholiday") {
          args.element.classList.add("publicholiday_color");
        }
        if (hasEvent?.status == "Leave") {
          args.element.classList.add("leave_color");
        }
      }
    }
  };

  // Access the count variable outside the function as needed
  console.log('Total "Add Log" buttons:', daysDifference - addLogButtonCount);

  // ... (remaining code)

  const handleAddLog = (date) => {
    // Handle the logic to add a log for the selected date
    // Open the Add Log form or take any other necessary action
    // For example, you can set state to show a modal or navigate to a different page
  };

  //     function onNavigating(args) {
  //       console.log("args",args)
  //       const dateObject = new Date(args.currentDate);

  //   dateObject.setDate(0);
  //   // Create the first day of the month
  //   const startDate = new Date(dateObject);
  //   dateObject.setMonth(dateObject.getMonth() + 1, 1);

  // // Subtract one day to get the last day of the current month
  // dateObject.setDate(dateObject.getDate() - 1);

  //    console.log("llll",startDate)
  //    console.log("llllend",startDate)
  //    setDate(new Date(args.currentDate))
  //   //  setEndDate(new Date(dateObject))
  //    epmloeescdular()

  //     }

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="card">
          <div className="schedule-control-section">
            <div className="col-lg-12 control-section">
              <div className="control-wrapper">
                <ScheduleComponent
                  width="100%"
                  height="650px"
                  selectedDate={Datereport}
                  ref={scheduleObj}
                  eventSettings={{ dataSource: schedulerData }}
                  popupOpen={onPopupOpen}
                  popupClose={onPopupClose}
                  eventRendered={onEventRendered}
                  eventClick={onEventClick}
                  cellClick={onCellClick}
                  // beforeMonthNavigate={onBeforeMonthNavigate}
                  navigating={onNavigating}
                  headerToolbar={headerOptions}
                  renderCell={onRenderCell}
                  currentView="Month"
                >
                  <ViewsDirective>
                    <ViewDirective option="Month" />
                  </ViewsDirective>

                  <Inject services={[Month]} />
                </ScheduleComponent>
                {/* } */}
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <Drawer
        title="Add Log Hours"
        placement="right"
        closable={true}
        size="medium"
        width={840}
        onClose={onAddEmployeeClose}
        open={openAddEmployeeDrawer}
      >
        <AddLogHoursPopup onSave={handleSave} args={args} edit={edit} />
      </Drawer>
    </>
  );
};

export default TimesheetTable;
