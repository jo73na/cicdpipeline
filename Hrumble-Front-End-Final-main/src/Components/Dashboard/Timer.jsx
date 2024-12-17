import { Button, Modal, Progress, Select } from "antd";
import { useContext,useState,useEffect } from "react";
import MailSend from "./MailSend";

// import SocialNetworkRadialChart from "../../components/Dashboard/elements/SocialNetworkRadialChart";
import { Card } from "react-bootstrap";
import DashboardContext from "../../Providers/DashboardProvider";
import SocialNetworkRadialChart from "../UtlilsComponent/SocialNetworkRadialChart";
import CalenderData from "./Element/CalenderData";

// import Button from 'antd/lib/button'

// import DashboardContext from "../../Providers/DashboardProvider";

const { Option } = Select;

const EmployeeTimeTracker = () => {
  //  const {
  //   setBreakType,
  //   setTotalBreakTime,
  //   setsendbreakLogged,
  //   setsendLogged,
  //   setTotalSeconds,
  //   isBreakModalVisible,
  //   setopenDrawer,
  //   breakloggedsend,
  //   setBreakStartTime,
  //   setIsActive,
  //   setSelectedActivity,
  //   totalSeconds,
  //   setStartTime,
  //   setIsBreakModalVisible,
  //   loggedHours,
  //   targetHours,
  //   totalBreakTime,
  //   selectedActivity,
  //   isActive,
  //   openDrawer,
  //   loggedsend,
    // startTimeSeconds
  //  } = useContext(LoadingContext);
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  // const initialTotalSeconds = currentTime - startTimeSeconds;
  const {
    handleFinsihSend,
    SendLogginDetails

  } =useContext(DashboardContext)
  // console.log("totalBreakTime", totalBreakTime)

  const startTimeSeconds =
  parseInt(localStorage.getItem("loginTime")) || 0;
  console.log("stratime",startTimeSeconds)
  // const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const initialTotalSeconds = currentTime - startTimeSeconds;
    console.log("initailTotal",initialTotalSeconds)
  const storedTotalSeconds =
    parseInt(initialTotalSeconds) || 0;
  const storedIsActive =
    localStorage.getItem("isActive") === "true" ? true : false;
  const storedBreakStartTime =
    parseInt(localStorage.getItem("breakStartTime")) || 0;
  const storedTotalBreakTime =
    parseInt(localStorage.getItem("totalBreakTime")) || 0;
  const storedSelectedActivity =
    localStorage.getItem("selectedActivity") || "None";
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [startTime, setStartTime] = useState(startTimeSeconds);
  const [loggedsend, setsendLogged] = useState("");
  const [breakloggedsend, setsendbreakLogged] = useState("");
  const [isActive, setIsActive] = useState(storedIsActive);
  const [selectedActivity, setSelectedActivity] = useState(
    storedSelectedActivity
  );
  const [breakStartTime, setBreakStartTime] = useState(storedBreakStartTime);
  const [totalBreakTime, setTotalBreakTime] = useState(storedTotalBreakTime);
  const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);
  const [openDrawer, setopenDrawer] = useState(false);
  const [breakType, setBreakType] = useState(null);
  const [targetHours] = useState(10); // Set your target hours
  const [loggedHours, setLoggedHours] = useState(0);

  useEffect(() => {
    let interval;


    if (isActive) {
    
      interval = setInterval(() => {
        setTotalSeconds((prevSeconds) => {
        
          console.log("stratime",startTimeSeconds)
          const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
          const initialTotalSeconds = currentTime - startTimeSeconds;

          const newSeconds = prevSeconds + 1;

          if (selectedActivity === "Break" && newSeconds === breakStartTime) {
            setIsActive(false); // Pause the timer at the start of the break
          }

          if (selectedActivity === "Break" && newSeconds > breakStartTime) {
            setTotalBreakTime((prevBreakTime) => newSeconds - breakStartTime);
          }
    
         localStorage.setItem("totalSeconds", startTimeSeconds ? currentTime-startTimeSeconds :0) 
         
           return initialTotalSeconds+1 ;
        
      
    
     
          // setTotalSeconds(currentTime-startTimeSeconds)
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, selectedActivity, breakStartTime]);

  useEffect(() => {
  
    localStorage.setItem("isActive", isActive.toString());
    localStorage.setItem("breakStartTime", breakStartTime.toString());
    localStorage.setItem("totalBreakTime", totalBreakTime.toString());
    localStorage.setItem("selectedActivity", selectedActivity);
    // localStorage.setItem("startTime", startTime.toString());
  }, [isActive, breakStartTime, totalBreakTime, selectedActivity,startTime]);

  useEffect(() => {
    // Calculate logged hours whenever totalSeconds changes
    const netLoggedSeconds = totalSeconds - totalBreakTime;
    const netLoggedHours = netLoggedSeconds / 3600;
    setLoggedHours(netLoggedHours);
  }, [totalSeconds, totalBreakTime]);
  useEffect(() => {
    if (selectedActivity == "cancel") {
      setIsActive(true);
    }
  }, [selectedActivity]);
  const handleStartPause = () => {
    if (selectedActivity !== "None") {
      // const startTime = Math.floor(Date.now() / 1000);
      setIsActive(!isActive);
  

      setSelectedActivity("cancel");
      setBreakStartTime(totalSeconds);
      setBreakType(null);
    } else {
      setIsActive(!isActive);
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
      localStorage.setItem("loginTime", currentTime.toString());
      localStorage.setItem("loginhour", new Date().toLocaleTimeString());
      SendLogginDetails({
         loginTime:currentTime.toString(),
         loginhour:new Date().toLocaleTimeString()
      })

      setSelectedActivity("None");
    }
  };

  const handleBreakClick = () => {
    if (selectedActivity !== "Break") {
      setIsBreakModalVisible(true);
    } else {
      setIsActive(!isActive); // Pause the timer only if not already in "Break" mode
      setSelectedActivity("cancel");
    }
  };

  const handleBreakTypeSelection = (selectedType) => {
    setBreakType(selectedType);
    // setBreakStartTime(totalSeconds);
    // Resume the timer after break type selection
    // setIsBreakModalVisible(false);
  };

  const handleLogoutClick = () => {
    handlesend()
    // setopenDrawer(true);
  };
  const showBreakModal = () => {
    setIsBreakModalVisible(true);
  };

  const handleBreakModalOk = () => {
    setIsActive(true);
    // setIsActive(false); // Pause the timer only if not already in "Break" mode
    setBreakStartTime(totalSeconds);
    setSelectedActivity("Break");

    setIsBreakModalVisible(false);
  };

  const handleBreakModalCancel = () => {
    setIsBreakModalVisible(false);
    // setSelectedActivity('cancel');
  };

  const formatTime = (seconds) => {
     console.log("seconds",seconds)
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return ` ${hours < 10 ? `0${hours}` : hours} :${
      minutes < 10 ? `0${minutes}` : minutes
    } : ${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const percentage = (loggedHours / targetHours) * 100;
   const handlesend=()=>{
    setIsActive(false);
    const loginhour =localStorage.getItem("loginhour")
    const storedTotalBreakTime =
      parseInt(localStorage.getItem("totalBreakTime")) || 0;
    const storedTotalSeconds =
      parseInt(localStorage.getItem("totalSeconds")) || 0;

    // Subtract break time from total logged time
    const netLoggedSeconds = storedTotalSeconds - storedTotalBreakTime;

    // Convert seconds to HH:MM:SS format for break time
    const breakHours = Math.floor(storedTotalBreakTime / 3600);
    const breakMinutes = Math.floor((storedTotalBreakTime % 3600) / 60);
    const breakSeconds = storedTotalBreakTime % 60;

    // Convert seconds to HH:MM:SS format for total logged hours
    const hours = Math.floor(netLoggedSeconds / 3600);
    const minutes = Math.floor((netLoggedSeconds % 3600) / 60);
    const seconds = netLoggedSeconds % 60;

    // Display or handle the results as needed
    console.log(
      `Break Timings: ${breakHours} hours, ${breakMinutes} minutes, ${breakSeconds} seconds`
    );
    console.log(
      `Total Logged Hours: ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    );
    console.log(` ${hours} : 0 ${minutes} , ${seconds}`);
    console.log(` ${hours < 10 ? `0${hours}` : hours} :${
      minutes < 10 ? `0${minutes}` : minutes
    } 
  `);
    // Reset the state and localStorage
    
   
    let senddata={
      // ...send,
      loginhour,
      logouthour:new Date().toLocaleTimeString(),
      total_logged_hours: `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`,
      break_logged_hours: `${breakHours < 10 ? `0${breakHours}` : breakHours}:${
        breakMinutes < 10 ? `0${breakMinutes}` : breakMinutes
      }`,

    }

    handleFinsihSend(senddata )
    setTotalSeconds(0);
    setBreakStartTime(0);
    setTotalBreakTime(0);
    setBreakType(null);
    setSelectedActivity("None");
    setIsActive(false);
    setIsBreakModalVisible(false);
    localStorage.setItem("isActive", "false");
    localStorage.setItem("totalSeconds", "0");
    localStorage.setItem("breakStartTime", "0");
    localStorage.setItem("totalBreakTime", "0");
    localStorage.setItem("selectedActivity", "None");
    localStorage.setItem("loginhour", "None");
    localStorage.setItem("loginTime", "0");
   
   }


   const smallCard = [
    {title:'Target', price:'55', icon:'up', color:'success'},
    {title:'Last week', price:'15', icon:'down', color:'danger'},
    {title:'Last Year', price:'85', icon:'up', color:'success'},
];
   
   console.log("percentage",Math.round(percentage,2))
  return (
    <div className="card">
    <Card.Header className="card-header flex-wrap border-0">
                              <div>
            <h4 className="heading mb-0">Today’s Activity</h4>                
    
                                {/* <Card.Title>Default Accordion</Card.Title>
                                <Card.Text className="m-0 subtitle">
                                  Default accordion. Add <code>accordion</code> class in root
                                </Card.Text> */}
                              </div> 
    
                              {/* <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                                  <Nav.Item as="li" className="nav-item" role="presentation">
                                    <Nav.Link as="button"  type="button" eventKey="Preview">Your</Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item as="li" className="nav-item" >
                                    <Nav.Link as="button"  type="button" eventKey="Code">Team</Nav.Link>
                                  </Nav.Item>
                              </Nav> */}
                              {isActive !== true ? (
                                 <button to className="btn btn-primary btn-sm ms-2"
                                   onClick={handleStartPause}
                               >Log In
                               </button>)
                               :
                             <>
                                    <button className="btn btn-warning btn-sm " onClick={handleBreakClick}>
                  {selectedActivity === "Break" ? "Cancel Break" : " Take Break"}
                </button> 
                <button  className="btn btn-danger btn-sm " onClick={handleLogoutClick}>
                  Logout
                </button> 
                             </>
                               }
                          </Card.Header>
        <div className="card-body py-0">
                           
        <div>
          {selectedActivity === "Break" ? (
            <>
              <div
                style={{
                  position: "relative",
                  marginLeft: "30px",
                }}
              >
                <SocialNetworkRadialChart percentage ={percentage} />
                <p className="dashborad_timer">{formatTime(totalBreakTime)}</p>
                {/* <Progress
                  type="circle"
                  percent={percentage}
                  size={[140]}
                  status="active"
                  strokeWidth={10}
                  strokeColor=""
                /> */}
              </div>
            
            </>
          ) : (
            <>
              <div
               className=""
               
              >
                <SocialNetworkRadialChart percentage={Math.round(percentage,2)} />
                
              </div>
              <div className="text-center"
                style ={{
                 
              
                 }}>
                     <h3 className="mb-0 text-primary">{formatTime(totalSeconds)}</h3>
                     
                 </div>
              <div className="">
                {isActive !== true ? (
                  ""
                  // <button   className="btn btn-primary btn-sm " onClick={handleStartPause}>
                  //   Login
                  // </button>
                ) : (
                  " "
                )}
                {/* <button className="btn btn-warning btn-sm " onClick={handleBreakClick}>
                  {selectedActivity === "Break" ? "Cancel Break" : " Take Break"}
                </button> */}
                {/* <button  className="btn btn-danger btn-sm " onClick={handleLogoutClick}>
                  Logout
                </button> */}
                  
    
    
    
              </div>
              <Modal
                title="Select Break Type"
                visible={isBreakModalVisible}
                onOk={handleBreakModalOk}
                // okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: "none" } }}
                onCancel={handleBreakModalCancel}
              >
                <Select
                  defaultValue="Lunch"
                  style={{ width: 120 }}
                  onChange={handleBreakTypeSelection}
                >
                  <Option value="Lunch">Lunch</Option>
                  <Option value="Break">Break</Option>
                </Select>
              </Modal>
            </>
          )}

<div className="row mt-4">
                                     
                                     <div className="col-xl-6 col-lg-6 col-sm-4 tg-base" >
                                     <div className="card text-center">
                                         <div className="card-body p-2">
                                             <span className="mb-1 d-block">Total Log Hours</span>
                                             <h4 className="mb-0">
                                                 <p className={`text-primary`}>{formatTime(totalSeconds)}</p>
                                             </h4>
                                         </div>
                                     </div>
                                 </div>
                                    <div className="col-xl-6 col-lg-6 col-sm-4 tg-base">
                                        <div className="card text-center">
                                            <div className="card-body p-2">
                                                <span className="mb-1 d-block">Total Break Hours</span>
                                                <h4 className="mb-0">
                                                    <p className={` me-1 fa-arrow`}>{formatTime(totalBreakTime)}</p>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                             
              
            </div>
    
          {/* Display the progress bar */}
          {/* <div style={{ marginTop: '20px' }}>
            <p>Progress: {loggedHours.toFixed(2)} / {targetHours} hours</p>
            <div
              style={{
                width: '100%',
                background: '#ddd',
                height: '20px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: 'green',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease-in-out', // Add transition for a smooth effect
                }}
              ></div>
            </div>
          </div> */}
          <Modal
            width={800} // Set your desired width value
            height={900}
            title={`Send Report`}
            open={openDrawer}
            onCancel={() => setopenDrawer(false)}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <MailSend
              // loggedsend={loggedsend}
              // breakloggedsend={breakloggedsend}
              handlesend={handlesend}
              // setopenDrawer={setopenDrawer}
            />
    
            {/* <UploadDocuments handleCancel={handleCancel} isModalOpen={isModalOpen} valueprops={valueprops} onClose={onClose} showModal={showModal}/> */}
          </Modal>
          {/* <Model
        title="Send Report"
        placement="right"
        onClose={()=>setopenDrawer(false)}
        closable={openDrawer}
        size="large"
        
        open={openDrawer}
        height={50}
       
        
      >
        <MailSend loggedsend={loggedsend} breakloggedsend={breakloggedsend}/>
      </Model> */}
        </div>
           
           
        </div>
        
    </div>
    
    
  );
};



export default EmployeeTimeTracker;

