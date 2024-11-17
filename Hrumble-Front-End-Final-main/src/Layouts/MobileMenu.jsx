import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu, Drawer } from "antd";
import {Styles} from '../Utils/ThemeCustomization';

const MobileMenu = ({ menu }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
  
        <div className="mobile_menu">
          <div onClick={showDrawer} className="menu_icon">
            <MenuUnfoldOutlined />
          </div>
          <Drawer
            title="Menubar"
            placement="left"
            onClose={onClose}
            open={open}
            style={{ padding: 0 }}
            width={210}
          >
            <Menu
              theme="light"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={menu}
            />
          </Drawer>
        </div>
     
    </>
  );
};

export default MobileMenu;


