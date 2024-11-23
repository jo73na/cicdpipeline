import { lazy, useContext, useState } from "react";
import {HeatMapOutlined, PoweroffOutlined, PlusOutlined, ReconciliationOutlined, UserOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { Link, Outlet } from "react-router-dom";
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

import { BellOutlined, MoreOutlined } from "@ant-design/icons";
import Cookies from "../Utils/Cookies";
import CookieUtil from "../Utils/Cookies";
import UserManagementContext from "../Providers/UserMangement";
// import { BASE } from "../Utils/api";
const { Header, Content, Sider } = Layout;

const BASE = import.meta.env.VITE_BASE_URL;

const MobileMenu = lazy(() => import("../Layouts/MobileMenu"));

const Layouts = () => {
  let logindata = JSON.parse(CookieUtil.get("admin"))
  let company = CookieUtil.get("company") == undefined || CookieUtil.get("company") == null  ? null : JSON.parse(CookieUtil.get("company"));
  
  const {permission}= useContext(UserManagementContext)
  console.log("permission",permission)


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorPrimary, colorBgContainer, borderColor, colorBg },
  } = theme.useToken();

  const logout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("is_admin");
    Cookies.remove("admin");
    Cookies.remove("admin_id");
    localStorage.removeItem("breakStartTime");
    localStorage.removeItem("totalSeconds");
    localStorage.removeItem("isActive");
    localStorage.removeItem("selectedActivity");
    window.location.href = "/login";
  };

  function toggleSideBar() {
    setCollapsed(!collapsed);
  }

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  let role =CookieUtil.get("role")

  let menu = [

    
        getItem(
          <a onClick={toggleSideBar}>
            <span>Toggle</span>
          </a>,
          "999",
          <img src={ToggleLogo} />
        ),

      role !="Vendor" &&
      role !="Client" &&
      getItem(
        <Link to="/">
          <span>Dashboard</span>
        </Link>,
        "1200",
        <img src={DashboardLogo} />
      )
  ]
  
  
const IconMapping={
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
  


}


 

  // [
  //   getItem(
  //     <a onClick={toggleSideBar}>
  //       <span>Toggle</span>
  //     </a>,
  //     "1",
  //     <img src={ToggleLogo} />
  //   ),
  //   getItem(
  //     <Link to="/">
  //       <span>Dashboard</span>
  //     </Link>,
  //     "2",
  //     <img src={DashboardLogo} />
  //   ),
  //   getItem(
  //     <Link to="/clients">
  //       <span>Clients</span>
  //     </Link>,
  //     "3",
  //     <img src={clientlogo} />
  //   ),
  //   getItem(
  //     <Link to="/jobs">
  //       <span>Jobs</span>
  //     </Link>,
  //     "4",
  //     <img src={JobsLogo} />
  //   ),
  //   getItem(
  //     <Link to="/candidates">
  //       <span>ZiveX</span>
  //     </Link>,
  //     "5",
  //     <img src={candidatesLogo} />
  //   ),
  //   getItem(
  //     <Link to="/addcandidate">
  //       <span>AddCandidate</span>
  //     </Link>,
  //     "6",
  //     <PlusOutlined/>
  //   ),
  // ]
   permission?.map((item,i)=>{
     return  menu.push(
      getItem(
       ( item?.children?.length  == 0 ?
        <Link to={`${item.path}`}>
        <span>{item.name}</span>
      </Link> :
        <span>{item.name}</span>
        )
        ,
      `${i+1}`,

      item.icon== "PlusOutlined" ? <PlusOutlined/>:item.icon== "UserOutlined" ? <UserOutlined /> :
      item.icon == "account"? <HeatMapOutlined/> :item.icon== "FolderOpenOutlined" ? <FolderOpenOutlined />:item.icon== "ReconciliationOutlined"? <ReconciliationOutlined/>:<img style={{
        width: "18px",
        height: "18px",
        
      }} src={IconMapping[item.icon]} />,
      item?.children?.length > 0 && item.children?.map((item,i)=>{
         return  getItem( <Link to={`${item.path}`}>
         <span>{item.name}</span>
       </Link>,
       `${i+1}`,
 
       item.icon== "PlusOutlined" ? <PlusOutlined/>:item.icon== "UserOutlined" ? <UserOutlined /> :
       item.icon == "account"? <HeatMapOutlined/> :item.icon== "FolderOpenOutlined" ? <FolderOpenOutlined />:item.icon== "ReconciliationOutlined"? <ReconciliationOutlined/>:<img style={{
         width: "18px",
         height: "18px",
         
       }} src={IconMapping[item.icon]} />
         )
      })
      
      

    ))
   })



  const items = [
    {
      label: <div onClick={logout}>Logout</div>,
      key: "1",
      icon: <PoweroffOutlined />,
    },
  ];


  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      theme="light"
    >
      <Header
        style={{
          position: "fixed",
          zIndex: 1000,
          width: "100%",
          height: "60px",
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div className="header_align">
          <div className="header_left">
            <div className="mobile_menu">
              <MobileMenu menu={menu} />
            </div>
            <Link to="/">
              <img src={company?`${BASE}${company?.logo}`:logo} alt="logo" width={50} />
            </Link>
          </div>
          <div className="header_right d_f a_i_c g_10">
            <BellOutlined className="bell_icon f_s_25_sm" />
            <div className="vr m_2"></div>

            <div className="d_f a_i_c g_10 d_n_sm">
              <div className="header_name">
                <span className="d_b login_name">{logindata?.name}</span>
                <span>{logindata?.role}</span>
              </div>
              <Avatar  src={<img src={`${logindata?.email_id =="sangeeth@technoladders.com" ? Male:FeMale}`} alt="Male"/>} size={64}></Avatar>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <MoreOutlined className="navbar-moreoutlined" />
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>

      <Layout style={{ marginTop: 60, backgroundColor: colorPrimary }}>
        <Sider
          // collapsible={true}
           collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            backgroundColor: colorBgContainer,
          }}
          className="desktop_menu"
        >
          <Menu
            items={menu}
            mode="inline"
            defaultSelectedKeys={["1"]}
            them e="light"
            style={{ height: "100%", position: "sticky", top: 60 }}
            size="large"
          />
        </Sider>
        <Layout style={{ backgroundColor: colorBg }}>
          <Content
            style={{
              padding: "11px 16px",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Layouts;
