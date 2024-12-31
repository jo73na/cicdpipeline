import PersonalDetails from "./PersonalDetails";
import { Card, Progress, Menu } from "antd";
import { useState } from "react";
import EducationalDetails from "./BankAccount";
import BankAccount from "./BankAccount";
import EmployeeDocuments from "./EmployeeDocuments";
 
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
  const [current, setCurrent] = useState("profile");
 
  // Completion status for each section
  const [completion, setCompletion] = useState({
    profile: 0,
    education: 0,
    document: 0,
    bankaccount: 0,
  });
 
  // Calculate the overall progress
  const overallProgress = Object.values(completion).reduce((a, b) => a + b, 0) / items.length;
 
  const onClick = (e) => {
    setCurrent(e.key);
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
        return <PersonalDetails updateCompletion={(value) => updateCompletion("profile", value)} />;
      case "education":
        return <EducationalDetails updateCompletion={(value) => updateCompletion("education", value)} />;
      case "document":
        return <EmployeeDocuments updateCompletion={(value) => updateCompletion("document", value)} />;
      case "bankaccount":
        return <BankAccount updateCompletion={(value) => updateCompletion("bankaccount", value)} />;
      default:
        return <PersonalDetails />;
    }
  };
 
  return (
    <>
      <h4>MyProfile</h4>
 
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