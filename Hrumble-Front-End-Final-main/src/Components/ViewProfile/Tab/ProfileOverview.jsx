// // import {Row, Col, Card, Image, Divider} from 'antd';
// // import EmployeeContext from '../../../Providers/EmployeeProvider';
// // import { useContext, useEffect, useState} from 'react';
// // import CookieUtil from '../../../Utils/Cookies';
// // import { Phone, Mail } from 'lucide-react';


// // const ProfileOverview =( )=>{
// //     const {FetchEmployeeTable, employeeLogindata, } = useContext(EmployeeContext)

// //     useEffect(() => {
// //         FetchEmployeeTable();
// //     }, []);

// //     console.log("employeeLogin:", employeeLogindata);

// //     const finalData = employeeLogindata?.[1] || {};
// //     console.log("finalData:", finalData);

// //     if (!employeeLogindata || employeeLogindata.length === 0) {
// //         return <div>Loading...</div>;
// //     }

// //     return(

// //         <>
// //         <Row gutter={24}  >
// //             <Col span={10} xxl={10} xl={10} md={24} sm={24} xs={24} >
// //                 <Card style={{height:"400px", width:"300px", alignItems:"center"}}>
// //                     <Row gutter={24} style={{ margin:"18px"}}>
// //                         <Col span={12} >
// //                         <Image src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' style={{alignItems:"center", justifyContent:"center", borderRadius:"10px", width:"70px", height:"70px"}}/>

                        
// //                         </Col>
// //                         <Col span={12} style={{marginTop:"px", marginRight:"0px"}} >
// //                         <label style={{fontSize:"18px", fontFamily:"sans-serif"}}>{finalData.firstname}</label>
// //                         <label style={{fontSize:"18px"}}>{finalData.lastname}</label>
// //                         <label style={{fontSize:"16px", fontFamily:"monospace"}}>{finalData.employee_id}</label>


                        
// //                         </Col>
                       
                       

// //                     </Row>
                   
// //                     <Row gutter={24} style={{height:"15px", margin:"5px"}}>
// //                     <label style={{fontSize:"14px", fontFamily:"monospace", fontWeight:"bold", marginLeft:"20px"}}>About</label>
  
// //                     </Row>
// //                     <Row 
// //                         gutter={24} 
// //                         style={{
// //                          height: "auto", 
                         
// //                          margin: "5px", 
                     
// //                          alignItems: "center" // Ensure vertical alignment
// //                          }}
// //                         >
// //                         {/* Icon */}
// //                         <Col span={2} >
// //                           <Phone size={15} strokeWidth={1.25} />
// //                         </Col>

// //                          {/* Label */}
// //                          <Col span={2} style={{ display: "flex", alignItems: "center" }}>
// //                           <h6 style={{ fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Phone:</h6>
// //                         </Col>

// //                          {/* Phone Number */}
// //                          <Col span={20} style={{ display: "flex", alignItems: "center" }}>
// //                          <h6 style={{ fontSize: "14px", fontFamily: "monospace", margin: "0" }}>{finalData.Phone}</h6>
// //                             </Col>
// //                         </Row>
// //                         <Row 
// //   gutter={24} 
// //   style={{
// //     height: "auto",
// //     margin: "5px", 
   
// //     display: "flex", // Flex container for horizontal alignment
// //     alignItems: "center", // Vertically center the items
// //     gap: "1px", // Add some gap for spacing between columns
// //   }}
// // >
// //   {/* Icon */}
// //   <Col span={2} >
// //     <Mail size={15} strokeWidth={1.25} />
// //   </Col>

// //   {/* Label */}
// //   <Col span={2} style={{ display: "flex", alignItems: "center" }}>
// //     <h6 style={{ fontSize: "14px", fontFamily: "monospace", margin: "0" }}>Email:</h6>
// //   </Col>

// //   {/* Email */}
// //   <Col span={20} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", overflow: "hidden" }}>
// //     <h6 style={{ fontSize: "12px", fontFamily: "monospace", margin: "0", whiteSpace: "nowrap" }}>
// //       {finalData.email}
// //     </h6>
// //   </Col>
// // </Row>


                  
                   


// //                 </Card>
                
                   
// //             </Col>
// //             <Col span={14}>
// //                 <Card style={{height:"400px", width:"500px"}}>



// //                 </Card>
// //             </Col>

// //         </Row>
       
       
// //         </>
// //     );
// // }


