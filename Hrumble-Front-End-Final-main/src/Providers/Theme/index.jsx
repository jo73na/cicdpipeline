import React, { createContext, useEffect, useState, useReducer, useCallback } from "react";

export const ThemeContext = createContext();
const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  sideBarStyle: { value: "full", label: "Full" },
  sidebarposition: { value: "fixed", label: "Fixed" },
  headerposition: { value: "fixed", label: "Fixed" },
  sidebarLayout: { value: "vertical", label: "Vertical" },
  contentColor: "#F3F0EC",
  primaryColor: "#88a67e",
  secondaryColor: "color_1",
  navigationHader: "#343A40",
  haderColor: "#343A40",
  sidebarColor: "#343A40",
  background: { value: "light", label: "Light" },
  containerPositionSize: { value: "wide-boxed", label: "Wide Boxed" },
  iconHover: false,
  menuToggle: false,
  windowWidth: 0,
  windowHeight: 0,
};

const ThemeContextProvider = (props) => {
  const [sidebariconHover, setSidebariconHover] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);	
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    sideBarStyle, 
    sidebarposition,
    headerposition,
    sidebarLayout,
    primaryColor, 
    secondaryColor,
    navigationHader, 
    haderColor,
    sidebarColor,
    background,
    containerPositionSize,
    iconHover,    
    menuToggle,
    windowWidth,
    windowHeight,
    contentColor,
  } = state;

  const body = document.querySelector("body");  
  
  // Improved toggle sidebar function with prevention of multiple rapid toggles
  const toggleSidebar = useCallback(() => {
    // Prevent multiple rapid toggles
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const ChangeIconSidebar = (value) => {
    if(sideBarStyle.value === "icon-hover"){
      setSidebariconHover(value);
    }
  };
  
  const openMenuToggle = () => {    
    sideBarStyle.value === "overly"  
      ? dispatch({menuToggle: true})
      : dispatch({menuToggle: false});
  };

  const changeBackground = (name) => {
    body.setAttribute("data-theme-version", name.value);
    dispatch({background: name});
  };
  
  useEffect(() => {
    const resizeWindow = () => {
      dispatch({ 
        windowWidth: window.innerWidth, 
        windowHeight: window.innerHeight 
      });

      // Responsive sidebar style
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        body.setAttribute("data-sidebar-style", "mini");
      } else if (window.innerWidth <= 768) {
        body.setAttribute("data-sidebar-style", "overlay");
      } else {
        body.setAttribute("data-sidebar-style", "full");
      }
    };
    
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [dispatch]);
  
  return (
    <ThemeContext.Provider
      value={{
        body,       
        sidebarposition,        
        primaryColor,
        secondaryColor,
        navigationHader,
        windowWidth,
        windowHeight,       
        sideBarStyle,               
        headerposition,        
        sidebarLayout,        
        haderColor,       
        sidebarColor,
        iconHover,
        ChangeIconSidebar,
        menuToggle,
        sidebariconHover,
        openMenuToggle,
        changeBackground,
        background,
        containerPositionSize,	
        contentColor, 
        isSidebarOpen, 
        toggleSidebar,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;