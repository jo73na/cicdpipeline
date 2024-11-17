import { Button, Form, Input, Select,Card } from "antd";


import { useForm } from "antd/lib/form/Form";
import {CloseOutlined} from "@ant-design/icons";

import CandidateContext from "../../../Providers/Candidate";
import { useContext,useEffect } from "react";



export default function WorkExperienceEdit({ value, setValue, info,}) { 

    const [form] = useForm();
    
    const {candidateSingle,handleSubmitWorkExperinece,setworkexperiencePopup}=useContext(CandidateContext)

    const handleChangePhoennumber = (value, data, event, formattedValue) => {
        setValue(formattedValue);
      };

      const currentYear = 2024;
 
 useEffect(() => {
    let experienceDtata=[]
      candidateSingle[0].workExperiences?.length>0&&
     candidateSingle[0].workExperiences?.map((experience)=>{
         experienceDtata.push({
          Organization:experience.Organization||experience.organization||"",
            designation:experience.designation,
            s_year:`${experience.startDate.split("'")[1]}`,
            s_month:experience.startDate.split("'")[0],
            empTypeLable:experience.expType,
             e_year: experience.endDate =="till date"? String(currentYear)?.slice(2):`${experience.endDate.split("'")[1]}`,
             e_month:`${experience.endDate.split("'")[0]}`,
            profile:experience.profile||""


         })
     })
     form.setFieldsValue({
        items:experienceDtata
     })
 }, [candidateSingle])

 function getNextAndPreviousYears(currentYear) {
    const years = [];
    for (let i = currentYear - 80; i <= currentYear + 40; i++) {
      years.push({ label: String(i), value: String(i).slice(2) });
    }
    return years;
  }
  
  // Assuming currentYear is the current year (e.g., 2024)
  const yearList = getNextAndPreviousYears(currentYear);
 
  
  console.log(yearList);

  const months = [
    "till date",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthList = months.map(month => ({ label: month, value: month }));


  const onSubmit=(values)=>{
    let sendData=[]
     values.items?.map((item)=>{
      sendData.push({
        Organization:item.Organization,
        designation:item.designation,
        startDate:`${item.s_month}'${item.s_year}`,
        endDate:item.e_month =="till date"?"till date":`${item.e_month}'${item.e_year}`,
        expType:item.empTypeLable||"",
        // s_month:experience.startDate.split("'")[0],
        // e_year: experience.endDate =="till date"?"2024":`20${experience.endDate.split("'")[1]}`,
        // e_month:`${experience.endDate.split("'")[0]}`,
        profile:item.profile||""


     })
     })
       handleSubmitWorkExperinece({ workExperiences:sendData})
       
   }
 

  return (
    <>
 <div className="m_t_20">
 <Form
    form={form}
    layout="vertical"
    onFinish={onSubmit}>

  
        {/* <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item
            label="Candidate_id"
            name="candidate_id"
            
            >
            <Input disabled />
            </Form.Item>
            </div> */}
         <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
             
            }}
          >
            {fields.map((field) => (
              <Card
              className="m_t_10 card"
                size="small"
                title={`Experience ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
              <div className="col_2 g_20">
              <Form.Item label="Company Name" name={[field.name, 'Organization']}>
                  <Input />
                </Form.Item>
                <Form.Item label="Designation" name={[field.name, 'designation']}>
                  <Input />
                </Form.Item>
              
              </div>

              <p className="m_t_1 form_label"> Joining date</p>
              <div className="col_2 g_20">
              
             <div>
            
             <Form.Item label="" name={[field.name, 's_year']}>
                 {/* <Input/> */}
                  <Select options={yearList} />
                </Form.Item>
             </div>
              <div>
              <Form.Item label="" name={[field.name, 's_month']}>
                  <Select options={monthList} />
                   
                </Form.Item>
              </div>
              </div>
              <p className="m_t_1 form_label"> Worked till</p>
              <div className="col_2 g_20">
              
             <div>
            
             <Form.Item label="" name={[field.name, 'e_year']}>
                  <Select options={yearList} />
                </Form.Item>
             </div>
              <div>
              <Form.Item label="" name={[field.name, 'e_month']}>
                  <Select options={monthList} />
                   
                </Form.Item>
              </div>
              </div>
              <div className="col_2">
              <Form.Item label="Employeement Type" name={[field.name, 'empTypeLable']}>
                  <Select 
                  options={[
                    {
                      label:"Full Time",
                      value: "F",

                    },
                    {
                      label:"Part Time",
                      value: "part Time",
                      
                    } , {
                      label:"Contract",
                      value: "contract",
                      
                    }
                  ]}/>
                </Form.Item>
              </div>
              {/* <div>
                <Form.Item label="Summary" name={[field.name, 'profile']}>
                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
                </Form.Item>
              </div> */}

                {/* Nest Form.List */}
                {/* <Form.Item label="List">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'first']}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'second']}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item> */}
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Experience
            </Button>
          </div>
        )}
      </Form.List>
      <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button type ="button" className="btn btn-danger btn-sm"
         onClick={()=>setworkexperiencePopup(false)}>Cancel</button>
        <button type="submit" className="btn btn-primary btn-sm" htmlType="submit">
          Save
        </button> 
      </div>

      </Form>
 </div>
    </>
  );
}
