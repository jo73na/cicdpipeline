import React, { useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Providers/Theme/index";
import { SVGICON } from "../Utils/SVGICON";
import logo from "/images/Hricon.svg";

const NavHader = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogoClick = useCallback((e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/dashboard");
  }, [navigate]);

  const handleToggleSidebar = useCallback((e) => {
    e.preventDefault(); // Prevent default link behavior
    toggleSidebar();
  }, [toggleSidebar]);

  return (
    <div
      className={`nav-header transition-all duration-300`}
      style={{
        width: isSidebarOpen ? '199px' : '79px', // Dynamic width based on sidebar state
        height: '65px', // Match the height of the HeaderBar
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
          className="transition-all duration-300"
          width={isSidebarOpen ? 50 : 30} 
        />
      </Link>

      <div
        className="nav-control cursor-pointer"
        onClick={handleToggleSidebar}
      >
        <div className={`hamburger transition-all duration-300 ${isSidebarOpen ? "is-active" : ""}`}>
          <span className="line">{SVGICON.NavHeaderIcon}</span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;