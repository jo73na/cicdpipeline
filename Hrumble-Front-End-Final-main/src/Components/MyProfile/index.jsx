import PersonalDetails from "./PersonalDetails";
import { Card, Progress, Menu } from "antd";
import { useEffect, useState } from "react";
import EducationalDetails from "./Educationdetails";
import BankAccount from "./BankAccount";
import EmployeeDocuments from "./EmployeeDocuments";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft} from 'lucide-react'
import CookieUtil from '../../Utils/Cookies';

 
const items = [
  {
    label: "Profile",
    key: "profile",
  },
  {
    label: "Education & Experience",
    key: "education",
  },
  {
    label: "Document",
    key: "document",
  },
  {
    label: "Bank Account Details",
    key: "bankaccount",
  },
];
 
const MyProfile = () => {
  const {id} = useParams();
  let role = CookieUtil.get("role");
  const [current, setCurrent] = useState("profile");
  const navigate = useNavigate();
 
  useEffect(()=>{
    if(id) {
      console.log("params:", id)
    }
 
  }, [id]);
 
  // Completion status for each section
  const [completion, setCompletion] = useState({
    profile: 0,
    education: 0,
    document: 0,
    bankaccount: 0,
  });
 
  console.log("Real login ID :", id)
 
  // Calculate the overall progress
  const overallProgress = Object.values(completion).reduce((a, b) => a + b, 0) / items.length;
 
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleBackClick = () => {
    if (id) {
      navigate(`/ViewProfile/${id}`); // Replace :id with the actual value of id
    } else {
      console.error("ID not found");
    }
  };
  
 
  // Callback to update completion status
  const updateCompletion = (key, value) => {
    setCompletion((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
 
  const renderContent = () => {
    switch (current) {
      case "profile":
        return (
          <PersonalDetails id={id}
            onNextTab={() => setCurrent("education")} // Move to the next tab
          />
        );
      case "education":
        return (
          <EducationalDetails id={id}
            onNextTab={() => setCurrent("document")} // Move to the next tab
          />
        );
      case "document":
        return (
          <EmployeeDocuments id={id}
            onNextTab={() => setCurrent("bankaccount")} // Move to the next tab
          />
        );
      case "bankaccount":
        return <BankAccount id={id} />;
      default:
        return null;
    }
  };
 
 
  return (
    <>

    
<h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <ArrowLeft size={20} onClick={handleBackClick} />
      MyProfile
    </h4>
 
      {/* Card with Progress Bar */}
      <Card
        style={{
          height: "100px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          alignContent: "center",
        }}
      >
        <h6 style={{ marginLeft: "10px", fontSize: "12px" }}>{Math.round(overallProgress)}% completed</h6>
        <Progress
          style={{ marginLeft: "10px" }}
          percent={Math.round(overallProgress)}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          size={[500, 18]}
        />
        <h6 style={{ marginLeft: "10px", fontSize: "10px" }}>Update your profile</h6>
      </Card>
 
      {/* Body Card with Tabs */}
      <Card style={{ marginTop: "10px", paddingLeft: "15px" }}>
        <Menu
          style={{ height: "35px", position: "sticky" }}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {/* Render Content Based on Selected Tab */}
        <div style={{ marginTop: "20px", flex: 1, maxHeight: "70vh", overflowY: "auto" }}>
          {renderContent()}
        </div>
      </Card>
    </>
  );
};
 
export default MyProfile;