// // export default ProfileOverview;

// import React, { useContext, useEffect } from 'react';
// import { Row, Col, Card, Image, Divider } from 'antd';
// import { Phone, Mail, MapPinHouse } from 'lucide-react';
// import EmployeeContext from '../../../Providers/EmployeeProvider';

// const ProfileOverview = () => {
//   const { FetchEmployeeTable, employeeLogindata } = useContext(EmployeeContext);

//   useEffect(() => {
//     FetchEmployeeTable();
//   }, []);

//   const finalData = employeeLogindata?.[1] || {};
//   console.log("finalData:", finalData)

//   if (!employeeLogindata || employeeLogindata.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Row gutter={24}>
//       <Col span={24} md={10}>
//         <Card style={{ height: "400px", width: "300px" }}>
//           {/* Profile Header */}
//           <Row gutter={16} style={{ marginBottom: "24px", marginLeft:"12px", marginTop:"12px" }}>
//             <Col span={8}>
//               <Image
//                 src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//                 style={{
//                   borderRadius: "10px",
//                   width: "70px",
//                   height: "70px",
//                   objectFit: "cover"
//                 }}
//               />
//             </Col>
//             <Col span={16}>
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <span style={{ fontSize: "18px", fontFamily: "sans-serif" }}>
//                   {finalData.firstname} {finalData.lastname}
//                 </span>
//                 <span style={{ fontSize: "16px", fontFamily: "monospace" }}>
//                   {finalData.employee_id}
//                 </span>
//               </div>
//             </Col>
//           </Row>

//           {/* About Section */}
//           <div style={{ marginBottom: "16px" }}>
//             <span style={{
//               fontSize: "14px",
//               fontFamily: "monospace",
//               fontWeight: "bold",
//               display: "block",
//               marginBottom: "12px",
//               marginLeft:"12px"
//             }}>
//               About
//             </span>

//             {/* Phone Row */}
//             <Row 
//               align="middle" 
//               style={{ 
//                 marginBottom: "12px",
//                 flexWrap: "nowrap",
//                 marginLeft:"12px"
//               }}
//             >
//               <Col flex="16px">
//                 <Phone size={15} strokeWidth={1.25} />
//               </Col>
//               <Col flex="45px">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px"
//                 }}>
//                   Phone:
//                 </span>
//               </Col>
//               <Col flex="auto">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px",
//                   display: "block",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {finalData.mobile}
//                 </span>
//               </Col>
//             </Row>

//             {/* Email Row */}
//             <Row 
//               align="middle" 
//               style={{ 
//                 flexWrap: "nowrap",
//                 marginLeft:"12px"
//               }}
//             >
//               <Col flex="16px">
//                 <Mail size={15} strokeWidth={1.25} />
//               </Col>
//               <Col flex="45px">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px"
//                 }}>
//                   Email:
//                 </span>
//               </Col>
//               <Col flex="auto">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px",
//                   display: "block",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {finalData.email}
//                 </span>
//               </Col>
//             </Row>
//             <Divider/>
//           </div>
//            {/* Address Section */}
//            <div style={{ marginBottom: "16px" }}>
//             <span style={{
//               fontSize: "14px",
//               fontFamily: "monospace",
//               fontWeight: "bold",
//               display: "block",
//               marginBottom: "12px",
//               marginLeft:"12px"
//             }}>
//               Address
//             </span>

//             {/* Address Row */}
//             <Row 
//               align="middle" 
//               style={{ 
//                 marginBottom: "12px",
//                 flexWrap: "wrap",
//                 marginLeft:"12px"
//               }}
//             >
//               <Col flex="16px">
//                 <Phone size={15} strokeWidth={1.25} />
//               </Col>
//               <Col flex="45px">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "12px"
//                 }}>
//                   Address:
//                 </span>
//               </Col>
//               <Col flex="auto">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px",
//                   display: "block",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {finalData.present_addr}
//                 </span>
//               </Col>
//             </Row>

