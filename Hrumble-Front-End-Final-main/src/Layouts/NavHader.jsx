import React, { useState,useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Providers/Theme/index";
import { SVGICON } from "../Utils/SVGICON";
import logo from "/images/Hricon.svg";



const NavHader = ({toggleSideBar,collapsed}) => {
  const {  body,       
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
    isSidebarOpen}
 =useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogoClick = useCallback((e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/dashboard");
  }, [navigate]);




  return (
    <div
      className={`nav-header`}
      style={{
        width: collapsed ? '200px' : '80px', 
        height: '60px',
        backgroundColor:navigationHader,
      }}
    >
      <Link 
        to="/dashboard" 
        onClick={handleLogoClick} 
        className="brand-logo block"
      >
        <img 
          src={logo} 
          alt="logo" 
          
          width={collapsed ? 40 : 30} 
        />
      </Link>

      <div
        className="nav-control cursor-pointer "
        onClick={toggleSideBar}
      >
        <div className={`hamburger ${collapsed ? "is-active" : ""}`}>
          <span className="line">{SVGICON.NavHeaderIcon}</span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;