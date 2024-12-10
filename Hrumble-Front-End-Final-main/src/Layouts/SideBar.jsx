import { lazy, useContext, useState } from "react";
import {HeatMapOutlined, PoweroffOutlined, PlusOutlined, ReconciliationOutlined, UserOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "/images/Hricon.svg" ;
import Male from  "/images/male.png" ;
import SpaceLogo from  "/images/Space.png" ;
import FeMale from  "/images/women.png" ;
import ToggleLogo from "/images/Toggle.svg";
import JobsLogo from "/images/Jobs.svg";
import DashboardLogo from "/images/Dashboard.svg";
import clientlogo from "/images/Clients.svg";
import candidatesLogo from "/images/UserManagement.svg";
import TimesheetLogo from "/images/TimeSheet.svg";
import LeavesLogo from "/images/Leaves.svg";
import ProfileLogo from "/images/Profile.svg";
import Invoicelogo from "/images/Invoice.svg";
import Settingslogo from "/images/Settings.svg";
import Companylogo from "/images/CompanyIcon.svg";
import InvoiceLogo from "/images/InvoiceIcon.svg";
import ExpenseLogo from "/images/ExpenseIcon.svg";
import TeamLogo from "/images/Teamicon.svg";
import GoalLogo from "/images/target-account.svg";

import { BellOutlined, MoreOutlined } from "@ant-design/icons";
import Cookies from "../Utils/Cookies";
import CookieUtil from "../Utils/Cookies";
import UserManagementContext from "../Providers/UserMangement";
import {ThemeContext} from "../Providers/Theme/index"
import NavHader from "./NavHader";
import HeaderBar from "./HeaderBar";
// import { BASE } from "../Utils/api";
const { Header, Content, Sider } = Layout;

const BASE = import.meta.env.VITE_BASE;

const MobileMenu = lazy(() => import("../Layouts/MobileMenu"));

const SideBar = () => {
    const location = useLocation();
    const currentPath = location.pathname; // Get the current route
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
  
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);
    
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
            <span>Dashboard</span>
          </Link>,
          "/dashboard",
          <img src={DashboardLogo} />
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
      Invoicelogo,
      PlusOutlined,
      Settingslogo,
      Companylogo,
      UserOutlined,
      FolderOpenOutlined,
      InvoiceLogo,
      ExpenseLogo,
      SpaceLogo,
      TeamLogo,
      GoalLogo,
    };
  
    permission?.forEach((item, i) => {
      menu.push(
        getItem(
          item?.children?.length === 0 ? (
            <Link to={`${item.path}`}>
              <span>{item.name}</span>
            </Link>
          ) : (
            <span>{item.name}</span>
          ),
          `${item.path}`, // Use the path as the key
          item.icon === "PlusOutlined" ? (
            <PlusOutlined />
          ) : item.icon === "UserOutlined" ? (
            <UserOutlined />
          ) : item.icon === "account" ? (
            <HeatMapOutlined />
          ) : item.icon === "FolderOpenOutlined" ? (
            <FolderOpenOutlined />
          ) : item.icon === "ReconciliationOutlined" ? (
            <ReconciliationOutlined />
          ) : (
            <img
              style={{
                width: "18px",
                height: "18px",
              }}
              src={IconMapping[item.icon]}
            />
          ),
          item?.children?.length > 0 &&
            item.children.map((subItem) =>
              getItem(
                <Link to={`${subItem.path}`}>
                  <span>{subItem.name}</span>
                </Link>,
                `${subItem.path}`,
                subItem.icon === "PlusOutlined" ? (
                  <PlusOutlined />
                ) : subItem.icon === "UserOutlined" ? (
                  <UserOutlined />
                ) : subItem.icon === "account" ? (
                  <HeatMapOutlined />
                ) : subItem.icon === "FolderOpenOutlined" ? (
                  <FolderOpenOutlined />
                ) : subItem.icon === "ReconciliationOutlined" ? (
                  <ReconciliationOutlined />
                ) : (
                  <img
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                    src={IconMapping[subItem.icon]}
                  />
                )
              )
            )
        )
      );
    });
  
    return (
      <Sider
        collapsed={!isSidebarOpen}
        // onCollapse={(value) => setCollapsed(value)}
        className="desktop_menu"
      >
        <Menu
          items={menu}
          mode="inline"
          selectedKeys={[currentPath]} // Dynamically set the selected key
          onOpenChange={(keys) => setOpenKeys(keys)} // Handle open keys for dropdowns
          openKeys={openKeys}
          theme="light"
          style={{
            height: "100%",
            borderRight: `1px solid`,
            backgroundColor: sidebarColor,
            color: "#fff",
          }}
          size="large"
        />
      </Sider>
    );
  };
export default SideBar;