//             {/* Email Row */}
//             <Row 
//               align="middle" 
//               style={{ 
//                 flexWrap: "wrap",
//                 marginLeft:"12px"
//               }}
//             >
//               <Col flex="16px">
//                 <MapPinHouse size={15} strokeWidth={1.25} />
//               </Col>
//               <Col flex="45px">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px"
//                 }}>
//                   Location:
//                 </span>
//               </Col>
//               <Col flex="auto">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px",
//                   display: "block",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {finalData.email}
//                 </span>
//               </Col>
//             </Row>
//             <Row 
//               align="middle" 
//               style={{ 
//                 flexWrap: "nowrap",
//                 marginLeft:"12px"
//               }}
//             >
//               <Col flex="16px">
//                 <MapPinHouse size={15} strokeWidth={1.25} />
//               </Col>
//               <Col flex="45px">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px"
//                 }}>
//                   Email:
//                 </span>
//               </Col>
//               <Col flex="auto">
//                 <span style={{ 
//                   fontSize: "14px", 
//                   fontFamily: "monospace",
//                   marginLeft: "8px",
//                   display: "block",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {finalData.email}
//                 </span>
//               </Col>
//             </Row>
//             <Divider/>
//           </div>
          
//         </Card>
//       </Col>

//       <Col span={24} md={14}>
//         <Card style={{ height: "400px", paddingLeft:"5px", width:"700px" }}>
//           {/* Add content for the right card here */}
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default ProfileOverview;



import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Image, Tabs, Tooltip , Button} from 'antd';
import TabContent from './TabContent';
import InfoRowWithPdf from './InfoRowWithPdf';
import CookieUtil from '../../../Utils/Cookies';
import { 
  Phone, 
  Eye,
  MapPin, 
  Building2, 
 
  Briefcase, 
  Building, 
  User2,
  Hash,
  Smartphone,
  AtSign,
  MapPinned,
  Building as BuildingIcon,
  CalendarDays,

  Users,
  UserCircle,
  Contact,
 
  CreditCard, 
  Wallet, 
  FileUser,
  GraduationCap,
  FileText,
   CircleDollarSign,
  BadgeCheck,
  Globe,
  Mail,
 CircleX,
  Calendar,
  User,
  Copy,
  UserRoundPen,
  ArrowLeft
 
} from 'lucide-react';
import EmployeeContext from '../../../Providers/EmployeeProvider';
import {ReactSVG} from 'react-svg';
import { useLocation, useParams } from 'react-router-dom';
import { copyToClipboard } from '../../../Utils/CopyText';
import MyProfile from '../../MyProfile';
import { useNavigate } from "react-router-dom";


const BASE = import.meta.env.VITE_BASE;
const ProfileOverview = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  let role = CookieUtil.get("role")
  console.log("role:", id)
     const [adminID, setAdminID] = useState(null);
  
     useEffect(() => {
      const adminIdFromCookie = CookieUtil.get("admin_id");
      if (adminIdFromCookie) {
        setAdminID( adminIdFromCookie);
        // fetchEmploy( adminIdFromCookie);
      } else {
        console.error("Admin ID not found in cookies");
      }
    }, []);
  
    console.log("ViewAdminId::::", adminID)

  const { FetchEmployeeTable, employeeLogindata } = useContext(EmployeeContext);
  const [finalData, setFinalData] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");

  const [isLoading, setIsLoading] = useState(true);


