import React,{useState, useContext, useEffect} from "react";

import { Link } from "react-router-dom";

// import LogoutPage from './Logout';



import { SVGICON } from './../../../Utils/SVGICON';
import CookieUtil from './../../../Utils/Cookies';
import { ThemeContext } from './../../../Providers/Theme/index';
import { Avatar, Dropdown } from "antd";
import { MoreOutlined } from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';

const NotificationBlog =({classChange}) =>{
	return(
		<>
			<li>
				<div className="timeline-panel">
					<div className="media me-2">
						{/* <img alt="images" width={50} src={IMAGES.Avatar} /> */}
					</div>
					<div className="media-body">
						<h6 className="mb-1">Dr sultads Send you Photo</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}>KG</div>
					<div className="media-body">
						<h6 className="mb-1">Resport created successfully</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}><i className="fa fa-home" /></div>
					<div className="media-body">
						<h6 className="mb-1">Reminder : Treatment Time!</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
		</>
	)
}

const Header = ({ onNote }) => {
    let data =JSON.parse(CookieUtil.get("admin"))

	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []); 
	
	const {background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if(background.value === 'dark'){
			changeBackground({ value: "light", label: "Light" });
		}else{
			changeBackground({ value: "dark", label: "Dark" });
		}
	}

	const logout = () => {
		CookieUtil.remove("admin_token");
		CookieUtil.remove("is_admin");
		CookieUtil.remove("admin");
		CookieUtil.remove("admin_id");
		localStorage.removeItem("breakStartTime");
		localStorage.removeItem("totalSeconds");
		localStorage.removeItem("isActive");
		localStorage.removeItem("selectedActivity");
		window.location.href = "/login";
	  };

	const items = [
		{
		  label: <div onClick={logout}>Logout</div>,
		  key: "1",
		  icon: <PoweroffOutlined />,
		},
	  ];
  
  return ( 
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          	<div className="collapse navbar-collapse justify-content-between">
				<div className="header-left">					
				</div>
				<div className="header-right d-flex align-items-center">
					<div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search here..." />
						<span className="input-group-text">
							<Link to={"#"}>
								{SVGICON.SearchIcon}
							</Link>
						</span>
					</div>
					<div className="d_f a_i_c g_10 d_n_sm">
              <div className="header_name">
                <span className="d_b login_name">Shabnam</span>
                <span>HR</span>
              </div>
              <Avatar>Shabnam</Avatar>
              <Dropdown
                menu={{
					items
               
                }}
              >
                <MoreOutlined className="navbar-moreoutlined" />
              </Dropdown>
            </div>
					{/* <ul className="navbar-nav ">	
						
						<li className="nav-item ps-3">
							<Dropdown className="header-profile2">
								<Dropdown.Toggle className="nav-link i-false" as="div">
									<div className="header-info2 d-flex align-items-center">
										<div className="header-media">
											<Avatar/>
										</div>										
										
									</div>
								</Dropdown.Toggle>
								<Dropdown.Menu align="end">
									<div className="card border-0 mb-0">
										<div className="card-header py-2">
											<div className="products">
												 <img src={IMAGES.User} className="avatar avatar-md" alt="" /> 
												<div>
													<h6>{data?.name}</h6>
													<span>{data?.role}</span>	
												</div>	
											</div>
										</div>
										<div className="card-body px-0 py-2">
											<Link to={"/app-profile"} className="dropdown-item ai-icon ">
												{SVGICON.UserSvg}{" "}
												<span className="ms-2">Profile </span>
											</Link>
											<Link to={"/app-profile"} className="dropdown-item ai-icon ">
												{SVGICON.Project}{" "}												
												<span className="ms-2">My Project</span><span className="badge badge-sm badge-primary rounded-circle text-white ms-2">4</span>
											</Link>
											<Link to={"#"} className="dropdown-item ai-icon ">
												{SVGICON.Message}{" "}
												<span className="ms-2">Message </span>
											</Link>
											<Link to={"/email-inbox"} className="dropdown-item ai-icon ">
												{SVGICON.Notification} {" "}
												<span className="ms-2">Notification </span>
											</Link>
										</div>
										<div className="card-footer px-0 py-2">
											<Link to={"#"} className="dropdown-item ai-icon ">
												{SVGICON.Headersetting} {" "}
												<span className="ms-2">Settings </span>
											</Link>										
											{/* <LogoutPage /> 
										</div>
									</div>
									
								</Dropdown.Menu>
							</Dropdown>
						</li>						
					</ul> */}
				</div>
			
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
