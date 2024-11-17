import React, { Fragment, useContext, useState } from "react";
import { Stepper, Step } from 'react-form-stepper';
import { Form, Button } from "antd";

import PersonalDetails from "./PersonalDetails";
import EducationalDetails from "./EducationalDetails";
import Documents from "./Documents";
import BankDetails from "./BankDetails";
import EmployeeContext from "../../Providers/EmployeeProvider";

const Index = () => {
  const { fetchEmploy, employeeLogindata, fetchPersonalDetail, fetchEducation, fetchDocuments, fetchBankDetails, personalEmp, Loading } = useContext(EmployeeContext);
  const [goSteps, setGoSteps] = useState(0);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    if (goSteps === 0) {
      fetchPersonalDetail();
    } else if (goSteps === 1) {
      fetchEducation();
    } else if (goSteps === 2) {
      fetchDocuments();
    } else if (goSteps === 3) {
      fetchBankDetails();
    }
  };

  const handleNext = () => {
    form
      .validateFields()
      .then(values => {
        onFinish(values);
        setGoSteps(goSteps + 1);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handlePrev = () => {
    setGoSteps(goSteps - 1);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Profile</h4>
              </div>
         
                <div className="card-body">
                  <div className="form-wizard">
                    <Stepper className="nav-wizard" activeStep={goSteps}>
                      <Step className="nav-link" onClick={() => setGoSteps(0)} />
                      <Step className="nav-link" onClick={() => setGoSteps(1)} />
                      <Step className="nav-link" onClick={() => setGoSteps(2)} />
                      <Step className="nav-link" onClick={() => setGoSteps(3)} />
                    </Stepper>
                    {goSteps === 0 && (
                      <>
                        <PersonalDetails setGoSteps={setGoSteps} goSteps={goSteps} />
                        
                      </>
                    )}
                    {goSteps === 1 && (
                      <>
                        <EducationalDetails setGoSteps={setGoSteps} goSteps={goSteps} handlePrev={handlePrev} />
                        
                      </>
                    )}
                    {goSteps === 2 && (
                      <>
                        <Documents setGoSteps={setGoSteps} goSteps={goSteps} handlePrev={handlePrev} />
                        
                      </>
                    )}
                    {goSteps === 3 && (
                      <>
                        <BankDetails setGoSteps={setGoSteps} goSteps={goSteps} handlePrev={handlePrev} />
                        
                      </>
                    )}
                  </div>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