console.log("employeelofindatta::", employeeLogindata)
  const handleCopy = (text) => {
    copyToClipboard(text);
    setTooltipText("Copied!"); // Change tooltip text to "Copied!"
    setTimeout(() => setTooltipText("Copy to clipboard"), 2000); // Reset after 2 seconds
  };

  const handleEditClick = (id) => {
    navigate(`/Detailprofiles/${id}`);
    // Navigate to the edit page with the ID
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await FetchEmployeeTable();
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id || adminID]);
  React.useEffect(() => {
    // Fetch or handle the data when the component loads
    console.log("Loading profile for ID:", id || adminID);
    // Example: Fetch profile data here
  }, [id || adminID]);
  
  useEffect(() => {
    if (Array.isArray(employeeLogindata) && (id || adminID)) {
      const profile = employeeLogindata.find(emp => emp._id === id || emp._id === adminID);
      if (profile) {
        setFinalData(profile);
      } else {
        console.error("Profile not found for id:", id || adminID);
      }
    } else {
      console.error("employeeLogindata is not an array or id is missing", employeeLogindata, id || adminID);
    }
  }, [employeeLogindata, id, adminID]);
  
  
 console.log("finalData::", finalData)

  if (isLoading) {
    return <div>Loading profile data...</div>;
  }

  if (!finalData) {
    return <div>No profile data found</div>;
  }


  const IconWrapper = ({ icon: Icon, color = "#4F46E5" }) => (
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
      <Icon size={16} style={{ 
        color: color,
        strokeWidth: 1.5,
      }} />
    </div>
  );

  const TextWithOptionalTooltip = ({ text, maxWidth = "180px" }) => {
    const spanRef = React.useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    React.useEffect(() => {
      if (spanRef.current) {
        setIsOverflowing(spanRef.current.scrollWidth > spanRef.current.clientWidth);
      }
    }, [text]);

    const content = (
      <span
        ref={spanRef}
        style={{ 
          fontSize: "12px", 
          fontFamily: "poppins",
          marginLeft: "8px",
          // display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal",
          wordBreak: "break-word",
         
        }}
      >
        {text}
      </span>
    );

    return isOverflowing ? (
      <Tooltip title={text} placement="top">
        {content}
      </Tooltip>
    ) : content;
  };

  // const InfoRow = ({ icon: Icon, label, value, color }) => (
  //   <Row 
  //     align="middle" 
  //     style={{ 
  //       marginLeft:"16px",
  //       marginBottom: "2px", 
  //       paddingLeft: "6px",
  //       transition: "all 0.3s ease"
  //     }}
  //     className="hover:bg-gray-50 rounded-lg py-1"
  //   >
  //     <Col flex="32px">
  //       <IconWrapper icon={Icon} color={color} />
  //     </Col>
  //     <Col flex="60px">
  //       <span style={{ 
  //         fontSize: "12px", 
  //         fontFamily: "poppins",
  //         marginLeft: "8px",
  //         color: "#666"
  //       }}>
  //         {label}:
  //       </span>
  //     </Col>
  //     <Col flex="auto">
  //       <TextWithOptionalTooltip text={value} />
  //     </Col>
  //   </Row>
  // );

  const InfoRow = ({ icon: Icon, label, value, color, isCopyable = false }) => (
    // <Row
    //   align="middle"
    //   style={{
    //     marginLeft: "10px",
    //     marginBottom: "4px", // Better readability
    //     paddingLeft: "4px",
    //   }}
    //   className="hover:bg-gray-50 rounded-lg py-1"
    // >
    //   {/* Icon Column */}
    //   <Col flex="30px" style={{ display: "flex", alignItems: "center" }}>
    //     <IconWrapper icon={Icon} color={color} />
    //   </Col>
    //   {/* Label Column */}
    //   <Col flex="85px" style={{ display: "flex", alignItems: "center" }}>
    //     <span style={{
    //       fontSize: "12px",
    //       fontFamily: "Poppins",
    //       color: "#666",
    //       fontWeight: "500",
    //     }}>
    //       {label}:
    //     </span>
    //   </Col>
    //   {/* Value Column */}
    //   <Col flex="auto" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    //     <span
    //       style={{
    //         fontSize: "12px",
    //         fontFamily: "Poppins",
    //         color: "#333",
    //         wordWrap: "break-word", // Ensures text wraps when overflowing
    //         overflowWrap: "break-word", // For compatibility with older browsers
    //         lineHeight: "1.5", // Adds spacing for multiline text
    //         flex: 1, // Ensures text takes available space
    //         marginRight: isCopyable ? "10px" : "0", // Space before copy icon if present
    //       }}
    //     >
    //       {value}
    //     </span>
    //     {isCopyable && (
    //       <Tooltip title="Copy">
    //         <Copy
    //           size={14}
    //           style={{
    //             color: color,
    //             cursor: "pointer",
    //           }}
    //           onClick={() => handleCopy(value)}
    //         />
    //       </Tooltip>
    //     )}
    //   </Col>
    // </Row>
    // <Row
    //   align="middle"
    //   style={{
    //     marginLeft: '10px',
    //     marginBottom: '4px', // Better readability
    //     paddingLeft: '4px',
    //   }}
    //   className="hover:bg-gray-50 rounded-lg py-1"
    // >
    //   {/* Icon Column */}
    //   <Col flex="30px" style={{ display: 'flex', alignItems: 'center' }}>
    //     <IconWrapper icon={Icon} color={color} />
    //   </Col>
 
    //   {/* Label Column */}
    //   <Col flex="85px" style={{ display: 'flex', alignItems: 'center' }}>
    //     <span
    //       style={{
    //         fontSize: '12px',
    //         fontFamily: 'Poppins',
    //         color: '#666',
    //         fontWeight: '500',
    //       }}
    //     >
    //       {label}:
    //     </span>
    //   </Col>
 
    //   {/* Value Column */}
    //   <Col
    //     flex="auto"
    //     style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'space-between',
    //     }}
    //   >
    //     {/* Value Display with Wrapping */}
    //     <div
    //       style={{
    //         fontSize: '12px',
    //         fontFamily: 'Poppins',
    //         color: '#333',
    //         wordWrap: 'break-word', // Ensures text wraps when overflowing
    //         overflowWrap: 'break-word', // For compatibility with older browsers
    //         lineHeight: '1.5', // Adds spacing for multiline text
    //         flex: 1, // Ensures text takes available space
    //         marginRight: isCopyable ? '10px' : '0', // Space before copy icon if present
    //       }}
    //     >
    //       {(value ?? '') // Use fallback if value is undefined
    //         .toString()
    //         .split(',')
    //         .map((part, index) => (
    //           <span
    //             key={index}
    //             style={{
    //               display: 'block',
    //               marginBottom: '4px',
    //             }}
    //           >
    //             {part.trim()}
    //           </span>
    //         ))}
    //     </div>
 
    //     {/* Copy Icon */}
    //     {isCopyable && (
    //       <Tooltip title={tooltipText}>
    //         <Copy
    //           size={14}
    //           style={{
    //             color: color,
    //             cursor: 'pointer',
    //           }}
    //           onClick={() => handleCopy(value)}
    //         />
    //       </Tooltip>
    //     )}
    //   </Col>
    // </Row>
    <Row
    align="middle"
    style={{
      marginLeft: '10px',
      marginBottom: '4px', 
      paddingLeft: '4px',
    }}
    className="hover:bg-gray-50 rounded-lg py-1"
  >
    {/* Icon Column */}
    <Col flex="40px" style={{ display: 'flex', alignItems: 'flex-start' }}>
      <IconWrapper icon={Icon} color={color} />
    </Col>
 
    {/* Label Column */}
    <Col flex="120px" style={{ display: 'flex', alignItems: 'flex-start' }}>
      <span
        style={{
          fontSize: '12px',
          fontFamily: 'Poppins',
          color: '#666',
          fontWeight: '500',
        }}
      >
        {label}:
      </span>
    </Col>
 
    {/* Value Column */}
    <Col
      flex="auto"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // Allow content to wrap
      }}
    >
      {/* Address Container */}
      <div
        style={{
          fontSize: '12px',
          fontFamily: 'Poppins',
          color: '#333',
          wordBreak: 'break-word', // Break long words
          whiteSpace: 'pre-wrap', // Preserve spacing and wrap content
          lineHeight: '1.5', // Spacing between lines
          flex: 1, // Take available space
          padding: '4px', // Padding to align with label
        }}
      >
        {value}
      </div>
 
      {/* Copy Icon */}
      <Col flex="10px">
                {isCopyable && (
                  <Tooltip title={tooltipText}>
                    <Copy
                      size={14}
                      style={{
                        color: color,
                        cursor: 'pointer',
                        marginLeft: '8px',
                      }}
                      onClick={() => handleCopy(value)}
                    />
                  </Tooltip>
                )}
              </Col>
    </Col>
  </Row>
  );
 
  const Section = ({ title, children, icon: Icon }) => (
    <div style={{ marginBottom: "16px" }}>
      <div className="flex items-center gap-1 mb-1 px-3">
        {/* Section Title Icon */}
        <Icon size={16} className="text-indigo-600" />
        <span style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#111827",
          letterSpacing: "0.5px",
          marginLeft: "10px",
        }}>
          {title}
        </span>
      </div>
      <div style={{ paddingLeft: "24px" }}>{children}</div>
    </div>
  );


  return (
    <> 
    <Row gutter={16}>
      <Col span={24} md={12} xs={24} sm={24}>
        <Card 
          style={{ height: "400px", marginBottom: "16px" }} 
          bodyStyle={{ 
            padding: "12px",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
          className="shadow"
        >
          {/* Profile Header - Fixed */}
          <div style={{ marginBottom: "12px", flexShrink: 0, marginLeft:"16px", marginTop:"16px" }}>
            <Row gutter={12}>
              <Col span={8}>
                <div className="relative">
                  <Image
                   src={finalData.display_profile_file ? `${BASE}${finalData.display_profile_file}` : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                    style={{
                      borderRadius: "12px",
                      width: "70px",
                      height: "70px",
                      objectFit: "cover"
                    }}
                    className="border-2 border-indigo-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
              </Col>
              <Col span={16}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ 
                    fontSize: "18px", 
                    fontWeight: "600",
                    color: "#1F2937"
                  }}>
                    {finalData.firstname} {finalData.lastname}
                    <UserRoundPen size={20} className="text-indigo-500" style={{marginLeft:"50px", color:"var(--primary)"}}   onClick={()  => handleEditClick(finalData?._id)}   />
                  </span>
                  <span style={{ 
                    fontSize: "13px", 
                    color: "#6B7280",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <BadgeCheck size={14} className="text-indigo-500" />
                    {finalData.employee_id}
                  </span>
                </div>
              
              </Col>
            </Row>
          </div>

          {/* Scrollable content */}
          <div style={{ 
            overflowY: "auto", 
            flexGrow: 1,
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 #F8FAFC",
          }}>
               <Section title="   Work Info" icon={Briefcase}>
              {/* <InfoRow icon={CalendarDays} label="DOB" value={finalData.date_of_birth} color="#059669" /> */}
              <InfoRow icon={BadgeCheck} label="Title" value={finalData.designation} color="#7C3AED" />
              <InfoRow icon={Users} label="Dept" value={finalData.department} color="#0891B2" />
              <InfoRow icon={UserCircle} label="Manager" value={finalData.reporting_manager} color="#2563EB" />
                        <InfoRow label="CTC" value={`₹${finalData.yearly_ctc.toLocaleString()}`} icon={CircleDollarSign} color="#0891B2" />
              {/* <InfoRow icon={Contact} label="ID" value={finalData.employee_id} color="#DC2626" /> */}
            </Section>
            {/* About Section */}
            <Section title="About" icon={User2}>
              <InfoRow icon={Smartphone} label="Phone" value={finalData.mobile || ""} color="#2563EB" isCopyable={!!finalData.mobile} />
              <InfoRow icon={AtSign} label="Email" value={finalData.email || ""} color="#7C3AED" isCopyable={!!finalData.email}/>
            </Section>

            {/* Address Section */}
            <Section title="Location" icon={MapPinned}>
              <InfoRow icon={MapPin} label="Address" value={finalData.present_addr} color="#DC2626" />
              <InfoRow icon={BuildingIcon} label="City" value={finalData.present_district} color="#0891B2" />
            </Section>

            {/* Employee Details Section */}
         
            <Section  title="Personal Information" icon={FileUser}>
            <InfoRow icon={Calendar} label="DOB" value={new Date(finalData.dob).toLocaleDateString()} color="#7C3AED" />
            <InfoRow label="BloodGroup" value={finalData.blood_group} icon={Users} color="#7C3AED" />
            <InfoRow label="Gender" value={finalData.gender?.toUpperCase() ?? ""} icon={User} color="#0891B2"  />
            <InfoRow label="MaritalStatus" value={finalData.marital_status} icon={Users} color="#DC2626" />
              
            </Section>
          </div>
        </Card>
      </Col>
      <Col span={24} md={12} xs={24} sm={24}>
      <Card style={{ height: "400px", marginBottom: "16px" }} 
          bodyStyle={{ 
            padding: "12px",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
          className="shadow">
             {/* Profile Header - Fixed */}
          <div style={{ marginBottom: "12px", flexShrink: 0, marginLeft:"16px", marginTop:"16px" }}>
            <Row gutter={12}>
              <Col span={8}>

              </Col>
              <Col span={16}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ 
                    fontSize: "18px", 
                    fontWeight: "600",
                    color: "#1F2937"
                  }}>
                    {/* Details */}
                  </span>
              
                </div>
              </Col>
            </Row>
          </div>

          {/* Scrollable content */}
          <div style={{ 
            overflowY: "auto", 
            flexGrow: 1,
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 #F8FAFC",
          }}>
            {/* About Section */}
            <Section title="Bank Details" icon={Wallet}>
            <InfoRow icon={Building2} label="BankName" value={finalData.bankName} color="#2563EB" />
            <InfoRow icon={CreditCard} label="A/C No" value={finalData.accountNumber || ""} color="#2563EB" isCopyable={!!finalData.accountNumber}  />
            <InfoRow icon={Building} label="IFSC" value={finalData.ifscCode || ""} color="#2563EB" isCopyable={!!finalData.ifscCode}/>
            <InfoRow icon={MapPin} label="Branch" value={finalData.branchName || ""} color="#2563EB" isCopyable={!!finalData.branchName} />
              <InfoRow icon={MapPinned} label="Address" value={finalData.branchAddress} color="#7C3AED" />
            </Section>

            {/* Identification Documents Section */}
            <Section title="Identification Information" icon={BadgeCheck}>
      <InfoRowWithPdf 
        label="AadharNumber" 
        value={finalData.aadhar_num || ""} 
        isCopyable ={!!finalData.aadhar_num}
        color="#2563EB" 
        pdfUrl={`${BASE}${finalData.aadhar_file}`} // Assuming you have a file URL in finalData
      />
      <InfoRowWithPdf 
        label="PanCard" 
        value={finalData.pan_num?.toUpperCase() || ""} 
        isCopyable ={!!finalData.pan_num}
        color="#7C3AED" 
        pdfUrl={`${BASE}${finalData.pan_file}`} // Assuming you have a file URL in finalData
      />
      <InfoRowWithPdf 
        label="UAN ID" 
        value={finalData.uan_num || ""} 
        isCopyable ={!!finalData.uan_num}
        color="#0891B2" 
        pdfUrl={`${BASE}${finalData.uan_file}`} // Assuming you have a file URL in finalData
      />
      <InfoRowWithPdf 
        label="ESICNumber" 
        value={finalData.esic_num || ""} 
        isCopyable ={!!finalData.esic_num}
        color="#DC2626" 
        pdfUrl={`${BASE}${finalData.esic_file}`} // Assuming you have a file URL in finalData
      />
    </Section>

            <div className="space-y-6 ">
      {finalData.emergencyContacts.length > 0 && (
        <Section title="Emergency Contacts" icon={Phone}>
          {finalData.emergencyContacts.map((contact, index) => (
            <div key={index} className="mb-4">
              <InfoRow 
                label="Name" 
                value={contact.name} 
                icon={Users} 
                color="#2563EB" 
              />
              <InfoRow 
                label="Relationship" 
                value={contact.relationship} 
                icon={Users} 
                color="#7C3AED" 
              />
              <InfoRow 
                label="Phone" 
                value={contact.phoneNumber || ""} 
                icon={Phone} 
                color="#0891B2" 
                isCopyable={!!contact.phoneNumber}
              />
              {/* <InfoRow 
                label="Email" 
                value={contact.email} 
                icon={Mail} 
                color="#DC2626" 
              /> */}
            </div>
          ))}
        </Section>
      )}
    </div>

          </div>
           
      </Card>
      </Col>

      {/* { role ==="Employee" ?
      <Col span={24} md={8} xs={24} sm={24}>
      <Card style={{ height: "400px", marginBottom: "16px" }} 
          bodyStyle={{ 
            padding: "12px",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
          className="shadow">
           <ReactSVG src="/images/developer.svg" />
      </Card>
      </Col>
      : 
      <Col span={24} md={8} xs={24} sm={24}>
      <Card style={{ height: "400px", marginBottom: "16px" }} 
          styles={{ 
            padding: "12px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent:'center',
            alignItems:'center'

          }}
          className="shadow">
             <ReactSVG src='/images/hr.svg' style={{justifyContent:"center"}}/>
      </Card>
      </Col>
} */}
{/* 
      <Col span={24} md={16}>
        <Card 
          style={{ height: "400px" }} 
          bodyStyle={{ 
            padding: "0px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden" // Prevent card-level scrolling
          }}
          className="shadow"
        >
          <Tabs
  activeKey={activeTab}
  onChange={setActiveTab}
  items={[
    {
      key: '1',
      label: 'Details',
      children: null,
    },
    {
      key: '2',
      label: 'Contacts',
      children: null,
    },
    {
      key: '3',
      label: 'Documents',
      children: null,
    },
  ]}
  style={{ marginBottom: "0px" }}
/>
 {/* Scrollable Content Area */}
 {/* <div 
            style={{ 
              flexGrow: 1,
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#CBD5E1 #F8FAFC",
            }}
            className="custom-scrollbar"
          >
            <TabContent activeTab={activeTab} data={finalData} />
          </div>
        </Card>
      </Col> */}
    </Row>
    </>
  );
};

export default ProfileOverview;