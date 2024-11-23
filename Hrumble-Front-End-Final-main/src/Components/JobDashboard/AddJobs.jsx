import { useState, useEffect, useRef } from "react";
import { Form,  Row, Col, Card, } from "antd";
 
import "react-quill/dist/quill.snow.css";
import DirectHiringForm from "./Forms/DirectHiringForm";
import TalentDeploymentForm from "./Forms/TalentDeploymentForm";
import ExternalStaffingForm from "./Forms/ExternalStaffingForm";


 
 
 
const AddJobs = () => {
  const [primarySelected, setPrimarySelected] = useState("");
  const [secondarySelected, setSecondarySelected] = useState("");
  const [form] = Form.useForm();
  const [jobDescription, setJobDescription] = useState("");
  const formRef = useRef(null);
 
 
 
  useEffect(() => {
    form.setFieldsValue({ primarySelected, secondarySelected });
    console.log("Primary Selected:", primarySelected);
    console.log("Secondary Selected:", secondarySelected);
  }, [primarySelected, secondarySelected]);
  

  const handlePrimaryClick = (selection) => {
    setPrimarySelected(selection);
    setSecondarySelected("");
  };

  const handleSecondaryClick = (selection) => {
    setSecondarySelected(selection);
  };

  const resetForm = () => {
    form.resetFields();
    setPrimarySelected("");
    setSecondarySelected("");
    setJobDescription("");
  };
  const handleTalentSelectClick = (selection) => {
    setSecondarySelected(selection); // Set secondary selected to "Talent Deployment"
  };

  const handleClearForm = () => {
    setPrimarySelected("");
    setSecondarySelected("");
    form.resetFields();
  };

 
  const renderDirectHiringForm = () => {
    return <DirectHiringForm />;
  };
 
  const renderExternalStaffingForm = () => {
    return <ExternalStaffingForm />;
  };
 
  const renderTalentDeploymentForm = () => {
    return <TalentDeploymentForm />;
  };
 
  // Card style generator for primary selection
  const getPrimaryCardStyle = (cardType) => ({
    backgroundColor: primarySelected === cardType ? "black" : "white",
    borderColor: primarySelected === cardType ? "black" : "lightgrey",
    cursor: "pointer",
    textAlign: "center",
    alignContent: "center",
    borderRadius: "10px",
    width: "280px",
    height: "50px",
    opacity: primarySelected && primarySelected !== cardType ? 0.3 : 1,
    transition: "all 0.3s ease",
    boxShadow: primarySelected === cardType ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
  });
 
  // Card style generator for secondary selection
  const getSecondaryCardStyle = (cardType) => ({
    backgroundColor: secondarySelected === cardType ? "black" : "white",
    borderColor: secondarySelected === cardType ? "black" : "lightgrey",
    cursor: "pointer",
    textAlign: "center",
    alignContent: "center",
    borderRadius: "10px",
    width: cardType === "External Staffing" ? "130px" : "120px",
    height: "40px",
    opacity: secondarySelected && secondarySelected !== cardType ? 0.3 : 1,
    transition: "all 0.3s ease",
    boxShadow: secondarySelected === cardType ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
  });
 
  return (
    <Form form={form} layout="vertical" ref={formRef}>
      <div>
        <Row gutter={16} justify="space-around" className="mt-3" style={{ marginRight: "120px" }}>
          <Col span={6}>
            <Card
              onClick={() => handlePrimaryClick("Internal")}
              style={getPrimaryCardStyle("Internal")}
            >
              <h5 style={{
                color: primarySelected === "Internal" ? "white" : "black",
                margin: 0,
                fontWeight: "500"
              }}>
                Internal
              </h5>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              onClick={() => handlePrimaryClick("External")}
              style={getPrimaryCardStyle("External")}
            >
              <h5 style={{
                color: primarySelected === "External" ? "white" : "black",
                margin: 0,
                fontWeight: "500"
              }}>
                External
              </h5>
            </Card>
          </Col>
        </Row>
 
        {primarySelected === "Internal" && (
          <Row className="mt-4" style={{ marginLeft: "85px" }}>
            <Col span={5}>
              <Card
                style={getSecondaryCardStyle("Direct Hiring")}
                onClick={() => handleSecondaryClick("Direct Hiring")}
              >
                <h5 style={{
                  color: secondarySelected === "Direct Hiring" ? "white" : "black",
                  margin: 0,
                  fontWeight: "500"
                }}>
                  Direct Hiring
                </h5>
              </Card>
            </Col>
            <Col span={5}>
              <Card
                style={getSecondaryCardStyle("Talent Deployment")}
                onClick={() => handleTalentSelectClick("Talent Deployment")}
              >
                <h5 style={{
                  color: secondarySelected === "Talent Deployment" ? "white" : "black",
                  margin: 0,
                  fontWeight: "500"
                }}>
                  Talent Deployment
                </h5>
              </Card>
            </Col>
          </Row>
        )}
 
        {primarySelected === "External" && (
          <Row align={"end"} className="mt-4" style={{ marginRight: "105px" }}>
            <Col span={6}>
              <Card
                style={getSecondaryCardStyle("External Staffing")}
                onClick={() => handleSecondaryClick("External Staffing")}
              >
                <h5 style={{
                  color: secondarySelected === "External Staffing" ? "white" : "black",
                  margin: 0,
                  fontWeight: "500"
                }}>
                  External Staffing
                </h5>
              </Card>
            </Col>
          </Row>
        )}
      </div>
 
      {primarySelected && secondarySelected && (() => {
  const formComponents = {
    "Direct Hiring": <DirectHiringForm onDiscard={handleClearForm}  primarySelected={primarySelected} 
    secondarySelected={secondarySelected} resetForm={resetForm} />,
    "Talent Deployment": <TalentDeploymentForm onDiscard={handleClearForm} primarySelected={primarySelected} 
    secondarySelected={secondarySelected} resetForm={resetForm}/>,
    "External Staffing": <ExternalStaffingForm onDiscard={handleClearForm} primarySelected={primarySelected} 
    secondarySelected={secondarySelected} resetForm={resetForm}/>,
  };
 
  return formComponents[secondarySelected] || null;
})()}
 
      {/* Clear Button - Only shown after secondary selection */}
     
    </Form>
  );
};
 
export default AddJobs;