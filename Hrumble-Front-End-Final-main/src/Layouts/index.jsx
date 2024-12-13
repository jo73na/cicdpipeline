import { lazy, useContext, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavHader from "./NavHader";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";
import { ThemeContext } from "../Providers/Theme/index";

const { Content } = Layout;

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { contentColor } = useContext(ThemeContext);

  function toggleSideBar() {
    setCollapsed(!collapsed);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Fixed Header */}
      <div style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
        <NavHader toggleSideBar={toggleSideBar} collapsed={!collapsed} />
        <HeaderBar />
      </div>

      <div style={{ display: "flex", flex: 1, marginTop: "55px" }} >
        {/* Fixed Sidebar */}
        <div
          style={{
            position: "fixed",
            height: "calc(100vh - 60px)",
            // width: collapsed ? "80px" : "200px",
            // transition: "width 0.2s",
            zIndex: 1000,
            overflowY: "scroll", 
            msOverflowStyle: "none", 
            scrollbarWidth: "none",
          }}
        >
          <SideBar collapsed={!collapsed}/>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            marginLeft: collapsed ? "80px" : "200px",
            width: "100%",
            overflowY: "auto",
            backgroundColor: contentColor,
            padding: "11px 16px",
          }}
        >
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
