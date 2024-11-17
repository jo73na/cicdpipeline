import { useEffect, useState } from "react";

// import { FaqApi } from '../../api';
import Context from "./index";
import axios from "axios";
import { BASE_URL } from "../../Utils/api";
import CookieUtil from "../../Utils/Cookies";

const LoadingProvider = (props) => {
  const token =CookieUtil.get("admin_token")

  const [Loading, setLoading] = useState(true);
  const [colorprimary,setColorPrimary ]=useState("green")
  const [colorseondary,setColorSecondary ]=useState("green")
  const startTimeSeconds =
  parseInt(localStorage.getItem("loginTime")) || 0;
  console.log("stratime",startTimeSeconds)
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
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






 // Run effect only once on component mount


  return (
    <Context.Provider
      value={{
        ...props,

        Loading,
        setIsActive,
        setLoading,
        setSelectedActivity,
        totalSeconds,
        setIsBreakModalVisible,
        loggedHours,
        targetHours,
        selectedActivity,
        loggedsend,
        isActive,
        breakloggedsend,
        setopenDrawer,
        isBreakModalVisible,
        setTotalSeconds,
        setBreakType,
        setTotalBreakTime,
        setsendbreakLogged,
        setsendLogged,
        setBreakStartTime,
        breakType,
        totalBreakTime,
        setStartTime,  
        openDrawer,
        colorprimary,
        colorseondary,
        startTimeSeconds,
       
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default LoadingProvider;
