import React from "react";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";




export function Breadcrumb({ breadcrumb =[] }) {
  const navigate = useNavigate();
  // const split_title = title.split(",");
  const items = [
    {
      title: <Link to ="/">Home</Link>,
    },
  ];
  // split_title.forEach((splitItem) => {
  //   items.push({
  //     title: splitItem.trim(),
  //   });
  // });
  return (
    <div className="table_head d_f g_10 a_i_c">
      <p onClick={() => navigate(-1)} className="go_back">
        <ArrowLeftOutlined /> 
      </p>
      <AntdBreadcrumb items={breadcrumb} />
    </div>
  );
}
