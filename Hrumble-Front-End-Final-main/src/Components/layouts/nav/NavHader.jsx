import React, { useContext, useState } from "react";
// import { useDispatch , useSelector } from 'react-redux';
/// React router dom
import { Link } from "react-router-dom";

import { SVGICON } from "../../../Utils/SVGICON";
import { ThemeContext } from "../../../Providers/Theme";


// import { navtoggle } from "../../../store/actions/AuthActions";
// import logo from "../../../images/logo/download (1).jpg"


const NavHader = () => {
  
  const {  openMenuToggle } = useContext(
    ThemeContext
  );


  const sideMenu = true;
  const handleToogle = () => {
    // dispatch(navtoggle());
  };
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo"> 
         {/* <img src={logo} width="50" height="50"/> */}
          {/* {SVGICON.MainLogo} */}
				  {/* {SVGICON.logotitle} */}
           {/* <p>Sathish</p> */}
          Techno Ladders
      </Link>

      <div
        className="nav-control"
        onClick={() => {          
          openMenuToggle();
          handleToogle()
        }}
      >
        <div className={`hamburger ${sideMenu ? "is-active" : ""}`}
          
        >
          <span className="line">
						{SVGICON.NavHeaderIcon}
					</span>        
        </div>
      </div>
    </div>
  );
};

export default NavHader;
