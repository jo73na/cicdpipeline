import { lazy, useContext, useState, useEffect } from "react";
import {HeatMapOutlined, PoweroffOutlined, PlusOutlined, ReconciliationOutlined, UserOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "/images/Hricon.svg" ;
import Male from  "/images/male.png" ;
import SpaceLogo from  "/images/Space.png" ;
import FeMale from  "/images/women.png" ;
import ToggleLogo from "/images/Toggle.svg";
import JobsLogo from "/images/Hricon.svg";
import DashboardLogo from "/images/Dashboard.svg";
import clientlogo from "/images/Hricon.svg";
import Accountslogo from "/images/Hricon.svg";

import candidatesLogo from "/images/UserManagement.svg";
import TimesheetLogo from "/images/TimeSheet.svg";
import LeavesLogo from "/images/Leaves.svg";
import LeadsLogo from "/images/Leaves.svg";
import ProfileLogo from "/images/Profile.svg";
import Invoicelogo from "/images/Invoice.svg";
import Settingslogo from "/images/Settings.svg";
import Companylogo from "/images/CompanyIcon.svg";
import InvoiceLogo from "/images/InvoiceIcon.svg";
import ExpenseLogo from "/images/ExpenseIcon.svg";
import TeamLogo from "/images/Teamicon.svg";
import GoalLogo from "/images/target-account.svg";
import TaskLogo from "/images/target-account.svg";
import UsermanagementLogo from "/images/target-account.svg";
import ContactsLogo from "/images/target-account.svg";


import { BellOutlined, MoreOutlined } from "@ant-design/icons";
import Cookies from "../Utils/Cookies";
import CookieUtil from "../Utils/Cookies";
import UserManagementContext from "../Providers/UserMangement";
import {ThemeContext} from "../Providers/Theme/index"
import NavHader from "./NavHader";
import HeaderBar from "./HeaderBar";
import { SVGICON } from "../Utils/SVGICON";
import { DashboardOutlined, WorkOutlineOutlined, PersonSearchOutlined, UploadFileOutlined, DescriptionOutlined, EditCalendarOutlined, CalendarMonthOutlined, AccountBalanceOutlined, Diversity3Outlined, ContactsOutlined, TrackChangesOutlined,
  FolderOutlined, ManageAccountsOutlined, SettingsOutlined, ApartmentOutlined, ReceiptLongOutlined, HailOutlined, AttachMoneyOutlined, PercentOutlined, TaskAltOutlined
 } from '@mui/icons-material';


// import { BASE } from "../Utils/api";
const { Header, Content, Sider } = Layout;

const BASE = import.meta.env.VITE_BASE;

const MobileMenu = lazy(() => import("../Layouts/MobileMenu"));

const SideBar = ({collapsed}) => {
    const location = useLocation();
    const currentPath = location.pathname; 
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
        contentColor, toggleSideBar,
        isSidebarOpen}
     =useContext(ThemeContext);
    const { permission } = useContext(UserManagementContext);
  
    
    const [openKeys, setOpenKeys] = useState([]);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
      const updateView = () => {
        setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed
      };
  
      updateView(); // Initial check
      window.addEventListener("resize", updateView);
      return () => window.removeEventListener("resize", updateView);
    }, []);
  
    // Function to handle sidebar toggle in mobile view
    const handleToggle = () => {
      toggleSideBar(!isSidebarOpen);
    };
  
    
    function getItem(label, key, icon, children) {
      return {
        key,
        icon,
        children,
        label,
      };
    }
  
    let role = CookieUtil.get("role");
  
    const menu = [];
  
    if (role !== "Vendor" && role !== "Client") {
      menu.push(
        getItem(
          <Link to="/dashboard">
            <span >Dashboard</span>
          </Link>,
          "/dashboard",
          <span className="sidebar-icon">
          <DashboardOutlined style={{ fontSize: '18px' }} />
        </span>
        )
      );
    }
  
    const IconMapping = {
      JobsLogo,
      clientlogo,
      candidatesLogo,
      TimesheetLogo,
      LeavesLogo,
      ProfileLogo,
      Accountslogo,
      Invoicelogo,
      PlusOutlined,
      Settingslogo,
      Companylogo,
      UserOutlined,
      FolderOpenOutlined,
      LeadsLogo,
      ExpenseLogo,
      SpaceLogo,
      TeamLogo,
      GoalLogo,
      TaskLogo,
      UsermanagementLogo,
      Invoicelogo,
      ContactsLogo
    };
  
    permission?.forEach((item, i) => {
      menu.push(
        getItem(
          item?.children?.length === 0 ? (
            <Link to={`${item.path}`}>
              <span>{item.name}</span>
            </Link>
          ) : (
            <span >{item.name}</span>
          ),
          `${item.path}`, // Use the path as the key
           <span className="sidebar-icon">
         { item.icon === "PlusOutlined" ? (
            <UploadFileOutlined style={{fontSize: '18px'}} />
          ) : item.icon === "UserOutlined" ? (
            <UserOutlined />
          ) : item.icon === "account" ? (
            <HeatMapOutlined />
          ) : item.icon === "FolderOpenOutlined" ? (
            <FolderOutlined style={{fontSize: '18px'}}/>
          ) : item.icon === "ReconciliationOutlined" ? (
            <DescriptionOutlined style={{fontSize: '18px'}} />
          ) :  item.icon === "JobsLogo" ? (
            <WorkOutlineOutlined style={{fontSize: '18px'}}/>
          ) : item.icon === "candidatesLogo" ? (
            <PersonSearchOutlined style={{fontSize: '18px'}}/>
          ) : item.icon === "TimesheetLogo" ? (
            <EditCalendarOutlined style={{fontSize: '18px'}}/>
          ) :  item.icon === "LeavesLogo" ? (
            <CalendarMonthOutlined style={{fontSize: '18px'}}/>
          ) : item.icon === "Accountslogo" ? (
            <AccountBalanceOutlined style={{fontSize: '18px'}}/>
          ) : item.icon === "LeadsLogo" ? (
            <Diversity3Outlined style={{fontSize: '18px'}}/>
          ) : item.icon === "GoalLogo" ? (
            <TrackChangesOutlined style={{fontSize: '18px'}}/>
          ) : item.icon === "UsermanagementLogo" ? (
            <ManageAccountsOutlined style={{fontSize: '18px'}}/>
          ) : item.icon === "Settingslogo" ? (
            <SettingsOutlined style={{fontSize: '18px'}}/>
          ) :  item.icon === "clientlogo" ? (
            <HailOutlined style={{fontSize: '18px'}}/>
          ):  item.icon === "TaskLogo" ? (
            <TaskAltOutlined style={{fontSize: '18px'}}/>
          )  : (
            <img
              style={{
                width: "24px",
                height: "24px",
              }}
              src={IconMapping[item.icon]}
            />
          )}
          </span>, 
          item?.children?.length > 0 &&
            item.children.map((subItem) =>
              getItem(
                <Link to={`${subItem.path}`}>
                  <span>{subItem.name}</span>
                </Link>,
                `${subItem.path}`,
                <span className="sidebar-icon">
                {subItem.icon === "PlusOutlined" ? (
                  <PlusOutlined />
                ) : subItem.icon === "UserOutlined" ? (
                  <UserOutlined />
                ) : subItem.icon === "account" ? (
                  <HeatMapOutlined />
                ) : subItem.icon === "FolderOpenOutlined" ? (
                  <FolderOpenOutlined />
                ) : subItem.icon === "ReconciliationOutlined" ? (
                  <ReconciliationOutlined />
                ) : subItem.icon === "Invoicelogo" ? (
                  <ReceiptLongOutlined style={{fontSize: '18px'}} />
                ) : subItem.icon === "ExpenseLogo" ? (
                  <AttachMoneyOutlined style={{fontSize: '18px'}} />
                ) : subItem.icon === "Companylogo" ? (
                  <ApartmentOutlined style={{fontSize: '18px'}}/>
                ) : subItem.icon === "ContactsLogo" ? (
                  <ContactsOutlined style={{fontSize: '18px'}}/>
                ) : (
                  <img
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                    src={IconMapping[subItem.icon]}
                  />
                )}
                </span>,
              )
            )
        )
      );
    });
  
    return (
      <>
      {isMobileView && !collapsed && (
        <div
          className="mobile-overlay"
          onClick={handleToggle}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      )}
      <Sider
        collapsed={!collapsed}
        // onCollapse={(value) => setCollapsed(value)}
        // width={200}
        className="desktop_menu"
        style={{backgroundColor: sidebarColor,
          display: isMobileView && !isSidebarOpen ? "none" : "block",
          position: isMobileView ? "fixed" : "relative",
          zIndex: isMobileView ? 1000 : "auto",
          height: "100vh",}}
      >
      
          <Menu    
            items={menu}
            mode="inline"
            selectedKeys={[currentPath]} 
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)} 
            theme="light"
            style={{
              height: "100%",
              backgroundColor: "transparent", 
              borderRight: "none",
              overflowY: "auto", 
              // overflowX: "hidden", 
            }}
          />
       
      </Sider>
      </>
    );
  };
export default SideBar;
