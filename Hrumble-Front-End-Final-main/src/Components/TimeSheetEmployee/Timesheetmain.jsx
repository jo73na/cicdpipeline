
import { useRef, useState, useEffect, useContext } from 'react';
import { Drawer, Tabs, theme , Layout,Progress } from 'antd';




import CookieUtil from '../../Utils/Cookies';
// import { applyCategoryColor } from './helper';
// import * as dataSource from './datasource.json';


import FaqContext from '../../Providers/Faq';


/**
 * Schedule editor custom fields sample
 */
const TimesheetMain = () => {
  // const [schedulerData, setSchedulerData] = useState([]);
  const {schedulerData,epmloeescdular}=useContext(FaqContext)
  const [args, setargs] = useState();
  // const [count, setCount] = useState(0);
  

    const scheduleObj = useRef(null);
    const data = [];

    // Use state variable to track double-click
    const [doubleClick, setDoubleClick] = useState(false);
    const [openAddEmployeeDrawer, setAddEmployeeDrawer] = useState(false);



    const onAddEmployeeClose = () => {
      setAddEmployeeDrawer(false);
    };

    const onPopupOpen = (args) => {
      if (args.type === 'QuickInfo') {
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
        const editButton = args.element.querySelector('#editButton');
        if (editButton) {
          editButton.addEventListener('click', () => {
            // Close the current quick info popup
            scheduleObj.current.closeQuickInfoPopup();
  
            // Open the editor template popup
            setargs(args);
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

     console.log('onEventRendered',schedulerData)
     console.log('onEventRendered1',args)
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Create a new Date object for the first day of the current month
      const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
      
      // Calculate the difference in days between the first day of the current month and the current date
      const timeDifference = currentDate.getTime() - firstDayOfCurrentMonth.getTime();
      const numberOfDaysBetween = Math.ceil(timeDifference / (1000 * 3600 * 24));
      let orignal=[]
      let backdata=[]
      schedulerData.map((item)=>{
        const dateString = item.StartTime;
const dateObject = new Date(dateString);

// Get the day of the month
const dayOfMonth = dateObject.getDate();
backdata.push(dayOfMonth)
      })

       console.log("backData",backdata)
     for( let i=1;i<=numberOfDaysBetween;i++) {
     
      const eventElement = args.element;

      const clientName = args.data.Client;
      const projectName = args.data.project_id?.project_name;
      const logged_houres = args.data.logged_houres;
     
      const content = `
        <div>
            <div style="display:flex; gap:30px ;">
                <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
                <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>


               
            </div>
        </div>
      `;

      eventElement.innerHTML = content;


     
    
    //   // Set the content inside the event element
    //  eventElement.innerHTML = content;
         
      //  if(backdata.includes(i)){

      //  const eventElement = args.element;

      //   const clientName = args.data.Client;
      //   const projectName = args.data.project_id?.project_name;
      //   const logged_houres = args.data.logged_houres;
       
      //   const content = `
      //     <div>
      //         <div style="display:flex; gap:30px ;">
      //             <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
      //             <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>
  
  
                 
      //         </div>
      //     </div>
      //   `;
  
       
      
      //   // Set the content inside the event element
      //  eventElement.innerHTML = content;
          
      //  }
      //  else{
      //   console.log("i",i,args)
      //   const eventElement = args.element;

      //   const clientName = args.data.Client;
      //   const projectName = args.data.project_id?.project_name;
      //   const logged_houres = args.data.logged_houres;
       
      //   const content = `
      //     <div>
      //         <div style="display:flex; gap:30px ;">
      //             <p style="font-weight: bold; font-size: 14px; color: #333;">${projectName} </p>
      //             <p style="font-weight: bold; font-size: 14px; color: #333;">${logged_houres}</p>
  
  
                 
      //         </div>
      //     </div>
      //   `;
  
       
      
      //   // Set the content inside the event element
      //  eventElement.innerHTML = content;
      //   // args.element.innerHTML ="Sathish"
      //  }
        //  if()
     }

     console.log("orignal",orignal);
      
    
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

    const onPopupClose = (args) => {
        // Check if the default popup is closed and handle custom logic
        if (args.type === 'Editor' && doubleClick) {
            // Implement logic to open your custom double-click popup here
            // console.log('Default Popup Closed', args);
        }
    };

 
      // Check if the cell date is before the current date
   
  

 

  //   useEffect(() => {
  // let id = CookieUtil.get("admin_id")
  // epmloeescdular()
  //     // let params={
  //     //   employee_id:id
  //     // }
  //     // // Cleanup function to reset doubleClick state
  //     //  axios.get(`${BASE_URL}/events`,{params}).then((res)=>{
  //     //   setSchedulerData(res.data.data);
  //     //  })
      
  // },[]); 

  
    const onBeforeMonthNavigate = (args) => {
      // Disable weekends (Saturdays and Sundays)
      const currentDate = args.currentDate;
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
          const dayOfWeek = date.getDay();
          if (dayOfWeek === 0 /* Sunday */ || dayOfWeek === 6 /* Saturday */) {
              args.isDisabled = true;
              break;
          }
      }
  };

  const houresfunction=(loggedhoues)=>{    
   
 console.log("loggedhoueres",loggedhoues)
// Parse the date string
const inputDate = new Date(loggedhoues?.$d);

// Extract hours and minutes
const hours = inputDate.getHours();
const minutes = inputDate.getMinutes();

// Format the time as HH:mm
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

console.log(formattedTime);  // Output: 08:19

// Extract hours and minutes


console.log(formattedTime);

return formattedTime;
  }
  let token = CookieUtil.get("admin_token")
  // const handleSave = (formData,args) => {
  //   // Process the form data and update the scheduler data
  //   const newEvents = formData.map((item) => ({
  //     Id: new Date().getTime(), // Generate a unique ID
  //     Subject: item.skill,
  //     client_id:item.client_id,
  //     project_id:item?.project_id,
  //     logged_houres:houresfunction(item?.logged_houres), // Set the skill as the event subject (you can adjust this)
  //     StartTime: args.data.StartTime, // Set the start time as the current time (you can adjust this)
  //     EndTime: args.data.EndTime, // Set the end time as the current time (you can adjust this)
  //   }));

  //   console.log("newwvnets",newEvents)

  //  axios.post("http://localhost:8080/api/v1/events",newEvents,
  //  {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     // Other headers if needed
  //   },})

  //   axios.get("http://localhost:8080/api/v1/events").then((res)=>{
  //     setSchedulerData(res.data.data);
  //    })
  //   setAddEmployeeDrawer(false);
  // };

  const headerOptions = {
    left: 'prev,next today',
    center: '',
    right: 'month',
  };


    // Run the cleanup function only once when the component mounts
    const currentDate = new Date();
    // Define count outside the function
    const [addLogButtonCount, setAddLogButtonCount] = useState(0);
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-18');
    const timeDifference = endDate.getTime() - startDate.getTime();
const daysDifference = timeDifference / (1000 * 3600 * 24);

// const onRenderCell = (args) => {
//   const cellDate = args.date;
//   const currentDate = new Date(); // Current date


// // Convert the difference to days

//   // Check if the cell date is within the specified range
//   const isWithinRange = cellDate >= startDate && cellDate <= endDate;

//   // Check if the cell is a body cell and not a header cell
//   const isBodyCell = args.element.classList.contains('e-work-cells');
 
//   if (isWithinRange && isBodyCell) {
//     // Check if there is an event for the current cell date
//     const hasEvent = schedulerData.some((event) => {
//       const eventDate = new Date(event.StartTime);
//       return (
//         eventDate.getDate() === cellDate.getDate() &&
//         eventDate.getMonth() === cellDate.getMonth() &&
//         eventDate.getFullYear() === cellDate.getFullYear()
//       );
//     });
   
//     if (hasEvent) {
//       return  (
//         setAddLogButtonCount((prevCount) => prevCount + 1)
        
//       )
//       //  return setAddLogButtonCount((prevCount) => prevCount + 1);
//       // Show events in the cell
      
//     } else {
//       // Show "Add Log" button in the cell
    
//       const addButton = document.createElement('button');
   
//       addButton.textContent = 'Add Log';
//       addButton.addEventListener('click', () => handleAddLog(cellDate));
//       args.element.appendChild(addButton);
      
//     }

//   }
// };

const onRenderCell = (args) => {
  const cellDate = args.date;
  const currentDate = new Date(); // Current date


// Convert the difference to days

  // Check if the cell date is within the specified range
  const isWithinRange = cellDate >= startDate && cellDate <= endDate;

  // Check if the cell is a body cell and not a header cell
  const isBodyCell = args.element.classList.contains('e-work-cells');
 
  if (isWithinRange && isBodyCell) {
    // Check if there is an event for the current cell date
    const hasEvent = schedulerData.some((event) => {
      const eventDate = new Date(event.StartTime);
      return (
        eventDate.getDate() === cellDate.getDate() &&
        eventDate.getMonth() === cellDate.getMonth() &&
        eventDate.getFullYear() === cellDate.getFullYear()
      );
    });
   
    if (hasEvent) {
      return  (
        setAddLogButtonCount((prevCount) => prevCount + 1)
        
      )
      //  return setAddLogButtonCount((prevCount) => prevCount + 1);
      // Show events in the cell
      
    } else {
      // Show "Add Log" button in the cell
     
      
      const addButton = document.createElement('button');
   
      addButton.textContent = ' + Add Log';
     addButton.style.display = 'inline-flex';
 addButton.style.border = 'none';
 addButton.style.padding = '12px 16px';
 addButton.style.justifyContent = 'end';
 addButton.style.marginLeft = '30px';
 addButton.style.alignItems = 'end';
 addButton.style.gap = '8px';
 addButton.style.borderRadius = '8px';
 addButton.style.background = "rgba(225, 1, 2, 0.10)";

addButton.style.color = 'black'; // Set text color
      addButton.addEventListener('click', () => handleAddLog(cellDate));
      args.element.appendChild(addButton);
      
    }

  }
};


// Access the count variable outside the function as needed

  
    // ... (remaining code)
  
    
    
    const handleAddLog = (date) => {
      // Handle the logic to add a log for the selected date
      // Open the Add Log form or take any other necessary action
      // For example, you can set state to show a modal or navigate to a different page
      console.log('Add Log clicked for date:', date);
    };

    const [scheduler, setScheduler] = useState(
   );

    // useEffect(() => {

    //   // console.log("scdular",schedulerData)
    //   // alert(schedulerData)
    //    if(schedulerData.length>0){
    //     setScheduler(
    //       <ScheduleComponent
    //         width='100%'
    //         height='650px'
    //         selectedDate={currentDate}
    //         ref={scheduleObj}
    //         eventSettings={{ dataSource: schedulerData }}
    //         popupOpen={onPopupOpen}
    //         popupClose={onPopupClose}
    //         eventRendered={onEventRendered}
    //         eventClick={onEventClick}
    //         cellClick={onCellClick}
    //         beforeMonthNavigate={onBeforeMonthNavigate}
    //         headerToolbar={headerOptions}
    //         renderCell={onRenderCell}
    //         currentView='Month'
    //       >
    //         <ViewsDirective>
    //           <ViewDirective option='Month' />
    //         </ViewsDirective>
    
    //         <Inject services={[Month]} />
    //       </ScheduleComponent>
    //     );
    //    }
    // }, [schedulerData]);
    

    // console.log('Add Log clicked for date:', count);
    return (
      <TimesheetMain schedulerData={schedulerData}/>

       

      
     
    );
};

export default TimesheetMain;


